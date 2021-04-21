<template>
   <!-- <v-container>
       <HelloWorld/>
    </v-container> -->
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
  <drawer />
  </v-container>
</template>

<script>
import Drawer from '@/components/core/Drawer';
// import HelloWorld from '@/components/HelloWorld';
  export default {
    name: 'DashboardDashboard',

    components: {
        Drawer,
        // HelloWorld,
    },
  }
</script>