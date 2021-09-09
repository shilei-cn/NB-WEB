<template>
  <div class="mod-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.imei" placeholder="imei" clearable></el-input>
      </el-form-item>
	  <el-form-item>
        <el-input v-model="dataForm.seId" placeholder="seId" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button  type="primary" @click="addOrUpdateHandle()">新增</el-button>
		<el-button  type="primary" @click="fileUploadHandle()">批量上传</el-button>
        <el-button  type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        width="80"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="seId"
        header-align="center"
        align="center"
        label="seId">
      </el-table-column>
      <el-table-column
        prop="imei"
        header-align="center"
        align="center"
        label="imei">        
      </el-table-column>
	  <el-table-column
        prop="transSystemId"
        header-align="center"
        align="center"
        label="业务系统标识">        
      </el-table-column>
	  <el-table-column
        prop="nbChannelId"
        header-align="center"
        align="center"
        label="NB渠道">
			<template slot-scope="scope">
				<span v-if="scope.row.nbChannelId == '0' ">OneNet</span>
				<span v-if="scope.row.nbChannelId == '1' ">CTWing</span>				
			</template>
      </el-table-column>  
      <el-table-column
        prop="nbdeviceId"
        header-align="center"
        align="center"
        width="150"
        label="oneNet设备ID">
	  </el-table-column>
      <el-table-column
        prop="remarks"
        header-align="center"
        align="center"
        width="180"
        label="备注">
	  </el-table-column>	  
	  <el-table-column
        prop="updateTime"
        header-align="center"
        align="center"
        width="180"
        label="系统接收时间">
      </el-table-column>
	  <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        width="180"
        label="数据库创建时间">
      </el-table-column>
      <el-table-column        
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button  type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button  type="text" size="small" @click="deleteHandle(scope.row.id,scope.row.nbdeviceId)">删除</el-button>
		  <el-button  v-if="scope.row.nbChannelId == '0' && scope.row.nbdeviceId.length==0 " type="text" size="small" @click="register(scope.row.id)">注册到oneNet平台</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
	<file-upload v-if="fileUploadVisible" ref="fileUpload" @refreshDataList="getDataList"></file-upload>
  </div>
</template>

<script>
  import AddOrUpdate from './device-add-or-update'
  import FileUpload from './fileUpload'
  export default {
    data () {
      return {
        dataForm: {
          imei: null,
		  seId: null
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
		fileUploadVisible: false
      }
    },
    components: {
      AddOrUpdate,
	  FileUpload
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/device/list'),
          method: 'post',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'imei': this.dataForm.imei,
			'seId': this.dataForm.seId
          })
        }).then(({data}) => {
          if (data && data.retCode === 0) {
			if(data.page==null){
				this.dataList = []
				this.totalPage = 0
			}else{				
				this.dataList = data.page.list
				this.totalPage = data.page.totalCount				
			}
            
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
	  fileUploadHandle (){
		this.fileUploadVisible =true
		this.$nextTick(() => {			
			 this.$refs.fileUpload.open()
			 
			})
	  },
      // 删除
      deleteHandle (id) {
	  var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/device/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {		  
            if (data && data.retCode === 0) {
              this.$message({
                message: data.retMsg,
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.retMsg)
            }
          })
        }).catch(() => {})
      },
	  register(id){
	  this.$confirm('确定对'+id+'进行注册到oneNet操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/device/register'),
            method: 'post',
            data: this.$http.adornData(id, false)
          }).then(({data}) => {		  
            if (data && data.retCode === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.retMsg)
            }
          })
		  }).catch(() => {})
	  }
    }
  }
</script>
