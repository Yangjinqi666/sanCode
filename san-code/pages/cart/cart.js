// pages/cart/cart.js
import {
  cache
} from "../../enum/cache"
import {
  getScanCode,
  getProductionInfo
} from "../../common/san-code.js"
import {
  addCart
} from "../../common/cart"
import getProductTotalPrice from "../../common/computed-total-price";
Page({
  async AddScanCode(e) {
    const result = await getScanCode()
    const response = await getProductionInfo(result)
    addCart(response)
    this.getCartList()
    const totalPrice = getProductTotalPrice(this.data.cartList)
    this.setData({
      totalPrice
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    totalPrice: 0
  },

  // 获取本地存储的购物车数据
  getCartList() {
    const carts = wx.getStorageSync(cache.CARTS)
    console.log("ccc", carts)
    this.setData({
      cartList: carts
    })
  },

  // 点击减号触发的方法
  handleDecrement(e) {
    const index = e.currentTarget.dataset.index

    const num = this.data.cartList[index].num

    const itemStatus = this.removeCartItem(num, index)
    if (itemStatus) return

    this.data.cartList[index].num -= 1
    this.setData({
      cartList: this.data.cartList
    })
    wx.setStorageSync(cache.CARTS, this.data.cartList)
    const totalPrice = getProductTotalPrice(this.data.cartList)
    this.setData({
      totalPrice
    })
  },

  //当数量为1的时候,显示模态框, 并且当点击了确定按钮时,移除当前的数据
  removeCartItem(num, index) {
    if (num === 1) {
      wx.showModal({
        content: '您确定要删除此商品吗?',
        success: (res) => {
          if (res.confirm) {
            this.data.cartList.splice(index, 1)
            this.setData({
              cartList: this.data.cartList
            })
            wx.setStorageSync(cache.CARTS, this.data.cartList)
            const totalPrice = getProductTotalPrice(this.data.cartList)
            this.setData({
              totalPrice
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return true
    }
  },
  //点击加号触发的方法
  handleIncrement(e) {
    const index = e.currentTarget.dataset.index
    this.data.cartList[index].num += 1
    this.setData({
      cartList: this.data.cartList
    })
    wx.setStorageSync(cache.CARTS, this.data.cartList)
    const totalPrice = getProductTotalPrice(this.data.cartList)
    this.setData({
      totalPrice
    })
  },

  //跳转到订单也
  handleToOrder() {
    wx.navigateTo({
      url: '/pages/order/order',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCartList()
    const totalPrice = getProductTotalPrice(this.data.cartList)
    this.setData({
      totalPrice
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})