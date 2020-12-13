import Vue from 'vue'
import Vuex from 'vuex'
import menu from './modules/menu'
import role from './modules/role'
import manger from './modules/manger'
import classify from './modules/classify'
import spec from './modules/spec'
import urse from './modules/urse'
import goods from './modules/goods'
import vip from './modules/vip'
import banner from './modules/banner'
import seckill from './modules/seckill'
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        menu,
        role,
        manger,
        classify,
        spec,
        urse,
        goods,
        vip,
        banner,
        seckill
    }
})