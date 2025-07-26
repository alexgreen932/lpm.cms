<template>
    <transition name="pop">
        <div class="media-manager bs-2" :class="[cls, width]">
            <div class="d-main">
                <div class="d-header">
                    <select v-model="filter_type" @change="$seveLocal(filter_type, 'mm_layout_state')">
                        <option value="">All</option>
                        <option v-for="o in options" :key="o" :value="o">{{ o }}</option>
                    </select>
                    <input type="text" v-model="filter_input" :placeholder="$__('Filter by name')">
                    <button @click="loadFiles">Reload</button>
                    <input type="file" @change="uploadFile($event)" />
                </div>
                <ul class="d-files" :class="ops.files_display">
                    <li v-for="file in filteredFiles" :key="file.name" @click="selected = file.name">
                        <template v-if="ops.files_display == 'grid'">
                            <label :for="file.name">
                                <input type="radio" :id="getFileId(file.name)" name="media-choice" :value="file.name"
                                    v-model="selected">
                            </label>
                            <img :src="thumb(file.url, file.type)" />
                            <span>{{ file.name }}</span>

                        </template>
                        <template v-if="ops.files_display == 'list'">

                            <label :for="file.name">
                                <input type="radio" :id="getFileId(file.name)" name="media-choice" :value="file.name"
                                    v-model="selected">
                                {{ file.name }}
                            </label>

                        </template>
                    </li>
                </ul>
            </div>



            <div class="d-sidebar">
                <div class="d-set">
                    <button class="but-default br-3" @click="$emit('close')">{{ $__('Close') }}</button>
                    <select v-model="ops.files_display" @change="$saveLocal(ops, 'mm_layout_state')">
                        <option value="grid">{{ $__('Display as Grid') }}</option>
                        <option value="list">{{ $__('Display as List') }}</option>
                    </select>
                         </div>
                <div class="d-set">
                    <div v-if="selected">
                        <div>{{ $__('Selected') }}</div>
                        <div class="d-preview">
                            <img :src="'media/' + selected" />
                        </div>
                    </div>


                    <button class="but-blue br-3" :disabled="!selected"
                        @click="$emit('update:modelValue', selectedPath()), $emit('close')">{{ $__('Select') }}</button>

                </div>
            </div>
        </div>
    </transition>

</template>

<script>
export default {
    props: ['modelValue', 'src', 'cls', 'width', 'layout'],
    data() {
        return {

            files: [],
            selected: '',
            filter_type: '',
            filter_input: '',
            options: ['jpg', 'png', 'gif', 'mp4', 'zip'],
            ops: { files_display: 'grid', }
        };
    },
    computed: {
        filteredFiles() {
            return this.files.filter(file => {
                let matchType = this.filter_type ? file.type === this.filter_type : true;
                let matchName = this.filter_input ?
                    file.name.toLowerCase().includes(this.filter_input.toLowerCase()) : true;
                return matchType && matchName;
            });
        }
    },
    methods: {
        selectedPath() {
            return `${this.src}/${this.selected}`;
        },
        getFileId(name) {
            return name.replace(/\./g, '-').replace(/\s+/g, '-');
        },

        loadFiles() {
            console.log('${this.src}/index.json: ', `${this.src}/index.json`);
            let f = 'index.php';
            f = 'index.json';//dev in html
            //todo !!  to .php on prod
            fetch(`${this.src}/${f}`)
                .then(res => res.json())
                .then(data => this.files = data);
            console.log('this.files: ', this.files);
        },
        uploadFile(e) {
            const file = e.target.files[0];
            if (!file) {
                console.warn('No file selected');
                return;
            }
            const formData = new FormData();
            formData.append('file', file);

            console.log('Uploading:', file.name, file.type, file.size);

            fetch(`${this.src}/upload.php`, {
                method: 'POST',
                body: formData
            })
                .then(res => res.text()) // first get raw text
                .then(text => {
                    console.log('Upload response raw:', text);
                    try {
                        const json = JSON.parse(text);
                        console.log('Upload response JSON:', json);
                        this.loadFiles();
                    } catch (e) {
                        console.error('Invalid JSON from PHP', e);
                    }
                })
                .catch(err => console.error('Upload fetch error:', err));
        },

        selectFile() {
            this.$emit('update:modelValue', this.selected);
        },
        thumb(file, type) {
            const ext = type.toLowerCase();
            if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
                return file; // direct image preview
            }
            if (['mp4', 'mov', 'avi', 'webm'].includes(ext)) {
                return 'media/icons/video.png'; // generic video icon
            }
            if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) {
                return 'media/icons/zip.png'; // generic archive icon
            }
            return 'media/icons/file.png'; // fallback generic file icon
        }
    },
    mounted() {
        this.$getLocal(this.ops, 'mm_layout_state');
        this.files_display = this.layout ? this.layout : 'grid';
        this.loadFiles();
    }
};
</script>
