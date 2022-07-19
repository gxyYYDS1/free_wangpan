import Vue from 'vue'
import App from './App.vue'
// eslint-disable-next-line no-unused-vars
import { BootstrapVue } from "bootstrap-vue"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.css'
// eslint-disable-next-line no-unused-vars
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
import VueRouter from'vue-router';
import router from "./router";

import store from './store'
Vue.config.productionTip = false
// Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(iView)


const bus = new Vue()
Vue.prototype.$bus = bus;
router.beforeEach((to,from,next) =>{
    if(store.state.address===null){
      alert("请先登录钱包！")
      next(false);
    }else {
      next();
    }
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
