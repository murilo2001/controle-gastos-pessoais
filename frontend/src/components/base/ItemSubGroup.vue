<template>
  <base-item-group
    :item="item"
    text
    sub-group
  />
</template>

<script>
  export default {
    name: 'ItemSubGroup',

    props: {
      item: {
        type: Object,
        default: () => ({
          group: undefined,
          title: undefined,
          children: [],
        }),
      },
    },
  }
</script>
