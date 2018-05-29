//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isChecked:false,
    textguanz:'关注',
    content:false,
    list:[
      {
      photo:'1',
      text:'haha',
      name:'tom',
      guanz:'关注'
    },
      {
        photo: '2',
        text: 'hehe',
        name: 'tim',
        guanz: '互相关注'
      },
      {
        photo: '1',
        text: 'hehe',
        name: 'lucky',
        guanz: '关注'
      },
      {
        photo: '2',
        text: 'haha',
        name: 'hony',
        guanz: '互相关注'
      }
    ],
 but: [{ are: '123' }, { are: '456' }]

  },
  
 //事件处理函数
  onLoad: function (res) {
    var content_data = this.data.list
    console.log("获取数据：", content_data.length)

    if (content_data.length==0){
      this.setData({
     content: false,
    })
    }else{
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
  // 点击关注
  attention:function(e){
    var text = e.currentTarget.dataset.text;
    if(text=="关注"){
      var id = e.currentTarget.dataset.id;
      var _this = this;
      var arrTest = [];
      arrTest=this.data.list;
      arrTest[id].guanz = '互相关注'
      _this.setData({ list: arrTest })
      console.log("当前数据：", arrTest)
      }else if(text=='互相关注'){
      var id = e.currentTarget.dataset.id;
      var _this = this;
      var arrTest = [];
      arrTest=this.data.list;
      arrTest[id].guanz = '关注'
      _this.setData({ list: arrTest })
      console.log("当前数据：", arrTest)
      }
  
  },
  // 点击跳转他人主页
  others:function(message){
    var fans_data = message.currentTarget.dataset.message;
    console.log("获取元素：", message )
    var result = fans_data.split(",");
    var get_data={"photo":"","name":""};
    for (var i = 0; i < result.length; i++) {
      if (i == 0){
        get_data.photo = result[i]
      } else if (i == 1){
        get_data.name = result[i]
     }
    }
    console.log("对象数据：", get_data)

     wx.navigateTo({
       url: '../../pages/my_others/my_others?data=' + JSON.stringify(get_data)
     })
  },
  
})
