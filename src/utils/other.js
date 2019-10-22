import { MATERIAL_DENSITY } from '@/utils/conventionalContent'

/**
 * 将年份分组的项目转化为级联(树)
 * @param {Array} arr 数组
 * @param {string} tip 提示
 * @param {string} tipField 提示携带字段
 */
export function changeProjectToCascadeByYear(arr, tip = '', tipField) {
  const newArr = []
  arr.forEach(a => {
    if (a.project && a.project.length) {
      const _child = a.project.map(p => {
        const _otherInfo = tipField ? ` | ${tip}:${p[tipField]}` : ''
        const _new = {
          id: p.projectId,
          name: `${p.projectName}${_otherInfo}`
        }
        return _new
      })
      const _node = {
        id: a.year,
        name: a.year,
        children: _child
      }
      newArr.push(_node)
    }
  })
  // console.log(newArr)
  return JSON.parse(JSON.stringify(newArr))
}

/**
 * 计算物料（钢板/不锈钢）重量
 *
 * @param {number} length 长（m）
 * @param {number} width 宽（m）
 * @param {number} thick 厚度（mm）
 * @param {number} number 数量
 * @param {string} name 物料名称
 * @returns 重量（kg）
 */
export function calcWeightByMateName(length, width, thick, number = 1, name) {
  if (!length && !width && !thick) {
    return
  }
  let weight = 0
  let density = MATERIAL_DENSITY.STEEL
  if (name && name.indexOf('不锈钢') > -1) {
    density = MATERIAL_DENSITY.STAINLESS_STEEL
  }
  weight = Number((length * width * thick * density * number).toFixed(3))
  return weight
}
