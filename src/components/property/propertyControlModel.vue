/*
 * @Author: Hovees
 * @Date: 2019-10-08 14:50:53
 * @Last Modified by: hovees
 * @Last Modified time: 2020-03-19 13:01:15
 */

<template>
  <div class="property-control-model" style="position:relative">
    <h2>楼盘管理</h2>
    <el-button type="text" @click="fresh">
      刷新
    </el-button>
    <el-button type="primary" size="medium" @click="clickAdd" style="position:absolute;right:0">添加楼盘</el-button>
    <el-table :data="properties" border v-loading="tableLoading">
      <el-table-column label="序号" min-width="3%" align="center">
        <template slot-scope="scope">
          {{(pageNum - 1) * pageSize + scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="楼盘名字" min-width="15%">
        <template slot-scope="scope">
          <el-link :underline=false @click="handleView(scope.row)">
            {{scope.row.name}}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="location" label="地址" min-width="15%"/>
      <el-table-column prop="uid" label="楼盘编码" min-width="15%"/>
      <el-table-column label="操作" min-width="8%">
        <template slot-scope="scope">
          <el-button size="small" icon="el-icon-view" @click="handleView(scope.row)" />
          <el-button size="small" icon="el-icon-edit" @click="handleEdit(scope.row)" />
          <el-button size="small" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)"/>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.rowCount"
        :page-size="this.pageSize"
        :current-page="this.pageNum"
        @size-change="pageSizeChange"
        @current-change="pageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import routerApi from '@/service/api/routerApi'
  import propertyService from '../../service/property/propertyService'
  import { Loading } from 'element-ui'
  import util from "@/service/util"
  export default {
    name: 'propertyControlModel',
    data () {
      return {
        tableLoading: false  
      }
    },
    mounted: function () {
      this.tableLoading = true
      util.sleep(500).then(() => {
        this.getProperty()
        this.tableLoading = false
      })
    },
    computed: mapState({
      properties: state => state.property.properties,
      rowCount: state => state.property.rowCount,
      pageNum: state => state.property.pageNum,
      pageSize: state => state.property.pageSize
    }),
    methods: {
      fresh() {
        this.tableLoading = true
        util.sleep(500).then(() => {
          this.getProperty()
          this.tableLoading = false
        })
      },
      getProperty() {
        propertyService.getProperty()
        .catch(error => {
          console.log(error)
          this.$message.error('获取数据失败')
        })
      },
      pageChange(pageNum) {
        this.$store.commit('property/SET_PAGE_NUM', pageNum)
        this.getProperty()
      },
      pageSizeChange(pageSize) {
        this.$store.commit('property/SET_PAGE_SIZE', pageSize)
        this.getProperty()
      },
      clickAdd() {
        this.$store.commit('property/ADD_PROPERTY_DIALOG', true)
      },
      handleEdit(property) {
        this.$store.commit('property/RECORD_PROPERTY', Object.assign({}, property))
        this.$store.commit('property/EDIT_PROPERTY_DIALOG', true)
      },
      handleDelete(property) {
        this.$store.commit('property/RECORD_PROPERTY', Object.assign({}, property))
        this.$store.commit('property/DELETE_PROPERTY_DIALOG', true)
      },
      handleView(property) {
        this.$store.commit('property/SET_PROPERTY_ID', property.id)
        this.$store.commit('property/SET_PROPERTY_NAME', property.name)
        this.$store.commit('building/SET_PAGE_NUM', 1)
        this.$store.commit('building/SET_PAGE_SIZE', 10)
        this.$router.push(routerApi.property.building.getBuildingCompleteUrl())
      }
    }
  }
</script>

<style scoped>

</style>