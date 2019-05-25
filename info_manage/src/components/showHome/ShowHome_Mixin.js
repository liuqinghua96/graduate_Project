// import qs from 'qs'
export default {
  name: 'ShowHome',
  data () {
    return {
      // 栏目列表
      cateList: [],
      // 随机推荐
      randCommend: [],
      // 最新评论
      lastComment: []
    }
  },
  methods: {
    // 获取栏目列表
    async getCates () {
      const {data: {result}} = await this.$http.get('getCates')
      this.cateList = result
    },
    // 获取随机推荐数据
    async getRandCmd () {
      const {data: {result}} = await this.$http.get('getRandCmd')
      result.forEach((item, i) => {
        item.article_file = '../../../static/' + item.article_file
      })
      this.randCommend = result
    },
    // 退出
    logout () {
      sessionStorage.removeItem('token')
      this.$router.push('/login')
    },
    // 获取最新评论数据
    async getLastCmt () {
      const {data: {result}} = await this.$http.get('getLastCmt')
      result.forEach((item, i) => {
        item.user_pic = '../../../static/' + item.user_pic
      })
      this.lastComment = result
    },
    // 带参数跳转至'/showList'地址
    toShowList (id) {
      this.$router.push({ path: '/showList', query: { id } })
    },
    toAnnounceList () {
      this.$router.push({ path: '/showAnnounce' })
    },
    toShowDetail (id) {
      this.$router.push({ path: '/showDetail', query: { id } })
    },
    toOwnCenter () {
      this.$router.push('/showOwn')
    }
  },
  mounted () {
    this.getCates()
    this.getRandCmd()
    this.getLastCmt()
  }
}
