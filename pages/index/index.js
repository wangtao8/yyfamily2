//index.js
//获取应用实例
const app = getApp()
const api = app.globalData.api // 引入公共请求域名
const errorCodeFind = require('../../utils/errorCode.js')//错误信息转换
var WxParse = require('../../wxParse/wxParse.js')

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    indexs: ['1', '2'],
    tabs: ["热门", "发现", "圈子"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    inputShowed: false,
    inputVal: "",
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    curIndex: 0,
    isJion: '+ 加入',
    circleInfo: [],// 我的圈子详情
    hotCircleInfo: [],// 热门圈子详情
    findList: []//发现页列表信息
  },
  onReady: function (res) {
    
  },
  onLoad: function () {
    console.log('2323:', errorCodeFind(101))//错误信息转换
  },
  onShow: function () {
    var _this = this;
    wx.request({//获得我的圈子
      url: api + '/mockjsdata/6/circle/myCircle',
      data: {
        needUserPhotos: 0,
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
    wx.request({//查询热门圈子
      url: api + '/mockjsdata/6/circle/hotCircle',
      data: {
        userId: '123'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        _this.setData({ hotCircleInfo: res.data.data })
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
    wx.request({//查询发现页面文章列表
      url: api + '/mockjsdata/6/discovery/searchAllArticle',
      data: {
        userId: '123'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res2) {
        var findList = res2.data.data
        _this.setData({ findList: findList })
        console.log('123:', findList)
      }
    })
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
    var id = e.currentTarget.dataset.id
    var upId = e.currentTarget.dataset.upid
    var findList = _this.data.findList
    var isCollected = findList[upId][id].isCollected
    console.log(isCollected)
    if (isCollected == 0) {
      findList[upId][id].isCollected = 1
      _this.setData({ findList: findList})
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 1000
      })
    } else {
      findList[upId][id].isCollected = 0
      _this.setData({ findList: findList })
      wx.showToast({
        title: '取消收藏',
        icon: 'success',
        duration: 1000
      })
    }
  },
  openMessageInfo: function (e) {
    var articleId = e.currentTarget.dataset.id
    const requestTask = wx.request({
      url: api + '/mockjsdata/6/getDiscArticleDiscuss',
      data: {
        articleId: articleId,
        pageIndex: 1,
        pageSize: 3,
        userId: '123'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
       if (res.data.state == 1) {
         var replyInfo = res.data.data.content
         wx.navigateTo({
           url: '/pages/circleInfo/index?id=0&replyInfo=' + JSON.stringify(replyInfo)
         })
       }
      }
    })
  },
  onShareAppMessage: function (res) {//分享
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '小哥哥，小姐姐出门儿必备！',
      path: 'pages/index/index',
      imageUrl: 'http://img.taopic.com/uploads/allimg/140513/235059-14051312145473.jpg',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  laudOrCancel: function (e) {
    // console.log(e.currentTarget.dataset)
    var _this = this
    var upId = e.currentTarget.dataset.upid
    var id = e.currentTarget.dataset.id
    var findList = _this.data.findList
    var isLike = findList[upId][id].isLiked
    // console.log(isLike)
    if (isLike == 0) {
      findList[upId][id].isLiked = 1
      findList[upId][id].articleLikeNum = parseInt(findList[upId][id].articleLikeNum) + 1
      _this.setData({ findList: findList})
    } else {
      findList[upId][id].isLiked = 0
      findList[upId][id].articleLikeNum = parseInt(findList[upId][id].articleLikeNum) - 1
      _this.setData({ findList: findList })
    }
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
  jion: function (e) {
    var _this = this
    var id = e.currentTarget.dataset.id//当前操作的圈子索引
    var circleId = _this.data.circleInfo[id].circleId//圈子id
    var hotCircleInfo = _this.data.hotCircleInfo//热门圈子信息
    var isJoin = hotCircleInfo[id].isJoin//是否已加入
    // console.log(circleId)
    wx.request({
      url: api + '/mockjsdata/6/circle/joinCircle',
      data: {
        circleId: circleId,
        optType: 1,
        userId: '12312'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.state == 1) {
          hotCircleInfo[id].isJoin = 1
          _this.setData({ hotCircleInfo: hotCircleInfo })
          _this.setData({ isJion: '已加入' })
          wx.showToast({
            title: '已加入该圈子',
            icon: 'success',
            duration: 2000
          });
        }
      }
    })
  },
  articleInfo: function (e) {//跳转到文章详情
    var articleId = e.currentTarget.dataset.id
    // console.log(articleId)
    wx.navigateTo({
      url: '/pages/articleDetails/index?articleId=' + articleId
    })
  },
  toInfos: function () {//跳转到热门话题详情
    wx.navigateTo({
      url: '/pages/circleInfo/index?id=1'
    })
  },
  goDetails: function (e) {
    var _this = this
    var id = e.currentTarget.dataset.id
    var categoryId = e.currentTarget.dataset.categoryId
    console.log('123123123:', e.currentTarget.dataset)
    const requestTask = wx.request({
      url: api + '/mockjsdata/6/discovery/searchArtcleList',
      data: {
        category_id: categoryId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.state == 1) {
          var moreList = res.data.data.content
          wx.navigateTo({
            url: '/pages/details/index?moreList=' + JSON.stringify(moreList) + '&id=1'
          })
        }
      }
    })
  },
  goSelf: function () {
    wx.navigateTo({
      url: '/pages/my_profile/my_profile?id=1'
    })
  },
  searchList: function () {// 跳转到搜索结果页面
    wx.request({// 查询话题
      url: api + '/mockjsdata/6/circle/searchTopic',
      data: {
        circleIdx: '123',
        pageIndex: 1,
        pageSize: 2,
        searchStr: '呵呵',
        userId: '123'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log('123123:', res.data.data)
        var topics = res.data.data.content
        if (res.data.state) {
          wx.request({
            url: api + '/mockjsdata/6/circle/searchCircle', //搜索圈子
            data: {
              pageIndex: 1,
              pageSize: 2,
              searchStr: '呵呵',
              userId: '1231'
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              var circles = res.data.data.content
              // console.log(circles)
              if (res.data.state == 1) {
                wx.navigateTo({
                  url: '/pages/searchInfo/index?topics=' + JSON.stringify(topics) + '&circles=' + JSON.stringify(circles)
                })
              }
            }
          })
        }
      }
    })
    // wx.navigateTo({
    //   url: '/pages/searchInfo/index'
    // })
  },
  toMyCircle: function () { // 查看更多我的圈子

    var circles = this.data.circleInfo
    wx.navigateTo({
      url: '/pages/searchList-circle/index?circles=' + JSON.stringify(circles)
    })
  },
  // onPullDownRefresh: function () {
  //   // console.log(11)
  // },
  // onReachBottom: function () {
  //   // console.log(22)
  // },
  searchArticle: function(){//搜索文章
    wx.request({
      url: api + '/mockjsdata/6/discovery/searchArticle',
      data: {
        pageIndex: 1,
        pageSize: 3,
        searchStr: '呵呵',
        userId: '123'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data.data.content)
        var searchInfo = res.data.data.content
        wx.navigateTo({
          url: '/pages/details/index?searchInfo=' + JSON.stringify(searchInfo)
        })
      }
    })
  },
  goShop: function(){
    wx.navigateTo({
      url: '/pages/shop/index'
    })
  }
});