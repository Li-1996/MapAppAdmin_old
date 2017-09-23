<template>
  <div class="app-container">
    <el-button type="text" @click="createVersion=true" size="large">创建版本</el-button>
    <el-dialog title="创建版本" :visible.sync="createVersion">
      <el-form :model="form">
        <el-form-item label="app版本：">
          <el-input v-model="form.app_version" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="下载地址：">
          <el-input v-model="form.url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input v-model="form.describe" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备类型：" >
          <el-select v-model="form.device_type" placeholder="请选择设备类型">
            <el-option label="ios" value="ios"></el-option>
            <el-option label="android" value="android"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否强制更新">
          <el-radio class="radio" v-model="radio" label="强制">强制</el-radio>
          <el-radio class="radio" v-model="radio" label="非强制">非强制</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createVersion=false">取 消</el-button>
        <el-button type="primary" @click="addVersion">确 定</el-button>
      </div>
    </el-dialog>

    <table border="2" class="tablecss" :data="version_list" v-for="value in version_list">
      <tr><th>下载地址：</th>{{value['url']}}</td></tr>
      <tr><th>描述：</th><td>{{value['describe']}}</td></tr>
      <tr><th>更新类型：</th><td>{{value['update_type']}}</td></tr>
      <tr><th>设备类型：</th><td>{{value['device_type']}}</td></tr>
      <tr><th>app版本：</th><td>{{value['app_version']}}</td></tr>
    </table>
  </div>
</template>

<script>
  import {getVersion} from '@/api/table';
  export default {

    data() {
      return {
        radio: '强制',
        version_list: null,
        totals: 0,
        createVersion: false,
        form: {
          app_version: '',
          url: '',
          describe: '',
          device_type: '',
          update_type: ''
        }
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
      fetchData(params) {
        getVersion(params).then(response => {
          this.version_list = response.detail.list;
        this.totals = response.detail.totals;
        })
      },
      addVersion(){

      }
    }
  };

</script>

<style>
  .tablecss {
    margin-bottom: 20px;
  }
</style>

