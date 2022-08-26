<template>
  <x-section class="task">
    <div class="table">
      <table>
        <x-thead :fields="fields" :orderBy="orderBy" :direction="direction" @sortTable="sort">
          <th-checkbox id="row-th" v-model="thCheckbox"/>
          <template v-slot:after>
            <x-th>Добавить</x-th>
          </template>
        </x-thead>

        <tbody>
        <tr v-for="task in tasks.data" :key="tasks.id">
          <td-checkbox :id="task.id" v-model="checkboxes" :value="task.id" />
          <td-text>{{ task.title }}</td-text>
          <td-text>{{ $helper.dateTime(task.range_start_at) }}</td-text>
          <td-text>{{ $helper.dateTime(task.range_end_at) }}</td-text>

          <td-arr-checkbox :id="task.id" v-model="checkboxes" :value="task.id"></td-arr-checkbox>

        </tr>
        </tbody>
      </table>
    </div>
  </x-section>
</template>

<script lang="ts" setup>

import XThead from "@/components/ui/table/x-thead.vue";
import TdText from "@/components/ui/table/td-text.vue";
import {onMounted, ref, Ref, watch} from "vue";
import {useTable} from "@/hooks/useTable";
import ThCheckbox from "@/components/ui/table/th-checkbox.vue";
import TdCheckbox from "@/components/ui/table/td-checkbox.vue";
import {ITask, ITaskPaginate} from "@/types/task";
import task from "@/hooks/models/task";
import TaskModule from "@/store/modules/task";
import UserModule from "@/store/modules/user";
import XTh from "@/components/ui/table/x-th.vue";
import TdArrCheckbox from "@/components/ui/table/td-arr-checkbox.vue";

const tasks: Ref<ITaskPaginate> = ref({})

const {fieldsSet} = task(['title', 'user_id', 'range_start_at', 'range_end_at'])
fieldsSet.value['user_id'].value = UserModule.user.id
fieldsSet.value['user_id'].show = false

const {
  direction, orderBy, fields, thCheckbox, checkboxes, paginate, sort, selected, checkboxSplice, checkboxAdd
} = useTable(TaskModule.fetchTasksIndex, fieldsSet, 200, tasks)

const chb = (id: number) => {
  checkboxes.value?.includes(id) ? checkboxSplice(id) : checkboxAdd(id)
}

watch(checkboxes,(n:any,o:any) => {
  selected.value = []
  checkboxes.value?.map((i:number) => selected.value?.push(tasks.value.data?.find((f:ITask) => i === f.id)))
  TaskModule.setSelectedTasks(selected.value)
} )


onMounted(() => {
  TaskModule.selectedTasks.map((i:ITask) => {
    checkboxes.value?.push(i.id)
  })
})




</script>

