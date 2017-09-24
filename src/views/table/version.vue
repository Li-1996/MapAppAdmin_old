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
        <el-form-item label="设备类型" >
          <el-radio class="radio"v-model="form.device_type" label="ios">ios</el-radio>
          <el-radio class="radio" v-model="form.device_type" label="android">android</el-radio>
        </el-form-item>
        <el-form-item label="是否强制更新" >
          <el-select v-model="form.update_type" placeholder="请选择更新方式">
            <el-option label="0(非强制)" value="0"></el-option>
            <el-option label="1(强制)" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createVersion=false">取 消</el-button>
        <el-button type="primary" @click="addVersion">确 定</el-button>
      </div>
    </el-dialog>

    <table border="2" class="tablecss" :data="version_list" v-for="value in version_list">
      <tr>
        <th>下载地址</th>
        <th>描述</th>
        <th>更新类型</th>
        <th>设备类型</th>
        <th>app版本</th>
      </tr>
      <tr>
        <td>{{value['url']}}</td>
        <td>{{value['describe']}}
        <td>{{value['update_type']}}</td>
        <td>{{value['device_type']}}</td>
        <td>{{value['app_version']}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import {getVersion} from '@/api/table';
  export default {

    data() {
      return {
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
        this.version_list.push(this.form);
        this.form = {
          app_version: '',
          url: '',
          describe: '',
          device_type: '',
          update_type: ''
        }
      }
    }
  };

</script>

<style>
  .tablecss {
    margin-bottom: 20px;
  }
</style>

