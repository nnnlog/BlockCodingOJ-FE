<template>
  <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
    <input v-model="id" placeholder="아이디" id="login_id">
    <input v-model="pw" placeholder="비밀번호" id="login_pw" type="password">
    <button @click="login">로그인</button>
    <router-link to="/register/" class="flatten-btn">회원가입</router-link>
  </div>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      id: null,
      pw: null,
    };
  },
  created() {
    if (this.$store.getters.isLogin) this.$router.push({name: 'Home'});
  },
  methods: {
    async login() {
      let ret = await this.$store.dispatch('login', {
        id: this.id,
        pw: this.pw,
      });
      if (!ret) {
        alert("로그인을 실패했습니다.");
        return;
      }
      await this.$router.push({
        name: 'Home'
      });
    }
  }
}
</script>

<style scoped>

</style>