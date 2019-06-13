// pages/detail/detail.js
let datas = require('../../datas/list-data.js')
// console.log(datas, typeof "datas")
let appDatas = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj: {},
    index: null,
    isCollected: false,
    isMusicPlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    let index = options.index
    this.setData({
      detailObj: datas.list_data[index],
      index
    })

    // 根据本地缓存的数据判断是否收藏当前文章
    let detailStorage = wx.getStorageSync('isCollected')
    // console.log(detailStorage)

    // 在缓存中初始化空对象
    if (!detailStorage) {
      wx.setStorageSync("isCollected", {})
    }

    // 判断用户是否收藏
    if (detailStorage[index]) {
      this.setData({
        isCollected: true
      })
    }

    // 监听音乐播放
    wx.onBackgroundAudioPlay(() => {
      // console.log('音乐播放')
      // 修改isMusicPlay的值
      this.setData({
        isMusicPlay: true
      })
      // 修改appDatas的值
      appDatas.data.isPlay = true
      appDatas.data.pageIndex = index
    })
    // 监听音乐暂停
    wx.onBackgroundAudioPause(() => {
      // console.log('音乐暂停')
      // 修改isMusicPlay的值
      this.setData({
        isMusicPlay: false
      })
      // 修改appDatas的值
      appDatas.data.isPlay = false
    })

    // 判断音乐是否播放
    if (appDatas.data.isPlay && appDatas.data.pageIndex === index) {
      this.setData({
        isMusicPlay: true,
      })
    }
  },

  handleCollection() {
    // console.log(this)
    let isCollected = !this.data.isCollected
    // 更新状态
    this.setData({
      isCollected
    })
    // 提示用户
    let title = isCollected ? "收藏成功" : "取消收藏"
    wx.showToast({
      title,
      icon: 'success'
    })
    let {
      index
    } = this.data
    // 不可行，会覆盖之前的状态 {0:true, 2:false}
    // let obj = {}
    // 获取缓存数据
    wx.getStorage({
      key: 'isCollected',
      success: (res) => {
        console.log(res)
        // 缓存数据到本地
        let obj = res.data
        obj[index] = this.data.isCollected
        wx.setStorage({
          key: 'isCollected',
          data: obj,
          success: (data) => {
            console.log('缓存成功', data)
          }
        })
      }
    })
  },

  // 控制音乐播放
  handleMusicPlay() {
    let isMusicPlay = !this.data.isMusicPlay
    this.setData({
      isMusicPlay
    })
    // console.log(this)
    if (isMusicPlay) {
      let {
        dataUrl,
        title
      } = this.data.detailObj.music
      wx.playBackgroundAudio({
        dataUrl,
        title
      })
    } else {
      wx.pauseBackgroundAudio()
    }
  },

  //分享功能
  handleShare() {
    wx.showActionSheet({
      itemList: ['分享到朋友圈', '分享到qq空间', '分享到微博'],
    })
  }
})