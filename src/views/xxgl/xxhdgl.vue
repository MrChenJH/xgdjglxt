<template>
<section>
  <el-row :gutter="20">
  <el-col  :span="20" >   
    <el-input   v-model="searchObj.keyword" placeholder="关键字" style="width:200px" ></el-input> 
     <SelectDq></SelectDq>
    <el-button type="primary" @click="search">查询</el-button>
   </el-col>
   
  
</el-row>
<el-row  :gutter="20">
    <el-col :span="24" > 
     <el-table :data="showData"  border fit highlight-current-row style="width: 100%"  >
     <el-table-column type="expand" > 
           
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="家庭账号:">
            <span>{{ props.row.jtzh }}</span>
          </el-form-item>
          <el-form-item label="预计招募人数:">
            <span>{{ props.row.yjzmrs }}</span>
          </el-form-item>
       
          <el-form-item label="报名截止时间:">
            <span>{{ props.row.bmjzsj }}</span>
          </el-form-item>
          <el-form-item label="注意事项:">
            <span>{{ props.row.zysx }}</span>
          </el-form-item>
          <el-form-item label="已报名人数:">
            <span>{{ props.row.ybmrs }}</span>
          </el-form-item>
                   <el-form-item label="联系方式:">
            <span>{{ props.row.lxfs }}</span>
          </el-form-item>
           <el-form-item label="报名及参与情况表:" style="width: 100%">
               <el-table :data=" props.row.UserAppChild"  border fit highlight-current-row style="width: 100%" stripe >
                 
        <el-table-column align="center" label="报名家庭">
        <template slot-scope="scope">  
          <span >{{scope.row.bmjt}}</span>
        </template>
      </el-table-column>
    <el-table-column class-name="status-col" label="参与人数" align="center" >
        <template slot-scope="scope"> 
           <span>{{scope.row.cyrs}}</span>
        </template>
      </el-table-column>
          <el-table-column class-name="status-col" label="报名时间" align="center"  min-width="200px">
        <template slot-scope="scope"> 
           <span>{{scope.row.bmsj}}</span>
        </template>
      </el-table-column>
         <el-table-column class-name="status-col" label="是否参加" align="center" >
        <template slot-scope="scope"> 
           <span>{{scope.row.sfcj}}</span>
        </template>
      </el-table-column>
              <el-table-column class-name="status-col" label="对组织者的点赞" align="center" min-width="200px">
        <template slot-scope="scope"> 
           <span>{{scope.row.dzzzdz}}</span>
        </template>
      </el-table-column>
                  <el-table-column class-name="status-col" label="组织者的点赞" align="center"  min-width="200px">
        <template slot-scope="scope"> 
           <span>{{scope.row.zzzdz}}</span>
        </template>
      </el-table-column>
               </el-table>
          </el-form-item>
        </el-form> 
      </template>
    </el-table-column>
        <el-table-column align="center" label="活动主题">
        <template slot-scope="scope">  
          <span >{{scope.row.hdzt}}</span>
        </template>
      </el-table-column>
      
     

     
      
         <el-table-column class-name="status-col" label="活动时间" align="center" >
        <template slot-scope="scope"> 
           <span>{{scope.row.hdsj}}</span>
        </template>
      </el-table-column>
    
       <el-table-column class-name="status-col"   label="活动地点" align="center" >
           <template slot-scope="scope"> 
           <span>{{scope.row.hddd}}</span>
        </template>
      </el-table-column>
      
        <el-table-column class-name="status-col"   label="组织人" align="center" >
           <template slot-scope="scope"> 
           <span>{{scope.row.zzr}}</span>
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
</section>
</template>
<script>

 import  TableDefined from '@/components/TableDefined'
 import SelectDq  from '@/components/SelectDq'

 import {exportToCsv} from '@/utils/tool'

 export default {
  
    components: {
    TableDefined,
    SelectDq
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

           console.log(this.showData)
     },
    data() {
      return {
        alertVisible:false,
        alertcontent:'',
        total:400,
        pageSize1:5,
        selectRows:[],
        ssqy:[
           {name:"上海"},
           {name:"北京"},
           {name:"重庆"},
           {name:"武汉"},
           {name:"无锡"}
         ],
        listLoading: true,
        innerVisible:false,
        searchObj:{
           keyword:'',
           date:[],
           ssqy:''
         },
        currentPage: 1,
        dialogFormVisible:false,
        showData:[],
        tableData:[
          {jtzh:"张三的家",hdzt:"郊游",hdsj:"2018/7/6  9:00:00",hddd:"佘山",zzr:"张三",lxfs:"13456789098",yjzmrs:3,bmjzsj:"2018/7/5  9:00:00",zysx:"自带食物",ybmrs:2
          ,UserAppChild:[{bmjt:"李四的家",cyrs:3,bmsj:"2018/7/4  9:00:00",sfcj:"是",dzzzdz:"点赞",zzzdz:"点赞"},
          {bmjt:"王五的家",cyrs:3,bmsj:"2018/7/5  9:00:00",sfcj:"是",dzzzdz:"不点赞",zzzdz:"点赞"}
          
          ]
          }
            ]
      }
    },
    methods: {
      search(){
         let data= this.tableData.filter(r=>r.userName.includes(this.searchObj.keyword))
         this.showData=[];
         data.forEach((x,i) => 
           {  
                if(i>=(this.currentPage-1)*this.pageSize1&&i<this.currentPage*this.pageSize1)
                {
                  this.showData.push(x); 
                }
           });
           this.total=data.length;
      },
      cancelEdit(row){
      row.edit=false
      this.search()
      },
      update(row){
        debugger
        let content="",v=""
        if(row.zt=="1"){
           content="此操作将禁用(用户"+row.userName+"), 是否继续"
           v="0"
        }else{
            content="此操作将启用(用户"+row.userName+"), 是否继续"
            v="1"
        }
        this.$confirm(content, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          row.zt=v
          this.search()
          this.$message({
            type: 'success',
            message: '成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
      },
      handleSizeChange(val) {  
           this.pageSize1=val;
           this.search();
       },
      handleCurrentChange(val) {
           this.currentPage=val;
           this.search();
      }
    }
  }
</script>
<style lang="scss" scoped>
 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
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


