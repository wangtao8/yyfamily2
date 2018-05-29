// pages/circlePresent/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    trueOrfalse: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({ trueOrfalse: options.isJion })
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
  openToast: function (e) {
    var id = e.target.dataset.id
    console.log(id)
    if (id == 0) {
      this.setData({ trueOrfalse: 1 })
      wx.showToast({
        title: '已加入该圈子',
        icon: 'success',
        duration: 2000
      });
    } else {
      this.setData({ trueOrfalse: 0 })
      wx.showToast({
        title: '已退出该圈子',
        icon: 'success',
        duration: 2000
      });
    }
  },
  toInfo: function () {
    wx.navigateTo({
      url: '/pages/circleInfo/index?id=1'
    })
  },
  goIssue: function () {
    wx.navigateTo({
      url: '/pages/issue/index'
    })
  }
})