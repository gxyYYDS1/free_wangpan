<template>

  <div id="app">

<!--      <Index></Index>-->
<!--      <router-view></router-view>-->
<!--      <br>-->
    <b-container>
        <b-card
          id="uploaderCard"
          style="max-width: 30rem;"
          padiing="40">
<!--          <b-card-img src="src/assets/test.jpg"  alt="这是一个logo"/>-->
            <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp09%2F210F2130512J47-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660107219&t=4ce9ff517e7c1e2eabf47edee5f5836c"
                style="max-width: 50px;max-height: 50px"/>
          <b-card-title>Welcome transfer in the Web 3.0</b-card-title>
          <FileUpLoader v-if="
                          error===false &&
                          cids.length===0 &&
                          sending===false &&
                          downloadFileId === undefined"
                        @update-cids="updateCids" @update-error="updateError" @update-fileid="updateFileId"
          />
          <Success
                v-if="cids.length!=0 "
                @update-cids="updateCids"
                :fileId="fileId"
          />
          <Error
                v-if="error===true"
                @update-error="updateError"
          />
          <FileDownLoader
                v-if="error===false &&
                      downloadFileId!==undefined"
                :downloadFileId="downloadFileId"
                @update-error="updateError"
          />
        </b-card>
    </b-container>
  </div>
</template>

<script>

// import HelloWorld from './components/HelloWorld.vue'
import Error from './Error'
import Success from './Success'
import FileUpLoader from './FileUpLoader'
import FileDownLoader from './FileDownLoader'


export default {
          name: 'App',
          components: {
            Error,
            Success,
            FileDownLoader,
            FileUpLoader,
          },
          mounted() {
            this.downloadFileId = this.$route.query.downloadfileid;
            console.log(this.$route.query.downloadfileid);
            this.fn();
          },
          data(){
            return {
              cids: [],
              //文件ID
              fileId:null,
              //是否出错
              error: false,
            //  是否存储中
              sending: false,
            //  下载文件ID
              downloadFileId:null,
              isConnected:false
            }
          },
          methods:{

                change(){
                  console.log(11111);
                },
                updateCids(result){
                  this.cids = result;
                },
                updateError(result){
                  this.error = result;
                },
                updateFileId(result){
                  this.fileId = result;
                },
              fn(){
                  window.ethereum.on("accountsChanged", function(accounts) {
                      alert("切换钱包成功")
                      console.log("11111=" + accounts[0]);//一旦切换账号这里就会执行
                      // let provider = new window.ethereum.providers.Web3Provider(web3.currentProvider);
                      // console.log("alala===" + provider._getAddress( accounts[0])[Symbol.toStringTag]);
                      // console.log("账户余额为=" + window.ethereum.getAccount().getBalance().toNumber() );
                      // window.location.reload();
                  });

              }
          }

}
</script>

<style>

</style>
