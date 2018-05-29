// pages/my_favorite/my_ favorite.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_data: [{
      title: '我收藏的标题',
      tile_scent: '999个人',
      comment: '1000话题',

    }, {
      title: '我收藏的标题',
      tile_scent: '999个人',
      comment: '2000话题',

    }]

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.setNavigationBarColor({
    //   frontColor: '#ffffff',
    //   backgroundColor: '#000000',
    //    animation: {
    //      duration: 400,
    //      timingFunc: 'easeIn'
    //    }
    // })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  circleInfo:function(){
   wx.navigateTo({
     url: '../../pages/circleInfo/index',
     
   })
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

  }
})