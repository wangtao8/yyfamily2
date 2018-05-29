//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list:[{
      photo:'1',
      name:'tom',
      guanz:'关注'
    },
      {
        photo: '2',
        name: 'tim',
        guanz: '互相关注'
      }],
   huatidate:{},
   huati: [{
        date:'2017-8-20',
        id:'1',
        content:'哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
        img:'1'
      }, {
       date: '2017-8-21',
       id: '2',
       content: '呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵',
       img: '1'
      }]

  },
  //事件处理函数

  onLoad: function (options) {
    this.setData({
      huatidate: options
    })  
      // wx.setNavigationBarColor({
    //   frontColor: '#ffffff',
    //   backgroundColor: '#000000',
    //    animation: {
    //      duration: 400,
    //      timingFunc: 'easeIn'
    //    }
    // })
  },
  retry: function (options) {   
      var title = options.target.dataset;
      var aToStr = JSON.stringify(title).split(",");
      var content = aToStr[0].slice(13);
      var date = aToStr[1];
     
      // debugger
      // console.log("所有数据：", aToStr)
      // console.log('获取参数1：', date)
      // console.log('获取参数2：', date)
      // var result = title.split(",");

      // wx.setStorageSync('location', location)
    // var title = e.currentTarget.dataset.title;
    // var time = e.currentTarget.dataset.time;
    // var name = e.currentTarget.dataset.name;
    // var amount = e.currentTarget.dataset.amount;
      wx.navigateTo({
        url: '../../pages/my_fans/my_fans?text=' + content+","+date
      })
  }

})
