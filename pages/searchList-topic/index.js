// pages/searchList-topic/index.js
const app = getApp()
const api = app.globalData.api // 引入公共请求域名
Page({

  /**
   * 页面的初始数据
   */
  data: {
      indexs:[1,2,3],
      topicInfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var topicInfo = JSON.parse(options.topics)
    _this.setData({ topicInfo: topicInfo })
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
  toInfos: function (e) {
    var id = e.currentTarget.dataset.id
    var data = this.data.topicInfo[id]
    // console.log(data)
    wx.navigateTo({
      url: '/pages/circleInfo/index?id=1&data=' + JSON.stringify(data)
    })
  }
})