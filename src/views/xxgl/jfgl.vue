<template>
  <div> 
 <el-row :gutter="20">
   <el-col :span="1" > <el-button  size="small"  type="primary" @click="dialogFormVisible=true">添加</el-button></el-col>
   <el-col :span="1" style="padding-left: 20px;"><el-button  size="small" @click="removeAll"  type="danger">删除</el-button></el-col>
  
</el-row>
<el-row :gutter="20">
  <el-col :span="4" >   
<el-input
  placeholder="积分获取项目"
  v-model="searchObj.jfhqxm" >

</el-input>
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

        <el-table-column align="center" label="积分获取项目"  width="190px">
        <template slot-scope="scope"> 
            <template v-if="scope.row.edit">
            <el-input v-model="scope.row.ationName" placeholder="积分获取项目"></el-input>
          </template> 
            <span v-else>{{scope.row.ationName}}</span>
        </template>
      </el-table-column>
      
      <el-table-column min-width="190px"  label="积分类型"  align="center" >
       <template slot-scope="scope"> 
           <template v-if="scope.row.edit">
        <el-select v-model="scope.row.jfType" placeholder="积分类型">
        <el-option
             v-for="item in jflx"
             :key="item.name"
             :label="item.name"
            :value="item.name">
       </el-option>
       </el-select>
           
          </template> 
         <span v-else>{{scope.row.jfType}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="190px"  label="项目类型" align="center" >
       <template slot-scope="scope"> 
           <template v-if="scope.row.edit">
                  <el-select v-model="scope.row.ationType" placeholder="项目类型">
                <el-option
             v-for="item in xmlx"
             :key="item.name"
             :label="item.name"
            :value="item.name">
       </el-option>
       </el-select>
           
          </template> 
        <span v-else>{{scope.row.ationType}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="400px" label="描述" align="center">
        <template slot-scope="scope"> 
         <template v-if="scope.row.edit">
             <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="描述"
              v-model="scope.row.describe">
            </el-input>
            
        </template>
          <span  v-else>{{scope.row.describe}}</span>
        </template>
      </el-table-column>
    

    
      
      <el-table-column min-width="100px" label="默认积分值" align="center">
        <template slot-scope="scope"> 
         <template v-if="scope.row.edit">
             <el-input v-model="scope.row.moRenScore" placeholder="描述"></el-input>
        </template>
          <span  v-else>{{scope.row.moRenScore}}</span>
        </template>
      </el-table-column>
     <el-table-column align="center" label="操作" width="400px" fixed="right">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
          <el-button  type="success" @click="update(scope.row)"          size="small" >保存</el-button>
          <el-button  type="warning" @click="cancelEdit(scope.row)"      size="small">取消</el-button>
          </template>
          <template v-else>
          <el-button type="primary" @click='scope.row.edit=!scope.row.edit' size="small">编辑</el-button> 
          <el-button type="danger"  @click='remove(scope.row)' size="small">删除</el-button> 
          <el-button  size="small" @click='qyShow(scope.row)'  type="success">区域积分设置</el-button>
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
      title="区域积分管理"
      :visible.sync="showqujf" >
       <el-row :gutter="20">
   <el-col :span="2" >
        <el-button  size="small"  type="primary" @click="qyAdd">添加</el-button></el-col>
 </el-row> 
<el-row :gutter="20">
    
  <el-col :span="20" > 
      <el-input
  placeholder="积分获取项目"
  v-model="qyjfobj.ationName" style="width:200px"
  :disabled="true">
</el-input>  
 <el-input
  placeholder="项目类型"
  v-model="qyjfobj.ationType"  style="width:200px"
  :disabled="true">
</el-input>

 <el-input
  placeholder="积分类型"
  v-model="qyjfobj.jfType"  style="width:200px"
  :disabled="true">
</el-input>
  </el-col>

</el-row>
<el-row  :gutter="20">
    <el-col :span="24" > 
     <el-table :data="qyShowData"  
     border
      fit
       highlight-current-row 
       style="width: 100%"
        height="300">
        
      <el-table-column min-width="190px"  label="所属区域"  align="center" >
       <template slot-scope="scope"> 
           <template v-if="scope.row.edit">
                    <template v-if="scope.row.add">
                 <el-select v-model="scope.row.ssQy"  placeholder="所属区域" >
    <el-option
      v-for="item in ssqy"
      :key="item.value"
      :label="item.value"
      :value="item.value">
    </el-option>
  </el-select> 
               </template> 

            <template v-else>
    <el-select v-model="scope.row.ssQy"  disabled  placeholder="所属区域" >
    <el-option
      v-for="item in ssqy"
      :key="item.value"
      :label="item.value"
      :value="item.value">
    </el-option>

  </el-select> 
           </template> 
          </template> 
         <span v-else>{{scope.row.ssQy}}</span>
        </template>
      </el-table-column>

        <el-table-column align="center" label="区域积分值"  width="100px">
        <template slot-scope="scope"> 
           <template v-if="scope.row.edit">
            <el-input v-model="scope.row.qyScore" placeholder="区域积分值"></el-input>
          </template> 
            <span v-else>{{scope.row.qyScore}}</span>
        </template>
      </el-table-column>
      


    <el-table-column min-width="200px" label="启用时间" align="center">
        <template slot-scope="scope"> 
         <template v-if="scope.row.edit">
        <el-date-picker
      v-model="scope.row.qyTime"
      type="date"
      placeholder="启用时间">
    </el-date-picker>
        </template>
          <span  v-else>{{new Date( scope.row.qyTime).format("yyyy-MM-dd hh:mm:ss")}}</span>
        </template>
      </el-table-column>
    

     <el-table-column min-width="200px" label="停用时间" align="center">
        <template slot-scope="scope"> 
         <template v-if="scope.row.edit">
         <el-date-picker
      v-model="scope.row.endTime"
      type="date"
      placeholder="停用时间">
    </el-date-picker>
        </template>
          <span  v-else>{{new Date( scope.row.endTime).format("yyyy-MM-dd hh:mm:ss") }}</span>
        </template>
      </el-table-column>
      
      
      
     <el-table-column align="center" label="操作" width="200px" fixed="right">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
          <el-button  type="success" @click="update1(scope.row)"          size="small" >保存</el-button>
          <el-button  type="warning" @click="cancelEdit(scope.row)"      size="small">取消</el-button>
          </template>
          <template v-else>
          <el-button type="primary" @click='scope.row.edit=!scope.row.edit' size="small">编辑</el-button> 
          <el-button type="danger"  @click='remove1(scope.row)' size="small">删除</el-button> 
          </template>
        </template>
      </el-table-column>
    </el-table>
    </el-col>
</el-row> 

    </el-dialog>

  <el-dialog
      width="30%"
      title="提示"
      :visible.sync="alertVisible" > 
         <el-row> 
           <el-col :span="24" style="color: red;padding-right: 5px;">
            {{alertcontent}}
           </el-col>
           </el-row> 
    </el-dialog>
      <el-dialog 
      title="积分管理" 
      :visible.sync="dialogFormVisible" >
     
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
    <el-col :span="4"  style="text-align: right;    padding-right: 7px;"><span class="textSpan" > 积分获取项目:</span></el-col> 
    <el-col :span="8"><el-input type="text" v-model="saveObj.ationName"/></el-col> 
    <el-col :span="3"  style="text-align: right;    padding-right: 5px;"><span class="textSpan"> 积分类型:</span></el-col> 
    <el-col :span="8">

        <el-select v-model="saveObj.JfType" placeholder="积分类型">
        <el-option
             v-for="item in jflx"
             :key="item.name"
             :label="item.name"
            :value="item.name">
       </el-option>
       </el-select>
    </el-col>
  </el-row> 

   <el-row> 
    <el-col :span="4"  style="text-align: right;    padding-right: 7px;"><span class="textSpan" > 项目类型:</span></el-col> 
    <el-col :span="8">
        <el-select v-model="saveObj.AtionType" placeholder="项目类型">
        <el-option
             v-for="item in xmlx"
             :key="item.name"
             :label="item.name"
            :value="item.name">
       </el-option>
       </el-select>
        </el-col> 
   <el-col :span="3" style="text-align: right;    padding-right: 7px;"><span class="textSpan" > 默认积分值:</span></el-col> 
    <el-col :span="8"><el-input type="text" v-model="saveObj.moRenScore"/></el-col> 
   
  </el-row> 
  <el-row > 
   <el-col :span="4"    style="text-align: right;    padding-right: 5px;"><span     class="textSpan">项目描述:</span></el-col> 
   <el-col :span="19">   <el-input  v-model="saveObj.describe"  type="textarea"  :rows="4"  placeholder="项目描述..."/></el-col> 

 </el-row>
 


  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="Save">确 定</el-button>
  </div>

</el-dialog>

</div>
</template>
<script>

 import  TableDefined from '@/components/TableDefined'

 import {Get,Del,Update,Add} from '@/api/jf'
 import {jyGet,jyAdd,jyUpdate,jyDel} from '@/api/qyjf'
 import {exportToCsv,GetParams} from '@/utils/tool'

 export default {
  
    components: {
    TableDefined
  },
  props:{

  },
  mounted(){  
      this.ssqy=GetParams().filter(t=>t.typeName=="所属区域")
    Get(5,1).then(r=>{

         this.showData=r.data
         this.total=r.total
    })
     
     },
    data() {
      return {
        restaurants: [],
        state4: '',
        timeout:  null,
        showqujf:false,
        alertVisible:false,
        alertcontent:'',
        sUserName:'',
        total:400,
        pageSize1:5,
        selectRows:[],
        jflx:[
            {name:"开心家长积分"},
            {name:"知心家长积分"},
            {name:"热心家长积分"}
        ],
        xmlx:[
            {name:"系统预设项目"},
            {name:"自定义项目"},
            {name:"活动项目"}
        ],
        ssqy:[
         
    
         ],
        listLoading: true,
        innerVisible:false,
        searchObj:{
           jfhqxm:'',
          
         },
         qyjfobj:{
              ationName:"", 
              ationType:"",
              jfType:""
         },
         saveObj:{
           ationName:"",
           jfType:"",
           ationType:"",
           describe:"",
           moRenScore:"0"
         },
        currentPage: 1,
        dialogFormVisible:false,
        showData:[],
        qyShowData:[]
     
      }
    } , methods: {
   
      qyShow(row){
      debugger
      jyGet(row.ationName,row.ationType,row.jfType).then(t=>
         {
      this.qyjfobj.ationName=row.ationName
         this.qyjfobj.ationType=row.ationType
                 this.qyjfobj.jfType=row.jfType 
           this.qyShowData=t.data
            this.showqujf=true;
         })
       
      },
      search(){

           Get(this.pageSize1,this.currentPage).then(r=>{

         this.showData=r.data
         this.total=r.total
    })
         
      },
      select(r,i){
        this.selectRows=[]
        this.selectRows=r
      },
      removeAll(){
            if(this.selectRows.length==0){

              this.alertVisible=true,
              this.alertcontent="请选择要删除数据"
        }
        if(!this.alertVisible){
           this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.selectRows.forEach((item,i)=>{
             Del(item.ationName,item.ationType,item.jfType).then(t=>{

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
        remove1(row){
 this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
    
    jyDel(   this.qyjfobj.ationName,   this.qyjfobj.ationType,   this.qyjfobj.jfType,row.ssQy).then(t=>{
            jyGet(this.qyjfobj.ationName,   this.qyjfobj.ationType,   this.qyjfobj.jfType).then(t=>
         {
    
               
           this.qyShowData=t.data
            this.showqujf=true;
         })
    
       
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
      remove(row)
      { 
        
          this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
    
    Del(row.ationName,row.ationType,row.jfType).then(t=>{

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
      qyAdd(){
         
        this.qyShowData.unshift(  {id:  this.qyShowData.length+1,qyjfz:0,ssqy:"" ,sfqy:"0",qysj:"2018-05-01 12:10:11",tysj:"2018-06-01 12:10:11",mrfz:0,edit:true,add:true})
        
      },
      cancelEdit(row){
      row.edit=false
     

      },
      update(row){
        Update(row).then(r=>{
          row.edit = false
          this.search()
        })
    
          
      },
      update1(row){
       debugger
        Object.assign(row,this.qyjfobj)
        if(row.add){
        jyAdd(row).then(r=>{
          row.edit = false
        })
        
        }else{

        jyUpdate(this.qyjfobj.ationName,this.qyjfobj.ationType,this.qyjfobj.jfType,row).then(r=>{
          row.edit = false
        })
        }
      },
    cancel(){
   
        this.dialogFormVisible=false; 
                 this.qyShowData=false;
    },
     Save(){  
            
            Add(this.saveObj).then(t=>{
                 this.dialogFormVisible=false; 
                 this.qyShowData=false;
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


