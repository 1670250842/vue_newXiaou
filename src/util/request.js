import axios from 'axios'
import qs from 'qs'

// 响应拦截
axios.interceptors.response.use(res=>{
    console.log('=============请求的路径:'+res.config.url+'=======');
    console.log(res);
    return res
});


const baseUrl = '/api'
// 菜单管理
export const reqMenuAdd=(data)=>{
    return axios({
        url:baseUrl+'/api/menuadd',
        method:'post',
        data:data
    })
}

// 菜单列表渲染
export const reqMenuList=(data)=>{
    return axios({
        url:baseUrl+'/api/menulist',
        method:'get',
        params:data
    })
}
// 菜单列表渲染获取一条数据
export const reqMenuListOne=(data)=>{
    return axios({
        url:baseUrl+'/api/menuinfo',
        method:'get',
        params:data
    })
}
// 菜单编辑
export const reqMenuEdit=(data)=>{
    return axios({
        url:baseUrl+'/api/menuedit',
        method:'post',
        data:data
    })
}
// 删除
export const reqMenuDel=(data)=>{
    return axios({
        url:baseUrl+'/api/menudelete',
        method:'post',
        data:data
    })
}
// export const reqMenuDel=(data)=>{
//     return axios({
//         url:baseUrl+'/api/menudelete',
//         method:'post',
//         data:data
//     })
// }
// /////////////////////////角色管理//////////////////////////////////////////
// 提交数据
export const reqRoleAdd=(data)=>{
    return axios({
        url:baseUrl+'/api/roleadd',
        method:'post',
        data:data
    })
}

// 渲染数据
export const reqRoleList=()=>{
    return axios({
        url:baseUrl+'/api/rolelist',
        method:'get',
        
    })
}
// 删除一条数据
export const reqRoleDel=(id)=>{
    return axios({
        url:baseUrl+'/api/roledelete',
        method:'post',
        data:id
        
    })
}

// 编辑一条数据时，渲染当时的 数据
export const reqRoleListOne=(id)=>{
    return axios({
        url:baseUrl+'/api/roleinfo',
        method:'get',
        params:id
        
    })
}

// 点击修改，修改内容
/* export const reqRoleEdit=(id)=>{
    return axios({
        url:baseUrl+'/api/roleedit',
        method:'post',
        data:id
        
    })
} */
export const reqRoleEdit=(id)=>{
    return axios({
        url:baseUrl+'/api/roleedit',
        method:'post',
        data:id
    })
}
// /////////////////////////////////////////管理员管理///////////////////////////
// 添加数据
export const reqMangerAdd=(data)=>{
    return axios({
        url:baseUrl+'/api/useradd',
        method:'post',
        data:data
    })
}

// 渲染管理员列表
export const reqMangerList=(data)=>{
    return axios({
        url:baseUrl+'/api/userlist',
        method:'get',
        params:data
    })
}
// 获取列表格数
export const reqMangerCount=()=>{
    return axios({
        url:baseUrl+'/api/usercount',
        method:'get',
    })
}

// 获取一条数据
export const reqMangerListOne=(id)=>{
    return axios({
        url:baseUrl+'/api/userinfo',
        method:'get',
        params:id
        
    })
}

// 修改一条内容
export const reqMangerEdit=(id)=>{
    return axios({
        url:baseUrl+'/api/useredit',
        method:'post',
        data:id
    })
}

// 删除
export const reqMangerDel=(id)=>{
    return axios({
        url:baseUrl+'/api/userdelete',
        method:'post',
        data:id
        
    })
}

// ////////////////////////////////商品分类、、、、、、、、、、、、、、、、、、、
export const reqClassifyAdd=(data)=>{
    // 要用qs上传图片
    /*  // 由于上传的是文件 所以需要用qs转一下
     var form  = new FormData()
     // {pid:1,catename:'s',img,status}
     for(var i in data){
         form.append(i,data[i])
     } */
     var form = new FormData()
     for(var i in data){
        form.append(i,data[i])
    }
    return axios({
        url:baseUrl+'/api/cateadd',
        method:'post',
        data:form
    })
}

// 商品分类列表渲染
export const reqClassifyList=(data)=>{
    return axios({
        url:baseUrl+'/api/catelist',
        method:'get',
        params:data
    })
}

// 商品分类一条数据
export const reqClassifyListOne=(data)=>{
    return axios({
        url:baseUrl+'/api/cateinfo',
        method:'get',
        params:data
    })
}

// 修改一条数据
export const reqClassifyEdit=(data)=>{
    var form = new FormData()
    for(var i in data){
        form.append(i,data[i])
    }
    return axios({
        url:baseUrl+'/api/cateedit',
        method:'post',
        data:form
    })
}

