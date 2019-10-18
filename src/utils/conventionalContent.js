// 接口返回码
const apiResultCode = {
  AUTHORITY: 401, // 权限认证失败
  API_VERSION: 50001 // 接口版本更新
}

const dictionaryType = {
  UNIT: 1,
  SUPPLIER: 2,
  EnterPrise: 0
}

const MATERIAL_BASE_TYPE = {
  STEEL_PLATE: { index: 0, name: '钢板', value: 'steelPlate' },
  STEEL: { index: 1, name: '型钢', value: 'steel' },
  STRIP_STEEL: { index: 2, name: '彩卷/带钢', value: 'stripSteel' },
  ENCLOSURE: { index: 3, name: '成品围护', value: 'enclosure' },
  MATERIAL: { index: 4, name: '一般物料', value: 'material' }
}

export { apiResultCode, dictionaryType, MATERIAL_BASE_TYPE }
