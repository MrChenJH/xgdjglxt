<template>
  <div> 

<el-row :gutter="20">
  
  <el-col :span="7" >  
     <el-date-picker
      v-model="dateS"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
       :default-time="['00:00:00', '23:59:59']">
    </el-date-picker>
</el-col>
   <el-col :span="3"  style="padding-left: 20px;"><el-button type="primary" @click="search">查询</el-button></el-col>

</el-row>
<el-row  :gutter="20">
    <el-col :span="24" > 
     <el-table :data="showData"  border fit highlight-current-row style="width: 100%" >

 
        <el-table-column align="center" label="家庭账号" width="150">
         <template slot-scope="scope"> 
         
         <span >{{scope.row.jtzh}}</span>
        </template>
      </el-table-column>
      
      <el-table-column  label="小鬼账号" align="center"  >
       <template slot-scope="scope"> 
         <span >{{scope.row.xgzh}}</span>
        </template>
      </el-table-column>

      <el-table-column  label="周期" align="center"  min-width="100px" >
       <template slot-scope="scope"> 
         <span >{{scope.row.zq}}</span>
        </template>
      </el-table-column>
       
      <el-table-column  label="本周金豆数" align="center"  min-width="150px" >
       <template slot-scope="scope"> 
         <span >{{scope.row.bzjds}}</span>
        </template>
      </el-table-column>
          
   

                 <el-table-column  label="本周银豆数" align="center"  min-width="150px" >
       <template slot-scope="scope"> 
         <span >{{scope.row.bzyds}}</span>
        </template>
      </el-table-column>
                          <el-table-column  label="本周豆金" align="center"  min-width="150px" >
       <template slot-scope="scope"> 
         <span >{{scope.row.bzdj}}</span>
        </template>
      </el-table-column>     
    </el-table>
    </el-col>
</el-row> 
<el-row :gutter="20">
   <el-col :span="14" :offset="10" style="text-align:right"> 
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5,10, 20, 30, 40]"
      :page-size="pageSize1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-col>
</el-row>



</div>
</template>
<script>

 import  TableDefined from '@/components/TableDefined'


 import  {exportToCsv} from '@/utils/tool'


 export default {
    methods: {
       search(){ 
        if(this.dateS){

         let data= this.tableData.filter(r=>
         {   
             let d=new Date(r.ationTime)
       
             return   d>=this.dateS[0] && d<=this.dateS[1]
         })
         this.showData=[];
         data.forEach((x,i) => 
           {  
                if(i>=(this.currentPage-1)*this.pageSize1&&i<this.currentPage*this.pageSize1)
                {
                                this.showData.push(x); 
                }
           });
           this.total=data.length;
        }
      },
      handleSizeChange(val) {  
           this.pageSize1=val;
      },
      handleCurrentChange(val) {
           this.currentPage=val;
           this.showData=[];
           this.tableData.forEach((x,i) => 
           {
                if(i>=(this.currentPage-1)*this.pageSize1&&i<this.currentPage*this.pageSize1)
                {
                                this.showData.push(x); 
                }
           });
      }
    },
    components: {
    TableDefined
  },
  props:{

  },
  mounted(){  
           this.total=this.tableData.length
           this.showData=[];
           this.tableData.forEach((x,i) => 
           {     
             console.log(x)
             console.log(i)
             if(i>=((this.currentPage-1)*this.pageSize1)&&i<(this.currentPage*this.pageSize1))
                {
                                this.showData.push(x); 
                }
           });

           console.log( this.showData)
     },
    data() {
      return {
        czbm:[
          {name:"部门1"},
          {name:"部门2"},
          {name:"部门3"},
          {name:"部门4"}
          ],
          czlx:[
          {name:"增"},
          {name:"删"},
          {name:"改"}
         ],
    searchObj:{
     bm:"",
     lx:""
    },
     pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
   
        dateS: '',
        total:400,
        pageSize1:5,
        selectRows:[],
        listLoading: true,
         listQuery: {
           page: 1,
         limit: 10
         },
        users:[],
        office:[],
        obj:{
           node:'',
           nodeName:'',
           workDay:''
          },
        currentPage: 1,
        dialogFormVisible:false,
        showData:[],

        tableData:[
          {jtzh:"张三的家",xgzh:"张思睿",zq:"20180702-20180708",bzjds:200,bzyds:180,bzdj:20} 
            ]
       }
    }
  }
</script>
<style>
 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
} 

.el-dialog__header{
    height: 100%;
    width: 100%;
    background: inherit;
    background-color: rgba(245, 245, 245, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(223, 223, 223, 1)

}
.textSpan{
font-size: 14px;
height: 40px;
line-height: 40px;
width: 60px;

}


th.is-leaf {
  
    background: inherit;
    background-color: rgba(245, 245, 245, 1);
    box-sizing: border-box;
    border-width: 0px;
    border-style: solid;
    border-color: rgba(223, 223, 223, 1);
}
</style>


