<template>

        <div style="z-index: -1">
                <Menu mode="horizontal" :theme="theme3" active-name="1">
                    <Menu-item name="1" to="/fileUp">
                        <Icon type="ios-paper"></Icon>
                        上传页面
                    </Menu-item>
                    <Menu-item name="2" to="/download">
                        <Icon type="ios-people"></Icon>
                        下载页面
                    </Menu-item>
                    <Menu-item name="4" to="/home">
                        <Icon type="settings"></Icon>
                        个人信息管理
                    </Menu-item>

                    <div style="margin-right: 20px">
                        <div v-if="address===null" style="z-index: auto;color: skyblue">钱包账户未登录</div>
                        <div v-if="address!==null" style="z-index: auto;color: skyblue">钱包账户为:{{name.substr(0,5) + '...'+name.substr(name.length-2,name.length)}}</div>
                        <Button v-if="address===null" type="primary" style="margin-top: 15px;" @click="requestAccount()">登录</Button>
                    </div>
                </Menu>
        </div>
</template>

<script>
    export default {
        name: "MenuTest",
        data(){
            return{
                theme3: 'light',//导航主题
                name:"",
                address:null,
                // isConnected:false,
            }

        },
        methods:{
            async requestAccount(){

                //连接metamask
                var currentAccount = null;

                if(window.ethereum){
                    console.log("Metamask detected");
                    currentAccount = await window.ethereum.request({ method: 'eth_requestAccounts'});
                    console.log(currentAccount);
                    this.address = currentAccount;
                    this.name = currentAccount.toString();
                    // this.isConnected = true;
                    //向兄弟组件传送数据
                    // this.$bus.$emit('update-address',this.address);
                    // this.$bus.$emit('update-isConnected',this.isConnected);
                    this.$store.commit('setName',this.name);
                    this.$store.commit('setAddress',this.address);
                    console.log("CurrentAccount: " + currentAccount);
                }else{
                    console.log("Metamask not detected...");
                }
            },
            fn(){
                window.ethereum.on("accountsChanged", (accounts) =>{
                    console.log(accounts[0]);//一旦切换账号这里就会执行
                    console.log(this);
                    this.name = accounts[0];
                    this.address = accounts;
                    alert("切换钱包成功！")
                    // window.location.reload();
                });
            }

        },
        mounted() {
            // this.$bus.$emit('update-address',this.address);
            this.name = this.$store.state.name;
            this.address = this.$store.state.address;
            // this.$store.commit('setAddress',this.address);

            this.fn();

        }
    }
</script>

<style scoped>
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .layout-text{
        display: none;
    }
</style>