// 删除一条数据
export const reqClassifyDel=(id)=>{
    return axios({
        url:baseUrl+'/api/catedelete',
        method:'post',
        data:id
        
    })
}
// ---------------------------------------商品规格---------------------
// 添加
export const reqSpecAdd=(data)=>{
   
    return axios({
        url:baseUrl+'/api/specsadd',
        method:'post',
        data:data
    })
}
// 请求数据总数
export const reqSpecListCount=()=>{
    return axios({
        url:baseUrl+'/api/specscount',
        method:'get',
    })
}
// 获取数据列表
export const reqSpecList=(data)=>{
    return axios({
        url:baseUrl+'/api/specslist',
        method:'get',
        params:data
    })
}
// 获取一条
export const reqSpecListOne=(id)=>{
    return axios({
        url:baseUrl+'/api/specsinfo',
        method:'get',
        params:id
        
    })
}
// 修改一条内容
export const reqSpecEdit=(id)=>{
    return axios({
        url:baseUrl+'/api/specsedit',
        method:'post',
        data:id
    })
}

// 删除
export const reqSpecDel=(id)=>{
    return axios({
        url:baseUrl+'/api/specsdelete',
        method:'post',
        data:id
        
    })
}
// --------------------------------------登录-------------------------------
// 登录
export const requrseLogin=(data)=>{
    return axios({
        url:baseUrl+'/api/userlogin',
        method:'post',
        data:data
        
    })
}
// ////////////////////////////////商品分类、、、、、、、、、、、、、、、、、、、
export const reqGoodsAdd=(data)=>{
    // 要用qs上传图片
    /*  // 由于上传的是文件 所以需要用qs转一下
     var form  = new FormData()
     // {pid:1,catename:'s',img,status}
     for(var i in data){
         form.append(i,data[i])
     } */
     var form = new FormData()
     for(var i in data){
        form.append(i,data[i])
    }
    return axios({
        url:baseUrl+'/api/goodsadd',
        method:'post',
        data:form
    })
}

// 获取列表格数
export const reqGoodsCount=()=>{
    return axios({
        url:baseUrl+'/api/goodscount',
        method:'get',
    })
}

// 商品分类列表渲染
export const reqGoodsList=(data)=>{
    return axios({
        url:baseUrl+'/api/goodslist',
        method:'get',
        params:data
    })
}

// 商品分类一条数据
export const reqGoodsListOne=(data)=>{
    return axios({
        url:baseUrl+'/api/goodsinfo',
        method:'get',
        params:data
    })
}

// 修改一条数据
export const reqGoodsEdit=(data)=>{
    var form = new FormData()
    for(var i in data){
        form.append(i,data[i])
    }
    return axios({
        url:baseUrl+'/api/goodsedit',
        method:'post',
        data:form
    })
}

// 删除一条数据
export const reqGoodsDel=(id)=>{
    return axios({
        url:baseUrl+'/api/goodsdelete',
        method:'post',
        data:id
        
    })
}

// ---------------------------------会员---------------------
export const reqVipList=()=>{
    return axios({
        url:baseUrl+'/api/memberlist',
        method:'get',
    })
}

// 获取一条数据
export const reqVipListOne=(data)=>{
    return axios({
        url:baseUrl+'/api/memberinfo',
        method:'get',
        params:data
    })
}
// 修改一条数据
export const reqVipEdit=(data)=>{
    return axios({
        url:baseUrl+'/api/memberedit',
        method:'post',
        data:data
    })
}

// -----------------------------轮拨图-------------------------
export const reqBannerAdd=(data)=>{
    var form =  new FormData()
    for(var i in data){
        form.append(i,data[i])
    }


//     var form = new FormData()
//     for(var i in data){
//        form.append(i,data[i])
//    }
    return axios({
        url:baseUrl+'/api/banneradd',
        method:'post',
        data:form
    })
}

// 获取列表
export const lunbolist=()=>{
    return axios({
        url:baseUrl+'/api/bannerlist',
        method:'get',
    })
}

// 获取一条数据
export const reqBannerListOne=(data)=>{
    return axios({
        url:baseUrl+'/api/bannerinfo',
        method:'get',
        params:data
    })
}

// 修改一条数据
export const reqBannerEdit=(data)=>{
    var form = new FormData()
    for(var i in data){
        form.append(i,data[i])
    }
    return axios({
        url:baseUrl+'/api/banneredit',
        method:'post',
        data:form
    })
}
// 删除
export const reqBannerDel=(id)=>{
    return axios({
        url:baseUrl+'/api/bannerdelete',
        method:'post',
        data:id
        
    })
}


// ---------------------------------秒杀-------------------------------
export const reqSeckillAdd=(data)=>{
    return axios({
        url:baseUrl+'/api/seckadd',
        method:'post',
        data:data
    })
}

export const reqSeckillList=()=>{
    return axios({
        url:baseUrl+'/api/secklist',
        method:'get',
    })
}

// 获取一条数据
export const reqSeckillListOne=(id)=>{
    return axios({
        url:baseUrl+'/api/seckinfo',
        method:'get',
        params:id
    })
}

// 修改一条数据
export const reqSeckillEdit=(data)=>{
    return axios({
        url:baseUrl+'/api/seckedit',
        method:'post',
        data:data
    })
}

// 删除
export const reqSeckillDel=(id)=>{
    return axios({
        url:baseUrl+'/api/seckdelete',
        method:'post',
        data:id
        
    })
}
