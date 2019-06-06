// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    flag: false,
  },

  //跳转到list页面
  handleClick(){
    wx.switchTab({
      url: '/pages/list/list' 
    }) 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this)
    this.getUserInfo()
  },

  getUserInfo(){
    //判断是否授权
    wx.getSetting({
      success: (res) => {
        // console.log(res);
        if (res.authSetting['scope.userInfo']) {
          //授权了
          this.setData({
            flag: true
          })
          wx.getUserInfo({
            success: (data) => {
              // console.log(data);
              this.setData({
                userInfo: data.userInfo
              })
            },
          });
        } else {
          //没授权
          this.setData({
            flag: false
          })
        }
      },
      fail: () => {},
      complete: () => {}
    });
  },

  handleGetUserInfo(e) {
    console.log(e.detail.rawData)
    if(e.detail.rawData){
      this.getUserInfo()
    }
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

  }
})