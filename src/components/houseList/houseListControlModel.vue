<template>
  <div class="house-list-control-model">
    <h2>房屋列表</h2>
    <el-button type="text" @click="fresh">
      刷新
    </el-button>
    <el-table :data="houses" border>
      <el-table-column label="序号" min-width="3%" align="center">
        <template slot-scope="scope">
          {{(pageNum - 1) * pageSize + scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column prop="building.property.location" label="地址" min-width="5%"/>
      <el-table-column prop="building.property.name" label="所属楼盘" min-width="5%"/>
      <el-table-column prop="building.name" label="所属楼栋" min-width="5%"/>
      <el-table-column prop="number" label="门牌号" min-width="5%"/>
      <el-table-column label="操作" min-width="8%">
        <template slot-scope="scope">
          <el-button size="small" icon="el-icon-view" @click="handleView(scope.row)" />
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
  import houseService from '../../service/house/houseService'
  import { Loading } from 'element-ui'
  import util from "@/service/util"
  export default {
    name: 'houseListControlModel',
    data () {
        return {
            houses: [],
            pageNum: 1,
            pageSize: 10,
            rowCount: 0
        }
    },
    created () {
      this.getUserAllHouses()
    },
    methods: {
      fresh() {
        let loadingInstance = Loading.service({
          lock: true,
          text: '拼命加载中....',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
        })
        util.sleep(500).then(() => {
          this.getUserAllHouses()
          loadingInstance.close()
        })
      },
      getUserAllHouses() {
        let res
        let userId = this.$store.getters['user/getId']
        houseService.getUserAllHouses(this.pageNum, this.pageSize, userId)
        .then(response => {
            res = response
            this.houses = res.data.content
            this.rowCount = res.data.totalElements
        })
        .catch(error => {
          console.log(error)
          this.$message.error('获取数据失败')
        })
      },
      pageChange(pageNum) {
        this.pageNum = pageNum
        this.getUserAllHouses()
      },
      pageSizeChange(pageSize) {
        this.pageSize = pageSize
        this.getUserAllHouses()
      },
      handleView(house) {
        this.$store.commit('property/SET_PROPERTY_ID', house.building.property.id)
        this.$store.commit('building/SET_BUILDING_ID', house.building.id)
        this.$store.commit('house/HOUSE_ID', house.id)
        this.$store.commit('house/HOUSE_DETAIL', house)
        this.$router.push(routerApi.property.building.house.detail.getHouseDetailCompleteUrl())
      }
    }
  }
</script>

<style scoped>

</style>