// pages/circle/index.js
const app = getApp()
const api = app.globalData.api // 引入公共请求域名
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: ['1', '2', '3', '4', '5']
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
  toInfo: function () {
    wx.navigateTo({
      url: '/pages/circleInfo/index?id=1' //跳转到评论详情
    })
  },
  goInfo: function () {
    wx.navigateTo({
      url: '/pages/circlePresent/index' //跳转到圈子详情
    })
  }
})