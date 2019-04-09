import { getDeviceList } from "@/api/device/device";
export default {
    data() {
        return {
            form: {
                pid: '',

            },
            deviceList: ''
        }
    },

    created() {
        this.getDevice();
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
                    })
                    .catch(error => {
                        return error;
                    });
            }

        },
    },
}