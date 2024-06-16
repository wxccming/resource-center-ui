import Vue from "vue";
import storage from "@/utils/storage"

/**
 * 按钮权限
 */
const hasPermission = {
    install (Vue) {
        Vue.directive('hasPermission', {
            bind (el, binding, vnode) {
                // console.log(binding.value)
                let permissions =storage.get('userPermission')
                let {value} = binding
                if(!value)return
                let flag = true
                if (!permissions || !permissions.includes(value)) {
                    flag = false
                }
                if (!flag) {
                    if (!el.parentNode) {
                        el.style.display = 'none'
                    } else {
                        el.parentNode.removeChild(el)
                    }
                }
            }
        })
    }
}

export default hasPermission;

Vue.use(hasPermission);

