// pages/circleInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    elWidth: '670rpx',// 样式
    elMargin: '16rpx 0rpx 0rpx 30rpx',// 样式
    isDisplay: 'none',// 发表按钮 取消按钮 上传图片的控制
    elValue: '',// 输入框值
    placeholders: '发表你的评论吧',// 输入框提示文字
    isfocus: false,// 输入框是否获得焦点
    // nums: 0,
    message: '关注',//关注 或者 已关注
    urls: [],//图片预览后展示图片的url
    marBot: '120rpx',// 一个样式
    showUrls: [], //模拟用户评论时发表图片的url 
    ids: 1 //是否显示圈子信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({ ids: options.id }) // 页面加载时接收其他页面带来的参数 为0不显示圈子信息
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
  getFocus: function (e) {// 获得焦点的事件
    var _this = this
    this.setData({ elWidth: '500rpx', elMargin: '16rpx 0rpx 0rpx 44rpx;', isDisplay: 'inline-block' })
  },
  getBlur: function () {// 失去焦点的事件
    var _this = this
    this.setData({ elWidth: '670rpx', elMargin: '16rpx 0rpx 0rpx 30rpx', isDisplay: 'none', elValue: '', placeholders: '发表你的评论吧'})
  },
  // addNums: function () {
  //   var nums = this.data.nums + 1
  //   this.setData({ nums: nums })
  // },
  changeValue: function (e) {// 输入框值改变时
    this.setData({ elValue: e.detail.value })
  },
  clearInput: function (e) {// 清除输入框值 
    console.log(2)
    this.setData({ elValue: '' })
  },
  cancel: function (e) {// 点击确定或者取消操作
    console.log(e.currentTarget.dataset.id)
    var _this = this
    var id = e.currentTarget.dataset.id
    var urls = _this.data.urls
    _this.setData({ showUrls: urls, urls: [], elValue: '', marBot: '120rpx'})
    if (id == 0) {// 暂没有操作

    } else {

    }
    this.setData({ elWidth: '670rpx', elMargin: '16rpx 0rpx 0rpx 30rpx', isDisplay: 'none', placeholders: '发表你的评论吧', content: '发表' })
  },
  goReply: function () {// 评论详情页面
    wx.navigateTo({
      url: '/pages/reply/index?id=1'
    })
  },
  attention: function () {// 切换关注状态
    if ( this.data.message == '关注' ) {
      this.setData({ message: '已关注' })
      wx.showToast({
        title: '已关注',
        icon: 'success',
        duration: 2000
      });
    } else {
      this.setData({ message: '关注' })
      wx.showToast({
        title: '取消关注',
        icon: 'success',
        duration: 2000
      });
    }
  },
  uploadImage: function () {// 上传评论图片
    var currentIndex = this.data.urls.length
    wx.chooseImage({
      count: 6 - currentIndex, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res=> {
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
        _this.setData({ urls: urls, marBot: '250rpx'})
        if (_this.data.urls.length > 5) {
          _this.setData({ scrollWidth: '96%' })
        }
      }
    })
  },
  previewImage: function (e) {// 预览评论图片
    var id = e.currentTarget.dataset.id
    var ulrs = this.data.urls
    wx.previewImage({
      current: id, // 当前显示图片的http链接
      urls: ulrs // 需要预览的图片http链接列表
    })
  },
  redDele: function (e) {// 删除预览图片
    var _this = this
    var id = e.currentTarget.dataset.id
      _this.data.urls.splice(id, 1)
      _this.setData({ urls: _this.data.urls })
      if (_this.data.urls.length == 0) {
        _this.setData({ marBot: '120rpx'})
      } else if (_this.data.urls.length <= 5) {
        _this.setData({ scrollWidth: '' })
      }
  },
  goOther: function () {// 跳转到他人个人页面
    wx.navigateTo({
      url: '/pages/my_others/my_others?id=1'
    })
  }
})