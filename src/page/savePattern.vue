<template>
    <div class="save-pattern j-modal w-1-4 fd-c g-1 ai-c">
        <h3 class="jc-b g-2">
            <span>{{ $__('Save as Pattern') }}</span>
            <i class="fa-solid fa-xmark j-click fs-10" @click="ops.save_as_pattern = false"></i>
        </h3>
        <!-- <div>{{ $__('Enter a Title and Description(optionally)') }}</div> -->
        <form method="post" action="" class="fd-c g-05">
            <input type="hidden" name="action" value="savepattern">
            <div class="control-group">
                <label>{{ $__('Pattern Title') }}</label>
                <input name="title" v-model="ops.pattern.title" placeholder="Required unique title..."
                    @input="doSlug(), patternSlug()" />
                <input name="slug" v-model="ops.pattern.slug" />
            </div>
            <div class="control-group">
                <label>{{ $__('Description(optionally)') }}</label>
                <textarea name="description" v-model="ops.pattern.description"></textarea>
            </div>
            <div v-if="mode == 'new' && slug">{{ $__('Pattern will be saved as') }}
                <strong>"{{ ops.pattern.slug }}.json"</strong> {{ $__(' in data/patterns/') }}
            </div>
            <div v-if="mode == 'new' && json_exists">{{ $__('Pattern with this title exists, change the title please')
            }}</div>
            <!-- {{$root.dataString(ops.pattern)}} -->
            <input type="text" name="string" :value="$root.dataString(ops.pattern)">
            <button :disabled="disabled" class="but-blue br-4" type="submit">{{ $__('Save') }}</button>
        </form>
    </div>
</template>

<script>
import { ops } from "../data/data.js";
import { fetchFile } from "../utils/helpers.js";
// import JetForms from "./JetForms.vue";

export default {
    components: {
        // "jet-forms ": JetForms,
    },
    data() {
        return {
            ops,
            disabled: true,
            slug: false,
            mode: 'new',
            json_exists: false,
        };
    },
    methods: {
        patternSlug() {
            //todo!!!!
            // if (this.checkIfExist()) {
            //     this.json_exists = true;
            //     return;
            // }else{
            //    this.json_exists = false; 
            // }
            if (this.ops.pattern.slug) {
                this.disabled = false;
                this.slug = true;
            }
        },
        doSlug() {
            if (this.ops.pattern.title.length > 4) {
                this.ops.pattern.slug = this.ops.pattern.title.trim().toLocaleLowerCase().replace(/ /g, '-');
            }
        },
        async checkIfExist() {
            // let path = this.$domain + '/data/patterns/index.php'
            let path = this.$domain + '/data/patterns/index.json';
            let patterns = await fetchFile(path);
            // console.log('patterns: ', patterns);
            let list = [];
            patterns.forEach((e) => {
                list.push(e.slug);
            })
            console.log('list: ', list);
            console.log('this.ops.pattern.slug: ', this.ops.pattern.slug);
            if (list.includes(this.ops.pattern.slug)) {
                return true;
            } else {
                return false;
            }
        }
    },
};
</script>
