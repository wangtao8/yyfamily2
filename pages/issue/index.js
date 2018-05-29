// pages/issue/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    writed: 0,
    elHeight: '350rpx',
    urls: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  getChange: function (e) {
    this.setData({ writed: e.detail.value.length})
  },
  chooseImg: function () {
    wx.chooseImage({
      count: 6, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res=> {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        var _this = this
        var tempFilePaths = res.tempFilePaths
        if(_this.data.urls == '') {
          var urls = []
        } else {
          var urls = _this.data.urls
        }
        for (var i = 0; i < tempFilePaths.length; i++) {
          // console.log(tempFilePaths[i])
          urls.push(tempFilePaths[i]).reverse
        }
        _this.setData({ urls: urls})
        // console.log('1:', _this.data.urls)
      }
    })
  },
  seeImg: function(e){
    var _this = this
    var index = e.target.dataset.id
    wx.previewImage({
      current: _this.data.urls[index], // 当前显示图片的http链接
      urls: _this.data.urls // 需要预览的图片http链接列表
    })
  },
  dellImage: function(e){
    var _this = this
    var urls = _this.data.urls
    _this.data.urls.splice(e.target.dataset.id, 1)
    this.setData({ urls: urls })
  }
})