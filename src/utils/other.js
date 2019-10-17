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
  return JSON.parse(JSON.stringify(newArr))
}
