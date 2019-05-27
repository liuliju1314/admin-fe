import { getDeviceList } from "@/api/device/device";
export default {
    data() {
        return {
            total: "",
            form: {
                pid: '',
            },
            deviceList: ''
        }
    },

    created() {
        this.getDevice();
    },
    watch: {
        $route() {
            if (
                this.$route.path.indexOf("device") >= 0 &&
                !this.$route.params.did
            ) {
                this.form.pid = this.$route.params.id;
            }
        }
    },
    methods: {
        getDevice() {
            this.form.pid = this.$route.params.id;
            if (
                this.form.pid &&
                this.$route.path.indexOf("device") >= 0
            ) {
                getDeviceList(this.form)
                    .then(res => {
                        this.deviceList = res.payload;
                        this.total = res.payload.total;
                    })
                    .catch(error => {
                        return error;
                    });
            }

        },

    },
}