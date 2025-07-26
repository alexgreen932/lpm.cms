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
                <ul class="d-files" :class="files_display">
                    <li v-for="file in filteredFiles" :key="file.name" @click="selected = file.name"
                        :class="{ active: selected === file.name }">
                        <label :for="file.name" v-if="files_display == 'grid'">
                            <input type="radio" :id="file.name" :value="file.name" v-model="selected">
                        </label>
                        <img v-if="isImage(file.type)" :src="file.url" />
                        <span>{{ file.name }}</span>
                        <div v-if="files_display == 'list'">

                            <label :for="file.name"><input type="radio" :id="file.name" :value="file.name"
                                    v-model="selected">{{
                                        file.name }}</label>

                        </div>
                    </li>
                </ul>
            </div>



            <div class="d-sidebar">
                <div class="d-set">
                    <button class="but-default br-3" @click="$emit('close')">{{ $__('Close') }}</button>
                    <select v-model="files_display">
                        <option value="grid">{{ $__('Display as Grid') }}</option>
                        <option value="list">{{ $__('Display as List') }}</option>
                    </select>
                    ---{{ selected }}

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
            files_display: 'grid',
            files: [],
            selected: '',
            filter_type: '',
            filter_input: '',
            options: ['jpg', 'png', 'gif', 'mp4', 'zip'],
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
        // currentImg(){
        //     let out = null;
        //     if(nod)
        // },
        loadFiles() {
            console.log('${this.src}/index.json: ', `${this.src}/index.json`);
            //todo !!  to .php on prod
            fetch(`${this.src}/index.json`)
                .then(res => res.json())
                .then(data => this.files = data);
            console.log('this.files: ', this.files);
        },
        uploadFile(e) {
            let file = e.target.files[0];
            if (!file) return;
            let formData = new FormData();
            formData.append('file', file);
            fetch(`${this.src}/upload.php`, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(() => this.loadFiles());
        },
        selectFile() {
            this.$emit('update:modelValue', this.selected);
        },
        isImage(ext) {
            return ['jpg', 'jpeg', 'png', 'gif'].includes(ext.toLowerCase());
        }
    },
    mounted() {
        this.$getLocal(this.filter_type, 'mm_layout_state')
        this.files_display = this.layout ? this.layout : 'grid';
        this.loadFiles();
    }
};
</script>
