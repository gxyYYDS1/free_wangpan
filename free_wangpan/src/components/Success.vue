<template>
    <div>
        <b-card-text>
            <b-alert show variant="info">文件成功传送到IPFS</b-alert>
            <ul>
                <li><a :href="'http://localhost:8080/#/?downloadfileid=' + fileId" target="_blank" >http://localhost:8080/#/?downloadfileid={{fileId}}</a></li>
            </ul>
            <b-button
                    @click="$emit('update-cids',[])"
                    variant="primary"
            >
                返回
            </b-button>
        </b-card-text>
    </div>
</template>

<script>
    export default {
        name: "Success",
        props:{
            fileId:Number,
        }
    }
</script>

<style scoped>

</style>
