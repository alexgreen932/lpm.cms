 
<?php
/**
 * Plugin Name: Jet Woo Import Wizard (CSV/XLSX)
 * Description: Step-by-step wizard to import or update WooCommerce products from CSV or XLSX with header mapping/renaming.
 * Version: 1.0.0
 * Author: You
 */

if ( ! defined('ABSPATH') ) exit;

if ( is_admin() ) {
    add_action('admin_menu', function () {
        // Put under WooCommerce menu
        add_submenu_page(
            'woocommerce',
            'Product Import Wizard',
            'Product Import Wizard',
            'manage_woocommerce',
            'woo-import-wizard',
            'wp_wiw_render_page'
        );
    });
}

/**
 * Render admin page (wizard)
 */
function wp_wiw_render_page() {
    if ( ! current_user_can('manage_woocommerce') ) {
        wp_die('Insufficient permissions.');
    }

    // Ensure media functions exist (for image sideload)
    require_once ABSPATH . 'wp-admin/includes/media.php';
    require_once ABSPATH . 'wp-admin/includes/file.php';
    require_once ABSPATH . 'wp-admin/includes/image.php';

    // Load SimpleXLSX
    if ( ! class_exists('SimpleXLSX') ) {
        $xlsx_lib = __DIR__ . '/SimpleXLSX.php';
        if ( file_exists($xlsx_lib) ) {
            require_once $xlsx_lib;
        }
    }

    // Step handling
    $step = isset($_POST['wiw_step']) ? sanitize_text_field($_POST['wiw_step']) : 'upload';

    echo '<div class="wrap"><h1>Woo Product Import Wizard</h1>';

    if ( $step === 'mapping' && check_admin_referer('wiw_wizard') ) {
        $file_path = sanitize_text_field($_POST['wiw_file_path'] ?? '');
        $ext       = strtolower(pathinfo($file_path, PATHINFO_EXTENSION));
        $rows      = wp_wiw_read_rows($file_path, $ext);

        if ( empty($rows) ) {
            echo '<div class="notice notice-error"><p>Could not read the file or it is empty.</p></div>';
            wp_wiw_render_upload();
            echo '</div>';
            return;
        }

        $headers = array_keys($rows[0]);

        // Render mapping form
        wp_wiw_render_mapping_form($headers, $file_path);
        echo '</div>';
        return;

    } elseif ( $step === 'run' && check_admin_referer('wiw_wizard') ) {
        // Execute import
        $file_path = sanitize_text_field($_POST['wiw_file_path'] ?? '');
        $ext       = strtolower(pathinfo($file_path, PATHINFO_EXTENSION));
        $rows      = wp_wiw_read_rows($file_path, $ext);
        if ( empty($rows) ) {
            echo '<div class="notice notice-error"><p>Could not read the file or it is empty.</p></div>';
            wp_wiw_render_upload();
            echo '</div>';
            return;
        }

        // Collect mapping
        $mapping = $_POST['map'] ?? [];     // header => target
        $renames = $_POST['rename'] ?? [];  // header => new header
        $attr    = $_POST['attr'] ?? [];    // header => attribute name (optional)
        $opts    = [
            'delimiter'     => ',',
            'split_chars'   => ",|", // split values by comma or pipe
            'default_type'  => sanitize_text_field($_POST['default_type'] ?? 'simple'),
            'download_imgs' => isset($_POST['download_imgs']) ? (bool) $_POST['download_imgs'] : true,
            'image_timeout' => 25,
        ];

        // Apply renames to rows (only affects keys we use later)
        if ( ! empty($renames) ) {
            $rows = wp_wiw_apply_renames($rows, $renames);
        }

        // Run import
        $result = wp_wiw_import_products($rows, $mapping, $attr, $opts);

        printf(
            '<div class="notice notice-success"><p>Done. Created: <b>%d</b>, Updated: <b>%d</b>, Skipped: <b>%d</b>, Images: <b>%d</b></p></div>',
            $result['created'], $result['updated'], $result['skipped'], $result['images']
        );

        echo '<p><a class="button" href="' . esc_url( admin_url('edit.php?post_type=product') ) . '">View Products</a> ';
        echo '<a class="button" href="' . esc_url( admin_url('admin.php?page=woo-import-wizard') ) . '">Run Another Import</a></p>';
        echo '</div>';
        return;

    } else {
        // Step: upload
        wp_wiw_render_upload();
        echo '</div>';
        return;
    }
}

