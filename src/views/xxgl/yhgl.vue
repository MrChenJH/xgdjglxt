<template>
<section>
  <el-row :gutter="20" style="padding-top:10px">
  <el-col  :span="20" >   
    <el-input   v-model="searchObj.keyword" placeholder="关键字" style="width:200px" ></el-input> 
             <el-select v-model="searchObj.ssqy"  placeholder="所属区域" >
    <el-option
      v-for="item in ssqy"
      :key="item.value"
      :label="item.value"
      :value="item.value">
    </el-option>
  </el-select> 
    <el-button type="primary" @click="search">查询</el-button>
   </el-col>
   
  
</el-row>
<el-row  :gutter="20">
    <el-col :span="24" > 
     <el-table :data="showData"  border fit highlight-current-row style="width: 100%"  >
     <el-table-column type="expand" > 
           
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="用户名:">
            <span>{{ props.row.userName }}</span>
          </el-form-item>
          <el-form-item label="真实姓名:">
            <span>{{ props.row.name }}</span>
          </el-form-item>
       
          <el-form-item label="性别:">
            <span>{{ props.row.sex }}</span>
          </el-form-item>
          <el-form-item label="出生年月:">
            <span>{{ props.row.brithDay }}</span>
          </el-form-item>
          <el-form-item label="联系方式:">
            <span>{{ props.row.lxfx }}</span>
          </el-form-item>
          <el-form-item label="所属区域:">
            <span>{{ props.row.ssqy }}</span>
          </el-form-item>

               <el-form-item label="家庭住址:">
            <span>{{ props.row.jtzz }}</span>
          </el-form-item>

                     <el-form-item label="用户角色:">
            <span>{{ props.row.yhjs }}</span>
          </el-form-item>
           <el-form-item label="家庭子账号:" style="width:100%">
               <el-table :data=" props.row.UserAppChild"  border fit highlight-current-row style="width: 100%" stripe >
                 
        <el-table-column align="center" label="用户名" style="width: 100%" >
        <template slot-scope="scope">  
          <span >{{scope.row.userName}}</span>
        </template>
      </el-table-column>
    <el-table-column class-name="status-col" label="用户角色" align="center" min-width="200" >
        <template slot-scope="scope"> 
           <span>{{scope.row.yhjs}}</span>
        </template>
      </el-table-column>
          <el-table-column class-name="status-col" label="真实姓名" align="center" min-width="200" >
        <template slot-scope="scope"> 
           <span>{{scope.row.zsxm}}</span>
        </template>
      </el-table-column>
         <el-table-column class-name="status-col" label="性别" align="center"  min-width="200">
        <template slot-scope="scope"> 
           <span>{{scope.row.sex}}</span>
        </template>
      </el-table-column>
              <el-table-column class-name="status-col" label="生日" align="center"   min-width="200">
        <template slot-scope="scope"> 
           <span>{{scope.row.bri}}</span>
        </template>
      </el-table-column>
               </el-table>
          </el-form-item>
        </el-form> 
      </template>
    </el-table-column>
        <el-table-column align="center" label="用户名">
        <template slot-scope="scope">  
          <span >{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      
     

     
      
         <el-table-column class-name="status-col" label="用户角色" align="center" >
        <template slot-scope="scope"> 
           <span>{{scope.row.yhjs}}</span>
        </template>
      </el-table-column>
    
       <el-table-column class-name="status-col"   label="状态" align="center" >
        <template slot-scope="scope"> 
           <span>{{scope.row.zt=="1"?"启用":"禁用"}}</span>
        </template>
      </el-table-column>
     <el-table-column align="center" label="操作" width="200px" fixed="right" >
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
</section>
</template>
<script>

 import  TableDefined from '@/components/TableDefined'
 import SelectDq  from '@/components/SelectDq'
 import  {Users} from '@/api/user'
 import {exportToCsv,GetParams} from '@/utils/tool'

 export default {
  
    components: {
    TableDefined,
    SelectDq
  },
  props:{

  },
  mounted(){   
    debugger
          this.ssqy=GetParams().filter(t=>t.typeName=="所属区域")
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
          {id:1,userName:"amdin",name:'张三' ,sex:"男",brithDay:"1990-10-1",lxfx:'18889999999',ssqy:"上海",jtzz:"上海静安",zt:"1",yhjs:"家庭管理员",keyword:"小",edit:false,UserAppChild:[{yhjs:"观察员",userName:"tian1",zsxm:"陈晓",sex:"男",bri:"1990-01-12"},{yhjs:"小鬼",userName:"xy",zsxm:"陶明",sex:"男",bri:"1990-01-12"}]},
          {id:2,userName:"sys1",name:'李四' ,sex:"男",brithDay:"1990-10-1",lxfx:'18889999999',ssqy:"上海",jtzz:"上海静安",zt:"1",yhjs:"家庭管理员",keyword:"小",edit:false,UserAppChild:[{yhjs:"观察员",userName:"tian1",zsxm:"赵晓",sex:"男",bri:"1990-01-12"},{yhjs:"小鬼",userName:"xy",zsxm:"陈坤",sex:"男",bri:"1990-01-12"}]},
          {id:3,userName:"sys3",name:'王五' ,sex:"男",brithDay:"1990-10-1",lxfx:'18889999999',ssqy:"上海",jtzz:"上海静安",zt:"1",yhjs:"家庭管理员",keyword:"小",edit:false,UserAppChild:[{yhjs:"观察员",userName:"tian1",zsxm:"李晓",sex:"男",bri:"1990-01-12"},{yhjs:"小鬼",userName:"xy",zsxm:"陈乐",sex:"男",bri:"1990-01-12"}]},
          {id:4,userName:"sys4",name:'王麻子' ,sex:"男",brithDay:"1990-10-1",lxfx:'18889999999',ssqy:"上海",jtzz:"上海静安",zt:"1",yhjs:"家庭管理员",keyword:"小",edit:false,UserAppChild:[{yhjs:"观察员",userName:"tian1",zsxm:"于晓",sex:"男",bri:"1990-01-12"},{yhjs:"小鬼",userName:"xy",zsxm:"王晓",sex:"男",bri:"1990-01-12"}]},
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


