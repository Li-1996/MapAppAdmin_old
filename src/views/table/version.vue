<template>
  <div class="app-container">

    <el-button type="text" @click="createVersion=true" size="large">创建版本</el-button>

    <el-dialog title="创建版本" :visible.sync="createVersion">
      <el-form :model="form" name="form">
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
          <el-radio class="radio" v-model="form.device_type" label="ios">ios</el-radio>
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

    <el-table  stytle="width: 100%" border :data="version_list">
      <el-table-column
        label="下载地址"
        prop="url">
      </el-table-column>
      <el-table-column
        label="描述"
        prop="describe">
      </el-table-column>
      <el-table-column
        label="更新类型"
        prop="update_type">
      </el-table-column>
      <el-table-column
        label="设备类型"
        prop="device_type">
      </el-table-column>
      <el-table-column
        label="app版本"
        prop="app_version">
      </el-table-column>
      </tr>
    </el-table>

    <el-pagination
      layout="total, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      :page-size=10
      :total=totals>
    </el-pagination>
  </div>
</template>

<script>
  import {getVersion,getCreateversion} from '@/api/table';
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
      addVersion(){
          getCreateversion({
            'app_version': this.form.app_version,
            'url': this.form.url,
            'describe': this.form.describe,
            'device_type': this.form.device_type,
            'update_type': this.form.update_type
          }).then(response => {
            this.version_list = response.detail;
         })
        },
      fetchData(params) {
        getVersion(params).then(response => {
          this.version_list = response.detail.list;
          this.totals = response.detail.totals;
        })
      }
    }
  }
</script>

<style>
</style>

