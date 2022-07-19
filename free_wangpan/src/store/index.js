import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        address:null,
        name:"",
        downloadFileId:"",
        fileId:null
    },
    mutations:{
        setAddress(state,result){
            state.address = result;
        },
        setName(state,result){
            state.name = result;
        },
        setDownloadId(state,result){
            state.downloadFileId = result;
        },
        setFileId(state,result){
            state.fileId = result;
        }
    }

})
export default store

