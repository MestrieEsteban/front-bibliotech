import DBR from 'dynamsoft-javascript-barcode'
DBR.BarcodeReader.engineResourcePath =
  'https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.1.2/dist/'
// Please visit https://www.dynamsoft.com/customer/license/trialLicense to get a trial license
DBR.BarcodeReader.productKeys =
  't0076xQAAAFmWbFijBdp64Jugk2YJSnsprwqoF/UiyXqGQyevujt+9PJ52Ctw/sBBsIpL0L8uunjH9M/xLdX4pjvnSe3f96IeBTwWAdgpTw=='
// DBR.BarcodeReader._bUseFullFeature = true; // Control of loading min wasm or full wasm.
export default DBR
