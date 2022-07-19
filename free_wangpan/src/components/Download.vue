<template>
    <div id="Download">
        <p v-if="address===null">钱包未连接，请先通过MetaTask连接自己的钱包</p>
        <div v-if="paid===false&&address!== null">
            <p>Pay 1 ether to download file #{{downloadFileId}}</p>
            <b-button-group>
                <b-button v-if="address!==null"
                          variant="primary"
                          @click="downloadFile()">
                    Make payment and then 下载
                </b-button>
            </b-button-group>

<!--            <p v-if="address!==null">Connected wallet {{address[0]}}</p>-->
        </div>
        <div v-if="paid===true && cid!==null">
            <b-alert show variant="info">支付验证，从下面的URL中下载文件</b-alert>
            <ul>
                <li><a :href="'https://'+cid+'.ipfs.dweb.link'">https://{{ cid }}.ipfs.dweb.link</a></li>
            </ul>
        </div>

    </div>
</template>

<script>
    import Platform from '../../artifacts/contracts/platform.sol/platform.json'
    import { BigNumber,ethers } from 'ethers';
    export default {
        name: "Download",
        data(){
            return {
                address:null,
                paid:false,
                cid:null,
                downloadFileId:"",
                // isConnected:false
            }
        },
        methods:{
            async requestAccount(){
                //连接metamask
                var currentAccount = null;

                if(window.ethereum){
                    console.log("Metamask detected");
                }else{
                    console.log("Metamask not detected...");
                }

                currentAccount = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });
                this.address = currentAccount;
                console.log("CurrentAccount: " + currentAccount);
            },
            async downloadFile(){
                //智能合约地址
                const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
                //存储提供者
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                //获取签名
                const signer = provider.getSigner();

                try {
                    //得到智能合约
                    const contract =  new ethers.Contract(contractAddress,Platform.abi,signer);
                    //要求的代币
                    const options = {value: ethers.utils.parseEther("1.0")};

                    let tx = await contract.downloadFile(BigNumber.from(this.downloadFileId),options);
                    let rc = await tx.wait();
                    console.log("tx===="+ rc);
                    this.cid = rc.events[0].args["cid"]
                    console.log(this.cid);
                    console.log("合约执行成功！");
                    this.paid = true;

                }catch (e) {
                    this.$emit("update-error",true);
                    console.log("合约执行失败");
                }


            }
        },
        mounted() {
            this.address = this.$store.state.address;
            this.downloadFileId = this.$store.state.downloadFileId;

            // this.$bus.$on('update-downloadFileId',(result)=>{
            //     this.downloadFileId = result;
            //     console.log(result);
            // })
        }
    }
</script>

<style scoped>

</style>
