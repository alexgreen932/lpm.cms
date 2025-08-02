<template>
    <i class="fa-solid fa-circle-question j-tip" @click="show = !show">
        <transition name="fade">
            <div v-if="show" class="d-content" :class="[cls_action, cls_pos]">
                <i v-if="cls_action == 'click'" class="fa-solid fa-xmark"></i>
                <div v-html="content"></div>
            </div>
        </transition>

    </i>
</template>

<script>

export default {
    props: ['action', 'pos', 'content'],
    data() {
        return {
            show: false,
            cls_action: 'click',
            cls_pos: 'd-jlm',
        };
    },
    methods: {
        cls() {
            let val = this.cls ? this.cls : 'd-top';
            return val;
        }
    },
    mounted() {
        if (this.action) {
            this.cls_action = this.action;
        }
        
        if (this.pos) {
            this.cls_pos = this.pos;
        }
    }
};
</script>
