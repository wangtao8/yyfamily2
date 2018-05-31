//index.js
//获取应用实例
const app = getApp()
var datas;
Page({
  data: {
  // hidden:'',
  name:'woshiyizheng',
  xiaoxi:'2',
 
  },
  datas:function(){
    console.log("111")
  //   wx.request({
  //   url: 'test.php', //仅为示例，并非真实的接口地址
  //   data: {
  //     x: '',
  //     y: ''
  //   },
  //   header: {
  //     'content-type': 'application/json' // 默认值
  //   },
  //   success: function (res) {
  //     console.log(res.data)
  //   }
  // })
  },
  //事件处理函数
  onLoad: function (res) {
    // this.datas()

    // var getdata = JSON.parse(res.data)


  },
  onReady:function(){
    this.datas()
  },
  onShow:function(){
    // this.datas()
  },
  focus:function(){
    wx.navigateTo({
      url: '../my_focus/my_focus'
    })
  },
  fans:function(){
    wx.navigateTo({
      url: '../my_fans/my_fans'
    })
  },
  personal:function(){
    wx.navigateTo({
      url: '../my_personal/my_personal'
    })
  },
  // 点击跳转至我的消息页面
  click_message:function (){
    // this.setData({
    //   hidden:'true'
     
    // })
    wx.navigateTo({
      url: '../my_message/my_message'
    })
  },
   // 点击跳转至我的圈子页面
  click_circle:function(){
    wx.navigateTo({
      url: '../my_circle/my_circle'
    }) 
  },
  click_favorite:function(){
    wx.navigateTo({
      url: '../my_favorite/my_favorite'
    }) 
  },
  // 点击跳转至实验室页面
  click_pages: function () {
    wx.navigateTo({
      url: '../my_pages/my_pages'
    })
  },
  // 点击跳转至编辑个人资料页面
  click_editor:function(){
    wx.navigateTo({
      url: '../my_homepage/my_homepage'
    }) 
  }
})
