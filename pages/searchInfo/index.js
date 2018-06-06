// pages/searchInfo/index.js
const app = getApp()
const api = app.globalData.api // 引入公共请求域名
const getTime = require('../../utils/getTime.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexs: [1,2],
    topicInfo:[],//话题详情
    circleInfo:[]//圈子详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var circleInfo = JSON.parse(options.circles)
    var topicInfo = JSON.parse(options.topics)
    _this.setData({ circleInfo: circleInfo, topicInfo: topicInfo})
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
  toInfos: function (e) {
    var id = e.currentTarget.dataset.id
    var data = this.data.topicInfo[id]
    // console.log(data)
    wx.navigateTo({
      url: '/pages/circleInfo/index?id=1&data=' + JSON.stringify(data)
    })
  },
  toCircleList: function () {
    var circles = this.data.circleInfo
    wx.navigateTo({
      url: '/pages/searchList-circle/index?circles=' + JSON.stringify(circles)
    })
  },
  toTopicList: function () {
    var topics = this.data.topicInfo    
    wx.navigateTo({
      url: '/pages/searchList-topic/index?topics=' + JSON.stringify(topics)
    })
  }
})