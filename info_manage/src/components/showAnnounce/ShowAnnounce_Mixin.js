// import qs from 'qs'
export default {
  name: 'showAnnounce',
  data () {
    return {
      announceList: [],
      hotRecommend: []
    }
  },
  methods: {
    async getAllAnnounce () {
      const {data: {result}} = await this.$http.get('getAllAnnounce')
      this.announceList = result
    },
    async getHotRecommend () {
      // 按照点击量获取
      const {data: {result}} = await this.$http.get('getHotRecommend')
      result.forEach((item, i) => {
        item.article_file = '../../../static/' + item.article_file
      })
      this.hotRecommend = result
    },
    toShowDetail (id) {
      this.$router.push({ path: '/showDetail', query: { id } })
    }
  },
  mounted () {
    this.getAllAnnounce()
    this.getHotRecommend()
  }
}
