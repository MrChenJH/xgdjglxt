<template>
  <div> 
 <el-row :gutter="20">
   <el-col :span="1" > <el-button  size="small"  type="primary" @click="dialogFormVisible=true">添加</el-button></el-col>
   <el-col :span="1" style="padding-left: 20px;"><el-button  size="small" @click="removeAll"  type="danger">删除</el-button></el-col>
</el-row>
<el-row :gutter="20">
<el-col :span="5" style="padding-left: 10px;padding-right:0px">  
   <el-input   v-model="sUserName" placeholder="请输入登录名"></el-input></el-col>
   <el-col :span="1" ><el-button type="primary" @click="search">查询</el-button></el-col>
   <el-col :span="2" style="padding-left: 40px;" ><el-button type="primary" @click="exprot"> 导出</el-button></el-col>
</el-row>
<el-row  :gutter="20">
    <el-col :span="24" > 
     <el-table :data="showData"  border fit highlight-current-row style="width: 100%" @select="select" @select-all="select">
         <el-table-column align="center"
             type="selection"
             width="55">
            
         </el-table-column> 


        <el-table-column align="center" label="姓名" width="80">
        <template slot-scope="scope"> 
            <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      
      <el-table-column min-width="100px"  label="登录名" align="center" >
       <template slot-scope="scope"> 
           <template v-if="scope.row.edit">
            <el-input v-model="scope.row.userName" placeholder="请输入内容"></el-input>
          </template> 
         <span v-else>{{scope.row.userName}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px"  label="密码" align="center" >
       <template slot-scope="scope"> 
           <template v-if="scope.row.edit">
            <el-input v-model="scope.row.pwd" placeholder="请输入密码"></el-input>
          </template> 
        <span v-else>{{scope.row.pwd}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" label="权限菜单" align="center">
        <template slot-scope="scope"> 
         <template v-if="scope.row.edit">
           <Select v-model="scope.row.m1" filterable   multiple :transfer='true' >
              <Option v-for="item in cs2" :value="item.name" :key="item.name">{{ item.name }}</Option>
            </Select>
        </template>
          <span  v-else>{{scope.row.m1.join(',')}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" label="创建人" align="center" >
        <template slot-scope="scope">
             <span>{{scope.row.creator}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" width="190"  label="创建时间" align="center" >
        <template slot-scope="scope"> 
           <span>{{scope.row.creatTime}}</span>
        </template>
      </el-table-column>


     <el-table-column align="center" label="操作" width="200px">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
          <el-button  type="success" @click="update(scope.row)"          size="small" >保存</el-button>
          <el-button  type="warning" @click="cancelEdit(scope.row)"      size="small">取消</el-button>
          </template>
          <template v-else>
          <el-button type="primary" @click='scope.row.edit=!scope.row.edit' size="small">编辑</el-button> 
          <el-button type="danger"  @click='remove(scope.row)' size="small">删除</el-button> 
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
     :page-sizes="[10,15, 20, 25, 30]"
      :page-size="pageSize1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-col>
     
</el-row>


  <el-dialog
      width="30%"
      title="提示"
      :visible.sync="innerVisible1"
      > 
         <el-row> 
           <el-col :span="24" style="color: red;padding-right: 5px;">
            {{alertcontent}}
           </el-col>
           </el-row> 
    </el-dialog>
<el-dialog title="权限管理" :visible.sync="dialogFormVisible" >
     
     <el-dialog
      width="30%"
      title="提示"
      :visible.sync="innerVisible"
      custom-class=""
      append-to-body> 
         <el-row> 
           <el-col :span="24" style="color: red;padding-right: 5px;">
            {{alertcontent}}
           </el-col>
           </el-row> 
    </el-dialog>
    <el-form :model="obj" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
 
  <el-row> 
     <el-col :span="11" >
        <el-form-item label="姓名:" prop="name">
           <el-input type="text" v-model="obj.Name"/>
        </el-form-item>
     </el-col>
    
       <el-col :span="11" >
        <el-form-item label="登录名:" prop="userName">
               <el-input  v-model="obj.UserName"/>
        </el-form-item>
     </el-col>
    
  </el-row> 
  <el-row > 

      <el-col :span="11" >
        <el-form-item label="密码:" prop="pwd">
           <el-input  type="password" v-model="obj.Pwd"/>
        </el-form-item>
     </el-col>
    
       <el-col :span="11" >
        <el-form-item label="确认密码:" prop="repassword">
           <el-input type="password"  v-model="obj.repassword"/>
        </el-form-item>
     </el-col>
   </el-row>
<el-row :gutter="5">  
     <el-col :span="22" >
        <el-form-item label="菜单:" prop="M1">
          <el-checkbox-group  v-model="obj.M1">
            <el-checkbox v-for="city in  cs2" :label="city.name" :key="city.name">{{city.name}}</el-checkbox>
           </el-checkbox-group>
         </el-form-item>
     </el-col>
     </el-row >  
    </el-form>
  
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="Save">确 定</el-button>
  </div>

</el-dialog>

</div>
</template>
<script>

 import  TableDefined from '@/components/TableDefined'

import {Get,Del,Update,Add} from '@/api/user'
 import {exportToCsv} from '@/utils/tool'

 export default {
    methods: {
      exprot(){ 
        let data=this.tableData;
        data.unshift( {id:"序号",name:"姓名",userName:'登录名' ,pwd:"密码",officeName:"归口办公室",creator:'创建人',creatTime:"创建时间",edit:false},);
        exportToCsv("用户权限.csv",data)
      },
      search(){ 

          Get(this.pageSize1,this.currentPage).then(t=>{ 
            debugger
              t.data.map(t=>{
               return Object.assign(t,{m1:t.menus.split(",")})
             })
             
            this.total=t.total
            this.showData=t.data
    })
      
      },
      select(r,i){
        this.selectRows=[]
        this.selectRows=r
      },
      removeAll(){
            if(this.selectRows.length==0){

              this.innerVisible1=true,
              this.alertcontent="请选择要删除数据"
        }
        if(!this.innerVisible1){
           this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.selectRows.forEach((item,i)=>{
           Del(item.userName).then(t=>{

   this.search()
              this.$message({
           message: '删除成功',
           type: 'success'
          })
           })
        })
      
     
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
}
      
      },
      remove(row)
      { 
        
          this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
       
         Del(row.userName).then(t=>{

   this.search()
              this.$message({
           message: '删除成功',
           type: 'success'
          })
           })
     
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

       
      },
      cancelEdit(row){
      row.edit=false
      this.search()

      },
      update(row){
        row.menus=row.m1.join(",")
         Update(row.userName,row).then(t=>{
           row.edit=false
         })
      },

     Save(){  

         this.$refs["ruleForm"].validate((valid) => {
          if (valid) { 
             if(this.obj.Pwd!=this.obj.repassword&&!this.innerVisible){
                this.alertcontent="密码和确认密码不一致"; 
                this.innerVisible=true
            }
              
            if(!this.innerVisible){
               this.obj.Menus= this.obj.M1.join(",")
               delete this.obj["repassword"]
               delete this.obj["M1"]
             Add(this.obj).then(t=>{
              this.$refs["ruleForm"].resetFields();
              this.$message({
                 message: '保存成功',
                 type: 'success'
               })
                 this.search()
                 this.dialogFormVisible=false; 

             })
           
         
            }
      
         
               
          } else {
            console.log('error submit!!');
            return false;
          }
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
    },
    components: {
    TableDefined
  },
  props:{

  },
  mounted(){  
    

    Get(5,1).then(t=>{ 
            debugger
              t.data.map(t=>{
               return Object.assign(t,{m1:t.menus.split(",")})
             })
             
            this.total=t.total
            this.showData=t.data
    })
         
         
     },
    data() {
      return {

        innerVisible1:false,
        alertcontent:'',
        sUserName:'',
        total:400,
        pageSize1:10,
        selectRows:[],
   
        cs2:[
         {name:"用户管理"},
    {name:"系统计划管理"},
    {name:"家庭计划管理"},
    {name:"小鬼计划列表"},
    {name:"充值记录管理"},
    {name:"结算单管理"},
    {name:"会员标准设置"},
    {name:"花费预算管理"},
    {name:"线下活动管理"},
    {name:"金银豆明细"},
    {name:"家庭豆明细"},
    {name:"积分管理"},

    {name:"接口配置"},
    {name:"参数设置"},
    {name:"登录日志"},
    {name:"操作日志"},
    {name:"管理员管理"},
    {name:"数据备份管理"}
         ],
        listLoading: true,
        innerVisible:false,
        obj:{
           Name:'',
           UserName:'',
           Pwd:'',
           repassword:'',
           Menus:"",
           CreatTime:new Date(),
           Creator:"",
           M1:[]
          },
          
            rules: {
          Name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          
          ],
          UserName: [
            { required: true, message: '请输入登录名', trigger: 'blur' }
          ],
          Pwd: [
           { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          repassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' }
          ],
          M1: [
            { type: 'array', required: true, message: '请至少选择一个菜单', trigger: 'change' }
          ]
         
        },
        currentPage: 1,
        dialogFormVisible:false,
        showData:[]
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

.el-checkbox-group label{
    width: 170px
  }
.el-checkbox+.el-checkbox {
    margin-left: 0px; 
    width: 170px
}
</style>


