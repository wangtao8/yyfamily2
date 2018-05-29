// pages/my_favorite/my_ favorite.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  list_data:[{
    title:'我收藏的标题',
    tile_scent:'副标题',
    comment:'123',
    like:'456666'
  },{
      title: '我收藏的标题',
      tile_scent: '副标题',
      comment: '1233333',
      like: '456'
  }
    , {
    title: '我收藏的标题',
    tile_scent: '副标题',
    comment: '123',
    like: '456'
  }]
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  articleDetails:function(){
  wx.navigateTo({
    url: '../../pages/articleDetails/index',

  })
  },
  profile:function (){
   wx.navigateTo({
     url: '../../pages/my_profile/my_profile',
   })
  },
  index:function(){
    wx.navigateTo({
      url: '../../pages/index/index',
    })
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
  
  }
})