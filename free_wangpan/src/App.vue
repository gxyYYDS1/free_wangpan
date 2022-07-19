<template>
    <div>
       <MenuTest ></MenuTest>
        <router-view></router-view>
<!--       <FileUpLoader :address></FileUpLoader> -->
<!--       <PageTest :address="address"></PageTest>-->
    </div>

</template>

<script>

import MenuTest from "./components/MenuTest";
import store from "@/store";

export default {
          name: 'App',
          components: {
            MenuTest
          },
          data(){
             return {
                address:null,
             }
          },
            methods:{
              fn(){
                  window.ethereum.on("accountsChanged", (accounts) =>{
                      console.log(accounts[0]);//一旦切换账号这里就会执行
                      console.log(this);
                      this.$store.commit('setName',accounts[0]);
                      this.$store.commit('setAddress',accounts);
                      console.log("address:" + this.$store.state.address);
                      // window.location.reload();
                  });
              }

            },
          mounted(){
              this.fn();
          }


}
</script>

<style scoped>

</style>
