// pages/searchInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexs: [1,2],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options.data)
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
  toInfo: function () {
    wx.navigateTo({
      url: '/pages/circlePresent/index?isJion=1'
    })
  },
  toInfos: function () {
    wx.navigateTo({
      url: '/pages/circleInfo/index?id=1'
    })
  },
  toCircleList: function () {
    wx.navigateTo({
      url: '/pages/searchList-circle/index?id=1'
    })
  },
  toTopicList: function () {
    wx.navigateTo({
      url: '/pages/searchList-topic/index?id=1'
    })
  }
})