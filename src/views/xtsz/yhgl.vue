<template>
  <div> 
     <el-row :gutter="20">
 <el-col :span="1" > <el-button  size="small"  type="primary" @click="dialogFormVisible=true">添加</el-button></el-col>
  
</el-row>
  <el-row :gutter="20">
  <el-col :span="3" >   
    <el-input   v-model="searchObj.keyword" placeholder="关键字"></el-input> 
   
   </el-col>
     <el-col :span="4"  >     
        <el-select v-model="searchObj.ssqu" placeholder="所属区域" >
    <el-option
      v-for="item in ssqy"
      :key="item.name"
      :label="item.name"
      :value="item.name">
    </el-option>
  </el-select> 
   </el-col>
   <el-col :span="8" >   
   <el-date-picker
      v-model="searchObj.date"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
                 </el-col>
   <el-col :span="1" >
     <el-button type="primary" @click="search">查询</el-button>
     </el-col>
  
</el-row>
<el-row  :gutter="20">
    <el-col :span="24" > 
     <el-table :data="showData"  border fit highlight-current-row style="width: 100%" >
   

    <el-table-column align="center" label="序号"  width="50"   fixed="left">
          <template slot-scope="scope"> 
            <span>{{scope.row.id}}</span>
        </template>
   </el-table-column> 
        <el-table-column align="center" label="用户名" width="80" >
        <template slot-scope="scope">  
         
            <span >{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      
      <el-table-column min-width="100px"  label="真实姓名" align="center"  >
       <template slot-scope="scope"> 
         
         <span >{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px"  label="性别" align="center" >
          <template slot-scope="scope"> 
        <span >{{scope.row.sex}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" label="出生年月" align="center">
        <template slot-scope="scope"> 
     
          <span  >{{scope.row.brithDay}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" label="联系方式" align="center" >
        <template slot-scope="scope">
             <span>{{scope.row.lxfx}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" width="190"  label="所属区域" align="center" >
        <template slot-scope="scope"> 
           <span>{{scope.row.ssqy}}</span>
        </template>
      </el-table-column>
     
     
      <el-table-column class-name="status-col" width="190"  label="家庭住址" align="center" >
        <template slot-scope="scope"> 
           <span>{{scope.row.jtzz}}</span>
        </template>
      </el-table-column>
      
         <el-table-column class-name="status-col" width="190"  label="用户角色" align="center" >
        <template slot-scope="scope"> 
           <span>{{scope.row.yhjs}}</span>
        </template>
      </el-table-column>
    
       <el-table-column class-name="status-col" width="190"  label="状态" align="center" fixed="right">
        <template slot-scope="scope"> 
           <span>{{scope.row.zt=="1"?"启用":"禁用"}}</span>
        </template>
      </el-table-column>
     <el-table-column align="center" label="操作" width="200px"   fixed="right">
        <template slot-scope="scope">
          <template v-if="scope.row.zt=='1'">
          <el-button type="primary"  @click='update(scope.row)' size="small">禁用</el-button> 
          </template>
          <template v-else>
             <el-button type="danger"  @click='update(scope.row)' size="small">启用</el-button> 
          </template>
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

<el-dialog
     top="5vh"
      width="85%"
      title="添加管理员"
      :visible.sync="dialogFormVisible"
       >
       <el-row :gutter="20">
       <el-col :span="24">
    <el-table :data="showData"  border fit highlight-current-row style="width: 100%"  height="250px">
   
   <el-table-column align="center"
             type="selection"
             width="55">
            
         </el-table-column> 
    <el-table-column align="center" label="序号"  width="50"   fixed="left">
          <template slot-scope="scope"> 
            <span>{{scope.row.id}}</span>
        </template>
   </el-table-column> 
        <el-table-column align="center" label="用户名" width="80" >
        <template slot-scope="scope">  
         
            <span >{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      
      <el-table-column min-width="100px"  label="真实姓名" align="center"  >
       <template slot-scope="scope"> 
         
         <span >{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px"  label="性别" align="center" >
          <template slot-scope="scope"> 
        <span >{{scope.row.sex}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" label="出生年月" align="center">
        <template slot-scope="scope"> 
     
          <span  >{{scope.row.brithDay}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" label="联系方式" align="center" >
        <template slot-scope="scope">
             <span>{{scope.row.lxfx}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" width="190"  label="所属区域" align="center" >
        <template slot-scope="scope"> 
           <span>{{scope.row.ssqy}}</span>
        </template>
      </el-table-column>
     
     
      <el-table-column class-name="status-col" width="190"  label="家庭住址" align="center" >
        <template slot-scope="scope"> 
           <span>{{scope.row.jtzz}}</span>
        </template>
      </el-table-column>
      
         <el-table-column class-name="status-col" width="190"  label="用户角色" align="center" >
        <template slot-scope="scope"> 
           <span>{{scope.row.yhjs}}</span>
        </template>
      </el-table-column>
    
       <el-table-column class-name="status-col" width="190"  label="状态" align="center" fixed="right">
        <template slot-scope="scope"> 
           <span>{{"启用"}}</span>
        </template>
      </el-table-column>
   
    </el-table>
       </el-col>
       </el-row>
       
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible=false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible=false">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>
<script>

 import  TableDefined from '@/components/TableDefined'
 import  {office,addRole,RoleS}  from '@/api/role'
 import  {Users} from '@/api/user'
 import {exportToCsv} from '@/utils/tool'

 export default {
  
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
          {id:1,userName:"amdin",name:'张三' ,sex:"0",brithDay:"1990-10-1",lxfx:'18889999999',ssqy:"上海",jtzz:"上海静安",zt:"1",yhjs:"普通用户",keyword:"小",edit:false},
          {id:2,userName:"sys1",name:'李四' ,sex:"1",brithDay:"1990-10-1",lxfx:'18889999999',ssqy:"上海",jtzz:"上海静安",zt:"1",yhjs:"普通用户",keyword:"小",edit:false},
          {id:3,userName:"sys3",name:'王五' ,sex:"1",brithDay:"1990-10-1",lxfx:'18889999999',ssqy:"上海",jtzz:"上海静安",zt:"1",yhjs:"普通用户",keyword:"小",edit:false},
          {id:4,userName:"sys4",name:'王麻子' ,sex:"1",brithDay:"1990-10-1",lxfx:'18889999999',ssqy:"上海",jtzz:"上海静安",zt:"1",yhjs:"普通用户",keyword:"小",edit:false},
          {id:5,userName:"sys5",name:'小花' ,sex:"1",brithDay:"1990-10-1",lxfx:'18889999999',ssqy:"上海",jtzz:"上海静安",zt:"1",yhjs:"普通用户",keyword:"小",edit:false},
          {id:6,userName:"sys6",name:'肖名' ,sex:"1",brithDay:"1990-10-1",lxfx:'18889999999',ssqy:"上海",jtzz:"上海静安",zt:"1",yhjs:"普通用户",keyword:"小",edit:false},
          {id:7,userName:"sys7",name:'小六子' ,sex:"1",brithDay:"1990-10-1",lxfx:'18889999999',ssqy:"上海",jtzz:"上海静安",zt:"1",yhjs:"普通用户",keyword:"小",edit:false},
          {id:8,userName:"sys8",name:'小明' ,sex:"1",brithDay:"1990-10-1",lxfx:'18889999999',ssqy:"上海",jtzz:"上海静安",zt:"1",yhjs:"普通用户",keyword:"小",edit:false},
          {id:9,userName:"sys9",name:'小花' ,sex:"1",brithDay:"1990-10-1",lxfx:'18889999999',ssqy:"上海",jtzz:"上海静安",zt:"1",yhjs:"普通用户",keyword:"小",edit:false},
          {id:10,userName:"sys10",name:'狗娃仔' ,sex:"1",brithDay:"1990-10-1",lxfx:'18889999999',ssqy:"上海",jtzz:"上海静安",zt:"1",yhjs:"普通用户",keyword:"小",edit:false},
          {id:11,userName:"sys11",name:'迷宫' ,sex:"1",brithDay:"1990-10-1",lxfx:'18889999999',ssqy:"上海",jtzz:"上海静安",zt:"1",yhjs:"普通用户",keyword:"小",edit:false},
          {id:12,userName:"sys12",name:'默默' ,sex:"1",brithDay:"1990-10-1",lxfx:'18889999999',ssqy:"上海",jtzz:"上海静安",zt:"1",yhjs:"普通用户",keyword:"小",edit:false},
          {id:13,userName:"sys13",name:'啥啥' ,sex:"1",brithDay:"1990-10-1",lxfx:'18889999999',ssqy:"上海",jtzz:"上海静安",zt:"1",yhjs:"普通用户",keyword:"小",edit:false},
          {id:14,userName:"sys14",name:'天天' ,sex:"1",brithDay:"1990-10-1",lxfx:'18889999999',ssqy:"上海",jtzz:"上海静安",zt:"1",yhjs:"普通用户",keyword:"小",edit:false},
          {id:15,userName:"sys15",name:'好好' ,sex:"1",brithDay:"1990-10-1",lxfx:'18889999999',ssqy:"上海",jtzz:"上海静安",zt:"1",yhjs:"普通用户",keyword:"小",edit:false},
          {id:16,userName:"sys16",name:'李峰' ,sex:"1",brithDay:"1990-10-1",lxfx:'18889999999',ssqy:"上海",jtzz:"上海静安",zt:"1",yhjs:"普通用户",keyword:"小",edit:false},
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


