//index.js
//获取应用实例
const app = getApp()
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    index:['1','2','3','4','5'],
    tabs: ["热门", "发现", "圈子"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    inputShowed: false,
    inputVal: "",
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    curIndex: 0,
    isJion: '+ 加入'
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
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
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  checkHeart: function () {
    var _this = this
    if (_this.data.curIndex == 0){
      _this.setData({ curIndex: 1 })
    } else {
      _this.setData({ curIndex: 0 })
    }
  },
  openMessageInfo: function () {
    wx.navigateTo({
      url: '/pages/reply/index?id=1'
    })
  },
  laudOrCancel: function () {
    console.log('234')
  },
  toInfo: function () {
    wx.navigateTo({
      url: '/pages/circleInfo/index?id=1'
    })
  },
  goInfo: function () {
    wx.navigateTo({
      url: '/pages/circlePresent/index'
    })
  },
  jion: function () {
    this.setData({ isJion: '已加入' })
    wx.showToast({
      title: '已加入该圈子',
      icon: 'success',
      duration: 2000
    });
  },
  articleInfo: function(){
    wx.navigateTo({
      url: '/pages/articleDetails/index'
    })
  }
});