/**
 * Step 1: Upload form
 */
function wp_wiw_render_upload() {
    ?>
    <form method="post" enctype="multipart/form-data">
        <?php wp_nonce_field('wiw_wizard'); ?>
        <input type="hidden" name="wiw_step" value="mapping">
        <table class="form-table" role="presentation">
            <tr>
                <th><label for="wiw_file">File (.csv or .xlsx)</label></th>
                <td><input type="file" name="wiw_file" id="wiw_file" required></td>
            </tr>
            <tr>
                <th><label for="default_type">Default product type</label></th>
                <td>
                    <select name="default_type" id="default_type">
                        <option value="simple" selected>simple</option>
                        <option value="external">external</option>
                        <option value="grouped">grouped</option>
                        <option value="variable">variable (basic fields only)</option>
                    </select>
                    <p class="description">If no type column is mapped, new products will use this type.</p>
                </td>
            </tr>
        </table>
        <?php
        // Handle incoming upload
        if ( ! empty($_FILES['wiw_file']['tmp_name']) ) {
            $upload = wp_handle_upload( $_FILES['wiw_file'], ['test_form' => false] );
            if ( isset($upload['file']) ) {
                $file_path = $upload['file'];
                echo '<input type="hidden" name="wiw_file_path" value="' . esc_attr($file_path) . '">';
                echo '<p><b>Uploaded:</b> ' . esc_html(basename($file_path)) . '</p>';
                echo '<p class="submit"><button type="submit" class="button button-primary">Continue to Mapping</button></p>';
                return;
            } else {
                echo '<div class="notice notice-error"><p>Upload failed.</p></div>';
            }
        }
        ?>
        <p class="submit">
            <button type="submit" class="button button-primary">Upload & Continue</button>
        </p>
    </form>
    <?php
}

/**
 * Step 2: Mapping form
 */
function wp_wiw_render_mapping_form(array $headers, string $file_path) {
    $targets = wp_wiw_target_options();

    echo '<form method="post">';
    wp_nonce_field('wiw_wizard');
    echo '<input type="hidden" name="wiw_step" value="run">';
    echo '<input type="hidden" name="wiw_file_path" value="' . esc_attr($file_path) . '">';

    echo '<h2>2) Map columns</h2>';
    echo '<p>Choose what each column represents. You can also rename headers before import. For attributes, pick "Attribute" and provide a name (e.g. <code>Color</code> or <code>pa_color</code>).</p>';

    echo '<table class="widefat striped">';
    echo '<thead><tr><th>Original Header</th><th>Rename (optional)</th><th>Map To</th><th>Attribute Name (if Attribute)</th></tr></thead><tbody>';

    foreach ($headers as $h) {
        echo '<tr>';
        echo '<td><code>' . esc_html($h) . '</code></td>';
        echo '<td><input type="text" name="rename['.esc_attr($h).']" value="' . esc_attr($h) . '" class="regular-text"></td>';
        echo '<td>';
        echo '<select name="map['.esc_attr($h).']">';
        foreach ($targets as $group => $opts) {
            echo '<optgroup label="'.esc_attr($group).'">';
            foreach ($opts as $value => $label) {
                // Auto hints for common names
                $selected = '';
                $lc = strtolower($h);
                if (
                    ($value === 'name' && in_array($lc, ['name','title','product name'])) ||
                    ($value === 'sku' && $lc === 'sku') ||
                    ($value === 'regular_price' && in_array($lc, ['price','regular price','regular_price'])) ||
                    ($value === 'sale_price' && strpos($lc, 'sale') !== false)
                ) {
                    $selected = 'selected';
                }
                echo '<option value="'.esc_attr($value).'" '.$selected.'>'.esc_html($label).'</option>';
            }
            echo '</optgroup>';
        }
        echo '</select>';
        echo '</td>';
        echo '<td><input type="text" name="attr['.esc_attr($h).']" placeholder="e.g. Color or pa_color" class="regular-text"></td>';
        echo '</tr>';
    }

    echo '</tbody></table>';

    echo '<h2>3) Options</h2>';
    echo '<label><input type="checkbox" name="download_imgs" value="1" checked> Download/attach images from URLs</label>';
    echo '<p class="description">Featured Image expects a single URL. Gallery can be comma or pipe separated URLs.</p>';

    echo '<p class="submit"><button type="submit" class="button button-primary">Run Import</button></p>';
    echo '</form>';
}

