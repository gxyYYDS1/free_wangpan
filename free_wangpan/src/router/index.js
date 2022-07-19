import App from "@/App";
import VueRouter from "vue-router";
import PageTest from "@/components/PageTest"
import Test from "@/components/Test"

import FileDownLoader from "@/components/FileDownLoader";
import FileUpLoader from "@/components/FileUpLoader";
import Home from "@/components/Home"
import Vue from 'vue'
// import Download from "@/components/Download";
import DownLog from "@/components/DownLog";
import TestFunciton from "@/components/TestFunciton";
//
// const routes = [
//     {
//         path: "/",
//         component: App,
//         props:(route) => ({
//             name: route.query.name
//         })
//     },
//     {
//         path:"/test",
//         component: Test
//     }
// ]
// const router = new VueRouter({
//     routes,
// })
Vue.use(VueRouter)
export default  new VueRouter({
    routes:[
        {
            path: "*",
            redirect: '/fileUp'
        },
        {
            path: "/page",
            component: PageTest,
            props:(route) => ({
                name: route.query.name
            })
        },
        {
            path:"/index",
            component: App
        },
        {
            path:"/test",
            component: Test
        },
        {
            path:"/fileUp",
            component: FileUpLoader
        },

        {
            path: "/downloadFile",
            component: FileDownLoader
        },
        {
            path: "/download",
            component: DownLog
        },

        {
            path:"/home",
            component: Home
        },
        {
            path:"/getdata",
            component: TestFunciton
        }

    ]
})
