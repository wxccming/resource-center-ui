
export default {
    namespaced: true,
    state: {
        treeNode: {},
    },
    getters: {
        getTreeNode(state) {
            return state.treeNode;
        },
    },
    mutations: {
        setTreeNode(state, node) {
            console.log("node----",node)
            state.treeNode = node;
        },
    },
}
