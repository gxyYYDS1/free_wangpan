<template>
    <Button @click="getDataInContract()">得到数据</Button>
</template>

<script>
    import {Web3Storage} from 'web3.storage';
    import Platform from '../../artifacts/contracts/platform.sol/platform.json'
    import { BigNumber,ethers } from 'ethers';
    export default {
        name: "TestFunciton",
        data(){
            return {
                fileId:null,
                downloaders:[],
                readme:"",
            }
        },
        methods:{
            async getDataInContract(){
                // console.log(files);
                //web3.storage的客户端
                // const client = new Web3Storage({token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGM3OWIyMkIyYzE1M2E3MWI2Yzc2OTY1NjgyNzEzZDBlNzZGMmY5NDIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTc0NjE2MDU2MjUsIm5hbWUiOiJkZW1vMSJ9.a4zd984gVtjotIr7wCVZNhc3s5TUzVAFACpLmBPNtfU"})
                //智能合约地址
                const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
                //存储提供者
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                //获取签名
                const signer = provider.getSigner();

                try {
                    //智能合约
                    const contract =  new ethers.Contract(contractAddress,Platform.abi,signer);
                    //要求的代币
                    console.log( contract);
                    // const options = {value: ethers.utils.parseEther("1")};


                    try {
                        let tx = await contract.getFileId();
                        console.log(tx);
                        let rc = await tx.wait();
                        let BigNumberFileIdHex = rc.events[0].args["fileId"]._hex;
                        // let tx = await contract.uploadFile(rootCid,options);

                        // let rc = await tx.wait();
                        //????
                        // let BigNumberFileIdHex = rc.events[0].args["fileId"]._hex;
                        // console.log("事件为===== " + rc.events[0]);
                        //组成下载的url
                        this.fileId = BigNumber.from(BigNumberFileIdHex).toNumber();
                        // console.log()
                        console.log(tx);
                        // console.log("rc:");
                        console.log(rc);
                        console.log(BigNumberFileIdHex);
                        console.log("fileId:  " + this.fileId);

                        // this.sending = false;
                        // // this.$emit("update-fileid",this.fileId);
                        // // this.$emit("update-cids",[rootCid]);
                        // console.log("智能合约执行成功！");
                        // console.log("https://localhost:8080/download/"+this.fileId);
                        // console.log("Successfully sent to IPFS");
                        // console.log("rootCid : " + [rootCid]);
                        // alert("文件成功传送到IPFS!");
                        // // this.$bus.$emit('update-downloadFileId',this.fileId);
                        // //    发送 下载ID
                        // this.$store.commit('setDownloadId',this.fileId);


                    }catch (e) {
                        console.log(e);
                        console.log("Failed to send files ....");
                    }

                }catch (e) {
                    console.log("智能合约执行失败！");
                }

            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
