
export default {
    data() {
        return {
            pid: ''
        }
    },
    created() {
        this.init();
    },
    watch: {
        $route() {
            this.init();
        }
    },
    methods: {
        init() {
            this.pid = this.$route.params.id;
            if (this.pid && this.$route.path.indexOf("product") >= 0 && !this.$route.params.did) {
                this.$store
                    .dispatch("BaseInfoGet", { pid: this.pid })
                    .then(() => {
                        this.$store.dispatch("updateVisitedView", this.$route);
                    });
            }
        }
    },
}