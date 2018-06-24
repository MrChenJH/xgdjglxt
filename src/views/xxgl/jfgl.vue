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

    <el-table-column align="center" label="序号"  width="50" fixed="left">
          <template slot-scope="scope"> 
            <span>{{scope.row.id}}</span>
        </template>
   </el-table-column> 
        <el-table-column align="center" label="积分获取项目"  width="190px">
        <template slot-scope="scope"> 
            <template v-if="scope.row.edit">
            <el-input v-model="scope.row.jfhqxm" placeholder="积分获取项目"></el-input>
          </template> 
            <span v-else>{{scope.row.jfhqxm}}</span>
        </template>
      </el-table-column>
      
      <el-table-column min-width="190px"  label="积分类型"  align="center" >
       <template slot-scope="scope"> 
           <template v-if="scope.row.edit">
        <el-select v-model="scope.row.jflx" placeholder="积分类型">
        <el-option
             v-for="item in jflx"
             :key="item.name"
             :label="item.name"
            :value="item.name">
       </el-option>
       </el-select>
           
          </template> 
         <span v-else>{{scope.row.jflx}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="190px"  label="项目类型" align="center" >
       <template slot-scope="scope"> 
           <template v-if="scope.row.edit">
                  <el-select v-model="scope.row.xmlx" placeholder="项目类型">
                <el-option
             v-for="item in xmlx"
             :key="item.name"
             :label="item.name"
            :value="item.name">
       </el-option>
       </el-select>
           
          </template> 
        <span v-else>{{scope.row.xmlx}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="400px" label="描述" align="center">
        <template slot-scope="scope"> 
         <template v-if="scope.row.edit">
             <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="描述"
              v-model="scope.row.mx">
            </el-input>
            
        </template>
          <span  v-else>{{scope.row.mx}}</span>
        </template>
      </el-table-column>
    

     <el-table-column min-width="200px" label="是否启用" align="center">
        <template slot-scope="scope"> 
         <template v-if="scope.row.edit">
                    <el-radio-group  v-model="scope.row.sfqy">
     <el-radio  label="0">禁用</el-radio>
     <el-radio label="1">启用</el-radio>
    </el-radio-group>
        </template>
 
          <span  v-else>{{scope.row.sfqy=="0"?"禁用":"启用"}}</span>
        </template>
      </el-table-column>
      
      
      <el-table-column min-width="100px" label="默认积分值" align="center">
        <template slot-scope="scope"> 
         <template v-if="scope.row.edit">
             <el-input v-model="scope.row.mrfz" placeholder="描述"></el-input>
        </template>
          <span  v-else>{{scope.row.mrfz}}</span>
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
    
  <el-col :span="5" > 
      <el-input
  placeholder="积分获取项目"
  v-model="qyjfobj.jfhqxm"
  :disabled="true">
</el-input>  
  </el-col>
  <el-col :span="5" >   
 <el-input
  placeholder="项目类型"
  v-model="qyjfobj.xmlx"
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
     <el-table-column align="center" label="序号"  width="50" fixed="left">
          <template slot-scope="scope"> 
            <span>{{scope.row.id}}</span>
        </template>
   </el-table-column> 
        <el-table-column align="center" label="区域积分值"  width="100px">
        <template slot-scope="scope"> 
           <template v-if="scope.row.edit">
            <el-input v-model="scope.row.qyjfz" placeholder="区域积分值"></el-input>
          </template> 
            <span v-else>{{scope.row.qyjfz}}</span>
        </template>
      </el-table-column>
      
      <el-table-column min-width="190px"  label="所属区域"  align="center" >
       <template slot-scope="scope"> 
           <template v-if="scope.row.edit">
                 <el-select v-model="scope.row.ssqy" placeholder="所属区域" >
    <el-option
      v-for="item in ssqy"
      :key="item.name"
      :label="item.name"
      :value="item.name">
    </el-option>
  </el-select> 
          
          </template> 
         <span v-else>{{scope.row.ssqy}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="190px"  label="是否启用" align="center" >
       <template slot-scope="scope"> 
            <template v-if="scope.row.edit">
                    <el-radio-group  v-model="scope.row.sfqy">
     <el-radio  label="0">禁用</el-radio>
     <el-radio label="1">启用</el-radio>
    </el-radio-group>
        </template>
 
          <span  v-else>{{scope.row.sfqy=="0"?"禁用":"启用"}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" label="启用时间" align="center">
        <template slot-scope="scope"> 
         <template v-if="scope.row.edit">
        <el-date-picker
      v-model="scope.row.qysj"
      type="date"
      placeholder="启用时间">
    </el-date-picker>
        </template>
          <span  v-else>{{scope.row.qysj}}</span>
        </template>
      </el-table-column>
    

     <el-table-column min-width="200px" label="停用时间" align="center">
        <template slot-scope="scope"> 
         <template v-if="scope.row.edit">
         <el-date-picker
      v-model="scope.row.tysj"
      type="date"
      placeholder="停用时间">
    </el-date-picker>
        </template>
          <span  v-else>{{scope.row.tysj}}</span>
        </template>
      </el-table-column>
      
      
      
     <el-table-column align="center" label="操作" width="200px" fixed="right">
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
    <el-col :span="8"><el-input type="text" v-model="saveObj.jfhqxm"/></el-col> 
    <el-col :span="3"  style="text-align: right;    padding-right: 5px;"><span class="textSpan"> 积分类型:</span></el-col> 
    <el-col :span="8">

        <el-select v-model="saveObj.jflx" placeholder="积分类型">
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
        <el-select v-model="saveObj.xmlx" placeholder="项目类型">
        <el-option
             v-for="item in xmlx"
             :key="item.name"
             :label="item.name"
            :value="item.name">
       </el-option>
       </el-select>
        </el-col> 
    <el-col :span="3"  style="text-align: right;    padding-right: 5px;"><span class="textSpan"> 是否启用:</span></el-col> 
    <el-col :span="8" style="    line-height: 3; padding-left: 10px;">
    <el-radio-group  v-model="saveObj.sfqy">
     <el-radio  label="0">禁用</el-radio>
     <el-radio label="1">启用</el-radio>
    </el-radio-group>
   </el-col>
  </el-row> 
  <el-row > 
   <el-col :span="4"    style="text-align: right;    padding-right: 5px;"><span     class="textSpan">项目描述:</span></el-col> 
   <el-col :span="19">   <el-input  v-model="saveObj.mx"  type="textarea"  :rows="4"  placeholder="项目描述..."/></el-col> 

 </el-row>
    <el-row> 
    <el-col :span="4" style="text-align: right;    padding-right: 7px;"><span class="textSpan" > 默认积分值:</span></el-col> 
    <el-col :span="8"><el-input type="text" v-model="saveObj.mrfz"/></el-col> 
    <el-col :span="3"  style="text-align: right;    padding-right: 5px;"><span class="textSpan"> 所属区域:</span></el-col> 
    <el-col :span="8">

           <el-select v-model="saveObj.ssqy" placeholder="所属区域">
        <el-option
             v-for="item in ssqy"
             :key="item.name"
             :label="item.name"
            :value="item.name">
       </el-option>
       </el-select>
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
           {name:"上海"},
           {name:"北京"},
           {name:"重庆"},
           {name:"武汉"},
           {name:"无锡"}
    
         ],
        listLoading: true,
        innerVisible:false,
        searchObj:{
           jfhqxm:'',
          
         },
         qyjfobj:{
              jfhqxm:"", 
              xmlx:"",
         },
         saveObj:{
           jfhqxm:"",
           jflx:"",
           xmlx:"",
           mx:"",
           sfqy:"0",
           mrfz:10,
           ssqy:"",
           qysj:"",
           tysj:""
         },
        currentPage: 1,
        dialogFormVisible:false,
        showData:[],
        qyShowData:[
        {id:1,qyjfz:30,ssqy:"上海" ,sfqy:"0",qysj:"2018-05-01 12:10:11",tysj:"2018-06-01 12:10:11",mrfz:20,edit:false},
        {id:2,qyjfz:30,ssqy:"上海" ,sfqy:"0",qysj:"2018-05-01 12:10:11",tysj:"2018-06-01 12:10:11",mrfz:20,edit:false}

          ],
        tableData:[
          {id:1,jfhqxm:"项目1",jflx:'开心家长积分' ,xmlx:"系统预设项目",mx:"项目xxxx",sfqy:"0",mrfz:20,edit:false},
          {id:2,jfhqxm:"项目2",jflx:'开心家长积分' ,xmlx:"系统预设项目",mx:"项目xxxx",sfqy:"0",mrfz:20,edit:false},
          {id:3,jfhqxm:"项目3",jflx:'开心家长积分' ,xmlx:"系统预设项目",mx:"项目xxxx",sfqy:"0",mrfz:20,edit:false},
          {id:4,jfhqxm:"项目4",jflx:'开心家长积分' ,xmlx:"系统预设项目",mx:"项目xxxx",sfqy:"0",mrfz:20,edit:false},
          {id:5,jfhqxm:"项目5",jflx:'知心家长积分' ,xmlx:"系统预设项目",mx:"项目xxxx",sfqy:"0",mrfz:20,edit:false},
          {id:6,jfhqxm:"项目6",jflx:'知心家长积分' ,xmlx:"系统预设项目",mx:"项目xxxx",sfqy:"0",mrfz:20,edit:false},
          {id:7,jfhqxm:"项目7",jflx:'知心家长积分' ,xmlx:"自定义项目",mx:"项目xxxx",sfqy:"0",mrfz:20,edit:false},
          {id:8,jfhqxm:"项目8",jflx:'知心家长积分' ,xmlx:"自定义项目",mx:"项目xxxx",sfqy:"0",mrfz:20,edit:false},
          {id:9,jfhqxm:"项目9",jflx:'知心家长积分' ,xmlx:"自定义项目",mx:"项目xxxx",sfqy:"0",mrfz:20,edit:false},
          {id:10,jfhqxm:"项目10",jflx:'热心家长积分' ,xmlx:"自定义项目",mx:"项目xxxx",sfqy:"0",mrfz:20,edit:false},
          {id:11,jfhqxm:"项目11",jflx:'热心家长积分' ,xmlx:"自定义项目",mx:"项目xxxx",sfqy:"0",mrfz:20,edit:false},
          {id:12,jfhqxm:"项目12",jflx:'热心家长积分' ,xmlx:"自定义项目",mx:"项目xxxx",sfqy:"0",mrfz:20,edit:false},
          {id:13,jfhqxm:"项目13",jflx:'热心家长积分' ,xmlx:"活动项目",mx:"项目xxxx",sfqy:"0",mrfz:20,edit:false},
          {id:14,jfhqxm:"项目14",jflx:'热心家长积分' ,xmlx:"活动项目",mx:"项目xxxx",sfqy:"0",mrfz:20,edit:false},
          {id:15,jfhqxm:"项目15",jflx:'热心家长积分' ,xmlx:"活动项目",mx:"项目xxxx",sfqy:"0",mrfz:20,edit:false},
          {id:16,jfhqxm:"项目16",jflx:'热心家长积分' ,xmlx:"活动项目",mx:"项目xxxx",sfqy:"0",mrfz:20,edit:false},
          {id:17,jfhqxm:"项目17",jflx:'热心家长积分' ,xmlx:"活动项目",mx:"项目xxxx",sfqy:"0",mrfz:20,edit:false},
          {id:18,jfhqxm:"项目18",jflx:'热心家长积分' ,xmlx:"活动项目",mx:"项目xxxx",sfqy:"0",mrfz:20,edit:false},
          {id:19,jfhqxm:"项目19",jflx:'热心家长积分' ,xmlx:"活动项目",mx:"项目xxxx",sfqy:"0",mrfz:20,edit:false},
          {id:20,jfhqxm:"项目20",jflx:'热心家长积分' ,xmlx:"活动项目",mx:"项目xxxx",sfqy:"0",mrfz:20,edit:false},
          
          ]
      }
    } , methods: {
       loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" }
         
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
      } ,
      qyShow(row){
      debugger
         this.qyjfobj.jfhqxm=row.jfhqxm
         this.qyjfobj.xmlx=row.xmlx
        this.showqujf=true;
      },
      search(){
         let data= this.tableData
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
      qyAdd(){
         
        this.qyShowData.unshift(  {id:  this.qyShowData.length+1,qyjfz:0,ssqy:"" ,sfqy:"0",qysj:"2018-05-01 12:10:11",tysj:"2018-06-01 12:10:11",mrfz:0,edit:true})
        
      },
      cancelEdit(row){
      row.edit=false
     

      },
      update(row){
         row.edit = false
          
      },
    cancel(){
        this.dialogFormVisible=false; 
                 this.qyShowData=false;
    },
     Save(){  
          
            this.dialogFormVisible=false; 
                 this.qyShowData=false;
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


