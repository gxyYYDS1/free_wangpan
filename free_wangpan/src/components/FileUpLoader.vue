<template>
    <div id="FileUpLoader">
        <p v-if="address===null">钱包未连接，请先通过MetaTask连接自己的钱包</p>
        <b-form-file
            v-model="files"
            v-if="address!==null"
            :state="Boolean(files)"
            placeholder="Choose a file or drop it here...."
            :multiple="true">
        </b-form-file>
        <br>
        <br>
<!--        <span>文件简介</span>-->
        <Input v-model="readme" type="textarea" :rows="4" style="width: 300px;margin-left: 100px" placeholder="请输入文件简介"></Input>

<!--        <p v-if="address===null">Make 1 ether payment to upload file !</p>-->
        <br/>
        <br/>

        <b-button-group v-if="sending===false" style="margin-left: 100px">
<!--            <b-button @click="getBalance()">获得钱包余额</b-button>-->
<!--            <b-button-->
<!--                v-if="address===null"-->
<!--                variant="secondary"-->
<!--                @click="requestAccount()"-->
<!--            >-->
<!--                Connect My wallet!-->
<!--            </b-button>-->
            <b-button
                    v-if="address!==null&&sending===false"
                    variant="primary"
                    @click="upLoadFile(files)"
            >
                Upload vid IPFS !
            </b-button>

        </b-button-group>
<!--        <div v-if="sending===true">-->
<!--            <b-spinner label="Spinning"></b-spinner>-->
<!--            <b-card-text>Sending to IPFS</b-card-text>-->
<!--        </div>-->
<!--        <p v-if="address!==null && sending === false">当前连接的钱包为: {{address[0]}}</p>-->
        <div class="flex_div" v-if="sending===true">
            <div class="animation_div">加载中</div>
        </div>
        <br>
        <br>
        <hr>
        <toDoList :tableData="tableData"></toDoList>
<!--        <toDoList ></toDoList>-->
    </div>
</template>

<script>
    import {Web3Storage} from 'web3.storage';
    import Platform from '../../artifacts/contracts/platform.sol/platform.json'
    import { BigNumber,ethers } from 'ethers';
    import toDoList from "@/components/toDoList";
    export default {
        name: "FileUpLoader",
        components:{
          toDoList,
        },
        data(){
          return{
              files:null,
              sending:false,
              address:null,
              fileId:null,
              readme:"",
              tableData:[],
          }
        },
        methods:{

            getTableData(num){
                let arr = new Array();
                for(let i = 11 ;i <= num ;i++){
                    let obj = JSON.parse(localStorage.getItem("file_"+i));
                    arr.push(obj);
                }
                this.tableData = arr;
                console.log(arr);
            },
            async upLoadFile(files){
                console.log(files);
                //设置token
                const client = new Web3Storage({token:"***********"})
                const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
                //存储提供者
                const provider = new ethers.providers.Web3Provider(window.ethereum);

                //获取签名
                const signer = provider.getSigner();

                try {
                    //智能合约
                    const contract =  new ethers.Contract(contractAddress,Platform.abi,signer);
                        //要求的代币
                        const options = {value: ethers.utils.parseEther("1")};
                        let rootCid = "";
                        try {
                            this.sending = true;
                            //返回值为 Cid
                            rootCid = await client.put(files);
                            console.log("合同为:" + contract.toString());
                            console.log(rootCid);
                            let str = "11111";
                            let tx = await contract.uploadFile(rootCid,this.readme,options);
                            // let tx = await contract.methods.uploadFile(rootCid,str,options);
                            console.log(tx);
                            let rc = await tx.wait();
                            //????
                            let BigNumberFileIdHex = rc.events[0].args["fileId"]._hex;
                            let readMe = rc.events[0].args["readme"];
                            console.log(readMe);
                            console.log("事件为===== " + rc.events[0]);
                            //组成下载的url
                            this.fileId = BigNumber.from(BigNumberFileIdHex).toNumber();
                            console.log(tx);
                            console.log("rc:");
                        console.log(rc);
                        console.log(BigNumberFileIdHex);
                        console.log("fileId:  " + this.fileId);
                        //保存在本地存储
                        localStorage.setItem("sumList",this.fileId);
                        localStorage.setItem("file_"+this.fileId, JSON.stringify({
                            id:this.fileId,
                            readMe:readMe,
                            url:"https://"+rootCid+".ipfs.dweb.link",
                            isDownloaded:false
                        }));
                        let obj = JSON.parse(localStorage.getItem("file_"+this.fileId));
                        //更新表格
                         this.getTableData(this.fileId);
                        console.log("本地存储=="+obj.id);
                        // localStorage.setItem("file_"+this.fileId +"ReadMe",readMe);
                        this.sending = false;
                        // this.$emit("update-fileid",this.fileId);
                        // this.$emit("update-cids",[rootCid]);
                        console.log("智能合约执行成功！");
                        console.log("https://localhost:8080/download/"+this.fileId);
                        console.log("Successfully sent to IPFS");
                        console.log("rootCid : " + [rootCid]);
                        alert("文件成功传送到IPFS!");
                        // this.$bus.$emit('update-downloadFileId',this.fileId);
                        //    保存当前文件ID
                        this.$store.commit('setFileId',this.fileId);
                        this.files =  null;


                    }catch (e) {
                        this.sending = false;
                        // this.$emit("update-error",true);
                            console.log(e);
                        console.log("Failed to send files ....");
                    }

                }catch (e) {
                    // this.$emit("update-error",true);
                    console.log("智能合约执行失败！");
                }

            }
        },
        mounted() {
            this.getTableData(localStorage.getItem("sumList"))
            this.address = this.$store.state.address;
            // console.log(this);
            console.log("进入FileUP组件");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log(provider);
            // console.log(provider.listenerCount());
            provider.on("FileIdCreated",(result)=>{
                console.log(BigNumber.from(result._hex).toNumber());
            })
            // const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
            // //存储提供者
            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            // //获取签名
            // const signer = provider.getSigner();
            // const contract =  new ethers.Contract(contractAddress,Demo1.abi,signer);
            //
            // console.log(this.address);
        },

    }
</script>

<style scoped>
    .flex_div{
        margin: 0;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .animation_div{
        position: relative;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        box-sizing: border-box;
        /* background: #ffff00; */
        line-height: 80px;
        text-align: center;
    }

    .animation_div::before {
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        content: "";
        width: 80px;
        height: 80px;
        border-width: 1px;
        border-style: solid;
        border-color: #00ffff transparent transparent transparent;
        box-sizing: content-box;
        animation: trotate 1.5s linear infinite;
        border-radius: 50%;
        z-index: 2;
    }
    .animation_div::after {
        position: absolute;
        left: -3px;
        top: -3px;
        display: block;
        content: "";
        width: 86px;
        height: 86px;
        border-width: 1px;
        border-style: solid;
        border-color: #ff0000 transparent transparent transparent;
        box-sizing: content-box;
        animation: trotate 1s linear infinite;
        border-radius: 50%;
        z-index: 1;
    }
    @keyframes trotate {
        0%{
            transform: rotate(0);
        }
        25%{
            transform: rotate(90deg);
        }
        50%{
            transform: rotate(180deg);
        }
        75%{
            transform: rotate(270deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }

</style>
