// pages/issue/index.js
const app = getApp()
const api = app.globalData.api // 引入公共请求域名
Page({

  /**
   * 页面的初始数据
   */
  data: {
    writed: 0,
    elHeight: '350rpx',
    urls: [],
    circleId: '',//圈子id
    userInfo: {},
    topicTitle: '',//话题标题
    topicContent: ''//话题内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var circleId = options.circleId
    _this.setData({ circleId: circleId})
    wx.getUserInfo({//获得用户信息
      success: res => {
        var _this = this
        var userInfo = res.userInfo
        console.log(userInfo)
        _this.setData({ userInfo: userInfo })
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
  getChange: function (e) {
    var values = e.detail.value
    this.setData({ writed: e.detail.value.length, topicTitle: values})
  },
  getChangeContValue: function(e){
    var values = e.detail.value
    this.setData({ topicContent: values })
  },
  chooseImg: function () {
    var imgNubs = this.data.urls.length
    wx.chooseImage({
      count: 6 - imgNubs, // 控制始终只能传的图片数为6
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res=> {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        var _this = this
        var tempFilePaths = res.tempFilePaths
        for (var i = 0; i< tempFilePaths.length; i++){
          wx.uploadFile({
            url: 'http://192.168.79.191:9087/fansComApi/sys/uploadPic',
            filePath: tempFilePaths[i],
            name: 'pictureFile',
            formData: {
              'userId': '123'
            },
            success: function (res) {
              var datas = JSON.parse(res.data).data
              // console.log('图片地址：', datas)
              if (_this.data.urls == '') {
                var urls = []
              } else {
                var urls = _this.data.urls
              }
              urls.push(datas)
              // console.log('xxoo:', urls)
              _this.setData({ urls: urls })
            }
          })
        }
      }
    })
  },
  seeImg: function(e){
    var _this = this
    var index = e.target.dataset.id
    wx.previewImage({
      current: _this.data.urls[index], // 当前显示图片的http链接
      urls: _this.data.urls // 需要预览的图片http链接列表
    })
  },
  dellImage: function(e){
    var _this = this
    var urls = _this.data.urls
    _this.data.urls.splice(e.target.dataset.id, 1)
    this.setData({ urls: urls })
  },
  release: function(){
    var _this = this
    var circleId = _this.data.circleId
    var userInfo = _this.data.userInfo
    var topicAuthor = userInfo.nickName
    var topicAuthorId = '123'//userId
    var topicContent = _this.data.topicContent
    var topicCoverUrl = _this.data.urls[0]
    var topicPics = _this.data.urls
    var topicTitle = _this.data.topicTitle
    
    wx.request({
      url: api + '/mockjsdata/6/circle/createTopic',
      data: {
        circleId: circleId,
        topicAuthor: topicAuthor,
        topicAuthorId: topicAuthorId,
        topicContent: topicContent,
        topicCoverUrl: topicCoverUrl,
        topicPics: topicPics,
        topicTitle: topicTitle
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        wx.navigateBack({
          delta: 1
        })
      }
    })
   
  }
})