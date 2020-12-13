import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {reqGoodsList,reqGoodsCount} from '../../util/request'

const state ={
     list:[],
     page: 1,
    size: 3,
    totalSJ: null,
}


const mutations={
    getList(state,arr){
        state.list=arr
    },
    getListTotalSJ(state,totalSJ){
        state.totalSJ = totalSJ
    },
    getListPage(state,page){
        state.page = page
    }
}

const actions={
    requestGoodsList(context){
        reqGoodsList({page:context.state.page,size:context.state.size}).then(res=>{
            context.commit('getList',res.data.list)
        })
    },
    requstGoodsListCount(context,){
        reqGoodsCount().then(res=>{
            context.commit('getListTotalSJ',res.data.list[0].total)
        })
    },
    // 修改内容
    requstGoodsPage(context,page){
        context.commit('getListPage',page)
        context.dispatch('requestGoodsList')
    }
}

const getters={
    list(state){
        return state.list
    },
    totalSJ(state){
        return state.totalSJ
    },
    page(state){
        return state.page
    },
    size(state){
        return state.size
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}