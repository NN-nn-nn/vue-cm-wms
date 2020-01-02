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

export async function printSteelPlateLabel({ length, width, thickness, material, projectName, qrCode }) {
  await getLODOP()
  const bodyHtml =
    `<table cellspacing="0" cellpadding="0" border="0" frame="void">
      <tbody>
        <tr>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 4.2mm;width: 58mm;font-size: 12pt;" colspan="2;">${length} * ${width} * ${thickness}</td>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 6.5mm;width: 16mm;" rowspan="2">
            </td>
        </tr>
        <tr>
            <td style="box-sizing:border-box;height: 2mm;width: 29mm;">材质：${material}</td>
            <td style="box-sizing:border-box;height: 2mm;width: 29mm;">${projectName}</td>
        </tr>
      </tbody>
    </table>`
  const strHtml = getHtml(LABEL_STYLE, bodyHtml)
  LODOP.SET_PRINT_PAGESIZE(1, 800, 120, '1') /* 纸张大小*/
  LODOP.ADD_PRINT_HTM('1.5mm', '3mm', '100%', '100%', strHtml)
  LODOP.ADD_PRINT_BARCODE('1.6mm', '64.1mm', '14mm', '14mm', 'QRCode', qrCode)
  LODOP.SET_PRINT_STYLEA(0, 'QRCodeVersion', 5)
  LODOP.PRINT()
  // LODOP.PREVIEW()/* 打印预览*/
}

export async function printSteelLabel({ specification, material, projectName, qrCode }) {
  await getLODOP()
  const bodyHtml =
    `<table cellspacing="0" cellpadding="0" border="0" frame="void">
      <tbody>
        <tr>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 4.2mm;width: 58mm;font-size: 12pt;" colspan="2;">${specification}</td>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 6.5mm;width: 16mm;" rowspan="2">
            </td>
        </tr>
        <tr>
            <td style="box-sizing:border-box;height: 2mm;width: 29mm;">${material}</td>
            <td style="box-sizing:border-box;height: 2mm;width: 29mm;">${projectName}</td>
        </tr>
      </tbody>
    </table>`
  const strHtml = getHtml(LABEL_STYLE, bodyHtml)
  LODOP.SET_PRINT_PAGESIZE(1, 800, 120, '1') /* 纸张大小*/
  LODOP.ADD_PRINT_HTM('1.5mm', '3mm', '100%', '100%', strHtml)
  LODOP.ADD_PRINT_BARCODE('1.6mm', ' 64.1mm', '14mm', '14mm', 'QRCode', qrCode)
  LODOP.SET_PRINT_STYLEA(0, 'QRCodeVersion', 5)
  LODOP.PRINT()
  // LODOP.PREVIEW()/* 打印预览*/
}

export async function printStripSteelLabel({ width, thickness, color, brand, projectName, qrCode }) {
  await getLODOP()
  const bodyHtml =
    `<table cellspacing="0" cellpadding="0" border="0" frame="void">
      <tbody>
        <tr>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 4.2mm;width: 58mm;font-size: 12pt;" colspan="2;">${width} * ${thickness} &nbsp;<span style="display:inline-block;font-size:7pt;margin-top:1px">${color}</span></td>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 6.5mm;width: 16mm;" rowspan="2">
            </td>
        </tr>
        <tr>
            <td style="box-sizing:border-box;height: 2mm;width: 29mm;">${brand}</td>
            <td style="box-sizing:border-box;height: 2mm;width: 29mm;">${projectName}</td>
        </tr>
      </tbody>
    </table>`
  const strHtml = getHtml(LABEL_STYLE, bodyHtml)
  LODOP.SET_PRINT_PAGESIZE(1, 800, 120, '1') /* 纸张大小*/
  LODOP.ADD_PRINT_HTM('1.5mm', '3mm', '100%', '100%', strHtml)
  LODOP.ADD_PRINT_BARCODE('1.6mm', ' 64.1mm', '14mm', '14mm', 'QRCode', qrCode)
  LODOP.SET_PRINT_STYLEA(0, 'QRCodeVersion', 5)
  LODOP.PRINT()
  // LODOP.PREVIEW()/* 打印预览*/
}

