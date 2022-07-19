<template>
    <div>

        <br>
        <p style="font-size: 20px;text-align: center">文件上传记录</p>
        <br>

        <Table border  style="margin-left: 300px" width="1100" :columns="columns1" :data="tableData"></Table>
    </div>
</template>
<!--上传记录-->
<script>
    export default {
        name: "toDoList",
        props:{
            tableData:Array
        },
        data () {
            return {
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
                        title: '操作',
                        key: 'action',
                        width: 297,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'large',
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            alert("请去下载页面查看下载地址！")
                                            console.log(params)
                                            let obj = JSON.parse(localStorage.getItem("file_"+params.row.id));
                                            obj.isDownloaded = true;
                                            localStorage.setItem("file_"+params.row.id,JSON.stringify(obj));
                                        }
                                    }
                                }, '下载'),

                            ]);
                        }
                    }
                ],
                // tableData:[],
                // data1: [
                //     {
                //         name: '王小明',
                //         age: 18,
                //         address: '北京市朝阳区芍药居'
                //     },
                //     {
                //         name: '张小刚',
                //         age: 25,
                //         address: '北京市海淀区西二旗'
                //     },
                //     {
                //         name: '李小红',
                //         age: 30,
                //         address: '上海市浦东新区世纪大道'
                //     },
                //     {
                //         name: '周小伟',
                //         age: 26,
                //         address: '深圳市南山区深南大道'
                //     }
                // ]
            }
        },
        methods:{
            getData(fileId){
                let obj = JSON.parse(localStorage.getItem("file_"+fileId));
                this.id = obj.id;
                this.readme = obj.readMe;
                this.url = obj.url;
            },
            download(data){

            },
            share(data){

            }
        },
        // data(){
        //
        // },
        mounted() {
            // const num = localStorage.getItem("sumList");
            // let arr = new Array();
            // for(let i = 11 ; i <= num ;i++){
            //         let obj = JSON.parse(localStorage.getItem("file_"+i));
            //         arr.push(obj);
            //         console.log(obj)
            // }
            // this.tableData = arr;
            // console.log(this.tableData)

        }
    }

</script>

<style scoped>

</style>
