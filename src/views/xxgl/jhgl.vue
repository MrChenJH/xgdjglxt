<template>
  <div> 
 <el-row :gutter="20">
   <el-col :span="5" > 
     <el-button  size="small"  type="primary" @click="dialogFormVisible=true">添加</el-button>
     <el-button  size="small" @click="removeAll"  type="danger">删除</el-button>
   </el-col>



</el-row>
<el-row :gutter="20">
  <el-col :span="4" >   
 
    <el-input v-model="searchObj.keyword" placeholder="项目描述"></el-input>
  
   </el-col>

   <el-col :span="1" >
     <el-button type="primary" @click="search">查询</el-button>
     </el-col>
  

</el-row>
<el-row  :gutter="20">
    <el-col :span="24" > 
     <el-table :data="showData"  border fit highlight-current-row style="width: 100%" @select="select" @select-all="select">
         <el-table-column align="center"
             type="selection"
             width="55">
            
         </el-table-column> 

  
      
      
      <el-table-column min-width="400px"  label="项目描述" align="center" >
       <template slot-scope="scope"> 
           <template v-if="scope.row.edit">
               <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="描述"
              v-model="scope.row.describe">
            </el-input>
        
          </template> 
         <span v-else>{{scope.row.describe}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px"  label="推荐豆值" align="center" >
       <template slot-scope="scope"> 
           <template v-if="scope.row.edit">
            <el-input v-model="scope.row.gsScore" placeholder="推荐豆值"></el-input>
          </template> 
        <span v-else>{{scope.row.gsScore}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" label="标签" align="center">
        <template slot-scope="scope"> 
         <template v-if="scope.row.edit">

             <el-select v-model="scope.row.tags"  placeholder="所属区域" >
    <el-option
      v-for="item in tags"
      :key="item.value"
      :label="item.value"
      :value="item.value">
    </el-option>
  </el-select> 
           
        </template>
          <span  v-else>{{scope.row.tags}}</span>
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
<el-dialog title="计划管理" :visible.sync="dialogFormVisible" >
     
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
  <el-row> 
 
    <el-col :span="3" :offset="1"  style="text-align: right;    padding-right: 5px;"><span class="textSpan"> 推荐豆值:</span></el-col> 
    <el-col :span="19"><el-input  v-model="saveObj.gsScore"/></el-col>
  </el-row> 
  <el-row > 
   <el-col :span="3" :offset="1"   style="text-align: right;    padding-right: 5px;"><span     class="textSpan">项目描述:</span></el-col> 
   <el-col :span="19">   <el-input  v-model="saveObj.describe"  type="textarea"  :rows="4"/></el-col> 

 </el-row>
   <el-row > 
   <el-col :span="3" :offset="1"   style="text-align: right;    padding-right: 5px;"><span     class="textSpan">标签:</span></el-col> 
   <el-col :span="19">   
 
                <el-select v-model="saveObj.tags"  placeholder="所属区域" >
    <el-option
      v-for="item in tags"
      :key="item.value"
      :label="item.value"
      :value="item.value">
    </el-option>
  </el-select> 
     </el-col> 
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

import {Get,Del,Update,Add} from '@/api/jh'
 import {exportToCsv,GetParams} from '@/utils/tool'

 export default {
  
    components: {
    TableDefined
  },
  props:{

  },
  mounted(){  
 
    
          this.tags=GetParams().filter(t=>t.typeName=="标签")
             Get(5,1).then(t=>{
               this.total=t.total
               this.showData= t.data
             })
          
          
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
        listLoading: true,
        innerVisible:false,
        searchObj:{
           keyword:''
         },
         saveObj:{
           describe:"",
           tags:"",
           gsScore:"0",
           projectId:0
      
         },
        currentPage: 1,
        dialogFormVisible:false,
        showData:[],
        tags:[]
       
      }
    } , methods: {
     
   
   
      search(){ 

          Get(this.pageSize1,this.currentPage,this.searchObj.keyword).then(t=>{
                this.showData=t.data
                 this.total=t.total
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
             Del(item.projectId).then(t=>{
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
            

             Del(row.projectId).then(t=>{
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
         Update(row.projectId,row).then(t=>{
           this.edit=false
         })
      },

     Save(){   
       
       Add(this.saveObj).then(t=>{
      this.dialogFormVisible=false
      this.search()
       })
 
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


