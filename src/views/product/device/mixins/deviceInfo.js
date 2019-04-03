import { getDeviceList } from "@/api/device/device";
export default {
    data() {
        return {
            form: {
                page: 1,
                pageSize: 10,
                pid: "",
                status: "0",
                isPage: true
            },
            count: "",
            online: "",
            offline: "",
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
        getDevice() {
            getDeviceList(this.form)
                .then(res => {
                    this.deviceList = res.payload.items;
                    this.count = res.payload.total;
                    this.online = res.payload.online;
                    this.offline = res.payload.offline;
                })
                .catch(error => {
                    return error;
                });
        },
    },
}