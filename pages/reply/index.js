// pages/reply/index.js
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
    nums: 0,
    urls: [],
    marBot: '120rpx',
    scrollWidth: '',
    replyUsers: '稳得起' //回复的人昵称
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('xxo:', options)
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
    this.setData({ elWidth: '560rpx', elMargin: '16rpx 0rpx 0rpx 44rpx;', isDisplay: 'inline-block' })
  },
  getBlur: function () {
    var _this = this
    this.setData({ elWidth: '670rpx', elMargin: '16rpx 0rpx 0rpx 30rpx', isDisplay: 'none', elValue: '', placeholders: '发表你的评论吧', content: '发表' })
  },
  getFocuss: function (e) {
    var placeholders = '回复：' + e.currentTarget.dataset.name
    this.setData({ placeholders: placeholders, isfocus: true, content: '回复' })
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
    console.log(e.currentTarget.dataset.id)
    var _this = this
    var id = e.currentTarget.dataset.id
    _this.setData({ urls: [], elValue: '', marBot: '120rpx'})
    if (id == 0) {// 暂没有操作

    } else {

    }
    this.setData({ elWidth: '670rpx', elMargin: '16rpx 0rpx 0rpx 30rpx', isDisplay: 'none', placeholders: '发表你的评论吧', content: '发表' })
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