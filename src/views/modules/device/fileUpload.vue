<template>
  <el-dialog    
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="uploadVisible"
    width="35%"
    title="批量导入"   
    ref="refDialogUpload"
    v-loading="loading"
  >		
<el-upload
  class="upload-demo"
  :before-upload="beforeUpload"
  :on-success="onSuccess"
  action="http://localhost:9001/nb/device/upload"
  multiple
  :limit="1" 
  > 
  <el-button type="primary" icon="el-icon-upload">上传数据</el-button>
  <div slot="tip" class="el-upload__tip">只能上传excel文件,excel内容均为文本格式</div>
  <el-button @click="exportDoc()" icon="el-icon-download">下载模板</el-button>
</el-upload>
  </el-dialog>
</template>

<script>
export default { 
  data() {
    return {
      uploadVisible: false,
      fileList: [],
      file: {},
      innerVisible: false,
      tableData: [],
      successCount: 0,
      loading: false,
	  uploading: false,
	  uploadDialog:true
    };
  },
  methods: {
    open() {
      this.uploadVisible = true;
	  this.fileList=[];
	  this.file={}
    },	
	exportDoc(){
		this.$http({
					  url: this.$http.adornUrl('/device/exportList'),
					  method: 'post',
					  params: null,
					  responseType: 'blob'
					}).then((res) => {
					let blob = new Blob([res.data], {type: res.data.type})
                    const fileName = 'NB_template.xls';
                    let downloadElement = document.createElement('a')
                    let href = window.URL.createObjectURL(blob); //创建下载的链接
                    downloadElement.href = href;
                    downloadElement.download = fileName; //下载后文件名
                    document.body.appendChild(downloadElement);
                    downloadElement.click(); //点击下载
                    document.body.removeChild(downloadElement); //下载完成移除元素
                    window.URL.revokeObjectURL(href); //释放blob
					});
	},
	onSuccess(res){
		if(res.retCode==0){
			this.$message.success("数据导入成功");
			this.uploadVisible = false;
			this.$emit('refreshDataList');
		}else{
			this.$message.error(res.retMsg);
		}
		
	},
	uploadUrl(){		
		return 'http://localhost:9001/nb/device/upload';
	},
	beforeUpload(file) {
      if (file.type == "" || file.type == null || file.type == undefined) {
        const FileExt = file.name.replace(/.+\./, "").toLowerCase();
        if (
          FileExt == "xls" ||
          FileExt == "xlsx" ||
          FileExt == "XLS" ||
          FileExt == "XLSX"
        ) {
          return true;
        } else {
          this.$message.error("上传文件必须是Excel格式!");
          return false;
        }
      }
      return true;
    },
	postFile() {
      const fileObj = this.file;
      var fileData = new FormData();
      fileData.append("file", fileObj);
      let headers = {
        "Content-Type": "multipart/form-data"
      };
      this.uploading = true;
	  this.$http({
            url: this.$http.adornUrl('/device/upload'),
            method: 'post',
            data: fileData
          }).then(res => {
        console.log("res:",res);
        if (res == 200) {
          this.$message.success("读取成功");
          this.uploadDialog = false;
        } else {
          this.$message.error("错误！请检查上传文件内容");
        }
      });
    }    
  }
};
</script>

<style>
</style>
