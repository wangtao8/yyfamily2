// pages/circleInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    elWidth: '82%',
    elMargin: '22rpx auto 0rpx;',
    isDisplay: 'none',
    elValue: ''
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
  getFocus: function (e) {
    var _this = this
    this.setData({ elWidth: '70%', elMargin: '22rpx 0rpx 0rpx 44rpx;', isDisplay: 'inline-block'})
  },
  getBlur: function () {
    var _this = this
    this.setData({ elWidth: '82%', elMargin: '22rpx auto 0rpx;', isDisplay: 'none', elValue: ''})
  }
})