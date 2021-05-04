<template>
  <div>
      <login v-if="view=='login'" @changeView="view =$event" />
      <register v-if="view=='register'" @changeView="view =$event" />
  </div>
</template>


<script>

export default {
  components: {
    Login: () => import('@/components/login/Login.vue'),
    Register: () => import('@/components/login/Register.vue'),
  },

    data() {
      return {
        view: 'login'
      }
    },
}
</script>