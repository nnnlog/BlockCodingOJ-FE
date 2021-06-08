<template>
  <div style="width: 100%; display: flex; justify-content: space-around;">
    <div style="width: 40%">
      <p style="font-weight: 500; font-size: 30px; display: flex; text-align: left; align-items: center; margin: 50px 0 0 0;">
        문제 목록<span class="mdi mdi-chevron-right"></span>
      </p>
      <div>
        <div style="display: flex; font-weight: 500; padding: 10px;">
          <p style="width: 10%;">#</p>
          <p style="width: 60%;">문제</p>
          <p style="width: 20%; text-align: right;">맞은 사람</p>
          <p style="width: 10%; text-align: right;">제출</p>
        </div>
        <router-link v-for="{id, title, accepted, submit} in recentProblemList"
                     style="color: inherit; text-decoration: inherit; display: flex; font-weight: 300; border-top: 1px solid black; padding: 10px;"
                     class="flatten-btn" :id="id" :to="`/problem/${id}`">
          <p style="width: 10%;">{{ id }}</p>
          <p style="width: 60%;">{{ title }}</p>
          <p style="width: 20%; text-align: right;">{{ accepted }}</p>
          <p style="width: 10%; text-align: right;">{{ submit }}</p>
        </router-link>
      </div>
    </div>
    <div style="width: 40%">

    </div>
  </div>
</template>

<script>
import api from '@/api';

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      recentProblemList: []
    };
  },
  created() {
    this.$store.dispatch('setTitle', "Block Coding OJ");
    this.recentProblemList = api.problem.getRecentList();
  }
}
</script>