/**
 * Define mapping targets
 */
function wp_wiw_target_options() {
    return [
        'Core Fields' => [
            'skip'              => '— Skip —',
            'name'              => 'Product Name',
            'description'       => 'Description (long)',
            'short_description' => 'Short Description',
            'sku'               => 'SKU (used to update if exists)',
            'type'              => 'Product Type',
            'status'            => 'Post Status (publish/draft)',
        ],
        'Pricing' => [
            'regular_price'     => 'Regular Price',
            'sale_price'        => 'Sale Price',
        ],
        'Inventory' => [
            'manage_stock'      => 'Manage Stock (yes/no)',
            'stock_quantity'    => 'Stock Quantity',
            'stock_status'      => 'Stock Status (instock/outofstock/onbackorder)',
        ],
        'Dimensions' => [
            'weight'            => 'Weight',
            'length'            => 'Length',
            'width'             => 'Width',
            'height'            => 'Height',
        ],
        'Taxonomies' => [
            'categories'        => 'Categories (>, , or | for hierarchy/list)',
            'tags'              => 'Tags (comma or pipe separated)',
        ],
        'Images' => [
            'image'             => 'Featured Image URL',
            'gallery'           => 'Gallery Image URLs (comma/pipe separated)',
        ],
        'Attributes' => [
            'attribute'         => 'Attribute (use right input to name it)',
        ],
        'Meta' => [
            'meta'              => 'Meta (saves as post meta, key = renamed header)',
        ],
    ];
}

/**
 * Read rows from CSV/XLSX
 */
function wp_wiw_read_rows(string $file_path, string $ext): array {
    $rows = [];

    if ( $ext === 'csv' ) {
        $fh = fopen($file_path, 'r');
        if ( ! $fh ) return [];
        $headers = fgetcsv($fh);
        if ( ! $headers ) return [];
        while ( ($r = fgetcsv($fh)) !== false ) {
            // pad row length
            $r = array_pad($r, count($headers), '');
            $rows[] = array_combine($headers, $r);
        }
        fclose($fh);
    } elseif ( $ext === 'xlsx' && class_exists('SimpleXLSX') ) {
        $xlsx = SimpleXLSX::parse($file_path);
        if ( ! $xlsx ) return [];
        $sheet = $xlsx->rows();
        if ( empty($sheet) || empty($sheet[0]) ) return [];
        $headers = $sheet[0];
        for ($i = 1; $i < count($sheet); $i++) {
            $row = $sheet[$i];
            $row = array_pad($row, count($headers), '');
            $rows[] = array_combine($headers, $row);
        }
    }
    return $rows;
}

/**
 * Apply renames to row keys
 */
function wp_wiw_apply_renames(array $rows, array $renames): array {
    $map = [];
    foreach ($renames as $old => $new) {
        $map[$old] = $new;
    }
    $out = [];
    foreach ($rows as $row) {
        $new = [];
        foreach ($row as $k => $v) {
            $nk = $map[$k] ?? $k;
            $new[$nk] = $v;
        }
        $out[] = $new;
    }
    return $out;
}

/**
 * Main import
 */
