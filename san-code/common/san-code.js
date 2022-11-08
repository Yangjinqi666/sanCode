import ShoppingModel from "../model/ShoppingModel"

// 开启扫码  方法做的事情: 点击扫码按钮触发的方法
const getScanCode = async () =>{
    // 只允许从相机扫码, 开启扫码
    const res = await wx.scanCode({
      onlyFromCamera: true,
    })
    return res.result
}

// 调用获取商品信息接口 方法做的事情: 根据商品条形码获取商品信息
const getProductionInfo = async (code) => {
  try{
    let data = {qcode : code}
    const response = await ShoppingModel.getProductInfo(data)

    if(response.length > 0){
      return response[0]
    }else{
      wx.showToast({
        title: '获取不到商品信息',
        icon : 'none'
      })
    }
  }catch(error){
    console.log(error)
  }
}

export {
  getScanCode,
  getProductionInfo
}
