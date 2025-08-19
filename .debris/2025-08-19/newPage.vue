<template>


    <transition name="fade">
        <div v-if="!show" class="jc-c">
            <i class="fa-solid fa-circle-plus fs-15 j-click" @click="show = true"></i>
        </div>
    </transition>
    <TransitionGroup name="fade">
        <div v-if="show" class="jc-e">
            <i class="fa-solid fa-xmark j-click" @click="show = false"></i>
        </div>
        <form v-if="show" method="post" action="" class="p-1 fd-c g-05 br-4 bg-white jet-form">

            <input type="hidden" name="action" value="newpage">
            <div class="control-group">
                <label>{{ $__('Page Title') }}</label>
                <input name="title" v-model="new_page.title" />
            </div>
            <div class="control-group">
                <label>{{ $__('Url') }}</label>
                <input name="slug" v-model="new_page.slug" />
            </div>

            <button class="but-blue br-4" type="submit">{{ $__('Add Page') }}</button>
        </form>
    </TransitionGroup>

</template>

<script>
export default {
    data() {
        return {
            show: false,
            new_page: {
                title: '',
                slug: ''
            }
        };
    },
    watch: {
        'new_page.title'(val) {
            if (!this.new_page.slug) {
                this.new_page.slug = val.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            }
        }
    }
};
</script>
