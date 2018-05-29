
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["积分兑换", "兑换记录"],
    items: [{
      photo: '',
      name: '+600',
      content: '文字说明1',
      date: '2018-9-9'
    }, {
      photo: '',
      name: '+800',
      content: '文字说明1',
      date: '2018-9-9'
    }],

    conmment: [{
      photo: '',
      name: '+100',
      content: '文字说明',
      data: '积分不足'
    }, {
        photo: '',
        name: '+200',
        content: '文字说明',
        data: '立即兑换'
    }],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });


      // wx.setNavigationBarColor({
    //   frontColor: '#ffffff',
    //   backgroundColor: '#000000',
    //    animation: {
    //      duration: 400,
    //      timingFunc: 'easeIn'
    //    }
    // })

    this.setData({
      items: this.data.items
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
  // 点击内容切换
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
 
  /**
     * 弹窗
     */
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  onCancel: function () {
    this.hideModal();
  },

  /**
    * 弹窗
    */
  showDialogBtns: function () {
    this.setData({
      showModals: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMoves: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModals: function () {
    this.setData({
      showModals: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancels: function () {
    this.hideModals();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModals();
  },
});