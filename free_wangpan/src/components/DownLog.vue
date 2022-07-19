<template>
    <Table border  style="margin-left: 300px" width="1100" :columns="columns1" :data="tableData"></Table>
</template>

<script>
    export default {
        name: "DownLog",
        data(){
            return {
                tableData:[],
                columns1: [
                    {
                        title: '文件ID',
                        key: 'id',
                        width: 300,
                    },
                    {
                        title: '简介',
                        key: 'readMe',
                        width: 500,
                    },
                    {
                        title: '下载地址',
                        // key: 'action',
                        // key:url,
                        width: 297,
                        align: 'center',
                        render:(h,params)=>{

                            return h('a', {
                                attrs:{
                                    href:params.row.url
                                },

                            },'链接')
                        }
                        // render: (h, params) => {
                        //     return h('div', [
                        //         h('Button', {
                        //             props: {
                        //                 type: 'primary',
                        //                 size: 'large',
                        //             },
                        //             style: {
                        //                 marginRight: '5px'
                        //             },
                        //             on: {
                        //                 click: () => {
                        //                     alert("请去下载页面查看下载地址！")
                        //                     console.log(params)
                        //                 }
                        //             }
                        //         }, '下载'),
                        //
                        //     ]);
                        // }
                    }
                ],
            }
        },
        mounted() {
            let num = localStorage.getItem("sumList");
            let arr = new Array();
            for(let i = 11 ; i <= num ;i++){
                    let obj = JSON.parse(localStorage.getItem("file_"+i));
                    if(obj.isDownloaded){
                        arr.push(obj);
                    }

                    // console.log(obj)
            }
            this.tableData = arr;
            console.log(arr)

        }
    }
</script>

<style scoped>

</style>
