<template>
  <div class="app-container">
    <el-button type="text" @click="createVersion = true">创建版本</el-button>

    <el-dialog title="创建版本" >
      <el-form :model="form">
        <el-form-item label="活动名称">
        </el-form-item>
        <el-form-item label="活动区域" >
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <table border="2" class="divcss" :data="version_list" v-for="value in version_list">
      <tr><th>发布：</th><td>{{value['is_publish']}}</td></tr>
      <tr><th>网址：</th>{{value['url']}}</td></tr>
      <tr><th>描述：</th><td>{{value['describe']}}</td></tr>
      <tr><th>更新类型：</th><td>{{value['update_type']}}</td></tr>
      <tr><th>设备类型：</th><td>{{value['device_type']}}</td></tr>
      <tr><th>id：</th><td>{{value['id']}}</td></tr>
      <tr><th>app版本：</th><td>{{value['app_version']}}</td></tr>
    </table><br>
  </div>
</template>

<script>
  import {getVersion} from '@/api/table';
  export default {

    data() {
      return {
        version_list: null,
        totals: 0,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
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
      createVersion(){
        dialogFormVisible: false
      }
    }
  };

</script>

