// pages/circleInfo/index.js
const app = getApp()
const api = app.globalData.api // 引入公共请求域名
const getTime = require('../../utils/getTime.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    elWidth: '670rpx',// 样式
    elMargin: '16rpx 0rpx 0rpx 30rpx',// 样式
    isDisplay: 'none',// 发表按钮 取消按钮 上传图片的控制
    elValue: '',// 输入框值
    placeholders: '发表你的评论吧',// 输入框提示文字
    isfocus: false,// 输入框是否获得焦点
    // nums: 0,
    message: '关注',//关注 或者 已关注
    urls: [],//图片预览后展示图片的url
    marBot: '120rpx',// 一个样式
    ids: 1, //是否显示圈子信息,
    topicInfo: {},//话题详情
    circleInfo: {},//圈子信息
    replyInfo: [],//回复信息
    commentThis: [],//回复指定的人
    isReply: 1, //1为自己回复  0为回复他人
    elRight: '',//输入框清空按钮的位置
    isHidden: 'none',//评论别人的话是否显示，第一次进来默认隐藏，包括别人的评论
    userInfo: {},//用户信息
    elValues: [],//回复他人内容
    curentId: '',//当前回复人的id
    imageUrls: [],//储存上传的图片
    testId: null//包裹图片的大盒子id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var ids = options.id
    if (options.data) {
      _this.setData({ circleInfo: JSON.parse(options.data), ids: ids })
      var topicId = JSON.parse(options.data).topicId
      wx.request({// 查询话题详情
        url: api + '/mockjsdata/6/circle/topicDetail',
        data: {
          topicId: topicId,
          userId: '123'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          _this.setData({ topicInfo: res.data.data })
          // console.log('111:', res.data.data)
        }
      })
      wx.request({// 查询话题回复
        url: api + '/mockjsdata/6/circle/getTopicResponse',
        data: {
          pageIndex: 1,
          pageSize: 2,
          topicId: topicId,
          userId: '1234'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          _this.setData({ replyInfo: res.data.data.content })
        }
      })
    } else {
      var replyInfo = JSON.parse(options.replyInfo)
      console.log(options)
      _this.setData({ ids: ids, replyInfo: replyInfo })
      
    }
    
    
    _this.setData({ ids: options.id }) // 页面加载时接收其他页面带来的参数 为0不显示圈子信息

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
    // console.log('xxxxxxxxxxxxxxxxxxxx')
    wx.getUserInfo({//获得用户信息
      success: res => {
        var _this = this
        // console.log('232:')
        var userInfo = res.userInfo
        _this.setData({ userInfo: userInfo })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  getFocus: function (e) {// 获得焦点的事件
    var _this = this
    var placeholders = _this.data.placeholders
    if (placeholders == '发表你的评论吧') {
      _this.setData({ isReply: 1, elWidth: '500rpx', elRight: '228rpx', elMargin: '16rpx 0rpx 0rpx 44rpx;', isDisplay: 'inline-block'})
    } else {
      _this.setData({ isReply: 0, elWidth: '560rpx', elRight: '170rpx', elMargin: '16rpx 0rpx 0rpx 44rpx;', isDisplay: 'inline-block'})
    }
  },
  getBlur: function () {// 失去焦点的事件
    var _this = this
    this.setData({ elWidth: '670rpx', elMargin: '16rpx 0rpx 0rpx 30rpx', isDisplay: 'none', elValue: '', placeholders: '发表你的评论吧'})
  },
  // addNums: function () {
  //   var nums = this.data.nums + 1
  //   this.setData({ nums: nums })
  // },
  changeValue: function (e) {// 输入框值改变时
    this.setData({ elValue: e.detail.value })
  },
  clearInput: function (e) {// 清除输入框值 
    this.setData({ elValue: '' })
  },
  cancel: function (e) {// 点击发表或者取消操作
    // console.log(e)
    var _this = this
    var id = e.currentTarget.dataset.id
    var curentId = _this.data.curentId //当前回复评论的id 下标
    var commentThis = _this.data.commentThis//当前回复评论的信息
    var topicDcsRespondNum = _this.data.commentThis.topicDcsRespondNum + 1//当前评论数
    var replyInfo = _this.data.replyInfo //当前总共回复详情
    var placeholders = _this.data.placeholders
    var userInfo = _this.data.userInfo
    var getValue = _this.data.elValue
    var imageUrls = _this.data.urls
    // console.log(imageUrls)
    if (id == 0) {// 取消操作
       
    } else {// 发表操作
      if (placeholders == '发表你的评论吧') {//回复文章
      var addReply = {}
      var times = new Date().Format("yyyy-MM-dd hh:mm:ss")
      // console.log(replyInfo[0])
      // var nameArr = []
      // var valueArr = []
      // for (var i in replyInfo[0]) {
      //   valueArr.push(replyInfo[0][i]); //属性
      //   nameArr.push(i); //值
      // }
      // console.log(nameArr, valueArr);
      addReply.userPhoto = userInfo.avatarUrl
      addReply.wxNickName = userInfo.nickName
      addReply.topicDcsContent = getValue
      addReply.topicDcsPics = imageUrls
      addReply.topicDcsLikeNum = 0
      addReply.topicDcsRespondNum = 0
      addReply.firstResponseName = "null"
      addReply.createTime = times
      addReply.isLike = 0
      replyInfo.push(addReply)
      // console.log('replyInfo:', addReply.userPhoto)
      _this.setData({ replyInfo: replyInfo })
      } else {// 回复他人
        if (replyInfo[curentId].elValues == undefined) {
          // console.log(1)
          var elValues = []
        } else {
          // console.log(2)
          var elValues = replyInfo[curentId].elValues
        }
        elValues.push(_this.data.elValue)

        commentThis.topicDcsRespondNum = topicDcsRespondNum
        commentThis.elValues = elValues
        replyInfo[curentId] = commentThis
        // console.log(replyInfo)
        _this.setData({ isHidden: 'block', replyInfo: replyInfo })
      } 
    }
    _this.setData({ elWidth: '670rpx', elMargin: '16rpx 0rpx 0rpx 30rpx', isDisplay: 'none', placeholders: '发表你的评论吧', imageUrls: imageUrls, urls: [],content: '发表', marBot: '120rpx', elValue:''})
  },
  goReply: function (e) {// 评论详情页面
    var id = e.currentTarget.dataset.id
    var replyInfo = JSON.stringify(this.data.replyInfo[id])
    wx.navigateTo({
      url: '/pages/reply/index?replyInfo=' + replyInfo
    })
  },
  attention: function () {// 切换关注状态
    var _this = this
    if (_this.data.topicInfo.isAttention == 0) {
      wx.request({
        url: api + '/mockjsdata/6/user/attention',
        data: {
          attentionUserId: _this.data.topicInfo.topicAuthorId,// 关注作者的id
          optType: _this.data.topicInfo.isAttention,// 是否关注
          userId: '123'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          // console.log('关注:', res.data)
          var topicInfo = _this.data.topicInfo
          topicInfo.isAttention = 1
          _this.setData({topicInfo: topicInfo})
          wx.showToast({
            title: '已关注',
            icon: 'success',
            duration: 2000
          });
        }
      })
    } else {
      wx.request({
        url: api + '/mockjsdata/6/user/attention',
        data: {
          attentionUserId: _this.data.topicInfo.topicAuthorId,// 关注作者的id
          optType: _this.data.topicInfo.isAttention,// 是否关注
          userId: '123'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          // console.log('取消关注：', res.data)
          var topicInfo = _this.data.topicInfo
          topicInfo.isAttention = 0
          _this.setData({ topicInfo: topicInfo })
          wx.showToast({
            title: '取消关注',
            icon: 'success',
            duration: 2000
          });
        }
      })
      
    }
  },
  uploadImage: function () {// 上传评论图片
    var currentIndex = this.data.urls.length
    wx.chooseImage({
      count: 6 - currentIndex, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res=> {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var _this = this
        var tempFilePaths = res.tempFilePaths
        if (_this.data.urls.length == 0) {
          var urls = []
        } else {
          var urls = _this.data.urls
        }
        for (var i = 0; i < tempFilePaths.length; i++) {
          urls.push(tempFilePaths[i])
        }
        _this.setData({ urls: urls, marBot: '250rpx'})
        if (_this.data.urls.length > 5) {
          _this.setData({ scrollWidth: '96%' })
        }
      }
    })
  },
  previewImage: function (e) {// 预览评论图片
    var id = e.currentTarget.dataset.id
    var ulrs = this.data.urls
    wx.previewImage({
      current: id, // 当前显示图片的索引
      urls: ulrs // 需要预览的图片http链接列表
    })
  },
  previews: function(e) {// 获得包裹图片的大盒子id
    var id = e.currentTarget.dataset.id
    this.setData({ testId: id })
    // console.log(id)
  },
  preview: function(e) {// 展示评论图片预览
    var _this = this
    var ids = e.currentTarget.dataset.ids
    setTimeout(function(){
      var id = _this.data.testId
      console.log(id, ids)
      var urls = _this.data.replyInfo[id].topicDcsPics
      wx.previewImage({
        current: ids, // 当前显示图片的索引
        urls: urls // 需要预览的图片http链接列表
      })
    },0)
  },
  previewcircleImage: function(e){//预览话题图片
    var _this = this
    var ids = e.currentTarget.dataset.ids
    var urls = _this.data.topicInfo.topicPics
    wx.previewImage({
      current: ids, // 当前显示图片的索引
      urls: urls // 需要预览的图片http链接列表
    })
  },
  redDele: function (e) {// 删除预览图片
    var _this = this
    var id = e.currentTarget.dataset.id
      _this.data.urls.splice(id, 1)
      _this.setData({ urls: _this.data.urls })
      if (_this.data.urls.length == 0) {
        _this.setData({ marBot: '120rpx'})
      } else if (_this.data.urls.length <= 5) {
        _this.setData({ scrollWidth: '' })
      }
  },
  goOther: function () {// 跳转到他人个人页面
    wx.navigateTo({
      url: '/pages/my_others/my_others?id=1'
    })
  },
  comment: function (e) {//回复指定人
    var _this = this
    var id = e.currentTarget.dataset.id
    var commentThis = _this.data.replyInfo[id]// 当前回复评论的所有信息，方便之后改动
    var placeholders = '回复:' + commentThis.wxNickName
    _this.setData({ commentThis: commentThis, curentId: id, placeholders: placeholders, isfocus: true })
  },
  laudNums: function(e) {//点赞 取消点赞
    var _this = this
    var id = e.currentTarget.dataset.id
    var isLike = e.currentTarget.dataset.islike
    if (isLike == 0) {
      wx.request({
      url: api + '/mockjsdata/6/circle/topicLike',
        data: {
          optType: 0,
          topicId: '123',//话题id
          userId: '123'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          var replyInfo = _this.data.replyInfo
          replyInfo[id].isLike = 1
          replyInfo[id].topicDcsLikeNum = replyInfo[id].topicDcsLikeNum + 1
          _this.setData({ replyInfo, replyInfo})
        }
      })
    } else {
      wx.request({
        url: api + '/mockjsdata/6/circle/topicLike',
        data: {
          optType: 1,
          topicId: '123',//话题id
          userId: '123'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          var replyInfo = _this.data.replyInfo
          replyInfo[id].isLike = 0
          replyInfo[id].topicDcsLikeNum = replyInfo[id].topicDcsLikeNum - 1
          _this.setData({ replyInfo, replyInfo })
        }
      })
    }
  }
})