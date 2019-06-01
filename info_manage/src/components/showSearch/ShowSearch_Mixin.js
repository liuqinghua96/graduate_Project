// import qs from 'qs'
export default {
  name: 'ShowSearch',
  data () {
    return {
      dataList: [],
      queryWords: this.$route.query.keywords,
      focusList: []
    }
  },
  watch: {
    '$route' (to, from) {
      this.getData(this.$route.query.keywords)
    }
  },
  methods: {
    async getData (keywords) {
      // 按照id获取
      const { data: { result } } = await this.$http.get('getShowSearch', {
        params: { keywords }
      })
      console.log(result)
      result.forEach((item, i) => {
        item.article_file = '../../../static/' + item.article_file
      })
      this.dataList = result
    },
    toShowDetail (id) {
      this.$router.push({ path: '/showDetail', query: { id } })
    },
    async getFocus () {
      const {data: {result}} = await this.$http.get('getFocus')
      result.forEach((item, i) => {
        item.article_file = '../../../static/' + item.article_file
      })
      this.focusList = result
    }
  },
  mounted () {
    this.getData(this.queryWords)
    this.getFocus()
  }
}
