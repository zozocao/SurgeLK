
re('\premium_days\":7', 'premium_days:9999');
function re(){var body=$response.body;if(arguments[0].includes("@")){var regs=arguments[0].split("@");var strs=arguments[1].split("@");for(i=0;i<regs.length;i++){var reg=new RegExp(regs[i],"g");body=body.replace(reg,strs[i]);}}
else{var reg=new RegExp(arguments[0],"g");body=body.replace(reg,arguments[1]);}
$done({body});}