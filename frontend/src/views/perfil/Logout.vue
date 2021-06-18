<template>
<div></div>
</template>

<script>

export default {
    name: 'Logout',

    mounted () {
        localStorage.clear();
        this.$router.push('/login');
        /* Implementar feature para encaminhar token para black list */
    },
}
</script>

<style>

</style>