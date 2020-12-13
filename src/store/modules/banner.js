import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {lunbolist} from '../../util/request'

const state ={
     list:[]
}

const mutations = {
    getBannerList(state,arr){
        state.list=arr
    }
}

const actions = {
    requestBannerList(context){
        lunbolist().then(res=>{
            context.commit('getBannerList',res.data.list)
        })
    }
}

const getters = {
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