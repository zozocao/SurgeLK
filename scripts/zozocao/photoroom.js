const chxm1024 = {};
const headers = $request.headers;
const chxm1023 = JSON.parse(typeof $response != "undefined" && $response.body || null);
const ua = headers['User-Agent'] || headers['user-agent'];
const bundle_id = headers['X-Client-Bundle-ID'] || headers['x-client-bundle-id'];

//Loại trừ các ứng dụng đã cấm MITM
const forbiddenApps = ['Fileball', 'APTV'];
const forbiddenAppFound = forbiddenApps.find(appName => (ua && ua.includes(appName)) || ($request.body && $request.body.includes(appName)));
if (forbiddenAppFound) {
  console.log(`Đã tìm thấy ứng dụng cấm MITM: ${forbiddenAppFound}，Tập lệnh đã ngừng chạy! \nKênh Chia Sẻ của Jingle Cat: https://t.me/chxm1023`);
  $done({});
}

//nhận dạng bundle_id
const bundle = {
  'io.innerpeace.yiye': { name: 'Premium', id: 'io.innerpeace.yiye.lifetime.forYearly', cm: 'sja' },  //ghi chú ngôn ngữ
  'com.skysoft.removalfree': { name: 'Pro', id: 'com.skysoft.removalfree.subscription.newyearly', cm: 'sja' }  //Xóa ảnh
}

//nhận dạng UA
const list = {
  'PhotoRoom': { name: 'pro', id: 'com.background.pro.yearly', cm: 'sja' },  //PhotoRoom
  'ImagineAI': { name: 'pro', id: 'artistai.yearly.1', cm: 'sja' },  //ImagineAI
  'SmartAIChat': { name: 'Premium', id: 'sc_3999_1y', cm: 'sja' },  //SmartAI
  'AIChat': { name: 'AI Plus', id: 'ai_plus_yearly', cm: 'sja' },  //AIChat
  'Loopsie': { name: 'pro-iOS', id: 'com.reader.autoRenewableSeason', cm: 'sja' },  //Loopsie
  '1Blocker': { name: 'premium', id: 'blocker.ios.iap.lifetime', cm: 'sjb' },  //1Blocker-广告拦截
  'VSCO': { name: 'pro', id: 'vscopro_global_5999_annual_7D_free', cm: 'sja' }  //VSCO-照片与视频编辑
};

if (typeof $response == "undefined") {
  delete headers["x-revenuecat-etag"];
  delete headers["X-RevenueCat-ETag"];
  chxm1024.headers = headers;
} else if (chxm1023 && chxm1023.subscriber) {
  chxm1023.subscriber.subscriptions = chxm1023.subscriber.subscriptions || {};
  chxm1023.subscriber.entitlements = chxm1023.subscriber.entitlements || {};
  let name,nameb,ids,idb,data;
  for (const src of [list, bundle]) {
    for (const i in src) {
      const test = src === list ? ua : bundle_id;
      if (new RegExp(`^${i}`, `i`).test(test)) {
      if (src[i].cm.indexOf('sja') != -1) { data = {  "purchase_date" : "2023-09-09T09:09:09Z",  "expires_date" : "2099-09-09T09:09:09Z" };  } else if (src[i].cm.indexOf('sjb') != -1) { data = {  "purchase_date" : "2023-09-09T09:09:09Z" }; }
      ids = src[i].id;name = src[i].name;idb = src[i].idb;nameb = src[i].nameb;
      break;
      }
    }
  }
  if (!name || !ids) {
    data = {  "purchase_date" : "2023-09-09T09:09:09Z",  "expires_date" : "2099-09-09T09:09:09Z" };
    name = 'pro';
    ids = 'com.chxm1023.pro';
  }
  chxm1023.subscriber.entitlements[name] = Object.assign({}, data, { product_identifier: ids });
  if (typeof nameb !== 'undefined' && nameb !== null) {
    chxm1023.subscriber.entitlements[nameb] = Object.assign({}, data, { product_identifier: idb });
  }
  const subData = Object.assign({},data,{  "Author": "chxm1023",  "Telegram": "https://t.me/chxm1023",  "warning": "仅供学习，禁止转载或售卖",  "original_purchase_date": "2023-09-09T09:09:09Z",  "store_transaction_id" : "4900066666666666",  "period_type" : "trial",  "store": "app_store",  "ownership_type": "PURCHASED"  });
  chxm1023.subscriber.subscriptions[ids] = subData;
  if (typeof idb !== 'undefined' && idb !== null) {
    chxm1023.subscriber.subscriptions[idb] = subData;
  }
  chxm1024.body = JSON.stringify(chxm1023);
  console.log('已操作成功🎉🎉🎉\n叮当猫の分享频道: https://t.me/chxm1023');
}

$done(chxm1024);
