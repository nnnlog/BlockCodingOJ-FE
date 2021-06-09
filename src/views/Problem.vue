<template>
  <div style="display: flex; justify-content: center; height: 100%; overflow: hidden;">
    <div style="flex: 1; padding: 20px 50px; border-right: .5px solid black">
      <div><!-- 제출 기록 for logined user --></div>
      <div>
        <h1 style="font-weight: 500; font-size: 45px; margin-bottom: 16px;">{{ problemData.title }}</h1>
        <hr width="100%" color="black" style="margin-bottom: 36px;">
        <article>
          <h3 style="font-weight: 600; font-size: 30px; margin: 0;">문제</h3>
          <p style="margin: 5px 0 20px 0;">{{ problemData.statement?.body }}</p>
          <section v-for="({input, output}, i) in problemData.statement?.example" :id="i">
            <h3 style="font-weight: 600; font-size: 25px; margin: 0;">예제 {{ i + 1 }}</h3>
            <h5 style="font-weight: 600; font-size: 20px; margin: 0;">입력</h5>
            <pre style="margin: 5px 0 20px 0;">{{ input }}</pre>
            <h5 style="font-weight: 600; font-size: 20px; margin: 0;">출력</h5>
            <pre style="margin: 5px 0 20px 0;">{{ output }}</pre>
          </section>
        </article>
      </div>
    </div>
    <div style="flex: 1; padding: 20px; border-left: .5px solid black">
      Blockly will be inserted here.
    </div>
  </div>
</template>

<script>
import api from '@/api';

export default {
  name: 'Problem',
  components: {},
  computed: {
    problemId() {
      return this.$route.params.id;
    },
  },
  data() {
    return {
      problemData: {},
    };
  },
  methods() {
    return {}
  },
  async created() {
    this.problemData = await api.problem.getProblemFromId(this.problemId);
    if (Object.values(this.problemData).length === 0) {
      await this.$router.push({
        name: 'Home'
      });
      return;
    }
    this.$store.dispatch('setTitle', `${this.problemId}번 : ${this.problemData.title}`);
  }
}
</script>
