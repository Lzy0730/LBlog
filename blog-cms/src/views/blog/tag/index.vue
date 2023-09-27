<script setup lang="ts">
import { queryTag, enableTag, deleteTag } from "@/api/services/tag";

import TagDialog from "@/components/content/tag/TagDialog.vue";
const tagDialogRef = ref();

const instance = getCurrentInstance();

const tableData = ref([]);

// 查询标签列表
const onQueryTag = () => {
  queryTag().then((res) => {
    tableData.value = res.data;
  });
};

// 标签是否启用
const onEnableTag = async (tag: ITag) => {
  const { id, is_enable } = tag;
  try {
    await enableTag({ id, is_enable });
    instance?.proxy?.$message({
      type: "success",
      message: "操作成功",
    });
  } catch (error) {
    instance?.proxy?.$message({
      type: "error",
      message: "操作失败",
    });
  } finally {
    onQueryTag();
  }
};

// 删除标签
const onDeleteTag = async (tag: ITag) => {
  const { id } = tag;
  try {
    await deleteTag({ id });
    instance?.proxy?.$message({
      type: "success",
      message: "操作成功",
    });
  } catch (error) {
    instance?.proxy?.$message({
      type: "error",
      message: "操作失败",
    });
  } finally {
    onQueryTag();
  }
};

// 修改文章标签
const onUpdateTag = (tag: ITag) => {
  tagDialogRef.value.update(tag);
};

// 新增文章标签
const onCreateTag = () => {
  tagDialogRef.value.create();
};

onMounted(() => {
  onQueryTag();
});
</script>
<template>
  <el-row justify="space-between">
    <el-col :span="8"></el-col>
    <el-col :span="8">
      <el-button type="primary" class="float-right" @click="onCreateTag"
        >新增</el-button
      >
    </el-col>
  </el-row>
  <el-table :data="tableData" class="mt-5">
    <el-table-column prop="id" label="标签id" width="150" align="center" />
    <el-table-column
      prop="name"
      label="标签名称"
      min-width="150"
      align="center"
    />
    <el-table-column
      prop="color"
      label="标签颜色"
      min-width="150"
      align="center"
    />
    <el-table-column
      prop="is_enable"
      label="是否启用"
      min-width="150"
      align="center"
    >
      <template #default="{ row }">
        <el-switch
          v-model="row.is_enable"
          :active-value="1"
          :inactive-value="0"
          @change="onEnableTag(row)"
        />
      </template>
    </el-table-column>
    <el-table-column prop="" label="操作" width="200" align="center">
      <template #default="{ row }">
        <el-button type="primary" link @click="onUpdateTag(row)"
          >编辑</el-button
        >
        <el-popconfirm title="确定删除吗?" @confirm="onDeleteTag(row)">
          <template #reference>
            <el-button type="primary" link>删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <TagDialog ref="tagDialogRef" @confirm="onQueryTag" />
</template>