<template>
<div></div>
</template>

<script>

export default {
    name: 'Logout',

    mounted () {
        localStorage.clear();
        this.$router.push('/login');
        /* Fazer metodo para encaminhar token para black list */
    },
}
</script>

<style>

</style>