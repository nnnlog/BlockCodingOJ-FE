<template>
  <nav
      style="padding: 0 20px; height: 70px; border-bottom: 1px solid black; display: flex; justify-content: space-between; align-items: center;">
    <div style="font-size: 23px; font-weight: 500;">{{ $store.getters.title }}</div>
    <div style="font-size: 23px; width: 40px; height: 40px;" class="flatten-btn">
      <span class="mdi mdi-menu"></span>
    </div>
  </nav>
  <router-view/>
</template>

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

.mdi {
  font-family: 'Material Design Icons';
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
</style>
