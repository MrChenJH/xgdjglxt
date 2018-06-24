<template>
  <div> 
 <el-row :gutter="20">
   <el-col :span="1" > <el-button  size="small"  type="primary" @click="dialogFormVisible=true">添加</el-button></el-col>
   <el-col :span="1" style="padding-left: 20px;"><el-button  size="small" @click="removeAll"  type="danger">删除</el-button></el-col>
</el-row>

<el-row  :gutter="20">
    <el-col :span="24" > 
     <el-table :data="showData"  border fit highlight-current-row style="width: 100%" @select="select" @select-all="select">
         <el-table-column align="center"
             type="selection"
             width="55">
       </el-table-column> 

    <el-table-column align="center" label="序号"  width="50">
          <template slot-scope="scope"> 
            <span>{{scope.row.id}}</span>
        </template>
   </el-table-column> 
        <el-table-column align="center" label="支付名称" width="180">
        <template slot-scope="scope"> 
            <template v-if="scope.row.edit">
            <el-input type="text" v-model="scope.row.zfmc"/>
           </template> 
        <span v-else>{{scope.row.zfmc}}</span>
        </template>
      </el-table-column>
      
      <el-table-column min-width="400px"  label="接口地址" align="center" >
       <template slot-scope="scope"> 
           <template v-if="scope.row.edit">
                <el-input type="text" v-model="scope.row.jkdz"/>
        
          </template> 
         <span v-else>{{scope.row.jkdz}}</span>
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
      :page-sizes="[5,10, 20, 30, 40]"
      :page-size="pageSize1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-col>
     
</el-row>


  <el-dialog
      width="30%"
      title="提示"
      :visible.sync="innerVisible1" > 
         <el-row> 
           <el-col :span="24" style="color: red;padding-right: 5px;">
            {{alertcontent}}
           </el-col>
           </el-row> 
    </el-dialog>
<el-dialog title="接口设置" :visible.sync="dialogFormVisible" >
     
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

 
   <el-row > 
   <el-col :span="3" :offset="1"   style="text-align: right;    padding-right: 5px;"><span     class="textSpan">支付名称:</span></el-col> 
   <el-col :span="20">   <el-input  type="text" v-model="saveObj.zfmc"/></el-col> 
  </el-row>
 
 <el-row > 
   <el-col :span="3" :offset="1"   style="text-align: right;    padding-right: 5px;"><span     class="textSpan">接口地址:</span></el-col> 
   <el-col :span="20">   <el-input  type="text" v-model="saveObj.jkdz"/></el-col> 
  </el-row>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="Save">确 定</el-button>
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
 
      this.restaurants = this.loadAll();
   
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
         restaurants: [],
        state4: '',
        timeout:  null,
        innerVisible1:false,
        alertcontent:'',
        sUserName:'',
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
         xmlx:[
            {name:"系统预设项目"},
            {name:"自定义项目"},
            {name:"活动项目"}
        ],
        searchObj:{
           keyword:'',
           date:[],
           ssqy:''
         },
         saveObj:{
           zfmc:"",
           jkdz:"",
           score:0,
           fre:0
         },
        currentPage: 1,
        dialogFormVisible:false,
        showData:[],
        tableData:[
           {id:1,zfmc:"支付宝",jkdz:'http://xxxxxxx',edit:false},
           {id:2,zfmc:"微信",jkdz:'http://xxxxxxx' ,edit:false},
          ]
      }
    } , methods: {
       loadAll() {
        return [
          { "value": "用户1" },
          { "value": "admin" },
          { "value": "sys" },
          { "value": "sys1" },
          { "value": "sys2" },
          { "value": "sys3" },
          { "value": "sys4" },
          { "value": "sys5" },
          { "value": "sys6" },
          { "value": "sys7" },
          { "value": "sys8" },
          { "value": "sys9" },
          { "value": "sys10" }
         ];
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      }
    
      ,
      search(){
         let data= this.tableData.filter(r=>r.userName.includes(this.sUserName))
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
               let index=this.tableData.findIndex(r=>r.id==item.id) 
               this.tableData.splice(index,1);
        })
      
        this.search()
              this.$message({
           message: '删除成功',
           type: 'success'
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
    
        let i= this.tableData.findIndex(r=>r.id==row.id)
        console.log(i);
        this.tableData.splice(i,1);
        this.search()
              this.$message({
           message: '删除成功',
           type: 'success'
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
             row.edit = false
      },

     Save(){   
       
       this.search();
       this.dialogFormVisible=false; 
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


