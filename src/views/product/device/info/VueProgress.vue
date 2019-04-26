<template>
    <canvas class="canvas" :width="width" :height="height"></canvas>
</template>

<script>
export default {
    name: "VueProgress",
    props: {
        progress: {
            type: Number,
            required: true,
            default: 0
        },
        width: {
            type: Number,
            required: false,
            default: 100
        },
        height: {
            type: Number,
            required: false,
            default: 100
        }
    },
    data() {
        return {
            speed: 0,
            el: ""
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.el = this.$el;
            window.requestAnimationFrame(this.loading);
        });
    },
    watch: {
        progress() {
            this.el = this.$el;
            window.requestAnimationFrame(this.loading);
        }
    },
    methods: {
        loading() {
            let ctx = this.el.getContext("2d");
            ctx.save();
            ctx.clearRect(0, 0, this.width, this.height);
            let centerX = this.el.width / 2;
            let centerY = this.el.height / 2;
            let newRadius = (Math.PI * 2) / 100;
            let radius = centerX - ctx.lineWidth;
            ctx.save();
            /* 绘制外圈 */

            ctx.beginPath();

            ctx.lineWidth = 2;
            ctx.strokeStyle = "#eef7e4";
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
            ctx.stroke();
            ctx.closePath();
            ctx.restore();

            ctx.save();
            /* 绘制文字 */
            let fontSize = 20;
            ctx.beginPath();
            ctx.fillStyle = "#4499ff";
            ctx.font = fontSize + "px sans-serif";
            let textWidth = ctx.measureText(this.speed.toFixed(0) + "%").width;
            ctx.fillText(
                this.speed.toFixed(0) + "%",
                centerX - textWidth / 2,
                centerY + fontSize / 2
            );
            ctx.restore();
            ctx.save();
            /* 绘制运动外圈 */
            ctx.beginPath();
            ctx.strokeStyle = "#49f";
            ctx.lineWidth = 2;
            ctx.arc(
                centerX,
                centerY,
                radius,
                -Math.PI / 2,
                -Math.PI / 2 + this.speed * newRadius,
                false
            );
            ctx.stroke();
            ctx.closePath();
            ctx.restore();

            if (this.speed >= this.progress) {
                this.speed = 0;
                return;
            }
            this.speed += 1;
            window.requestAnimationFrame(this.loading);
        }
    }
};
</script>

<style lang='less' scoped>
</style>