function wp_wiw_import_products(array $rows, array $mapping, array $attr_names, array $opts): array {
    $created = $updated = $skipped = $img_count = 0;
    $split_regex = '/\s*[|,]\s*/';

    foreach ($rows as $row) {
        // Build a clean map for this row based on mapping
        $data = [
            'name'              => '',
            'description'       => '',
            'short_description' => '',
            'sku'               => '',
            'type'              => $opts['default_type'],
            'status'            => 'publish',
            'regular_price'     => '',
            'sale_price'        => '',
            'manage_stock'      => '',
            'stock_quantity'    => '',
            'stock_status'      => '',
            'weight'            => '',
            'length'            => '',
            'width'             => '',
            'height'            => '',
            'categories'        => '',
            'tags'              => '',
            'image'             => '',
            'gallery'           => '',
            'attributes'        => [], // attr_name => values array
            'meta'              => [], // key => value
        ];

        // Fill data by iterating headers
        foreach ($mapping as $header => $target) {
            if ( ! array_key_exists($header, $row) ) continue;
            $value = trim( (string) $row[$header] );
            if ( $target === 'skip' || $value === '' ) continue;

            switch ($target) {
                case 'name':
                case 'description':
                case 'short_description':
                case 'sku':
                case 'type':
                case 'status':
                case 'regular_price':
                case 'sale_price':
                case 'manage_stock':
                case 'stock_quantity':
                case 'stock_status':
                case 'weight':
                case 'length':
                case 'width':
                case 'height':
                case 'categories':
                case 'tags':
                case 'image':
                case 'gallery':
                    $data[$target] = $value;
                    break;

                case 'attribute':
                    $raw_attr_name = trim( (string) ($attr_names[$header] ?? '') );
                    if ( $raw_attr_name !== '' ) {
                        $attr_slug = wp_wiw_normalize_attribute_name($raw_attr_name);
                        $vals = preg_split($split_regex, $value);
                        $vals = array_filter(array_map('trim', (array)$vals));
                        if ( ! empty($vals) ) {
                            $data['attributes'][$attr_slug] = [
                                'label' => $raw_attr_name,
                                'values'=> array_values(array_unique($vals)),
                            ];
                        }
                    }
                    break;

                case 'meta':
                    // save with renamed header as key
                    $data['meta'][$header] = $value;
                    break;
            }
        }

        // Skip if absolutely nothing useful
        if ( $data['name'] === '' && $data['sku'] === '' ) {
            $skipped++; continue;
        }

        // Locate existing by SKU
        $product_id = 0;
        if ( $data['sku'] !== '' ) {
            $product_id = wc_get_product_id_by_sku( $data['sku'] );
        }

        // Create/update product
        if ( $product_id ) {
            $product = wc_get_product($product_id);
            if ( ! $product ) { $skipped++; continue; }
        } else {
            $product = new WC_Product_Simple(); // default, can set type later
        }

        // Basic fields
        if ( $data['name'] )              $product->set_name( $data['name'] );
        if ( $data['description'] )       $product->set_description( $data['description'] );
        if ( $data['short_description'] ) $product->set_short_description( $data['short_description'] );
        if ( $data['sku'] && ! $product_id ) $product->set_sku( $data['sku'] ); // don’t override SKU on update unless you want to
        if ( $data['regular_price'] !== '' ) $product->set_regular_price( $data['regular_price'] );
        if ( $data['sale_price']    !== '' ) $product->set_sale_price(    $data['sale_price'] );

        // Inventory
        if ( $data['manage_stock'] !== '' ) {
            $product->set_manage_stock( in_array( strtolower($data['manage_stock']), ['yes','true','1'], true ) );
        }
        if ( $data['stock_quantity'] !== '' ) $product->set_stock_quantity( (int) $data['stock_quantity'] );
        if ( $data['stock_status']   !== '' ) $product->set_stock_status( strtolower($data['stock_status']) );

        // Dimensions
        if ( $data['weight'] !== '' ) $product->set_weight( $data['weight'] );
        if ( $data['length'] !== '' ) $product->set_length( $data['length'] );
        if ( $data['width']  !== '' ) $product->set_width(  $data['width'] );
        if ( $data['height'] !== '' ) $product->set_height( $data['height'] );

        // Type
        if ( $data['type'] !== '' ) $product->set_type( $data['type'] );
        // Status
        if ( $data['status'] !== '' ) $product->set_status( $data['status'] );

        // Save early to get ID
        $new_id = $product->save();
        if ( is_wp_error($new_id) || ! $new_id ) { $skipped++; continue; }
        $product_id = $new_id;

        // Taxonomies: categories / tags
        if ( $data['categories'] !== '' ) {
            wp_wiw_assign_categories($product_id, $data['categories']);
        }
        if ( $data['tags'] !== '' ) {
            $tags = preg_split('/\s*[|,]\s*/', $data['tags']);
            $tags = array_filter(array_map('trim', (array)$tags));
            if ( ! empty($tags) ) {
                wp_set_post_terms($product_id, $tags, 'product_tag', false);
            }
        }

        // Attributes
        if ( ! empty($data['attributes']) ) {
            wp_wiw_assign_attributes($product_id, $data['attributes']);
        }

        // Images
        if ( $opts['download_imgs'] ) {
            if ( $data['image'] !== '' ) {
                $att_id = wp_wiw_attach_image_from_url($data['image'], $product_id, $opts['image_timeout']);
                if ( $att_id ) { set_post_thumbnail($product_id, $att_id); $img_count++; }
            }
            if ( $data['gallery'] !== '' ) {
                $gallery_urls = preg_split('/\s*[|,]\s*/', $data['gallery']);
                $gids = [];
                foreach ( $gallery_urls as $url ) {
                    $aid = wp_wiw_attach_image_from_url(trim($url), $product_id, $opts['image_timeout']);
                    if ( $aid ) { $gids[] = $aid; $img_count++; }
                }
                if ( ! empty($gids) ) {
                    update_post_meta($product_id, '_product_image_gallery', implode(',', $gids));
                }
            }
        }

        // Meta
        if ( ! empty($data['meta']) ) {
            foreach ($data['meta'] as $k => $v) {
                update_post_meta($product_id, sanitize_key($k), $v);
            }
        }

        // Count created/updated
        if ( $product_id && $data['sku'] && wc_get_product_id_by_sku($data['sku']) == $product_id ) {
            if ( get_post_meta($product_id, '_wiw_was_new', true) ) {
                delete_post_meta($product_id, '_wiw_was_new');
                $created++;
            } else {
                $updated++;
            }
        } else {
            // No SKU path
            // Heuristic: if post date is recent in this pass assume created
            $post = get_post($product_id);
            if ( $post && ( time() - strtotime($post->post_date_gmt) ) < 60 ) $created++; else $updated++;
        }
    }

    return compact('created','updated','skipped','img_count');
}

