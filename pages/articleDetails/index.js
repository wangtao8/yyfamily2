// pages/articleDetails/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      index: ['1','1','1','1']
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
  openMessageInfo: function () { // 跳转到评论详情页
    wx.navigateTo({
      url: '/pages/circleInfo/index?id=0'
    })
  },
  onShareAppMessage: function (res) { // 页面的转发
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '好文章来看看',
      path: '/pages/articleDetails/index?id=123'
    }
  }
})