const obj = {
  "data": {
    "subscription": true,
    "store_subscription": true,
    "lifetime_subscription": true,
    "premiumAccess": true
  }
};
$done({status:200,headers:{'Content-Type':'application/json'},body:JSON.stringify(obj)});
