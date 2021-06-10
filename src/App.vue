<template>
  <div>
    <div style="height: 100vh; display: flex; flex-direction: column; background-color: white;">
      <nav
          style="padding: 0 20px; height: 70px; border-bottom: 1px solid black; display: flex; justify-content: space-between; align-items: center;">
        <div
            style="font-size: 23px; font-weight: 500; display: flex; justify-content: space-around; align-items: center;">
          <router-link v-if="$route.path !== '/'" class="mdi mdi-arrow-left flatten-btn"
                       style="margin-right: 10px; width: 40px; height: 40px;" to="/"></router-link>
          {{ $store.getters.title }}
        </div>
        <div style="display: flex; justify-content: center; align-items: center;">
          <div v-if="$store.getters.id !== null" style="margin-right: 10px;">{{ $store.getters.id }}</div>
          <router-link to="/login/" style="width: 80px; height: 40px;" class="flatten-btn" v-else>로그인
            <span class="mdi mdi-chevron-right"></span>
          </router-link>
          <div
              :style="`font-size: 23px; width: 40px; height: 40px; z-index: 999; ${menuEnabled ? 'background: white;' : ''}`"
              class="flatten-btn"
              @click="toggle">
            <span v-if="blur" class="mdi mdi-close"></span>
            <span v-else class="mdi mdi-menu"></span>
          </div>
        </div>
      </nav>
      <router-view v-if="!loading" style="flex: 1; background-color: white;"/>
    </div>
    <div
        @click="toggle"
        :style="`transition: background .5s; position: absolute; top: 0; bottom: 0; left: 0; right: 0; height: 100vh; width: 100vw; z-index: ${menuEnabled ? '99' : '-99'};`"
        :class="blur ? 'blur' : ''"></div>
    <div
        @click="toggle"
        :style="`position: absolute; top: 100px; right: 20px; width: 150px; text-align: left; z-index: ${(blur && menuEnabled) ? '100' : '-99'};`"
    >
      <div class="expand-btn-group">
        <router-link to="/">홈</router-link>
        <router-link to="/problems/">문제 목록</router-link>
      </div>
      <div class="expand-btn-group">
        <router-link to="/login/" v-if="!$store.getters.isLogin">로그인
        </router-link>
        <router-link to="/register/" v-if="!$store.getters.isLogin">회원가입
        </router-link>
        <router-link to="/logout/" v-else>로그아웃</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api';

export default {
  data() {
    return {
      menuEnabled: false,
      blur: false,
      loading: true
    };
  },
  methods: {
    toggle() {
      if (!this.menuEnabled) this.menuEnabled = this.blur = true;
      else {
        this.blur = false;
        setTimeout(() => this.menuEnabled = false, 500);
      }
    }
  },
  async created() {
    if (typeof localStorage.token === "string") {
      let ret = await api.auth.user();
      if (ret !== undefined) {
        this.$store.dispatch('setId', ret);
      } else {
        delete localStorage.token;
      }
    }
    this.loading = false;
  },
}
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/@mdi/font@5.9.55/css/materialdesignicons.min.css";

@font-face {
  font-family: 'IBMPlexSansKR';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-ExtraLight.woff') format('woff');
  font-weight: 100;
  font-style: normal;
}

@font-face {
  font-family: 'IBMPlexSansKR';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Light.woff') format('woff');
  font-weight: 200;
  font-style: normal;
}

@font-face {
  font-family: 'IBMPlexSansKR';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Text.woff') format('woff');
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: 'IBMPlexSansKR';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'IBMPlexSansKR';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Medium.woff') format('woff');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'IBMPlexSansKR';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-SemiBold.woff') format('woff');
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: 'IBMPlexSansKR';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Bold.woff') format('woff');
  font-weight: 700;
  font-style: normal;
}

html, body, head {
  margin: 0;
  padding: 0;
}

* {
  font-family: 'IBM Plex Sans KR', serif;
}

::selection {
  background: #b3d4fc;
  text-shadow: none;
}

a[href] {
  color: inherit !important;
  text-decoration: inherit !important;
}

.mdi {
  font-family: 'Material Design Icons';
}

.blur {
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(4px) saturate(20%);
}

.flatten-btn {
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: .4s;
}

.flatten-btn:hover {
  background: rgb(230, 230, 230);
}

.expand-btn-group {
  display: flex;
  flex-direction: column;
  background-color: white;

  margin-bottom: 20px;
}

.expand-btn-group > * {
  padding-left: 10px;
}

.expand-btn-group > .router-link-exact-active {
  border-left: 5px solid black;
  padding-left: 5px;
}
</style>
