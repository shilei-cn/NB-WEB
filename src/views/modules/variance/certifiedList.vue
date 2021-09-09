<template>	
	<div>	
    <el-form
      :inline="true"
      :model="dataForm"
      @keyup.enter.native="getDataList()"
    >  
	  <el-form-item>
	   保付日期
	  </el-form-item>
      <el-form-item>
          <el-date-picker placeholder="选择日期时间"
												style="width: 100%"
												value-format="yyyyMMdd"
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
												value-format="yyyyMMdd"
												type="datetime"
												v-model="pageParam.endTime">
								</el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="reloadPageList()">查询</el-button>
      </el-form-item>
    </el-form>	
	<el-row>

						<el-table
								:cell-style="cellStyle"
								:data="pageResult.list"
								:default-sort="{prop: 'uploadTime', order: 'descending'}"
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
									label="中心流水号"
									sortable="custom"
									prop="centerSerial"
									width="100">
							</el-table-column>
							<el-table-column									
									label="SAM卡号"
									sortable="custom"
									prop="cardTermId"
									width="100">
							</el-table-column>
							<el-table-column									
									label="终端交易序号"
									sortable="custom"
									prop="cardTermTransSn"
									width="100">
							</el-table-column>
							<el-table-column
									:formatter="amountFormat"
									label="消费交易金额"
									sortable="custom"
									prop="cardTransAmt">
							</el-table-column>
							<el-table-column
									label="交易时间"
									sortable="custom"
									prop="tradeTime">
							</el-table-column>
							<el-table-column
									label="用户卡号"
									sortable="custom"
									prop="cardNo">
							</el-table-column>
							<el-table-column
									label="TAC"
									sortable="custom"
									prop="cardTac">
							</el-table-column>
							<el-table-column
									:formatter="amountFormat"
									label="提现金额"
									sortable="custom"
									prop="withdrawalAmount">
							</el-table-column>
							<el-table-column
									label="结算日期"
									sortable="custom"
									prop="settlementDate">
							</el-table-column>
							<el-table-column
									label="保付日期"
									sortable="custom"
									prop="certifiedDate">
							</el-table-column>
							<el-table-column
									label="退保日期"
									sortable="custom"
									prop="surrenderDate">
							</el-table-column>
							<el-table-column
									label="K8文件名"
									sortable="custom"
									prop="k8FileName">
							</el-table-column>
							<el-table-column
									label="保付单位代码"
									sortable="custom"
									prop="insurerCode">
							</el-table-column>
							<el-table-column
									label="保付商户代码"
									sortable="custom"
									prop="insuredPosCode">
							</el-table-column>
						</el-table>
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
	    dataForm :{
		},
		pageParam: {
			page: 0,
			searchCount: true,
			size: 10,			
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
                this.pageParam.size = val;
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
					  url: this.$http.adornUrl('/web/certifiedList'),
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