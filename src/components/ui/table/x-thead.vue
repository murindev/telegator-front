<template>
  <thead>
  <tr>
    <slot></slot>
    <template v-for="th in fields" :key="th.id"  >
      <th v-if="th?.show" :style="{width: th.width ?? 'auto'}" :rowspan="rowspan ?? 1" >
        <div class="th-col">
          <span v-if="th?.sort" @click="$emit('sort-table', th.sort)"
                :class="showClass(th)" v-html="th.title"/>
          <span :class="{'m-auto': center}" v-else v-html="th.title"/>
        </div>
      </th>
    </template>
    <slot name="after"></slot>
  </tr>
  <slot name="rows"></slot>
  </thead>
</template>

<script>
export default {
  name: "x-thead",
  props: ['fields', 'orderBy', 'direction', 'rowspan', 'center'],
  methods: {
    showClass(th) {
      let directive = ''
      directive += this.orderBy === th.sort ? this.direction + ' sort' : 'sort'
      return  directive
    },
    style(th) {
      let s = '';
      if(th.hasOwnProperty('width')) {
        s += `width: ${th.width};`
      }

      return s

    }
  }
}

/* альтернатива
<thead>
  <tr>
    <th-checkbox id="row-th" v-model="thCheckbox"/>
    <template v-for="th in list" :key="th.id">
      <x-th v-if="th.show">
        <span v-if="th.sortable" :class="sorting(th.sort)" @click="sort(th.sort)">{{ th.title }}</span>
        <span v-else>{{ th.title }}</span>
      </x-th>
    </template>
  </tr>
</thead>
*/
</script>

