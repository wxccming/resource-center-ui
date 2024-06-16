import storage from "@/utils/storage"

export default {
    namespaced: true,
    state: {
      websocketData: storage.get('WEBSOCKET_DATA'),
    },
    mutations: {
      setWebsocketData (state, val) {
        storage.save('WEBSOCKET_DATA', val)
        state.websocketData = val
      },
    }
}
