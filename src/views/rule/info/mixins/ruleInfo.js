
export default {
    data() {
        return {
            ruleId: ''
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
            this.ruleId = this.$route.params.id;
            if (this.ruleId && this.$route.path.indexOf("rule") >= 0) {
                this.$store
                    .dispatch("RuleInfoGet", { tid: this.ruleId })
                    .then(() => {
                        this.$store.dispatch("updateVisitedView", this.$route);
                    });
            }
        },
    },
}