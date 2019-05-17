<template>
  <div class="articleEdit_container">
    articleEdit_container
  </div>
</template>
<script>
export default {
  name: 'articleDetail',
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
    console.log(this.$route.params.row)
  }
}
</script>
<style scoped>
</style>
