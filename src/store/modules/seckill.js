import Vue from 'vue'
import Vuex from 'vuex'
import {reqSeckillList} from '../../util/request'
Vue.use(Vuex)

const state = {
    list:[]
}

const mutations = {
    getList(state,arr){
        state.list = arr
    }
}

const actions = {
    requestSeckillList(context){
        reqSeckillList().then(res=>{
            context.commit('getList',res.data.list)
        })
    }
}

const getters ={
    list(state){
        return state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}
