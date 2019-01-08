<script>
export default {
    beforeCreate() {
        const { params, query } = this.$route;
        const { path } = params;
        if(!path) {
            this.$router.replace({ path: "/login", query });
        } else {
            this.$router.replace({ path: "/" + path, query });            
        }
    },
    render: function(h) {
        return h(); // avoid warning message
    }
};
</script>
