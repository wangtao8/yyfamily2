// pages/circlePresent/index.js
const app = getApp()
const api = app.globalData.api // 引入公共请求域名
Page({

  /**
   * 页面的初始数据
   */
  data: {
    trueOrfalse: null,//是否加入圈子状态
    inputShowed: false,
    inputVal: "",
    opacitys: 0,
    circleInfo: {},
    moreCircleInfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    var _this = this
    // _this.setData({ trueOrfalse: options.isJion })
    wx.request({// 查询圈子详情
      url: api + '/mockjsdata/6/circle/circleInfo', //仅为示例，并非真实的接口地址
      data: {
        circleId: '123',
        userId: '123'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        _this.setData({ circleInfo: res.data.data})
      }
    })
    wx.request({// 查询圈子话题
      url: api + '/mockjsdata/6/circle/searchCircleTopics', //仅为示例，并非真实的接口地址
      data: {
        circleId: '123',
        pageIndex: 1,
        pageSize: 2,
        userId: '234'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data.data.content)
        _this.setData({ moreCircleInfo: res.data.data.content})
      }
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
  
  },
  openToast: function (e) {
    var id = e.target.dataset.id
    // console.log(id)
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
  toInfo: function (e) {
    var id = e.currentTarget.dataset.id
    var data = this.data.moreCircleInfo[id]
    // console.log(data)
    wx.navigateTo({
      url: '/pages/circleInfo/index?id=1&data=' + JSON.stringify(data)
    })
  },
  goIssue: function () {
    wx.navigateTo({
      url: '/pages/issue/index'
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    // console.log(1)
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  watchScroll: function(e) {
    var opacitys = e.detail.scrollTop < 10 ? 0 : e.detail.scrollTop / 40
    this.setData({ opacitys: opacitys})
    // console.log(e.detail.scrollTop)
  }
})