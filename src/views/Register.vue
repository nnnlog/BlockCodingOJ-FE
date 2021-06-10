<template>
  <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
    <input v-model="id" placeholder="아이디" id="rg_id">
    <input v-model="pw" placeholder="비밀번호" id="rg_pw" type="password">
    <button @click="register">회원가입</button>
  </div>
</template>

<script>
import api from '@/api';

export default {
  name: "Register",
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
    async register() {
      let result = await api.auth.register(this.id, this.pw);
      if (result === 1) alert("이미 존재하는 아이디입니다.");
      else {
        await this.$store.dispatch('login', {
          id: this.id,
          pw: this.pw,
        });
        await this.$router.push({
          name: 'Home'
        });
      }
    }
  }
}
</script>

<style scoped>

</style>