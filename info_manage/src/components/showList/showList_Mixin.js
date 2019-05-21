// import qs from 'qs'
export default {
  name: 'ShowList',
  data () {
    return {
      h3Text: '',
      dataList: [],
      queryId: this.$route.query.id,
      focusList: []
    }
  },
  watch: {
    '$route' (to, from) {
      this.getData(this.$route.query.id)
    }
  },
  methods: {
    async getData (id) {
      // 按照id获取
      const { data: { result } } = await this.$http.get('getShowList', {
        params: { id }
      })
      result.forEach((item, i) => {
        item.article_file = '../../../static/' + item.article_file
      })
      this.dataList = result
      this.h3Text = result[0].cate_name
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
    this.getData(this.queryId)
    this.getFocus()
  }
}
