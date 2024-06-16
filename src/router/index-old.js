// import Vue from 'vue'
// import Router from 'vue-router'
// Vue.use(Router)


// const router = new Router({
//     routes: [
//         {
//             path: "/",
//             component: () => import('@/views/login/login.vue') 
          
//         },
//         {
//             path: "/home",
//             name: "home",
//             component: () => import('@/views/home/HomeView.vue') 
//         },
//         {
//             path: "/management",
//             name: "management",
//             component: () => import('@/views/management/managementview.vue') 
//         }
      
       
//     ]
// })
// export default router



// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import storage from "@/utils/storage";
// import HeaderLayout from "@/views/common/HeaderLayout"
// import NavLayout from "@/views/common/NavLayout"
// const RouteView = {
//     name: 'RouteView',
//     render: h => h('router-view')
// };

// Vue.use(VueRouter)




// // 处理动态引入组件函数
// const getComponent = (data) => {
//     data.map((item) => {
//         item.props = true
//         item.meta = {
//             title: item.title,
//             menuNavShow: item.navShow
//         }
//         const com = item.component
//         if (com) {
//             switch (com) {
//                 case 'HeaderLayout':
//                     item.component = HeaderLayout
//                     break
//                 case 'NavLayout':
//                     item.component = NavLayout
//                     break
//                 case 'RouteView':
//                     item.component = RouteView
//                     break
//                 default: {
//                     item.component = () => import('@/views/' + com + '.vue')
//                 }
//             }
//             item.redirect= item.children && item.children.length ? item.children[0].path : null
//             // 利用递归，处理多级路由
//             if (item.children && item.children.length) {
//                 getComponent(item.children)
//             }
//         }
//     })
//     return data
// }


// // 处理动态引入组件函数
// const getRouter = (data) => {
//     data.forEach((item) => {
//         let currenRoutes = router.options.routes;
//         let has = currenRoutes.some((it) => it.path == item.path);
//         if (!has) {
//             router.addRoute({
//                 path: `${item.path}`,
//                 name: item.name,
//                 meta: {
//                     title: item.title,
//                     menuNavShow: item.navShow
//                 },
//                 // redirect:item.redirect?item.redirect:null,
//                 redirect: item.children && item.children.length ? item.children[0].path : null,
//                 component: item.component,
//                 children: item.children ? item.children : [],
//             });
//         }
//     })
// }

// let constRouter = [
//     {
//         path: '/login',
//         name: 'login',
//         component: () => import('@/views/login/login.vue')
//     }
// ]

// let router = new VueRouter({
//     routes: constRouter
// })

// let hasRoute

// async function handleRoutes(menuList) {
//     let initialRouter = [
//         {
//             name: "login",
//             path: "/login",
//             component: "login/login",
//             title: "登录"
//         },
//         {
//             name: "system",
//             path: "/",
//             component: "HeaderLayout",
//             redirect: menuList[0].path,
//             children: menuList
//         },
//         {
//             path: '*',
//             component: '404'
//         }
//     ]
//     let routerData = getComponent(initialRouter)
//     console.log('routerData', routerData)
//     await getRouter(routerData)
//     hasRoute = initialRouter
//     console.log('getRouter(constRouter)', router.getRoutes())
// }

// // 导航守卫，渲染动态路由
// router.beforeEach(async (to, from, next) => {
//     let userRouter = storage.get('menuList')
//     console.log("to---", to)
//     if (to.path == '/login') {
//         hasRoute = null
//         // router.matcher = new VueRouter().matcher
//         // router.addRoutes(constRouter);
//         storage.clear()
//         //如果是登录页面,就停留登录页,不在重复跳转
//         next();
//         return
//     }
//     if (userRouter) {
//         // 已登录
//         if (!hasRoute) {
//             await handleRoutes(userRouter)
//             next({...to, replace: true})
//         } else {
//             next();
//         }
//     } else {
//         next('/login');
//     }
// })


// // 获取原型对象push函数
// const originalPush = VueRouter.prototype.push

// // 获取原型对象replace函数
// const originalReplace = VueRouter.prototype.replace

// // 修改原型对象中的push函数
// VueRouter.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }

// // 修改原型对象中的replace函数
// VueRouter.prototype.replace = function replace(location) {
//     return originalReplace.call(this, location).catch(err => err)
// }


// export default router
