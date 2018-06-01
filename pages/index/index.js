//index.js
//获取应用实例
const app = getApp()
const api = app.globalData.api // 引入公共请求域名
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    indexs:['1','2'],
    tabs: ["热门", "发现", "圈子"],
    activeIndex: 2,
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
    isJion: '+ 加入',
    circleInfo: [],// 我的圈子详情
    hotCircleInfo: []// 热门圈子详情
  },
  onReady: function (res) {
    
  },
  onLoad: function () {
    var _this = this;
    wx.request({//获得我的圈子
      url: api + '/mockjsdata/6/circle/myCircle',
      data: {
        pageIndex: 1,
        pageSize: 2,
        userId: '123'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        _this.setData({ circleInfo: res.data.data.content })
        // console.log(res.data.data)
      }
    })
    wx.request({
      url: api + '/mockjsdata/6/circle/hotCircle', //仅为示例，并非真实的接口地址
      data: {
        userId: '123'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        _this.setData({ hotCircleInfo: res.data.data})
      }
    })
    wx.getSystemInfo({// 控制顶部tab切换
      success: function (res) {
        _this.setData({
          sliderLeft: (res.windowWidth / _this.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / _this.data.tabs.length * _this.data.activeIndex
        });
      }
    });
  },
  onShow: function () {
    // console.log(1)
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
  checkHeart: function (e) {
    var _this = this
    if (_this.data.curIndex == 0){
      _this.setData({ curIndex: 1 })
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 1000
      })
    } else {
      _this.setData({ curIndex: 0 })
      wx.showToast({
        title: '取消收藏',
        icon: 'success',
        duration: 1000
      })
    }
  },
  openMessageInfo: function () {
    wx.navigateTo({
      url: '/pages/circleInfo/index?id=0'
    })
  },
  laudOrCancel: function () {
    console.log('234')
  },
  toInfo: function () {
    wx.navigateTo({
      url: '/pages/circlePresent/index?isJion=1'
    })
  },
  goInfo: function () {
    wx.navigateTo({
      url: '/pages/circlePresent/index?isJion=0'
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
  },
  toInfos: function () {
    wx.navigateTo({
      url: '/pages/circleInfo/index?id=1'
    })
  },
  goDetails: function () {
    wx.navigateTo({
      url: '/pages/details/index?id=1'
    })
  },
  goSelf: function () {
    wx.navigateTo({
      url: '/pages/my_profile/my_profile?id=1'
    })
  },
  searchList: function () {// 跳转到搜索结果页面
    // wx.request({// 查询圈子
    //   url: 'http://172.30.3.40:9086/mockjsdata/6/circle/searchTopic', //仅为示例，并非真实的接口地址
    //   data: {
    //     circleIdx: '123',
    //     pageIndex: 1,
    //     pageSize: 2,
    //     searchStr: '呵呵',
    //     userId: '123'
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     console.log(res.data.data)
    //     var circle = res.data.data.content
    //     if (res.data.state) {
    //       wx.request({// 查询话题
    //         url: 'http://172.30.3.40:9086/mockjsdata/6/circle/searchTopic', //仅为示例，并非真实的接口地址
    //         data: {
    //           circleIdx: '123',
    //           pageIndex: 1,
    //           pageSize: 2,
    //           searchStr: '呵呵',
    //           userId: '123'
    //         },
    //         header: {
    //           'content-type': 'application/json' // 默认值
    //         },
    //         success: function (res) {
    //           console.log(res.data)
    //           wx.navigateTo({
    //             url: '/pages/searchInfo/index?circle=' + circle + '&topic=' + topic
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
    wx.navigateTo({
      url: '/pages/searchInfo/index'
    })
  },
  toMyCircle: function () { // 查看更多我的圈子
    wx.navigateTo({
      url: '/pages/searchList-circle/index'
    })
  },
  onPullDownRefresh: function () {
    console.log(11)
  },
  onReachBottom: function () {
    console.log(22)
  }
});