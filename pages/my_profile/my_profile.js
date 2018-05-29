//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  name:'woshiyizheng',
  xiaoxi:'2',
 
  },
  //事件处理函数
  onLoad: function (res) {
    // var getdata = JSON.parse(res.data)
    // console.log("数据类型：",typeof(getdata))
    // console.log("获取数据成功：", getdata)
      // wx.setNavigationBarColor({
    //   frontColor: '#ffffff',
    //   backgroundColor: '#000000',
    //    animation: {
    //      duration: 400,
    //      timingFunc: 'easeIn'
    //    }
    // })

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
