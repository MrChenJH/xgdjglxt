<template>
  <div> 
 <el-row :gutter="20">
   <el-col :span="1" > <el-button  size="small"  type="primary" @click="dialogFormVisible=true">添加</el-button></el-col>
   <el-col :span="1" style="padding-left: 20px;"><el-button  size="small" @click="removeAll"  type="danger">删除</el-button></el-col>
  
</el-row>
<el-row :gutter="20">
  <el-col :span="4" >   
<el-input
  placeholder="会员等级"
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

        <el-table-column align="center" label="会员等级"  width="190px">
        <template slot-scope="scope"> 
          
            <span >{{scope.row.hyLevel}}</span>
        </template>
      </el-table-column>
      
      <el-table-column min-width="190px"  label="会员金额"  align="center" >
       <template slot-scope="scope"> 
           <template v-if="scope.row.edit">
   
           <el-input v-model="scope.row.levelJe" placeholder="会员金额"/>
          </template> 
         <span v-else>{{scope.row.levelJe}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="190px"  label="兑换比例" align="center" >
       <template slot-scope="scope"> 
           <template v-if="scope.row.edit">
                  <el-input v-model="scope.row.scale" placeholder="兑换比例" style="width:50px"/>
                 
           
          </template> 
        <span v-else>{{scope.row.scale}}</span>
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
          <el-button  size="small" @click='qyShow(scope.row)'  type="success">区域规则设置</el-button>
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
      title="区域规则设置"
      :visible.sync="showqujf" >
       <el-row :gutter="20">
   <el-col :span="2" >
        <el-button  size="small"  type="primary" @click="qyAdd">添加</el-button></el-col>
 </el-row> 
<el-row :gutter="20">
    
  <el-col :span="20" > 
      <el-input
  placeholder="会员等级"
  v-model="qyjfobj.vipLevel" style="width:200px"
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
                 <el-select v-model="scope.row.syqy"  placeholder="所属区域" >
    <el-option
      v-for="item in ssqy"
      :key="item.value"
      :label="item.value"
      :value="item.value">
    </el-option>
  </el-select> 
               </template> 

            <template v-else>
    <el-select v-model="scope.row.syqy"  disabled  placeholder="所属区域" >
    <el-option
      v-for="item in ssqy"
      :key="item.value"
      :label="item.value"
      :value="item.value">
    </el-option>

  </el-select> 
           </template> 
          </template> 
         <span v-else>{{scope.row.syqy}}</span>
        </template>
      </el-table-column>

        <el-table-column align="center" label="折扣"  width="100px">
        <template slot-scope="scope"> 
           <template v-if="scope.row.edit">
            <el-input v-model="scope.row.discount" placeholder="折扣" style="width:50px"></el-input>折
          </template> 
            <span v-else>{{scope.row.discount}}折</span>
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
    <el-col :span="4"  style="text-align: right;    padding-right: 7px;"><span class="textSpan" > 会员等级:</span></el-col> 
    <el-col :span="8"><el-input type="text" v-model="saveObj.hyLevel"/></el-col> 
    <el-col :span="3"  style="text-align: right;    padding-right: 5px;"><span class="textSpan"> 积分类型:</span></el-col> 
    <el-col :span="8">
<el-input type="text"   v-model="saveObj.levelJE"/>
       
    </el-col>
  </el-row> 

   <el-row> 
    <el-col :span="4"  style="text-align: right;    padding-right: 7px;"><span class="textSpan" > 兑换比例:</span></el-col> 
    <el-col :span="8">
       <el-input type="text"   v-model="saveObj.scale"/>
        </el-col> 

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

 import {Get,Del,Update,Add} from '@/api/hy'
 import {jyGet,jyAdd,jyUpdate,jyDel} from '@/api/qyhy'
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
          hyzk:[

              {v:1,name:"一折"},
              {v:2,name:"两折"},
              {v:3,name:"三折"},
              {v:4,name:"四折"},
              {v:5,name:"五折"},
              {v:6,name:"六折"},
              {v:7,name:"七折"}
          ],
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
              vipLevel:""
              
         },
         saveObj:{
          hyLevel:"",
          levelJE:1.0,
          scale:1.0
         },
        currentPage: 1,
        dialogFormVisible:false,
        showData:[],
        qyShowData:[]
     
      }
    } , methods: {
   
      qyShow(row){
      debugger
      jyGet(row.hyLevel,"").then(t=>
         {
    
                 this.qyjfobj.vipLevel=row.hyLevel 
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
             Del(item.hyLevel).then(t=>{

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
    
    jyDel(this.qyjfobj.vipLevel,row.syqy).then(t=>{
            jyGet(   this.qyjfobj.vipLevel,"").then(t=>
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
    
    Del(row.hyLevel).then(t=>{

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
         
        this.qyShowData.unshift(  {syqy:"",discount:"",qyTime:"",endTime:"",edit:true,add:true})
        
      },
      cancelEdit(row){
      row.edit=false
     

      },
      update(row){
        Update(row.hyLevel,row).then(r=>{
          row.edit = false
          this.search()
        })
    
          
      },
      update1(row){
       debugger
        Object.assign(row,this.qyjfobj)
        if(row.add){
        jyAdd(row).then(r=>{
        delete row["add"]
          row.edit = false
        })
        
        }else{

        jyUpdate(this.qyjfobj.vipLevel,row.syqy,row).then(r=>{
          row.edit = false
        })
        }
      },
    cancel(){
    this.search()
        this.dialogFormVisible=false; 
                 this.qyShowData=false;
    },
     Save(){  
            
            Add(this.saveObj).then(t=>{
                 this.dialogFormVisible=false; 
                 this.qyShowData=false;
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


