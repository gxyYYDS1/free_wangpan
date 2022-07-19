<template>
    <div>
        <b-alert variant="danger" show>
            上传失败
        </b-alert>
        <b-button
                @click="$emit('update-error',false)"
                variant="danger"
        >
            返回，重新上传
        </b-button>
    </div>
</template>

<script>
    export default {
        name: "Error"
    }
</script>

<style scoped>

</style>