/**
 * Normalize attribute name to Woo's attribute taxonomy format.
 * Accepts "Color" or "pa_color" and returns slug "pa_color".
 */
function wp_wiw_normalize_attribute_name(string $name): string {
    $name = trim($name);
    $slug = wc_sanitize_taxonomy_name($name);
    if ( strpos($slug, 'pa_') !== 0 ) $slug = 'pa_' . $slug;
    // Ensure attribute taxonomy exists (register if missing)
    wp_wiw_ensure_global_attribute($name, $slug);
    return $slug;
}

/**
 * Make sure a global attribute exists (in wc_attribute_taxonomies)
 */
function wp_wiw_ensure_global_attribute(string $label, string $slug) {
    global $wpdb;

    $attr = $wpdb->get_row( $wpdb->prepare(
        "SELECT * FROM {$wpdb->prefix}woocommerce_attribute_taxonomies WHERE attribute_name = %s",
        substr($slug, 3) // without pa_
    ) );

    if ( ! $attr ) {
        $wpdb->insert(
            "{$wpdb->prefix}woocommerce_attribute_taxonomies",
            [
                'attribute_label'   => $label,
                'attribute_name'    => substr($slug, 3),
                'attribute_type'    => 'select',
                'attribute_orderby' => 'menu_order',
                'attribute_public'  => 1,
            ]
        );
        // Re-register taxonomies
        delete_transient('wc_attribute_taxonomies');
        wc_register_taxonomy( $slug, 'product' );
        // Flush to be safe once
        flush_rewrite_rules(false);
    }
}

