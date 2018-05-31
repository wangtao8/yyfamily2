//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    name: '兔八哥',
    intro: '哈哈哈哈哈哈哈啊哈哈啊哈哈哈哈哈哈哈哈',
    listData: [{
      photo: '',
      title: '爱吃萝卜',
      id:'1',
      date: '5-18 11:58',
      content: '哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈啊哈哈哈'
    }, {
      photo: '',
      title: '爱吃萝卜',
      id:'2',
      date: '5-18 11:58',
      content: '哈哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈啊哈哈哈'
    }]
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
  // 点击跳转至我的消息页面
  click_message: function () {
    wx.navigateTo({
      url: '../my_message/my_message'
    })
  },
  // 点击跳转至我的圈子页面
  click_group: function () {
    wx.navigateTo({
      url: '../my_drafts/my_drafts'
    })
  },
  // 点击跳转至实验室页面
  click_laboratory: function () {
    wx.navigateTo({
      url: '../my_drafts/my_drafts'
    })
  },
  circleInfo: function (message) {
    var data_id = message.currentTarget.dataset.message
    console.log("id是：", data_id)
    wx.navigateTo({
      url: '../circleInfo/index?data=' + JSON.stringify(data_id)
    })
  },
  attention:function(){
    console.log("d111")
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
  }

})
