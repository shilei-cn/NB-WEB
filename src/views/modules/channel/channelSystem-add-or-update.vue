<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="dcId" label-width="120px" prop="transSystemId">
        <el-input v-model="dataForm.transSystemId" placeholder="dcId"></el-input>
      </el-form-item>
	  <el-form-item label="DC前置地址" label-width="120px" prop="dcsystemHost">
        <el-input v-model="dataForm.dcsystemHost" placeholder="DC前置地址"></el-input>
      </el-form-item>
	  <el-form-item label="描述" label-width="120px"  prop="description">
        <el-input v-model="dataForm.description" placeholder="描述"></el-input>
      </el-form-item>	  
	  <el-input v-if="show" v-model="dataForm.createTime" placeholder="数据库创建时间"></el-input>
	  <el-input v-if="show" v-model="dataForm.notifySystemId" placeholder="notify业务渠道id"></el-input>
	  <el-input v-if="show" v-model="dataForm.id" placeholder="id"></el-input>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>  
  export default {
    data () {
      return {
	  	    channelList: [
                    {
                        id: '0',
                        name: 'OneNet'
                    },
                    {
                        id: '1',
                        name: 'CTWing'
                    }
                ],
		show: false,
        visible: false,        
        dataForm: {
          id: 0,
          transSystemId: '',  
		  notifySystemId: '01',
		  dcsystemHost: '',
          description: '',         	 
          createTime: ''		  		 
        },
        dataRule: {
          transSystemId: [
            { required: true, message: 'dcId不能为空', trigger: 'blur' }
          ],
		  dcsystemHost: [
            { required: true, message: 'DC前置地址不能为空', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '描述不能为空', trigger: 'blur' }
          ],
          
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
		this.visible = true
		if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/channel/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.retCode === 0) {
                this.dataForm.id = data.dcRecord.id
                this.dataForm.transSystemId = data.dcRecord.transSystemId                
				this.dataForm.dcsystemHost = data.dcRecord.dcsystemHost
                this.dataForm.description = data.dcRecord.description
                this.dataForm.notifySystemId = data.dcRecord.notifySystemId                
				this.dataForm.createTime = data.dcRecord.createTime
              }
            })
          }else{
			this.$nextTick(() => {
             this.$refs['dataForm'].resetFields()
          })
		  }        
      },
      // 表单提交
      dataFormSubmit () {	  
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/channel/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,                
                'transSystemId'  : this.dataForm.transSystemId,
				'dcsystemHost'   : this.dataForm.dcsystemHost,
                'description'    : this.dataForm.description,
                'notifySystemId' : this.dataForm.notifySystemId,
                'createTime'     : this.dataForm.createTime
              })
            }).then(({data}) => {
              if (data && data.retCode === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.retMsg)
              }
            })
          }
        })
      }
    }
  }
</script>
