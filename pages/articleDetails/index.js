// pages/articleDetails/index.js
const app = getApp()
const api = app.globalData.api // 引入公共请求域名
var WxParse = require('../../wxParse/wxParse.js')//富文本js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      index: ['1','1','1','1'],
      relatedGoods: [],//相关商品
      articleInfo:{},//文章详情
      articleId: '',//文章id
      userInfo: {}//用户信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var articleId = options.articleId
    wx.hideShareMenu()
    wx.request({//查询相关商品
      url: api + '/mockjsdata/6/discovery/searchArticleGoods',
      data: {
        articleId: articleId,
        userId: '123'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var relatedGoods = res.data.data.content
        _this.setData({ relatedGoods: relatedGoods, articleId: articleId})
      }
    })
    wx.request({//查询文章详情
      url: api + '/mockjsdata/6/discovery/getArticleInfor',
      data: {
        articleId: articleId,
        userId: '123'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var articleInfo = res.data.data
        var article = articleInfo.articleContent
        WxParse.wxParse('article', 'html', article, _this, 5)//渲染富文本
        _this.setData({ articleInfo: articleInfo})
        // console.log('33333:', articleInfo)
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
    var _this = this
    
    wx.getUserInfo({//获得用户信息
      success: res => {
        var userInfo = res.userInfo
        var articleId = _this.data.articleId
        var articleInfo = _this.data.articleInfo
        var categoryId = articleInfo.categoryId
        var userName = userInfo.nickName
        wx.request({
          url: api + '/mockjsdata/6/discovery/browserRecord',
          data: {
            articleId: articleId,
            categoryId: categoryId,
            userName: userName,
            userId: '123'
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log('记录用户文章访问记录成功:', res.data)
          }
        })
      },
      fail: res => {
        console.log(res)
      }
    })
    
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
    var title = this.data.articleInfo.articleTitle
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: title,
      path: '/pages/articleDetails/index?id=123'
    }
  },
  toGoodsInfo: function(e){//跳转到商品详情页
    var urls = e.currentTarget.dataset.goodsinfo
    wx.navigateTo({
      url: '/pages/goodsInfo/index?urls=' + urls
    })
  },
  isCollected: function(){//收藏取消收藏
    var _this = this
    var articleInfo = _this.data.articleInfo
    var isCollected = articleInfo.isCollected
    var articleId = _this.data.articleId
    if (isCollected == 0) {
      wx.request({//收藏
        url: api + '/mockjsdata/6/discovery/articleCollect',
        data: {
          articleId: articleId,
          optType: 1,
          userId: '123'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if(res.data.state == 1) {
            articleInfo.isCollected = 1
            _this.setData({ articleInfo: articleInfo })
            wx.showToast({
              title: '收藏成功',
              icon: 'success',
              duration: 2000
            })
          }
        }
      })
    } else {
      wx.request({//取消收藏
        url: api + '/mockjsdata/6/discovery/articleCollect',
        data: {
          articleId: articleId,
          optType: 0,
          userId: '123'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data.state == 1) {
            articleInfo.isCollected = 0
            _this.setData({ articleInfo: articleInfo })
            wx.showToast({
              title: '取消收藏',
              icon: 'success',
              duration: 2000
            })
          }
        }
      })
    }
  },
  isLiked: function(){//点赞取消点赞
    var _this = this
    var articleInfo = _this.data.articleInfo
    var isLiked = articleInfo.isLiked
    var articleId = _this.data.articleId
    // console.log(articleId)
    if (isLiked == 0) {
      wx.request({//收藏
        url: api + '/mockjsdata/6/discovery/articleCollect',
        data: {
          articleId: articleId,
          optType: 1,
          userId: '123'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data.state == 1) {
            articleInfo.isLiked = 1
            _this.setData({ articleInfo: articleInfo })
          }
        }
      })
    } else {
      wx.request({//取消收藏
        url: api + '/mockjsdata/6/discovery/articleCollect',
        data: {
          articleId: articleId,
          optType: 0,
          userId: '123'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data.state == 1) {
            articleInfo.isLiked = 0
            _this.setData({ articleInfo: articleInfo })
          }
        }
      })
    }
  }
})