export async function printEnclosureLabel({ specification, material, projectName, qrCode }) {
  await getLODOP()
  const bodyHtml =
    `<table cellspacing="0" cellpadding="0" border="0" frame="void">
      <tbody>
        <tr>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 4.2mm;width: 58mm;font-size: 12pt;" colspan="2;">${material}</td>
            <td style="padding: 0 8pt;box-sizing:border-box;height: 6.5mm;width: 16mm;" rowspan="2">
            </td>
        </tr>
        <tr>
            <td style="box-sizing:border-box;height: 2mm;width: 29mm;">${specification}</td>
            <td style="box-sizing:border-box;height: 2mm;width: 29mm;">${projectName}</td>
        </tr>
      </tbody>
    </table>`
  const strHtml = getHtml(LABEL_STYLE, bodyHtml)
  LODOP.SET_PRINT_PAGESIZE(1, 800, 120, '1') /* 纸张大小*/
  LODOP.ADD_PRINT_HTM('1.5mm', '3mm', '100%', '100%', strHtml)
  LODOP.ADD_PRINT_BARCODE('1.6mm', ' 64.1mm', '14mm', '14mm', 'QRCode', qrCode)
  LODOP.SET_PRINT_STYLEA(0, 'QRCodeVersion', 5)
  LODOP.PRINT()
  // LODOP.PREVIEW()/* 打印预览*/
}

// 打印出库单
export async function printOutboundOrder({ date, orderNo, list, number = 2 }) {
  if (!list || !list.length) return
  await getLODOP()
  let bodyHtml =
    `<div class="list-container">
        <div class="header-box">
          <span>领料凭证</span>
        </div>
        <div class="other-box">
          <span>出库日期：${date}</span>
          <span>出库单号：${orderNo}</span>
        </div>
        <div class="table-box">
          <table id="tbl" border="0" width="100%" rules="none" frame="void">
            <tr>
              <th>序号</th>
              <th>编号</th>
              <th>规格</th>
              <th>单位</th>
              <th>数量</th>
            </tr>`
  for (const i in list) {
    bodyHtml += `
            <tr>
              <td>${Number(i) + 1}</td>
              <td>${list[i].materialCode}</td>
              <td>${list[i].newSpecification}</td>
              <td>${list[i].unit}</td>
              <td>${list[i].number}</td>
            </tr>`
  }
  bodyHtml += `
          </table>
        </div>
        <div class="list-footer">
          <span>办理人：</span>
          <span>领料人：</span>
        </div>
        <div>-</div>
      </div>`
  const strHtml = getHtml(OUTBOUND_SIMPLE_LIST_STYLE, bodyHtml)
  LODOP.ADD_PRINT_HTM(0, 0, '100%', '100%', strHtml)
  LODOP.SET_PRINT_COPIES(number)
  LODOP.PRINT()
}

/**
 * 打印出库单
 * @param {string} date 出库日期
 * @param {string} handler 办理人
 * @param {string} orderNo 出库编号
 * @param {array} list 出库单列表
 * @param {number} number 打印数量
 */
