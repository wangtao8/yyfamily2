// pages/reply/index.js
const app = getApp()
const api = app.globalData.api // 引入公共请求域名
const getTime = require('../../utils/getTime.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    index: ['1'],
    elWidth: '670rpx',
    elMargin: '16rpx 0rpx 0rpx 30rpx',
    isDisplay: 'none',
    elValue: '',
    placeholders: '发表你的评论吧',
    isfocus: false,
    urls: [],
    marBot: '120rpx',
    scrollWidth: '',
    secondaryReplyInfo: [], //次级回复详细数据
    replyInfo: {},// 上级评论的详细数据
    userInfo: {},
    ids: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    // console.log(JSON.parse(options.replyInfo))
    var replyInfo = JSON.parse(options.replyInfo)
    var topicDcsId = JSON.parse(options.replyInfo).topicDcsId
    var topicID = JSON.parse(options.replyInfo).topicId
    _this.setData({ replyInfo: replyInfo})
    wx.request({ // 查询回复详情
      url: api + '/mockjsdata/6/circle/getResponseMore', 
      data: {
        pageIndex: 1,
        pageSize: 2,
        topicDcsId: topicDcsId,
        topicID: topicID,
        userId: '123'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var secondaryReplyInfo = res.data.data.content
        _this.setData({ secondaryReplyInfo: secondaryReplyInfo})
        console.log('xx:', secondaryReplyInfo)
      }
    })

    wx.getUserInfo({//获得用户信息
      success: res => {
        var _this = this
        var userInfo = res.userInfo
        // console.log(userInfo)
        _this.setData({ userInfo: userInfo })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getFocus: function (e) {
    var _this = this
    // console.log(e)
    this.setData({ elWidth: '560rpx', elMargin: '16rpx 0rpx 0rpx 44rpx;', isDisplay: 'inline-block', isfocus: true })
  },
  getBlur: function () {
    var _this = this
    this.setData({ elWidth: '670rpx', elMargin: '16rpx 0rpx 0rpx 30rpx', isDisplay: 'none', elValue: '', placeholders: '发表你的评论吧', content: '发表' })
  },
  getFocuss: function (e) {
    var id = e.currentTarget.dataset.id
    var placeholders = '回复：' + e.currentTarget.dataset.name
    this.setData({ placeholders: placeholders, isfocus: true, ids: id})
  },
  addNums: function () {
    var nums = this.data.nums + 1
    this.setData({ nums: nums })
  },
  changeValue: function(e) {
    this.setData({ elValue: e.detail.value })
  },
  clearInput: function (e){
    this.setData({ elValue: '' })
  },
  cancel: function (e) {// 点击确定或者取消操作
    // console.log(e.currentTarget.dataset.id)
    var _this = this
    var id = e.currentTarget.dataset.id
    /*
    *  以下内容为模拟发送后返回的数据内容
    * */
    var ids = _this.data.ids //当前回复评论的下标
    var secondaryReplyInfo = _this.data.secondaryReplyInfo//次级回复所有内容
    var dataSet = {}
    var userInfo = _this.data.userInfo
    var wxNickName = userInfo.nickName
    var userPhoto = userInfo.avatarUrl
    var circleId = "ctd001"
    var topicDcsContent = _this.data.elValue
    console.log('12312312312:', _this.data.elValue)
    var topicId = _this.data.replyInfo.topicId
    var topicDcsLikeNum = 0
    var createTime = new Date().Format("yyyy-MM-dd hh:mm:ss")
    // var topId = secondaryReplyInfo[ids].topId  顶级评论id
    // var topicDcsParentId = secondaryReplyInfo[ids].topicDcsParentId  父级评论id
    // var parentNickName = secondaryReplyInfo[ids].wxNickName  父级评论人昵称
    dataSet.wxNickName = wxNickName
    dataSet.userPhoto = userPhoto
    dataSet.circleId = circleId
    dataSet.topicDcsContent = topicDcsContent
    dataSet.topicId = topicId
    dataSet.topicDcsLikeNum = topicDcsLikeNum
    // dataSet.topId = topId
    // dataSet.topicDcsParentId = topicDcsParentId
    // dataSet.parentNickName = parentNickName
    dataSet.createTime = createTime
    _this.setData({ urls: [], elValue: '', marBot: '120rpx'})
    if (id == 0) {
      // 取消评论
    } else {
      if (_this.data.placeholders == '发表你的评论吧') {
        // 发表评论
        dataSet.topId = secondaryReplyInfo[0].topId
        dataSet.topicDcsParentId = secondaryReplyInfo[0].topId
        secondaryReplyInfo.push(dataSet)
        _this.setData({ secondaryReplyInfo: secondaryReplyInfo })
      } else {
        // @他人 回复评论
        dataSet.topId = 'ctd006'
        dataSet.topicDcsParentId = secondaryReplyInfo[ids].topicDcsParentId
        dataSet.parentNickName = secondaryReplyInfo[ids].wxNickName
        secondaryReplyInfo.push(dataSet)
        _this.setData({ secondaryReplyInfo: secondaryReplyInfo })
      }
    }
    _this.setData({ elWidth: '670rpx', elMargin: '16rpx 0rpx 0rpx 30rpx', isDisplay: 'none', placeholders: '发表你的评论吧', content: '发表' })
  },
  uploadImage: function () {
    var currentIndex = this.data.urls.length
    wx.chooseImage({
      count: 6 - currentIndex, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var _this = this
        var tempFilePaths = res.tempFilePaths
        if (_this.data.urls.length == 0) {
          var urls = []
        } else {
          var urls = _this.data.urls
        }
        for (var i = 0; i < tempFilePaths.length; i++) {
          urls.push(tempFilePaths[i])
        }
        _this.setData({ urls: urls, marBot: '250rpx' })
        if (_this.data.urls.length > 5) {
          _this.setData({ scrollWidth: '96%'})
        }
      }
    })
  },
  previewImage: function (e) {
    var id = e.currentTarget.dataset.id
    var ulrs = this.data.urls
    wx.previewImage({
      current: id, // 当前显示图片的http链接
      urls: ulrs // 需要预览的图片http链接列表
    })
  },
  redDele: function (e) {
    var _this = this
    var id = e.currentTarget.dataset.id
    _this.data.urls.splice(id, 1)
    _this.setData({ urls: _this.data.urls })
    if (_this.data.urls.length == 0) {
      _this.setData({ marBot: '120rpx' })
    } else if (_this.data.urls.length <= 5) {
      _this.setData({ scrollWidth: '' })
    }
  },
  goOther: function () {
    wx.navigateTo({
      url: '/pages/my_others/my_others?id=1'
    })
  }
})