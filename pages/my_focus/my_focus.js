//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list:[
      {
      photo:'1',
      id: '1',
      name:'tom',
      guanz:'已关注',
      content: false,
    },
      {
        photo: '2',
        id: '2',
        name: 'tim',
        guanz: '互相关注'
      }      
    ]

  },
  //事件处理函数

  onLoad: function () {
    // 显示内容判断
    var content_data = this.data.list
    if (content_data.length == 0) {
      this.setData({
        content: false,
      })
    } else {
      this.setData({
        content: true,
      })
    }
     // wx.setNavigationBarColor({
    //   frontColor: '#ffffff',
    //   backgroundColor: '#000000',
    //    animation: {
    //      duration: 400,
    //      timingFunc: 'easeIn'
    //    }
    // })
  },
  // 点击已关注
  attention: function (e) {
    console.log(e)
    var text = e.currentTarget.dataset.text;
    if (text == "已关注") {
      var _this = this;

     wx.showModal({
        title: '提示',
        content: '取消关注，好友将不在我的关注好友列表中显示',
        success: function (res) {
          // 删除
          if (res.confirm) {   
            console.log("id:",id,"text:",text)
            _this.data.list.splice(e.currentTarget.dataset.index, 1)
            _this.setData({
              list: _this.data.list
            })
           
            // wx.request({
            //   url: '', //仅为示例，并非真实的接口地址
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
          } else {
            console.log('用户点击取消')
          }

        }
      });
    } else if (text == '互相关注') {
      var _this = this;
      wx.showModal({
        title: '提示',
        content: '取消关注，好友将不在我的关注好友列表中显示',
        success: function (res) {
          // 删除
          if (res.confirm) {
            _this.data.list.splice(e.currentTarget.dataset.index, 1)
            _this.setData({
              list: _this.data.list
            })
           
            // wx.request({
            //   url: '', //仅为示例，并非真实的接口地址
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
          } else {
            console.log('用户点击取消')
          }

        }
      });
    }

  },
  // 点击跳转他人主页
  others: function (message) {
    var fans_data = message.currentTarget.dataset.message;
    console.log("获取元素：", message)
    var result = fans_data.split(",");
    var get_data = { "photo": "", "name": "" };
    for (var i = 0; i < result.length; i++) {
      if (i == 0) {
        get_data.photo = result[i]
      } else if (i == 1) {
        get_data.name = result[i]
      }
    }
    console.log("对象数据：", get_data)

    wx.navigateTo({
      url: '../../pages/my_others/my_others?data=' + JSON.stringify(get_data)
    })
  }

})
