<template>
  <div class="app-container">

    <el-row class="divcss" :data="list" v-for="value in list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-card class="card">
        <div class="image"><img  :src="value['head_image']" style="width:160px;height: 190px; "></div>
        <el-tag type="primary"><div class="tag">user_id &nbsp&nbsp：{{value['user_id']}}</div></el-tag>
        <el-tag type="primary"><div class="tag">性&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp别：{{value['gender']}}</div></el-tag>
        <el-tag type="primary"><div class="tag">区&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp域：{{value['region']}}</div></el-tag>
        <el-tag type="primary"><div class="tag">昵&nbsp&nbsp&nbsp&nbsp&nbsp称：{{value['nick_name']}}</div></el-tag>
        <el-tag type="primary"><div class="tag">星&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp座：{{value['constellation']['name']}}</div></el-tag>
        <span class="tag">个人签名：{{value['person_signature']}}</span>
        <el-button  id="button" class="button" type="info" @click="getBalance(value.user_id)">余额</el-button>
      </el-card>
    </el-row>
    <el-pagination
      layout="total, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      :page-size=10
      :total=totals>
    </el-pagination>
  </div>
</template>

<script>
  import {getUserList,getUserBank} from '@/api/table';
  export default {
    data() {
      return {
        list: null,
        listLoading: true,
        totals: 0
      }
    },
    created() {
      this.fetchData({
        page: 1
      })
    },
    methods: {
      handleCurrentChange(val) {
        this.fetchData({
          page: val
        })
      },
      getBalance(user_id){
        getUserBank({
          user_id:user_id
        }).then(response => {
          alert(response.detail.balance)
        })
      },
      fetchData(params) {
        this.listLoading = true;
        getUserList(params).then(response => {
          this.list = response.detail.list;
          this.totals = response.detail.totals;
          this.listLoading = false;
        })
      }
    }
  };
</script>
<style>
  .divcss {
    display: inline-block;
    width: 500px;
    height: 30px;
    margin-right: 5px;
  }
  .tag {
    font-size: 17px;
    border-radius: 10px;
    margin-left: 10px;
    display: inline-block;
    width: 150px;
    color: #000;
  }
  .card {
    margin-bottom: 50px;
    margin-top: 10px;
    height: 300px;
    padding: 0px;
    position: relative;
    background:-webkit-gradient(linear, 0 0, 0 bottom, from(#DDA0DD), to(#afddff));
  }
  .image {
    float:left;
    padding:10px;
    border: 1px solid #ddd;
    margin-right: 20px;
  }
  .button{
    position: absolute;
    bottom: 10px;
    right: 30px;
  }
</style>
