import Vue from "vue";

/**
 * 防止重复提交指令
 */
const preventReClick = {
    install: (Vue, options) => {
        Vue.directive("preventReClick", {
            inserted: (el, binding) => {
                el.addEventListener("click", () => {
                    if (!el.disabled) {
                        el.disabled = true;
                        // 传入绑定值就使用，默认3000毫秒内不可重复点击
                        setTimeout(() => (el.disabled = false), binding.value || 3000);
                    }
                });
            },
        });
    },
};

export default preventReClick;

Vue.use(preventReClick);

