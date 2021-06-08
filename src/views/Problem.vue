<template>

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
  created() {
    this.problemData = api.problem.getProblemFromId(this.problemId);
    if (Object.values(this.problemData).length === 0) {
      this.$router.push({
        name: 'Home'
      });
    }
    this.$store.dispatch('setTitle', `${this.problemId}번 : ${this.problemData.title}`);
  }
}
</script>
