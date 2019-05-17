// import qs from 'qs'
export default {
  name: 'ShowList',
  data () {
    return {
      h3Text: '',
      dataList: [],
      queryId: this.$route.query.id
    }
  },
  watch: {
    /* queryId: (newVal, oldVal) => {
    } */
  },
  methods: {
    async getData () {
      // console.log(this.$route.query.id)
      // 按照id获取
      const { data: { result } } = await this.$http.get('getShowList', {
        params: { id: this.queryId }
      })
      result.forEach((item, i) => {
        item.article_file = '../../../static/' + item.article_file
      })
      this.dataList = result
      this.h3Text = result[0].cate_name
    }
  },
  mounted () {
    this.getData()
  }/* ,
  beforeUpdate () {
    if (this.$route.query.id !== this.queryId) {
      this.getData()
      this.queryId = this.$route.query.id
    }
  } */
}
