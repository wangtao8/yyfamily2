// pages/index/details.js
const app = getApp()
const api = app.globalData.api // 引入公共请求域名
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexs: [1,2,3,4],
    curIndex: 0,
    articleList: []//查询文章详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    if (options.moreList){//发现页查看更多点击数据赋值
      var moreList = JSON.parse(options.moreList)
      _this.setData({ articleList: moreList })
    } else if (options.searchInfo) {//发现页面搜索数据赋值
      var searchInfo = JSON.parse(options.searchInfo)
      _this.setData({ articleList: searchInfo })
    } else {//其它

    }
    // console.log(_this.data.articleList)
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
  checkHeart: function (e) {// 收藏 取消收藏
    var _this = this
    var articleList = _this.data.articleList
    var id = e.currentTarget.dataset.id
    var isCollected = articleList[id].isCollected
    var articleId = articleList[id].articleId
    // console.log(articleId)
    if (isCollected == 1) {
      wx.request({//取消收藏文章
        url: api + '/mockjsdata/6/discovery/articleCollect',
        data: {
          articleId: articleId,
          optType: 0,
          userid: '123'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if(res.data.state == 1) {
            articleList[id].isCollected = 0
            _this.setData({ articleList: articleList })
            wx.showToast({
              title: '取消收藏',
              icon: 'success',
              duration: 1000
            })
          }
        }
      })
    } else {
      wx.request({//收藏文章
        url: api + '/mockjsdata/6/discovery/articleCollect',
        data: {
          articleId: articleId,
          optType: 1,
          userid: '123'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data.state == 1) {
            articleList[id].isCollected = 1
            _this.setData({ articleList: articleList })
            wx.showToast({
              title: '收藏成功',
              icon: 'success',
              duration: 1000
            })
          }
        }
      })
    }
  },
  laudOrCancel:function(e) {// 点赞取消点赞
    var _this = this
    var id = e.currentTarget.dataset.id
    var articleList = _this.data.articleList
    var isLike = articleList[id].isLiked
    var articleId = articleList[id].articleId
    console.log(articleList[id])
    if (articleList[id].isLiked == 1) {
      wx.request({//取消点赞
        url: api + '/mockjsdata/6/discovery/articleLike',
        data: {
          articleId: articleId,
          optType: 0,
          userid: '1123'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data.state == 1) {
            articleList[id].isLiked = 0
            articleList[id].articleLikeNum = parseInt(articleList[id].articleLikeNum) - 1
            _this.setData({ articleList: articleList })
          }
        }
      })
    } else {
      wx.request({//点赞
        url: api + '/mockjsdata/6/discovery/articleLike',
        data: {
          articleId: articleId,
          optType: 1,
          userid: '1123'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data.state == 1) {
            articleList[id].isLiked = 1
            articleList[id].articleLikeNum = parseInt(articleList[id].articleLikeNum) + 1
            _this.setData({ articleList: articleList })
          }
        }
      })
    }
  },
  articleInfo: function () {
    wx.navigateTo({
      url: '/pages/articleDetails/index'
    })
  },
  toInfos: function () {
    wx.navigateTo({
      url: '/pages/circleInfo/index?id=1'
    })
  },
  onPullDownRefresh: function () {
    // console.log(11)
  },
  onReachBottom: function () {
    // console.log(22)
  }
})