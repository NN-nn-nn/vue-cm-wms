import store from '@/store'

const materialClassify = {
  o: '50_201_1',
  v: '50_201_2'
}

const materialWarehouse = {
  o: '50_203_1',
  v: '50_203_2'
}

const wasteDefinition = {
  o: '50_204_1',
  v: '50_204_2'
}

const configPriceControl = {
  o: '50_208_1',
  v: '50_208_2'
}

const downloadExcel = {
  o: '50_209_1',
  v: '50_209_2'
}

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value

    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })

    if (!hasPermission) {
      return false
    }
    return true
  } else {
    console.error(`没有权限`)
    return false
  }
}

export { materialClassify, checkPermission, wasteDefinition, configPriceControl, materialWarehouse, downloadExcel }
