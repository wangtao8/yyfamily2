//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    region: ['广东省', '广州市', '海珠区'],
    date: '2016-09-01',
    imgUrl: null,
    userImg: "../../images/photos.jpg", // 头像图片路径  
    customItem: '全部'
  },
  //事件处理函数
 
  onLoad: function () {
     // wx.setNavigationBarColor({
    //   frontColor: '#ffffff',
    //   backgroundColor: '#000000',
    //    animation: {
    //      duration: 400,
    //      timingFunc: 'easeIn'
    //    }
    // })
  },
  bindTextAreaBlur: function (e) {
    // console.log(e.detail.value)
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  changeAvatar: function () {
    var that = this;
    // var childId = wx.getStorageSync("child_id");
    // var token = wx.getStorageSync('token');
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({ 
          imgUrl: tempFilePaths 
        })
      }
    })
  },
  formSubmit: function (e) {

    var img = this.data.imgUrl
    console.log(img)
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var aa = e.detail.value;
 
    wx.setStorage({
      key: "form",
      data: aa
    }),
      wx.getStorage({
        key: 'form',
        success: function (res) {
          console.log(res.data)
        }
      })

  },
  save:function(){
    wx.navigateTo({
      url: '../my_profile/my_profile'
    })
   
  }
})
