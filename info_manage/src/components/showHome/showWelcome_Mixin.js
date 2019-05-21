// import qs from 'qs'
export default {
  name: 'ShowWelcome',
  data () {
    return {
      focusList: [],
      weekHotList: [],
      hotRecommend: [],
      lastSubmitList: [],
      lastAnnounce: []
    }
  },
  methods: {
    async getLastAnnounce () {
      const {data: {result}} = await this.$http.get('getLastAnnounce')
      this.lastAnnounce = result
    },
    async getFocus () {
      const {data: {result}} = await this.$http.get('getFocus')
      result.forEach((item, i) => {
        item.article_file = '../../../static/' + item.article_file
      })
      this.focusList = result
    },
    async getWeekHot () {
      // 按照点赞数量获取
      const {data: {result}} = await this.$http.get('getWeekHot')
      result.forEach((item, i) => {
        item.article_file = '../../../static/' + item.article_file
      })
      this.weekHotList = result
    },
    async getHotRecommend () {
      // 按照点击量获取
      const {data: {result}} = await this.$http.get('getHotRecommend')
      result.forEach((item, i) => {
        item.article_file = '../../../static/' + item.article_file
      })
      this.hotRecommend = result
    },
    async getLastSubmit () {
      // 按照id获取
      const {data: {result}} = await this.$http.get('getLastSubmit')
      result.forEach((item, i) => {
        item.article_file = '../../../static/' + item.article_file
      })
      this.lastSubmitList = result
    },
    toShowList (id) {
      this.$router.push({ path: '/showList', query: { id } })
    },
    toShowDetail (id) {
      this.$router.push({ path: '/showDetail', query: { id } })
    }
  },
  mounted () {
    this.getFocus()
    this.getWeekHot()
    this.getHotRecommend()
    this.getLastSubmit()
    this.getLastAnnounce()
  }
}