export async function printDetailOutboundOrder({ date, handler, orderNo, list, number = 1 }) {
  if (!list || !list.length) return
  await getLODOP()
  let bodyHtml = `
    <div class="list-content">
      <span class="list-header">出库（领料）单</span>
      <div class="list-other-title">
        <span>出库日期：${date}</span>
        <span>出库办理人：${handler}</span>
        <span>NO：${orderNo}</span>
      </div>
      <table border="1">
        <tbody>
          <tr>
            <th style="width: 5%;" scope="row">序号</th>
            <th scope="row">项目名称</th>
            <th style="width: 10%;" scope="row">编号</th>
            <th style="width: 10%;" scope="row">名称</th>
            <th style="width: 12%;" scope="row">种类</th>
            <th style="width: 12%;" scope="row">材质</th>
            <th style="width: 5%;" scope="row">单位</th>
            <th style="width: 20%;" scope="row">规格</th>
            <th style="width: 5%;" scope="row">数量</th>
            <th style="width: 10%;" scope="row">备注</th>
          </tr>`
  for (const i in list) {
    bodyHtml += `
          <tr>
            <td>${Number(i) + 1}</td>
            <td>${list[i].projectName}</td>
            <td>${list[i].materialCode}</td>
            <td>${list[i].typeName}</td>
            <td>${list[i].className}</td>
            <td>${list[i].detailName}</td>
            <td>${list[i].unit}</td>
            <td>${list[i].newSpecification}</td>
            <td>${list[i].number}</td>
            <td></td>
          </tr>`
  }
  bodyHtml += `
        </tbody>
      </table>
      <div class="list-footer">
        <span>领料人（签字）：</span>
        <span>审核人（签字）：</span>
      </div>
    </div>`
  const strHtml = getHtml(OUTBOUND_LIST_STYLE, bodyHtml)

  LODOP.ADD_PRINT_HTM(0, 0, '100%', '100%', strHtml)
  LODOP.SET_PRINT_COPIES(number)
  LODOP.SET_PRINT_MODE('PRINT_PAGE_PERCENT', 'Full-Width')
  LODOP.SET_PRINT_PAGESIZE(3, 0, 0, 'A4')
  LODOP.PRINT()
  // LODOP.PREVIEW()
}

function getHtml(style, body) {
  let html = ''
  html = `<!DOCTYPE html>
      <head>
        ${style}
      </head>
      <body>
        ${body}
      </body>
    </html>`
  return html
}

const LABEL_STYLE = `
<style type="text/css">
  table {
    border-collapse: collapse;
    font-family:'微软雅黑';
    border-collapse:collapse;
    text-align: center;
    vertical-align:middle;
    font-size: 9pt;
    color: black;
  }
  table td {
    border: solid 0.5pt black;
  }
</style>
`

const OUTBOUND_LIST_STYLE = `
<style>
  .list-content {
    width:210mm;
    padding: 5mm;
    box-sizing: border-box;
    margin:0 auto;
    font-size: 11pt;
  }
  .list-header {
    display: inline-block;
    font-size: 16pt;
    margin-bottom: 3mm;
    width: 100%;
    text-align: center;
  }
  .list-project-name {
    display: inline-block;
    width: 100%;
    text-align: left;
    margin-bottom: 3mm;
  }
  .list-other-title {
    width: 100%;
  }
  .list-other-title >span {
    display: inline-block;
    width: 30%;
    text-align: left;
  }
  .list-footer >span{
    display: inline-block;
    width: 40%;
    text-align: left;
  }
  table {
    margin:  3mm 0;
    width: calc(100% - 5pt);
    border-collapse: collapse;
    font-size: 8pt;
  }
  table th{
    padding:5pt 0;
    text-align: center;
    vertical-align: middle;
  }
  table td{
    padding:5pt 0;
    text-align: center;
    vertical-align: middle;
  }
</style>`

const OUTBOUND_SIMPLE_LIST_STYLE = `
<style type="text/css">
  .list-container {
    font-size: 10pt;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 70mm;
  }
  .header-box {
    width: 100%;
    height: 18mm;
    font-size: 15pt;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .table-box {
    width: 100%;
    box-sizing: border-box;
    padding: 2mm 2mm;
  }
  .table-box >table {
    text-align:center
  }
  .other-box {
    width: 100%;
    height: 16mm;
    box-sizing: border-box;
    padding: 1.5mm 2mm;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    border-top:1pt dashed;
    border-bottom:1pt dashed;
  }
  .list-footer {
    width: 100%;
    height: 30mm;
    box-sizing: border-box;
    padding: 2mm 2mm;
    border-top:1pt dashed;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 20mm;
  }
  .list-footer >span {
    display: inline-block;
    width: 50%;
  }
  </style>
`
