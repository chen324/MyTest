// pages/list/list.js
let datas = require('../../datas/list-data')
// console.log(datas, typeof datas);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      listArr: datas.list_data
    })
  },

  clickToDetail(event){
    // console.log(event)
    let index = event.target.dataset.index
    wx.navigateTo({
      url: '/pages/detail/detail?index=' + index,
    })
  },

  toDetail(e){
    // console.log(e)
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/detail/detail?index=' + index,
    })
  }
})