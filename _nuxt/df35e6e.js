(window.webpackJsonp=window.webpackJsonp||[]).push([[12,9],{329:function(e,r,t){var content=t(349);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,t(82).default)("38883ce2",content,!0,{sourceMap:!1})},347:function(e,r,t){"use strict";var n=t(2),c=t(3),o=t(48),l=t(212),f=t(211),d=t(4),m=RangeError,h=String,A=Math.floor,v=c(f),x=c("".slice),P=c(1..toFixed),y=function(e,r,t){return 0===r?t:r%2==1?y(e,r-1,t*e):y(e*e,r/2,t)},w=function(data,e,r){for(var t=-1,n=r;++t<6;)n+=e*data[t],data[t]=n%1e7,n=A(n/1e7)},V=function(data,e){for(var r=6,t=0;--r>=0;)t+=data[r],data[r]=A(t/e),t=t%e*1e7},_=function(data){for(var e=6,s="";--e>=0;)if(""!==s||0===e||0!==data[e]){var r=h(data[e]);s=""===s?r:s+v("0",7-r.length)+r}return s};n({target:"Number",proto:!0,forced:d((function(){return"0.000"!==P(8e-5,3)||"1"!==P(.9,0)||"1.25"!==P(1.255,2)||"1000000000000000128"!==P(0xde0b6b3a7640080,0)}))||!d((function(){P({})}))},{toFixed:function(e){var r,t,n,c,f=l(this),d=o(e),data=[0,0,0,0,0,0],A="",P="0";if(d<0||d>20)throw m("Incorrect fraction digits");if(f!=f)return"NaN";if(f<=-1e21||f>=1e21)return h(f);if(f<0&&(A="-",f=-f),f>1e-21)if(t=(r=function(e){for(var r=0,t=e;t>=4096;)r+=12,t/=4096;for(;t>=2;)r+=1,t/=2;return r}(f*y(2,69,1))-69)<0?f*y(2,-r,1):f/y(2,r,1),t*=4503599627370496,(r=52-r)>0){for(w(data,0,t),n=d;n>=7;)w(data,1e7,0),n-=7;for(w(data,y(10,n,1),0),n=r-1;n>=23;)V(data,1<<23),n-=23;V(data,1<<n),w(data,1,1),V(data,2),P=_(data)}else w(data,0,t),w(data,1<<-r,0),P=_(data)+v("0",d);return P=d>0?A+((c=P.length)<=d?"0."+v("0",d-c)+P:x(P,0,c-d)+"."+x(P,c-d)):A+P}})},348:function(e,r,t){"use strict";t(329)},349:function(e,r,t){var n=t(81)((function(i){return i[1]}));n.push([e.i,".graph__fill{display:block}",""]),n.locals={},e.exports=n},360:function(e,r,t){"use strict";t.r(r);t(33);var n=t(14),c=(t(209),t(347),t(15),t(34),{props:{name:{type:String,default:""},icon:{type:String,default:""},minPay:{type:Number,default:0},maxPay:{type:Number,default:0},storageValue:{type:Number,default:0},storagePrice:{type:null,default:0},transferValue:{type:Number,default:0},transferPrice:{type:Number,default:0},freeLimit:{type:Number,default:0},color:{type:String,default:"gray"},maxPriceValue:{type:Number,default:0},minPriceValue:{type:Number,default:0},screenWidth:{type:Number,default:0}},data:function(){return{currentStoragePrice:0}},mounted:function(){this.check_first_el(),this.$emit("calcmaxprice",{value:this.max_provider_price()})},computed:{provider_price:function(){var e,r;0!==this.freeLimit&&(r=(this.storageValue<this.freeLimit?0:(this.storageValue-this.freeLimit)*this.currentStoragePrice)+(this.transferValue<this.freeLimit?0:(this.transferValue-this.freeLimit)*this.transferPrice));return 0===this.freeLimit&&(r=this.storageValue*this.currentStoragePrice+this.transferValue*this.transferPrice),0!==this.minPay&&(e=this.minPay>r?this.minPay.toFixed(2):r.toFixed(2)),0!==this.maxPay&&(e=this.maxPay>r?r.toFixed(2):this.maxPay.toFixed(2)),0===this.minPay&&0===this.maxPay&&(e=r.toFixed(2)),e},price_type:function(){return Object(n.a)(this.storagePrice)},graph_width:function(){var e,r=100*this.provider_price/this.maxPriceValue;return this.screenWidth<768&&(e="100%"),this.screenWidth>=768&&(e=r<.1?"0.1%":r+"%"),e},graph_height:function(){var e,r=100*this.provider_price/this.maxPriceValue;return this.screenWidth<768&&(e=r<.1?"0.1%":r+"%"),this.screenWidth>=768&&(e="100px"),e},graph_color:function(){var e;return this.minPriceValue.toFixed(2)===this.provider_price&&(e=this.color),this.minPriceValue.toFixed(2)!==this.provider_price&&(e="gray"),e}},methods:{check_first_el:function(){"object"===this.price_type&&(this.currentStoragePrice=this.storagePrice[0].priceValue),"object"!==this.price_type&&(this.currentStoragePrice=this.storagePrice)},max_provider_price:function(){var e=this,r=0;return"object"===this.price_type&&this.storagePrice.forEach((function(t){var n;0!==e.freeLimit&&(n=(1e3-e.freeLimit)*t.priceValue+(1e3-e.freeLimit)*e.transferPrice),0===e.freeLimit&&(n=1e3*t.priceValue+1e3*e.transferPrice),n>r&&(r=n)})),"object"!==this.price_type&&(0!==this.freeLimit&&(r=(1e3-this.freeLimit)*this.storagePrice+(1e3-this.freeLimit)*this.transferPrice),0===this.freeLimit&&(r=1e3*this.storagePrice+1e3*this.transferPrice)),r}},watch:{provider_price:function(e,r){this.$emit("providerprice",{value:this.provider_price})}}}),o=(t(348),t(32)),component=Object(o.a)(c,(function(){var e=this,r=e._self._c;return r("div",{staticClass:"grid grid-rows-6 gap-4 h-screen md:grid-cols-12 md:grid-rows-none md:h-auto md:items-center"},[r("div",{staticClass:"order-1 row-span-1 md:order-none md:col-span-2 md:row-auto"},[r("div",{staticClass:"flex flex-col-reverse gap-4 items-center justify-between md:flex-row"},[r("div",[r("span",{staticClass:"block text-xs text-center break-all md:text-base"},[e._v("\n          "+e._s(e.name)+"\n        ")]),e._v(" "),"object"===e.price_type?r("div",{staticClass:"flex flex-wrap md:flex-col gap-2 mt-2"},e._l(e.storagePrice,(function(t,n){return r("div",{key:n,ref:"priceInput",refInFor:!0},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.currentStoragePrice,expression:"currentStoragePrice"}],attrs:{type:"radio",id:t.priceLabel,name:t.priceLabel},domProps:{value:t.priceValue,checked:e._q(e.currentStoragePrice,t.priceValue)},on:{change:function(r){e.currentStoragePrice=t.priceValue}}}),e._v(" "),r("label",{attrs:{for:t.priceLabel}},[e._v(e._s(t.priceLabel))])])})),0):e._e()]),e._v(" "),r("div",{staticClass:"w-1/3"},[r("img",{attrs:{src:e.icon,alt:e.name}})])])]),e._v(" "),r("div",{staticClass:"graph__bar flex flex-col-reverse items-center gap-4 row-span-5 md:row-auto md:col-span-10 md:flex-row"},[r("span",{staticClass:"graph__fill",style:{width:e.graph_width,height:e.graph_height,backgroundColor:e.graph_color}}),e._v(" "),r("span",{staticClass:"graph__tooltip"},[e._v(e._s(e.provider_price)+"$")])])])}),[],!1,null,null,null);r.default=component.exports},414:function(e,r,t){"use strict";t.r(r);t(33);var n={head:function(){return{title:"Test"}},data:function(){return{screenWidth:0,storageValue:500,transferValue:500,providers:[{name:"backblaze",icon:"https://www.backblaze.com/blog/wp-content/uploads/2017/12/backblaze_icon_transparent.png",minPay:7,storagePrice:.005,transferPrice:.01,color:"red"},{name:"bunny",icon:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAx6WJNVLl02YWeIVgG7gAYoUSff9N-5AEqjLtORtpQA&s",maxPay:10,storagePrice:[{priceLabel:"HDD",priceValue:.01},{priceLabel:"SSD",priceValue:.02}],transferPrice:.01,color:"orange"},{name:"scaleway",icon:"https://pcr.cloud-mercato.com/static/img/logos/scaleway.png",minPay:0,storagePrice:[{priceLabel:"Multi",priceValue:.06},{priceLabel:"Single",priceValue:.03}],transferPrice:.02,freeLimit:75,color:"purple"},{name:"vultr",icon:"data:image/png;base64,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",minPay:5,storagePrice:.01,transferPrice:.01,color:"blue"}],providersMaxValues:[],providersValues:[]}},mounted:function(){var e=this;this.screenWidth=window.innerWidth,window.addEventListener("resize",(function(){e.screenWidth=window.innerWidth}))},beforeDestroy:function(){var e=this;window.addEventListener("resize",(function(){e.screenWidth=window.innerWidth}),!1)},computed:{set_max_price_value:function(){return Math.max.apply(Math,this.providersMaxValues)},set_min_price_value:function(){return Math.min.apply(Math,this.providersValues)}},methods:{on_calc_max_price:function(e,data){this.$set(this.providersMaxValues,e,data.value)},on_calc_price:function(e,data){this.$set(this.providersValues,e,data.value)}}},c=t(32),component=Object(c.a)(n,(function(){var e=this,r=e._self._c;return r("div",{staticClass:"bg-black min-h-screen text-white p-4"},[r("section",{staticClass:"mx-auto container flex flex-col-reverse md:flex-col"},[r("div",{staticClass:"grid grid-cols-2 gap-4 items-center"},[r("fieldset",{staticClass:"flex flex-wrap items-center gap-4"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.storageValue,expression:"storageValue"}],attrs:{type:"range",name:"storage",min:"1",max:"1000",step:"1"},domProps:{value:e.storageValue},on:{__r:function(r){e.storageValue=r.target.value}}}),e._v(" "),r("label",{attrs:{for:"storage"}},[e._v("Storage")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.storageValue,expression:"storageValue"}],staticClass:"bg-black text-white w-1/4",attrs:{type:"number",min:"1",max:"1000"},domProps:{value:e.storageValue},on:{input:function(r){r.target.composing||(e.storageValue=r.target.value)}}})]),e._v(" "),r("fieldset",{staticClass:"flex flex-wrap items-center gap-4"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.transferValue,expression:"transferValue"}],attrs:{type:"range",name:"transfer",min:"1",max:"1000",step:"1"},domProps:{value:e.transferValue},on:{__r:function(r){e.transferValue=r.target.value}}}),e._v(" "),r("label",{attrs:{for:"transfer"}},[e._v("Transfer")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.transferValue,expression:"transferValue"}],staticClass:"bg-black text-white w-1/4",attrs:{type:"number",min:"1",max:"1000"},domProps:{value:e.transferValue},on:{input:function(r){r.target.composing||(e.transferValue=r.target.value)}}})])]),e._v(" "),r("div",{staticClass:"border p-2 my-4"},[r("p",{},[e._v("Сравнение")]),e._v(" "),r("div",{staticClass:"grid grid-cols-4 gap-4 md:grid-cols-1"},e._l(e.providers,(function(t,n){return r("GraphItem",{key:n,attrs:{name:t.name,icon:t.icon,"min-pay":t.minPay,"max-pay":t.maxPay,"storage-value":parseInt(e.storageValue),"storage-price":t.storagePrice,"transfer-value":parseInt(e.transferValue),"transfer-price":t.transferPrice,"free-limit":t.freeLimit,color:t.color,"min-price-value":e.set_min_price_value,"max-price-value":e.set_max_price_value,"screen-width":e.screenWidth},on:{calcmaxprice:function(r){return e.on_calc_max_price(n,r)},providerprice:function(r){return e.on_calc_price(n,r)}}})})),1)])])])}),[],!1,null,null,null);r.default=component.exports;installComponents(component,{GraphItem:t(360).default})}}]);