/**
 * Assign attribute values to product (creates terms if needed)
 */
function wp_wiw_assign_attributes(int $product_id, array $attributes) {
    $product = wc_get_product($product_id);
    if ( ! $product ) return;

    $wc_attrs = [];

    foreach ($attributes as $attr_slug => $info) {
        $label = $info['label'];
        $vals  = $info['values'];

        // Ensure taxonomy
        if ( taxonomy_exists($attr_slug) ) {
            // Create terms if needed and assign
            $term_ids = [];
            foreach ($vals as $v) {
                $term = term_exists($v, $attr_slug);
                if ( ! $term ) {
                    $term = wp_insert_term($v, $attr_slug);
                }
                if ( ! is_wp_error($term) ) {
                    $term_ids[] = (int) ($term['term_id'] ?? $term['term_taxonomy_id']);
                }
            }
            if ( ! empty($term_ids) ) {
                wp_set_post_terms($product_id, $vals, $attr_slug, false);
            }

            $attribute = new WC_Product_Attribute();
            $attribute->set_id( wc_attribute_taxonomy_id_by_name($attr_slug) );
            $attribute->set_name( $attr_slug );
            $attribute->set_options( $term_ids ); // taxonomy terms
            $attribute->set_visible( true );
            $attribute->set_variation( false );

            $wc_attrs[] = $attribute;

        } else {
            // Custom product-level attribute (non-taxonomy)
            $attribute = new WC_Product_Attribute();
            $attribute->set_id( 0 );
            $attribute->set_name( $label );
            $attribute->set_options( $vals ); // plain strings
            $attribute->set_visible( true );
            $attribute->set_variation( false );

            $wc_attrs[] = $attribute;
        }
    }

    if ( ! empty($wc_attrs) ) {
        $product->set_attributes( $wc_attrs );
        $product->save();
    }
}

/**
 * Assign hierarchical categories. Supports:
 * - "Parent > Child > Subchild"
 * - Multiple categories separated by comma or pipe.
 */
function wp_wiw_assign_categories(int $product_id, string $raw) {
    $chunks = preg_split('/\s*[|,]\s*/', $raw);
    $cat_ids = [];

    foreach ( $chunks as $chunk ) {
        $hier = array_map('trim', explode('>', $chunk));
        $parent = 0; $term_id = 0;

        foreach ( $hier as $name ) {
            if ( $name === '' ) continue;
            $term = term_exists($name, 'product_cat', $parent);
            if ( ! $term ) {
                $term = wp_insert_term($name, 'product_cat', ['parent' => $parent]);
            }
            if ( is_wp_error($term) ) continue;
            $term_id = (int) $term['term_id'];
            $parent  = $term_id;
        }

        if ( $term_id ) $cat_ids[] = $term_id;
    }

    if ( ! empty($cat_ids) ) {
        wp_set_post_terms($product_id, $cat_ids, 'product_cat', false);
    }
}

/**
 * Download an image from URL and attach to post
 */
function wp_wiw_attach_image_from_url(string $url, int $post_id, int $timeout = 25) {
    $url = trim($url);
    if ( $url === '' ) return 0;

    $tmp = download_url($url, $timeout);
    if ( is_wp_error($tmp) ) return 0;

    $file_array = [
        'name'     => basename(parse_url($url, PHP_URL_PATH) ?: 'image.jpg'),
        'tmp_name' => $tmp,
    ];

    $id = media_handle_sideload($file_array, $post_id);
    if ( is_wp_error($id) ) {
        @unlink($file_array['tmp_name']);
        return 0;
    }
    return $id;
}
