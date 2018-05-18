// pages/reply/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: ['1', '2', '3'],
    elWidth: '670rpx',
    elMargin: '16rpx 0rpx 0rpx 30rpx',
    isDisplay: 'none',
    elValue: '',
    placeholders: '发表你的评论吧',
    isfocus: false,
    content: '发表',
    nums: 0
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
    this.setData({ elWidth: '70%', elMargin: '16rpx 0rpx 0rpx 44rpx;', isDisplay: 'inline-block' })
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
  clearInput: function (){
    this.setData({ elValue: '' })
  },
  cancel: function () {
    var _this = this
    this.setData({ elWidth: '670rpx', elMargin: '16rpx 0rpx 0rpx 30rpx', isDisplay: 'none', placeholders: '发表你的评论吧', content: '发表' })
  }
})