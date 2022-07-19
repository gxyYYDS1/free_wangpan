<template>
    <Row>
        <Col span="20">
            <Card>
                <p slot="title">账户信息</p>
                <p>账户名称: {{name}}</p>
                <p>账户余额: {{balance}}</p>
                <Button type="primary" @click="getBalance" v-if="isOpen===false">获取账户余额</Button>
                <Button type="primary" @click="resetBalance" v-if="isOpen===true">隐藏账户余额</Button>

            </Card>
        </Col>
    </Row>
</template>

<script>
    import {BigNumber, ethers} from "ethers";

    export default {
        name: "Home",
        data(){
            return{
                name:null,
                balance:"*****",
                isOpen:false,
            }
        },
        mounted() {
            this.name = this.$store.state.name;
            // console.log(typeof (this.address.length));
        },
        methods:{
            async getBalance(){
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                console.log(provider);
                const balance = await provider.getBalance((await provider.listAccounts()).toString());
                console.log(balance);
                console.log(ethers.utils.formatEther(balance));
                this.balance = ethers.utils.formatEther(balance) +" ETH"
                this.isOpen = true;
            },
            resetBalance(){
                this.isOpen = false;
                this.balance = "******";
            }
        }
    }
</script>

<style scoped>

</style>
