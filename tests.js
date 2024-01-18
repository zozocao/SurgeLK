const obj = {
  "data": {
    "lifetime_subscription": true
    "store_subscription": true
    "subscription": true
  }
};
$done({status:200,headers:{'Content-Type':'application/json'},body:JSON.stringify(obj)});
