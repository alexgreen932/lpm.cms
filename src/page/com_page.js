export default {
    components: { 'jet-toolbar': toolbar },
    template: `
        <div class="jet-section w-container p-1">
            <textarea cols="50" rows="20">{{sections}}</textarea>  
        </div>
    `,
    props: ['page'],
    data() {
        return {
            sections: [],
        };
    },
    methods: {
        sectionId(i) {
            return 'section-' + (i + 1);
        },
        async fetchFile(path) {
            try {
                const response = await fetch(path);
                if (!response.ok) throw new Error('File not found');
                const data = await response.json();
                return data;
            } catch (err) {
                alert(err);
                return [];
            }
        }
    },
    async mounted() {
        const site = window.location.origin;
        let slug = window.location.pathname;

        // Handle root paths like '/', '/index.php', etc.
        if (slug === '/' || slug === '/index.php') {
            slug = 'homepage';
        } else {
            // Remove leading slash and extension if needed
            slug = slug.replace(/^\/|\.php$/g, '');
        }

        const path = `${site}/data/${slug}.json`;
        console.log('path: ', path);

        this.sections = await this.fetchFile(path);
        console.log('%c PAGE', 'color: #e00808', this.sections);
    },
};
