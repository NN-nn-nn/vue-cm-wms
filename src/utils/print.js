import { getLodop } from './LodopFuncs'

let LODOP
function getLODOP() {
  return new Promise((resolve, reject) => {
    try {
      LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'))
      LODOP.PRINT_INIT('') /* 初始化*/
      resolve()
    } catch (e) {
      console.log(e)
      download()
      reject()
    }
  })
}

function download() {
  try {
    const elem = document.createElement('iframe')
    elem.src = '../../../../../assets/printtool.rar'
    elem.style.display = 'none'
    document.body.appendChild(elem)
  } catch (e) {
    console.log('下载异常')
  }
}

export function printSteelPlateLabel({ length, width, thickness, material, projectName, qrCode }) {
  getLODOP().then(() => {
    const strHtml =
    `<!DOCTYPE html>
      <body>
        <table border="1" style="font-family:\'微软雅黑\';border-collapse:collapse;border:solid 1pt;text-align: center;vertical-align:middle;font-size: 9pt;color: black;" bordercolor="#000000">
          <tr>
              <td style="padding: 0 8pt;box-sizing:border-box;height: 6mm;width: 62mm;font-size: 12pt;" colspan="2;">${length} * ${width} * ${thickness}</td>
              <td style="padding: 0 8pt;box-sizing:border-box;height: 6mm;width: 16mm;" rowspan="2">
              </td>
          </tr>
          <tr>
              <td style="padding: 0 8pt;box-sizing:border-box;height: 2mm;width: 28mm;">材质：${material}</td>
              <td style="padding: 0 8pt;box-sizing:border-box;height: 2mm;width: 28mm;">${projectName}</td>
          </tr>
        </table>
      </body>
    </html>`
    LODOP.SET_PRINT_PAGESIZE(1, 800, 120, '1') /* 纸张大小*/
    LODOP.ADD_PRINT_HTM(2, 2, '100%', '100%', strHtml)
    LODOP.ADD_PRINT_BARCODE('1.1mm', '65mm', '14mm', '14mm', 'QRCode', qrCode)
    LODOP.SET_PRINT_STYLEA(0, 'QRCodeVersion', 5)
    LODOP.PRINT()
    // LODOP.PREVIEW()/* 打印预览*/
  })
}

export function printOutboundOrder({ date, orderNo, projectName, list }) {
  getLODOP().then(() => {

  })
}
