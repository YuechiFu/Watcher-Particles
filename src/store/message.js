import { defineStore } from "pinia"
const store = defineStore("messages", {
    state: () => {
        return {
            ws: '',
            messages: []
        }
    },
    getters: {
        LATEST_MSG(){
            return this.messages[0] || null
        }
    },
    actions:{
        receiveMsg(res){
            res.date = new Date().getTime();
            if(res.img){
                res.img = `data:image/jpeg;base64,${res.img}`
            }
            this.messages.unshift(res);
        },
        setHistoryWs(val){
            this.ws = val
        }
    },
    persist: {
        paths: ["messages", "ws"]
    }
})
export default store
