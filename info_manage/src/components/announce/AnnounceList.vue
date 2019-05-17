<template>
  <div class="announcelist_container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{path: '/welcome'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>公告管理</el-breadcrumb-item>
      <el-breadcrumb-item>公告列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert title="根据公告标题检索"
                type="warning"
                show-icon>
      </el-alert>
      <el-row :gutter="20">
        <!-- 搜索框 -->
        <el-col :span="6">
          <el-input v-model="queryMsg.query"
                    placeholder="请输入内容"
                    class="input-with-select">
            <el-button slot="append"
                       @click="search()"
                       icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <!-- 添加公告 -->
        <el-col :span="18">
          <el-button type="primary"
                     @click="showDialogAddForm()"
                     plain>添加公告</el-button>
        </el-col>
      </el-row>
      <!-- 公告列表 -->
      <el-table :data="announceList"
                stripe
                style="width: 100%">
        <el-table-column type="index"
                         width="100">
        </el-table-column>
        <el-table-column prop="anc_title"
                         label="公告标题"
                         width="180">
        </el-table-column>
        <el-table-column prop="anc_content"
                         label="公告内容"
                         width="500">
        </el-table-column>
        <el-table-column prop="anc_addtime"
                         label="发布时间"
                         width="150">
        </el-table-column>
        <el-table-column label="发布状态"
                         width="150">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.anc_state === 0"
                    type="success">已发布</el-tag>
            <el-tag v-else
                    type="danger">草稿</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-tooltip class="item"
                          effect="dark"
                          content="编辑公告"
                          placement="top">
                <el-button size="mini"
                           icon="el-icon-edit"
                           round
                           @click="showDialogEditForm(scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip class="item"
                          effect="dark"
                          content="删除公告"
                          placement="top">
                <el-button size="mini"
                           icon="el-icon-delete"
                           round
                           @click="delAnnounce(scope.row.anc_id)"></el-button>
              </el-tooltip>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background
                     :page-size="queryMsg.pageSize"
                     :current-page="queryMsg.pageNum"
                     layout="prev, pager, next"
                     :total="total"
                     @current-change="changePager">
      </el-pagination>
    </el-card>
    <!-- 添加公告弹出层 -->
    <el-dialog width="500px"
               title="添加公告"
               :visible.sync="dialogAddVisible">
      <el-form :model="addForm"
               label-width="80px"
               autocomplete="off"
               :rules="rules"
               ref="addForm">
        <el-form-item label="公告标题"
                      prop="anc_title">
          <el-input v-model="addForm.anc_title"></el-input>
        </el-form-item>
        <el-form-item label="公告内容"
                      prop="anc_content">
          <el-input v-model="addForm.anc_content"></el-input>
        </el-form-item>
        <el-form-item label="发布状态"
                      prop="anc_state">
          <el-select v-model="addForm.anc_state"
                     placeholder="请选择">
            <el-option key="0"
                       label="发布"
                       :value="0">
            </el-option>
            <el-option key="1"
                       label="草稿"
                       :value="1">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addSubmit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑公告弹出层 -->
    <el-dialog width="500px"
               title="编辑公告"
               :visible.sync="dialogEditVisible">
      <el-form :model="editForm"
               label-width="80px"
               autocomplete="off"
               :rules="rules"
               ref="editForm">
        <el-form-item label="公告标题"
                      prop="anc_title">
          <el-input v-model="editForm.anc_title"></el-input>
        </el-form-item>
        <el-form-item label="公告内容"
                      prop="anc_content">
          <el-input v-model="editForm.anc_content"></el-input>
        </el-form-item>
        <el-form-item label="发布状态"
                      prop="anc_state">
          <el-select v-model="editForm.anc_state"
                     placeholder="请选择">
            <el-option key="0"
                       label="发布"
                       :value="0">
            </el-option>
            <el-option key="1"
                       label="草稿"
                       :value="1">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="editSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Mixin from './AnnounceList_Mixin'
export default {
  mixins: [Mixin]
}
</script>
<style scoped>
</style>
