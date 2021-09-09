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
        .jsonString {
            color: green;
        }

        .jsonNumber {
            color: darkorange;
        }

        .jsonBoolean {
            color: blue;
        }

        .jsonNull {
            color: magenta;
        }

        .jsonKey {
            color: red;
        }
		.main-container {
            height: 100vh;
        }
    </style>
<template>	
	<div>		
		<el-container v-loading="loading">
			<el-container class="main-container" v-loading="pageLoading">				
				<el-main>
					<el-row style="padding: 10px">
						    <el-form
							  :inline="true"
							  :model="dataForm"
							  @keyup.enter.native="reloadPageList()"
							>
							  <el-form-item>
							   系统接收时间
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
								<el-button @click="reloadPageList()">查询</el-button>								
							  </el-form-item>
							</el-form>	
					</el-row>
					<br>
					<el-row>
						<el-table
								:cell-style="cellStyle"
								:data="pageResult.list"
								:default-sort="{prop: 'receive_time', order: 'descending'}"
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
									prop="transSystemId"
									sortable="custom"
									width="120">
							</el-table-column>
							<el-table-column									
									label="NB渠道"
									prop="channelId"
									sortable="custom"
									width="100">
								<template slot-scope="scope">
									<span v-if="scope.row.channelId == '0' ">OneNet</span>
									<span v-if="scope.row.channelId == '1' ">CTWing</span>
									<span v-if="scope.row.channelId == '2' ">YXXAPP</span>
								</template>
							</el-table-column>							
							<el-table-column									
									label="seId"
									prop="seId"
									sortable="custom"
									width="150">
							</el-table-column>
							<el-table-column
									label="imei"
									sortable="custom"
									prop="imei"
									width="200">
							</el-table-column>
							<el-table-column
									label="通知数据"
									sortable="custom"
									prop="notifyData"
									width="150">
									<template slot-scope="scope">
									<el-button @click="handleClick(scope.row)" size="small" type="text">数据详情</el-button>
									</template>
							</el-table-column>
							<el-table-column
									label="系统接收时间"
									sortable="custom"
									prop="receiveTime">
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
						<el-pagination
								:current-page="pageResult.currPage"
								:page-size="pageResult.pageSize"
								:page-sizes="[10, 20, 30, 40]"
								:total="pageResult.totalCount"
								@current-change="handleCurrentChange"
								@size-change="handleSizeChange"
								layout="total, sizes, prev, pager, next, jumper">
						</el-pagination>
					</el-row>
				</el-main>
				<el-footer>
					<el-row>
					</el-row>
				</el-footer>
			</el-container>
		</el-container>

	</div>
</template>
<script>
	import axios from 'axios'
	import Vue from 'vue'
    export default {        
        data: function () {
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
                loading: false,
                pageLoading: true,
                dialogLabelWidth: '120px',
                form: {},
				dataForm :{}, 
				dataString : null,
				centerDialogVisible: false,
                pageParam: {
                    page: 0,
                    searchCount: true,
                    limit: 10,
                    imei: null,
					seId: null,
                    startTime: null,
                    endTime: null,
                    channelId: null,					
                    sortProperty: 'receive_time',
                    sortDirection: 'descending'
                },
                pageResult: {
					currPage: 1,
                    list: [],                    
                    pageSize: 10,                   
                    totalCount: 1,
					totalPage:0
                    
                },
                total: 100,
                limit: 10,
                current: 1,
                multipleSelection: []
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
                this.dataString = val.notifyData;                
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
					  url: this.$http.adornUrl('/notify/list'),
					  method: 'post',
					  params: this.pageParam
					}).then(response => {						
                        this.pageResult = response.data.page;						
                    });
            },

        },
        mounted: function () {
        }
        ,
        updated: function () {
        }
        ,
        watch: {
            pageResult: function () {
                this.$nextTick(function () {
                    this.loading = false;
                    this.pageLoading = false;
                    //document.getElementById('app').style.display = 'block';                    
                });
            }
        }
    }
    ;

</script>