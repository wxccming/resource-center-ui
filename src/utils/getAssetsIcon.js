/**
 * 获取本地图片
 * @param name  //图片名称
 * @return {* | string}
 * */

export const getAssetsIcon = (name)=> {
    // console.log('name',name)
    return name?require('@/assets/img/'+name):''
}
