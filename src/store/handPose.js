import { defineStore } from "pinia"
const store = defineStore("handpose", {
    state: () => {
        return {
            handposes: []
        }
    },
    getters: {
        LATEST_POSE(){
            return this.handposes[0] || null
        }
    },
    actions:{
        receiveHandPose(pose){
            res.date = new Date().getTime();
            this.handposes.unshift({
                date,
                type: pose.type,
                value: pose.value
            });
        },
    },
    persist: false
})
export default store
