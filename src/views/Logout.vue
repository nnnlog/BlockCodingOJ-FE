<template>
</template>

<script>
import api from '@/api';

export default {
  name: "Logout",
  async created() {
    if (!this.$store.getters.isLogin) await this.$router.push({name: 'Home'});
    else {
      await api.auth.logout();
      delete localStorage.token;
      location.replace('/');
    }
  }
}
</script>

<style scoped>

</style>