// import qs from 'qs'
export default {
  name: 'ShowDetail',
  data () {
    return {
      hotRecommend: []
    }
  },
  methods: {
    async getHotRecommend () {
      // 按照点击量获取
      const {data: {result}} = await this.$http.get('getHotRecommend')
      result.forEach((item, i) => {
        item.article_file = '../../../static/' + item.article_file
      })
      this.hotRecommend = result
    }
  },
  mounted () {
    this.getHotRecommend()
  }
}
