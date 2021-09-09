<style type="text/css">
        body html {
            height: 100%
        }
		pre {
            padding: 5px;
            margin: 5px;
            line-height: 1.2;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
		.main-container {
            height: 100vh;
        }
    </style>
<template>	
	<div>	
    <el-form
      :inline="true"
      :model="dataForm"
      @keyup.enter.native="getDataList()"
    >  
	  <el-form-item>
	  请求时间
	  </el-form-item>
      <el-form-item>
          <el-date-picker placeholder="选择日期时间"
												style="width: 100%"
												value-format="yyyy-MM-ddTHH:mm:ss"
												type="datetime"
												v-model="pageParam.startTime">
								</el-date-picker> 
      </el-form-item>
	  <el-form-item>
	   至
	  </el-form-item>
      <el-form-item>         
          <el-date-picker placeholder="选择日期时间"
												style="width: 100%"
												value-format="yyyy-MM-ddTHH:mm:ss"
												type="datetime"
												v-model="pageParam.endTime">
								</el-date-picker>
      </el-form-item>
	  <el-form-item>
	  NB渠道
	 </el-form-item>
	 <el-form-item>         
		  <el-select clearable
				   filterable
				   placeholder="请选择"
				   style="width: 100%"
				   v-model="pageParam.channelId">
			<el-option
					:key="item.id"
					:label="item.name"
					:value="item.id"
					v-for="item in channelList">
			</el-option>
		</el-select>
	 </el-form-item>
	 <el-form-item>
		  <el-input v-model="pageParam.imei" placeholder="imei" clearable ></el-input> 
	 </el-form-item>
	 <el-form-item>
		  <el-input v-model="pageParam.seId" placeholder="seId" clearable ></el-input> 
	 </el-form-item>
	 <el-form-item>
		  <el-input v-model="pageParam.cmdexecId" placeholder="NB指令ID" clearable ></el-input> 
	 </el-form-item>
      <el-form-item>
        <el-button @click="reloadPageList()">查询</el-button>
      </el-form-item>
    </el-form>	
	<el-row>

						<el-table
								:cell-style="cellStyle"
								:data="pageResult.list"
								:default-sort="{prop: 'request_time', order: 'descending'}"
								@selection-change="handleSelectionChange"
								@sort-change="changeSort"
								border
								ref="multipleTable"
								style="width: 100%">
							<el-table-column
									type="selection"
									width="55">
							</el-table-column>							
							<el-table-column									
									label="业务渠道"
									sortable="custom"
									prop="transSystemId"
									width="100">
							</el-table-column>
							<el-table-column									
									label="NB渠道"
									sortable="custom"
									prop="channelId"
									width="100">
								<template slot-scope="scope">
									<span v-if="scope.row.channelId == '0' ">OneNet</span>
									<span v-if="scope.row.channelId == '1' ">CTWing</span>
									<span v-if="scope.row.channelId == '2' ">YXXAPP</span>
								</template>
							</el-table-column>
							<el-table-column									
									label="NB指令ID"
									sortable="custom"
									prop="cmdexecId"
									width="100">
							</el-table-column>	
							<el-table-column									
									label="seId"
									sortable="custom"
									prop="seId"
									width="100">
							</el-table-column>
							<el-table-column									
									label="imei"
									sortable="custom"
									prop="imei">
							</el-table-column>
							<el-table-column
									label="业务系统流水号"
									sortable="custom"
									prop="transSn">
							</el-table-column>
							<el-table-column
									label="接口类型"
									sortable="custom"
									prop="apiType">
							</el-table-column>
							<el-table-column
									label="写模式"
									sortable="custom"
									prop="mode">
							</el-table-column>
							<el-table-column									
									label="设备的objectid"
									sortable="custom"
									prop="objId">
							</el-table-column>
							<el-table-column
									label="设备instanceId"
									sortable="custom"
									prop="objInstId">
							</el-table-column>
							<el-table-column
									label="资源ID"
									sortable="custom"
									prop="resId">
							</el-table-column>
							<el-table-column
									label="读/写数据"
									sortable="custom"
									prop="data">
									<template slot-scope="scope">
									<el-button @click="handleClick(scope.row)" size="small" type="text">数据详情</el-button>
									</template>
							</el-table-column>
							<el-table-column
									label="超时时间"
									sortable="custom"
									prop="timeOut">
							</el-table-column>
							<el-table-column
									label="请求时间"
									sortable="custom"
									prop="requestTime">
							</el-table-column>	
							<el-table-column
									label="响应时间"
									sortable="custom"
									prop="responseTime">
							</el-table-column>	
							<el-table-column
									label="响应码"
									sortable="custom"
									prop="errno">
							</el-table-column>
							<el-table-column
									label="错误信息"
									sortable="custom"
									prop="error">
							</el-table-column>							
						</el-table>
						<el-dialog
							title="数据详情"
							:visible.sync="centerDialogVisible"
							width="95%"
							center>
						<el-form ref="form" :model="form" label-width="120px">
							<el-form-item label="数据详情" prop="name">
								<pre><span v-html="this.dataString"></span></pre>
							</el-form-item>
						</el-form>
						</el-dialog>
	</el-row>
						<el-pagination
								:current-page="pageResult.currPage"
								:page-size="pageResult.pageSize"
								:page-sizes="[10, 20, 30, 40]"
								:total="pageResult.totalCount"
								@current-change="handleCurrentChange"
								@size-change="handleSizeChange"
								layout="total, sizes, prev, pager, next, jumper">
						</el-pagination>
	</div>
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
                    },
                    {
                        id: '2',
                        name: 'YXXAPP'
                    }
                ],
	    dataForm :{
		},
		form : {
		},
		dataString : null,
		centerDialogVisible: false,
		pageParam: {
			page: 0,
			searchCount: true,
			limit: 10,
			imei: null,	
			seId: null,
			channelId: null,
            cmdexecId: null,			
			startTime: null,
			endTime: null
        },
		pageResult: {
			currPage: 1,
			list: [],                    
			pageSize: 10,                   
			totalCount: 1,
			totalPage:0                    
             },         
      }
    },
	created() {
            this.reloadPageList();
        },
	destroyed() {
	},
	methods: {
			handleSizeChange(val) {			
                this.pageParam.limit = val;
                this.pageParam.page = 0;
                this.reloadPageList();
            },
            handleCurrentChange(val) {			
                this.pageParam.page = val;
                this.reloadPageList();
            },
	        handleSelectionChange(val) {
                this.multipleSelection = val;
            },
			handleClick(val) {
                this.form = val;
                this.dataString = val.data;                
                this.centerDialogVisible = true;
            },
		    changeSort(val) {
                this.pageParam.sortDirection = val.order;
                this.pageParam.sortProperty = val.prop;
                this.reloadPageList();
            },
		    amountFormat: function (row, column) {
                let amount = row[column.property];
                if (amount === undefined) {
                    return "";
                }
                return parseFloat(amount).toFixed(2);
            },
            cellStyle: function (row, rowIndex) {
                return {"padding": "5px"};
            },
			messageSuccess: function (val) {
                this.$message(
                    {
                        message: val,
                        center: true,
                        type: 'success',
                        duration: 2000
                    });
            },
            messageError: function (val) {
                this.$message(
                    {
                        message: val,
                        center: true,
                        type: 'error',
                        duration: 2000
                    });
            },
		   reloadPageList: function () {			
                this.pageLoading = true;
                this.$http({
					  url: this.$http.adornUrl('/apiLog/list'),
					  method: 'post',
					  params: this.pageParam
					}).then(response => {										
                        this.pageResult = response.data.page;						
                    });
            }
	}
}
    ;

</script>