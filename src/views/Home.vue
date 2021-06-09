<template>
  <div style="width: 100%; display: flex; justify-content: space-around;">
    <div style="width: 40%">
      <router-link
          to="/problems/"
          style="font-weight: 500; font-size: 30px; display: flex; text-align: left; align-items: center; margin: 50px 0 0 0;"
      >
        문제 목록<span class="mdi mdi-chevron-right"></span>
      </router-link>
      <div>
        <div style="font-weight: 500; border: none;" class="prob-list-row">
          <p style="width: 10%;">#</p>
          <p style="width: 60%;">문제</p>
          <p style="width: 20%; text-align: right;">맞은 사람</p>
          <p style="width: 10%; text-align: right;">제출</p>
        </div>
        <router-link v-for="{problem_id, title, accepted, submit} in recentProblemList"
                     style="font-weight: 300;"
                     class="flatten-btn prob-list-row" :id="problem_id" :to="`/problem/${problem_id}`">
          <p style="width: 10%;">{{ problem_id }}</p>
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
  async created() {
    this.$store.dispatch('setTitle', "Block Coding OJ");
    this.recentProblemList = await api.problem.getRecentList();
  }
}
</script>

<style>
.prob-list-row {
  display: flex;
  align-items: center;

  border-top: 1px solid black;
  padding: 10px;
  height: 40px;
}
</style>
