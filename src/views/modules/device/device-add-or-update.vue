<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="seId" label-width="120px" prop="seId">
        <el-input v-model="dataForm.seId" placeholder="seId"></el-input>
      </el-form-item>
	  <el-form-item label="imei" label-width="120px" prop="imei">
        <el-input v-model="dataForm.imei" placeholder="设备imei"></el-input>
      </el-form-item>
      <el-form-item label="业务系统标识" label-width="120px" prop="transSystemId">        
		<el-select clearable
				   filterable
				   placeholder="请选择"
				   style="width: 100%"
				   v-model="dataForm.transSystemId">
			<el-option
					:key="item.transSystemId"
					:label="item.description"
					:value="item.transSystemId"
					v-for="item in this.dataForm.dcsystemList">
			</el-option>
		</el-select>
      </el-form-item>
	  <el-form-item label="NB渠道" label-width="120px" prop="nbChannelId">        
		<el-select clearable
				   filterable
				   placeholder="请选择"
				   style="width: 100%"
				   v-model="dataForm.nbChannelId">
			<el-option
					:key="item.id"
					:label="item.name"
					:value="item.id"
					v-for="item in channelList">
			</el-option>
		</el-select>
      </el-form-item>

	  <el-form-item label="oneNet设备ID" label-width="120px"  prop="nbdeviceId">
        <el-input v-model="dataForm.nbdeviceId" placeholder="oneNet设备ID"></el-input>
      </el-form-item>
	  <el-form-item label="备注" label-width="120px"  prop="remarks">
        <el-input v-model="dataForm.remarks" placeholder="备注"></el-input>
      </el-form-item>
	  <el-input v-if="show" v-model="dataForm.updateTime" placeholder="系统接收时间"></el-input>
	  <el-input v-if="show" v-model="dataForm.createTime" placeholder="数据库创建时间"></el-input>
	  <el-input v-if="show" v-model="dataForm.status" placeholder="数据库创建时间"></el-input>
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
          seId: '',
          transSystemId: '',
		  nbChannelId: '0',
          imei: '',
          nbdeviceId: '',
          updateTime: '',
		  remarks: '',
          createTime: '' ,
		  status: '',
		  dcsystemList: []
        },
        dataRule: {
          seId: [
            { required: true, message: '设备唯一标识不能为空', trigger: 'blur' }
          ],
		  transSystemId: [
            { required: true, message: '业务系统标识不能为空', trigger: 'blur' }
          ],
          nbChannelId: [
            { required: true, message: 'NB渠道不能为空', trigger: 'blur' }
          ],
          imei: [
            { required: true, message: '设备imei不能为空', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.$http({
          url: this.$http.adornUrl('/device/select'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.dataForm.dcsystemList=data.dcsystemList;
		  this.dataForm.transSystemId=data.dcsystemList[0].transSystemId;
        }).then(() => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
          })
        }).then(() => {
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/device/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.retCode === 0) {
                this.dataForm.id = data.deviceInfo.id
                this.dataForm.seId = data.deviceInfo.seId
                this.dataForm.transSystemId = data.deviceInfo.transSystemId
				this.dataForm.nbChannelId = data.deviceInfo.nbChannelId
                this.dataForm.imei = data.deviceInfo.imei
                this.dataForm.nbdeviceId = data.deviceInfo.nbdeviceId
				this.dataForm.remarks = data.deviceInfo.remarks
                this.dataForm.updateTime = data.deviceInfo.updateTime
				this.dataForm.createTime = data.deviceInfo.createTime
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {	  
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/device/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'seId': this.dataForm.seId,
                'transSystemId': this.dataForm.transSystemId,
				'nbChannelId': this.dataForm.nbChannelId,
                'imei': this.dataForm.imei,
                'nbdeviceId': this.dataForm.nbdeviceId,
				'remarks': this.dataForm.remarks,
                'updateTime': this.dataForm.updateTime,
                'createTime': this.dataForm.createTime
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
