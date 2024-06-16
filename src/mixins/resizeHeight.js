import {throttle} from "@/tool/tool";
import {mapMutations} from "vuex";

export default {
    mounted() {
        this.$nextTick(() => this.tableCot());

        window.addEventListener("resize", this.tableCotDebounce);
    },
    destroyed() {
        window.removeEventListener("resize", this.tableCotDebounce);
    },
    methods: {
        ...mapMutations('theme', ['setInnerHW']),
        tableCot() {
            // 监听window的高度
            this.setInnerHW({height: window.innerHeight, width: window.innerWidth});
        },
        tableCotDebounce: throttle(function () {
            this.tableCot();
        }, 300)
    }
}
