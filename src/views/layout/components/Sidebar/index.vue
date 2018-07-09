<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu style=""
      mode="vertical"
    
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      :unique-opened="true"
    >
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

import {GetYhxx} from '@/utils/tool'
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      debugger
      let obj=GetYhxx()
      let items=[]
      items.push("首页")
      items.push("信息管理")
      items.push("系统配置管理")
      let rss=[]
      let rs= this.$router.options.routes
                rs.forEach((t,i)=>{
                 if( t.name&& items.includes(t.name))
                 {
                      rss.push(t)
                 }
                })
                 
             
          let   menus=obj.menus.split(',')
          let r=rss.map((i,x)=>{
               if(i.name=="首页"){
                        return i
               }
               else{
                      let child= []
                      i.children.forEach((t,ii)=>{
                            if(menus.includes(t.name))
                              {
                              child.push(t)
                              }
                            })
                       i.children=child
                       return  i
                }
             })
      return r
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style>
.el-menu-item{
       font-size: 18px;
     }
.el-scrollbar__wrap {
    overflow: hidden; 
    height: 100%;
}
</style>
