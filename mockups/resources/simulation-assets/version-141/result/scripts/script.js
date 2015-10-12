rabbit.util={bind:function(_1,_2){
return function(){
try{
return _1.apply(_2,arguments);
}
catch(e){
console.error(e);
}
};
},bindSingleAndDoubleClick:function(_3,_4,_5,_6,_7){
_7=_7||500;
$(_3).click(function(_8){
var _9=$(this).attr("href");
if(!$(this).data("timer")){
$(this).data("timer",setTimeout(function(){
_4(_8);
},_7));
}
if(_6){
return false;
}
}).dblclick(function(_a){
clearTimeout($(this).data("timer"));
$(this).data("timer",null);
return _5(_a);
});
},emptyNode:function(_b){
var _c=this.getChildren(_b);
for(var i=_c.length-1;i>=0;i--){
_b.removeChild(_c[i]);
}
},getFirstChildNode:function(_d){
return this.getChildren(_d)[0];
},getChildren:function(_e){
if(_e.children){
return _e.children;
}else{
var _f=_e.childNodes;
var _10=[];
for(var i=0;i<_f.length;i++){
if(_f[i].nodeType===Node.ELEMENT_NODE){
_10.push(_f[i]);
}
}
return _10;
}
},scrollToRelative:function(_11,_12,_13){
var to=_11.scrollTop+_12;
this.scrollTo(_11,to,_13);
},scrollTo:function(_14,to,_15){
$(_14).animate({scrollTop:to},_15);
},xmlEncode:function(_16){
return _16.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
},xmlDecode:function(_17){
return _17.toString().replace(/&quot;/g,"\"").replace(/&lt;/g,"<").replace(/&amp;/g,"&");
},convertDate:function(_18){
if(_18=="7000000000000"){
return "not yet saved";
}
return Ext.util.Format.date(new Date(parseInt(_18)),"Y-m-d G:i");
},appendVersionQuery:function(_19){
return _19+"?v="+rabbit.parameters.codeVersion;
},cloneObject:function(_1a){
return JSON.parse(JSON.stringify(_1a));
},Class:function(_1b,_1c){
if(!_1c){
_1c=_1b;
_1b=function(){
};
}
var F=function(c){
if(this.init&&c!==rabbit.util.Class){
this.parent=_1b.prototype;
this.init.apply(this,arguments);
}
};
_1c.call(F.prototype=new _1b(rabbit.util.Class),_1b.prototype);
return F;
},absoluteCenter:function(_1d){
$(_1d).css("left",$(_1d).parent().width()/2-$(_1d).width()/2);
$(_1d).css("top",$(_1d).parent().height()/2-$(_1d).height()/2);
},getResolvedPromise:function(){
var _1e=new jQuery.Deferred();
_1e.resolve();
return _1e.promise();
},addClass:function(_1f,_20){
if(typeof _1f==="string"){
_1f=document.getElementById(_1f);
}
_1f.setAttribute("class",_1f.getAttribute("class")+" "+_20);
},removeClass:function(_21,_22){
if(typeof _21==="string"){
_21=document.getElementById(_21);
}
_21.setAttribute("class",_21.getAttribute("class").replace(_22,""));
},stopPropagation:function(e){
e.stopPropagation();
},compareStrings:function(s1,s2){
if(s1==null){
s1="";
}
if(s2==null){
return -1;
}
return "".localeCompare.call(s1,s2);
},compareInts:function(i1,i2){
if(isNaN(i1)){
return -1;
}
if(isNaN(i2)){
return 1;
}
if(i1==i2){
return 0;
}
if(i2>i1){
return -1;
}
return 1;
},insertAtIndex:function(_23,key,_24,_25){
var tmp={};
var _26=_.keys(_23);
for(var i=0;i<_26.length;i++){
if(i>=_25){
tmp[_26[i]]=_23[_26[i]];
delete _23[_26[i]];
}
}
_23[key]=_24;
for(var key in tmp){
_23[key]=tmp[key];
}
return _23;
},recursivelyRemoveId:function(_27){
_27.removeAttribute("id");
var _28=this.getChildren(_27);
for(var i=0;i<_28.length;i++){
this.recursivelyRemoveId(_28[i]);
}
}};
pidoco={console:{log:function(){
},error:function(){
},debug:function(){
},warn:function(){
},info:function(){
}}};
if(typeof console.log.bind!=="undefined"){
pidoco={console:{}};
if(typeof console.log==="function"){
pidoco.console.log=console.log.bind(console);
}
if(typeof console.error==="function"){
pidoco.console.error=console.error.bind(console);
}
if(typeof console.debug==="function"){
pidoco.console.debug=console.debug.bind(console);
}
if(typeof console.warn==="function"){
pidoco.console.warn=console.warn.bind(console);
}
if(typeof console.info==="function"){
pidoco.console.info=console.info.bind(console);
}
}else{
var illegalInvocation=true;
var testConsole=console.log;
try{
testConsole("Test console does not produce any exception.");
illegalInvocation=false;
}
catch(e){
illegalInvocation=true;
}
if(!illegalInvocation){
pidoco={console:{log:console.log,error:console.error,debug:console.debug,warn:console.warn,info:console.info}};
}
}
console.oldError=console.error;
console.error=function(e){
var _29=(e.lineNumber!=null)?e.lineNumber:e.line;
var _2a=(e.fileName!=null)?e.fileName:e.sourceURL;
var _2b={"errorJSON":JSON.stringify(e),"message":e.name+": "+e.message,"url":_2a,"line":_29,"stack":e.stack};
if(rabbit.communication){
rabbit.communication.manager.submitError(_2b);
}else{
if(rabbit.repository){
rabbit.repository.communicationMgr.submitError(_2b);
}
}
if(document.URL.match(/http:\/\/localhost:.*/)||document.URL.match(/http(s)?:\/\/[^\/]*stage\.pidoco\.com.*/)){
if(typeof e.stack!=="undefined"){
console.oldError(e.stack);
}else{
console.oldError(null,arguments);
}
}
};
if((!document.URL.match(/http:\/\/localhost:.*/))&&(!document.URL.match(/http(s)?:\/\/[^\/]*stage\.pidoco\.com.*/))){
console.log=function(){
};
console.debug=function(){
};
console.warn=function(){
};
console.info=function(){
};
}
rabbit.result={};
rabbit.ui={};
rabbit.data={};
rabbit.event={};
rabbit.parameters={};
rabbit.interaction={};
rabbit.logLevel="debug";
rabbit.communication={};
rabbit.plugins={};
rabbit.stencils={};
rabbit.util=_.extend(rabbit.util,{formatDate:function(_2c){
var _2d=((new Date()).getTime()-_2c)/1000/60;
var _2e=new Date(_2c);
if(_2d<2){
return t("result.discussion.time-a-minute-ago");
}else{
if(_2d<60){
return t("result.discussion.time-minutes-ago-prefix")+Math.round(_2d)+t("result.discussion.time-minutes-ago");
}else{
if(_2d<1440){
return t("result.discussion.time-at")+this.pad(_2e.getHours())+":"+this.pad(_2e.getMinutes());
}else{
return t("result.discussion.on")+_2e.toDateString();
}
}
}
},pad:function(val,len){
val=String(val);
len=len||2;
while(val.length<len){
val="0"+val;
}
return val;
},getMode:function(){
return document.getElementById("mode").firstChild.nodeValue;
},isElementChildOfSelector:function(_2f,_30){
return $(_2f).parents(_30).length>0;
},userRole:null});
rabbit.events={buttonClicked:"buttonClicked",buttonMouseOver:"buttonMouseOver",buttonMouseOut:"buttonMouseOut",checkBoxClicked:"checkBoxClicked",click:"click",clickAreaClicked:"clickAreaClicked",clickAreaHovered:"clickAreaHovered",iphoneSwitchClicked:"iphoneSwitchClicked",loadPage:"loadPage",pageLoaded:"pageLoaded",pageReady:"pageReady",layerStoreInserted:"layerStoreInserted",layerLoaded:"layerLoaded",showLayer:"showLayer",hideLayer:"hideLayer",propertyChange:"propertyChange",radioButtonClicked:"radioButtonClicked",svgBlur:"svgBlur",svgFocus:"svgFocus",tabButtonMouseOut:"tabButtonMouseOut",tabButtonMouseOver:"tabButtonMouseOver",showDatepicker:"showDatepicker",hideDatepicker:"hideDatepicker",changeDatepickerPage:"changeDatepickerPage",changeSlider:"changeSlider",subMenuShow:"subMenuShow",subMenuHide:"subMenuHide",sliderChangedEvent:"sliderChangedEvent",treeViewNodeClicked:"treeViewNodeClicked",treeViewScrolled:"treeViewScrolled",ratingResultChangedEvent:"ratingResultChangedEvent",ratingMouseOut:"ratingMouseOut",ratingMouseOver:"ratingMouseOver",toggleToggleSection:"toggleToggleSection",discussionStoreChanged:"discussionStoreChanged",discussionStoreAdded:"discussionStoreAdded",pageStoreLoaded:"pageStoreLoaded",folderStoreLoaded:"folderStoreLoaded",newInteractionRegistered:"newInteractionRegistered",switchOffSwitch:"switchOffSwitch",switchOnSwitch:"switchOnSwitch"};
rabbit.event.manager=function _returnEventDispatcher(){
var _31={};
var _32={};
return {registerOnEvent:function registerOnEvent(_33,_34,_35,_36){
if(typeof _33!=="string"||typeof _34!=="function"||typeof _35!=="object"){
throw "Invalid Arguments for registerOnEvent";
}
if(!_31.hasOwnProperty(_33)){
_31[_33]=[];
}
var _37={"callback":_34,"thisArg":_35,"includeEventType":false};
if(_36){
_37.includeEventType=true;
}
_31[_33].push(_37);
},registerOnCategoryEvent:function(_38,_39,_3a){
if(typeof _38!=="string"||typeof _39!=="function"||typeof _3a!=="object"){
throw "Invalid Arguments for registerOnEventForCategory";
}
if(!_32.hasOwnProperty(_38)){
_32[_38]=[];
}
var _3b={"callback":_39,"thisArg":_3a,"includeEventType":true};
_32[_38].push(_3b);
console.log("ok for "+_38);
},raiseEvent:function raiseEvent(_3c){
this._raiseCategoryEvent.apply(this,arguments);
this._raiseNormalEvent.apply(this,arguments);
},_raiseCategoryEvent:function raiseEvent(_3d){
var _3e=_3d.replace(/\..*$/,"");
if(_3e!=_3d){
console.log("Try to raise catergory "+_3e);
var _3f=_32[_3e];
if(typeof _3f==="undefined"){
console.warn("No handler category for invoked eventType "+_3d+" (category: "+_3e+")");
return;
}
for(var i=0;i<_3f.length;i++){
try{
var _40=Array.prototype.slice.call(arguments);
this._raiseEvent(_3f[i],_40);
}
catch(e){
console.error(e);
}
}
}
},_raiseNormalEvent:function raiseEvent(_41){
var _42=_31[_41];
if(typeof _42==="undefined"){
console.warn("No handler for invoked eventType "+_41);
return;
}
for(var i=0;i<_42.length;i++){
try{
var _43=Array.prototype.slice.call(arguments);
this._raiseEvent(_42[i],_43);
}
catch(e){
console.error(e);
}
}
},_raiseEvent:function(_44,_45){
var _46=_44.callback;
var _47=_44.thisArg;
var _48=_44.includeEventType;
if(typeof _46!=="function"){
return;
}
if(!_48){
_45.shift();
}
_46.apply(_47,_45);
}};
}();
rabbit.communication.manager={urls:{createDiscussion:"__reviewBaseUrl__/__layerId__/create",moveDiscussion:"__reviewBaseUrl__/__layerId__/move",deleteDiscussion:"__reviewBaseUrl__/__layerId__/delete",getDiscussions:"__reviewBaseUrl__/__layerId__/discussions",postEntryDiscussion:"__reviewBaseUrl__/__layerId__/post",setStateDiscussion:"__reviewBaseUrl__/__layerId__/setstate",renameDiscussion:"__reviewBaseUrl__/__layerId__/rename",loadLayerExport:"../resources/layers/__layerId____browser__-__mode__.js",loadLayer:"__baseUrl__editor-jersey/prototypes/__prototypeId__/layers/__layer__",pageLink:"__urlPattern__",rectangleExport:"../resources/overlay-rectangles/__width__-__height__-__mode__.js",rectangle:"__baseUrl__prototype/result/__prototypeId__/rect/__mode__",mp3Export:"../resources/audios/__audioId__.mp3",mp3:"__baseUrl__editor-jersey/prototypes/__prototypeId__/audios/__audioId__.mp3",error:"__baseUrl__repository/error/__prototypeId__/"},submitError:function(_49){
var url=this.getUrl("error");
if(rabbit.facade.isExport()){
return;
}
_49["userAgent"]=navigator.userAgent;
this.post(url,"json",_49);
},buildEditUrl:function(_4a){
var _4b="/rabbit/edit/"+rabbit.result.manager.currentPrototypeId+"#";
var _4c="page/"+rabbit.result.manager.currentPageNr;
var _4d="";
if(_4a){
var _4e=rabbit.data.pageStore.objects[_4a];
var _4f=rabbit.data.folderStore.objects[_4e.data.parentFolder];
while(_4f!==undefined){
_4d="folder/"+_4f.data.id+"/"+_4d;
_4f=rabbit.data.folderStore.objects[_4f.data.parentFolder];
}
}
return _4b+_4d+_4c;
},getUrl:function(_50,_51){
var url=this.urls[_50];
var _52=rabbit.result.manager.urlPattern;
url=url.replace("__baseUrl__",rabbit.common.baseUrl);
url=url.replace("__reviewBaseUrl__",rabbit.facade.getBaseUrl());
url=url.replace("__prototypeId__",rabbit.result.manager.currentPrototypeId);
if(_50==="loadLayer"){
_52=rabbit.result.manager.urlPattern.replace("__page__","layer/__page__");
}
url=url.replace("__urlPattern__",_52);
if(_51){
for(var key in _51){
url=url.replace("__"+key+"__",_51[key]);
}
}
return url;
},get:function(url,_53,_54,_55){
return this.ajax(url,"get",_53,_54,_55);
},post:function(url,_56,_57,_58){
return this.ajax(url,"post",_56,_57,_58);
},ajax:function(url,_59,_5a,_5b,_5c){
if(!url){
throw "URL not provided for ajax";
}
_59=_59||"get";
_5a=_5a||undefined;
_5b=_5b||undefined;
_5c=_5c||{};
var _5d=_.defaults({url:url,type:_59,dataType:_5a,data:_5b},_5c);
return $.ajax(_5d);
}};
rabbit.result.manager={datePickerClicked:false,customDatepickerObjects:[],init:function(_5e,_5f,_60,_61){
try{
rabbit.common.i18n.init({lang:rabbit.result.lang});
}
catch(e){
console.error("error during i18n init",e);
}
rabbit.prototypeType=_5f;
rabbit.browser=_60;
this.initialPageId=_5e;
this.isPushStateAvailable=window.location.protocol!=="file:"&&typeof window.history.replaceState!=="undefined";
this.fromApp=_61;
try{
this._initPlugins();
rabbit.data.folderStore.init();
rabbit.data.pageStore.init();
rabbit.data.layerStore.init();
rabbit.data.discussionStore.init();
rabbit.ui.manager.init();
if(rabbit.parameters.layerIdToOpen){
rabbit.ui.manager.showLayer($("#repository"),rabbit.parameters.layerIdToOpen);
}
rabbit.event.manager.raiseEvent(rabbit.events.pageReady);
}
catch(e){
console.error(e);
}
rabbit.ui.manager._hackToMakeArrowsWork();
if(this.isPushStateAvailable){
window.onpopstate=function(e){
if(e.state){
if(e.state.fromRefresh){
window.history.back();
}else{
rabbit.facade.loadLayer(e.state.pageId);
this.showPage($("#"+e.state.repositoryId),e.state.pageId);
console.log("new pageid "+this.currentPageNr);
}
}
}.bind(this);
window.history.replaceState({repositoryId:"repository",pageId:rabbit.result.manager.currentPageNr},"",window.location.href);
}
},setNextPageIsARefresh:function(){
window.history.replaceState({repositoryId:"repository",pageId:rabbit.result.manager.currentPageNr,fromRefresh:true},"",window.location.href);
},goBack:function(){
window.history.back();
},_initPlugins:function(){
for(var i=0;i<rabbit.facade._availablePlugins.length;i++){
try{
var _62=rabbit.facade._availablePlugins[i];
_62.init.apply(_62,_62._initialArguments);
}
catch(e){
console.error(e);
}
}
},goToPage:function(_63,_64){
var url;
var _65=rabbit.data.pageStore.objects[_63];
var _66=Boolean(_65);
if(_66){
url=_65.getUrl();
if(rabbit.facade.isExport()&&!url){
alert("Sorry, this page is not part of the export.");
return;
}else{
rabbit.mobile.trigger("pidoco:beforeGoToPage",{height:_65.data.height,width:_65.data.width});
}
}else{
if(!_63.match(/^[a-zA-Z0-9]*:\/\//)){
url="http://"+_63;
}else{
url=_63;
}
}
if(!_66&&rabbit.facade.runningInApp()&&rabbit.facade.isIOS){
window.open(url,"_system");
}else{
if(_64){
window.open(url);
}else{
location.href=url;
}
}
},showPage:function(_67,_68,_69,_6a){
_69=_69||false;
var _6b=_67.attr("id");
try{
if(_68===""||_68===this.currentPageNr){
return;
}
var _6c=rabbit.data.pageStore.objects[_68];
console.log("show page repository:"+_6b+" page:"+_68,_6c);
if(_6c===undefined){
this.goToPage(_68);
return;
}
rabbit.ui.manager.showPage(_67,_68,_6a);
if(_69===true&&this.isPushStateAvailable){
console.log("PUSH STATE",_68);
window.history.pushState({repositoryId:_6b,pageId:_68},"",_6c.getUrl());
}
this.currentPageNr=_68;
_67.data("page-id",_68);
rabbit.event.manager.raiseEvent(rabbit.events.pageLoaded,_6c,_67);
rabbit.mobile.trigger("pidoco:afterShowPage");
}
catch(e){
console.error(e);
}
},menuClick:function(a,b,_6d){
rabbit.result.manager.goToPage(_6d,false);
}};
rabbit.ui.manager={inTransition:false,init:function(){
rabbit.facade.registerOnEvent(rabbit.events.layerLoaded,this.fillWrappersWithLayer,this);
},createWrappers:function(_6e,_6f,_70){
var _71=$("<div class=\"wrapper wrapper-"+_6f+"\" data-layer-id=\""+_6f+"\" style=\"display: none\"></div>").appendTo(_6e);
var _72=rabbit.data.pageStore.objects[_6f];
if(_70===true&&_72){
for(var _73 in _72.data.layers){
if(_72.data.layers[_73]===true||_72.data.layers[_73]==="true"){
this.createWrappers(_6e,_73);
}
}
}
return _71;
},fillWrappersWithLayer:function(_74){
var _75=_74.data.id;
$(".wrapper-"+_75+"[data-fill-me=\"true\"]:empty").each(function(_76,_77){
this.fillWrapperWithLayer(_77,_74);
_77.removeAttribute("data-fill-me");
}.bind(this));
},fillWrapperWithLayer:function(_78,_79,_7a){
var _7b=_79.data.html;
var _7c=_78.parentNode.id;
var _7d=_79.data.html;
if(_7d){
_7d=$(_79.data.html.replace(/__containerId__/g,_7c));
if(_7a){
_7d.find("script").remove();
}
$(_78).append(_7d);
if(!this.inTransition){
rabbit.facade.raiseEvent(rabbit.events.layerStoreInserted,_78.children[0]);
}
}else{
_78.setAttribute("data-fill-me","true");
}
return _7d;
},getLayerWrapper:function(_7e,_7f){
return _7e.find(">.wrapper-"+_7f);
},showLayer:function(_80,_81){
var _82=rabbit.data.layerStore.objects[_81];
if(!_82){
_82=rabbit.data.layerStore.loadLayer(_81);
}
var _83=this.getLayerWrapper(_80,_81);
if(!_83.length){
_83=this.createWrappers(_80,_81,true);
}
if(_83[0].children.length===0){
this.fillWrapperWithLayer(_83[0],_82);
}
_83.show();
rabbit.event.manager.raiseEvent(rabbit.events.showLayer,{id:_80.attr("id")+_81,layerId:_81,repositoryId:_80.attr("id")});
},hideLayer:function(_84,_85){
var _86=this.getLayerWrapper(_84,_85);
_86.hide();
rabbit.event.manager.raiseEvent(rabbit.events.hideLayer,{id:_84.attr("id")+_85,layerId:_85,repositoryId:_84.attr("id")});
},toggleLayer:function(_87,_88){
var _89=this.getLayerWrapper(_87,_88);
if(!_89.length||_89.css("display")==="none"){
return this.showLayer(_87,_88);
}else{
return this.hideLayer(_87,_88);
}
},showPage:function(_8a,_8b,_8c){
var _8d;
if(_8c==="fromRight"||_8c==="fromLeft"||_8c==="fromTop"||_8c==="fromBottom"){
_8d=this.showPageWithTranslation(_8a,_8b,_8c);
}else{
if(_8c==="opacity"){
_8d=this.showPageWithOpacity(_8a,_8b);
}else{
if(_8c==="flip"){
_8d=this.showPageWithFlip(_8a,_8b);
}else{
_8d=this.showPageWithoutTransition(_8a,_8b);
}
}
}
if(_8a.attr("id")=="repository"&&_8d){
_8d.done(function(){
$(_8a).attr("data-review-reference-id",_8b);
$(_8a).attr("data-page-id",_8b);
$(".border-wrapper").attr("data-current-page-id",_8b);
});
}
},showPageWithoutTransition:function(_8e,_8f){
var _90=rabbit.data.pageStore.objects[_8f];
var _91=new $.Deferred();
rabbit.ui.manager.showLayer(_8e,_8f);
_.each(_90.data.layers,function(_92,_93){
this.showLayer(_8e,_93);
}.bind(this));
_8e.find(">.wrapper").each(function(_94,_95){
var _96=_95.getAttribute("data-layer-id");
if((!_90.data.layers.hasOwnProperty(_96)||_90.data.layers[_96]!==true)&&_96!=_8f){
this.hideLayer(_8e,_96);
}
}.bind(this));
_91.resolve();
return _91.promise();
},showPageWithFlip:function(_97,_98){
var _99=500;
var _9a=new $.Deferred();
this.startTransition(_97);
var _9b=this.createTransitionWrapper(_97,_98);
var _9c=_9b.leave.find(">div");
var _9d=_9b.enter.find(">div");
_97.find(">div").hide();
_97.append(_9b.leave).append(_9b.enter);
_9d.hide();
_9c.transition({perspective:"0px",rotateY:"90deg",duration:_99},function(){
_9d.transition({perspective:"0px",rotate3d:"0,1,0,270deg",duration:0},function(){
_9d.show();
this.showPageWithoutTransition(_9d,_98);
_9d.transition({perspective:"0px",rotate3d:"0,1,0,360deg",duration:_99},function(){
_9c.transition({perspective:"0px",rotateY:"0deg",duration:0},function(){
this.stopTransition(_97);
this.showPageWithoutTransition(_97,_98);
_9b.leave.remove();
_9b.enter.remove();
_9a.resolve();
}.bind(this));
}.bind(this));
}.bind(this));
}.bind(this));
return _9a.promise();
},showPageWithOpacity:function(_9e,_9f){
var _a0=500;
var _a1=new $.Deferred();
this.startTransition(_9e);
var _a2=this.createTransitionWrapper(_9e,_9f);
var _a3=_a2.leave.find(">div");
var _a4=_a2.enter.find(">div");
_9e.find(">div").hide();
_9e.append(_a2.leave).append(_a2.enter);
_a4.css({opacity:0});
_a3.transition({opacity:0,duration:_a0},function(){
this.showPageWithoutTransition(_a4,_9f);
_a4.transition({opacity:1,duration:_a0},function(){
this.stopTransition(_9e);
this.showPageWithoutTransition(_9e,_9f);
_a2.leave.remove();
_a2.enter.remove();
_a1.resolve();
}.bind(this));
}.bind(this));
return _a1.promise();
},showPageWithTranslation:function(_a5,_a6,_a7){
var _a8=_a5.width();
var _a9=_a5.height();
var _aa=500;
var _ab=new $.Deferred();
this.startTransition(_a5);
var _ac=this.createTransitionWrapper(_a5,_a6);
var _ad=_ac.leave.find(">div");
var _ae=_ac.enter.find(">div");
if(_a7==="fromLeft"){
_ae.css("left",-1*_a8);
}else{
if(_a7==="fromTop"){
_ae.css("top",-1*_a9);
}else{
if(_a7==="fromBottom"){
_ae.css("top",_a9);
}else{
_ae.css("left",_a8);
}
}
}
_ae.find(">div").show();
_a5.find(">div").hide();
_a5.append(_ac.leave).append(_ac.enter);
var _af=function(){
this.stopTransition(_a5);
this.showPageWithoutTransition(_a5,_a6);
_ac.leave.remove();
_ac.enter.remove();
_ab.resolve();
}.bind(this);
if(_a7==="fromLeft"){
_ad.transition({x:_a8+"px",duration:_aa});
_ae.transition({x:_a8+"px",duration:_aa},_af);
}else{
if(_a7==="fromTop"){
_ad.transition({y:_a9+"px",duration:_aa});
_ae.transition({y:_a9+"px",duration:_aa},_af);
}else{
if(_a7==="fromBottom"){
_ad.transition({y:"-"+_a9+"px",duration:_aa});
_ae.transition({y:"-"+_a9+"px",duration:_aa},_af);
}else{
_ad.transition({x:"-"+_a8+"px",duration:_aa});
_ae.transition({x:"-"+_a8+"px",duration:_aa},_af);
}
}
}
return _ab.promise();
},createTransitionWrapper:function(_b0,_b1){
var _b2=_b0.data("page-id");
var _b3=rabbit.data.pageStore.objects[_b1];
var _b4=rabbit.data.pageStore.objects[_b2];
var _b5,_b6;
var _b7=$("<div class=\"transition-wrapper transition-enter\" data-page-id=\""+_b1+"\"><div class=\"layer-container\"></div></div>");
var _b8=$("<div class=\"transition-wrapper transition-leave\" data-page-id=\""+_b2+"\"><div class=\"layer-container\"></div></div>");
var _b9=_b8.find(">div");
var _ba=_b7.find(">div");
var _bb=_b0.find(".wrapper-"+_b2).clone().remove("script");
var _bc=_b0.find(".wrapper-"+_b1).clone().remove("script");
for(_b5 in _b3.data.layers){
_b6=_b3.data.layers[_b5];
if(_b6===true||_b6==="true"){
this.createWrappers(_ba,_b5,false);
this.showLayer(_ba,_b5);
}
}
for(_b5 in _b4.data.layers){
_b6=_b4.data.layers[_b5];
if(_b6===true||_b6==="true"){
this.createWrappers(_b9,_b5,false);
this.showLayer(_b9,_b5);
}
}
_b9.append(_bb);
if(_bc.length===0){
_bc=this.createWrappers(_ba,_b1,true);
}else{
_ba.append(_bc);
}
if(_bc.children().length===0){
this.fillWrapperWithLayer(_bc[0],rabbit.data.layerStore.objects[_b1],true);
}
return {enter:_b7,leave:_b8};
},startTransition:function(_bd){
this.inTransition=true;
$("body").addClass("disable-pointer-events");
$(_bd).addClass("during-transition");
},stopTransition:function(_be){
this.inTransition=false;
$("body").removeClass("disable-pointer-events");
$(_be).removeClass("during-transition");
},_forceRedraw:function(){
var _bf=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;
var _c0=navigator.userAgent.toLowerCase().indexOf("safari")>-1;
if(_bf||_c0){
document.body.style.webkitTransform="scale(1)";
}else{
if(window.resizeTo&&window.outerWidth&&window.outerHeight){
window.resizeTo(window.outerWidth+1,window.outerHeight+1);
window.resizeTo(window.outerWidth-1,window.outerHeight-1);
}
}
},_hackToMakeArrowsWork:function(){
window.setTimeout(this._forceRedraw,1000);
}};
rabbit.interaction.manager={tmp:{},actions:{click:{makeableOnDesktop:function(_c1){
return !_c1.numberOfFinger||_c1.numberOfFinger=="1"||_c1.numberOfFinger=="any";
},render:function(_c2){
if(parseInt(_c2.data.action.numberOfFinger,10)>1){
return t("interaction.action.multiFingerClick.userDescription").replace("__element__",rabbit.interaction.manager.getElementTitle(_c2));
}else{
return t("interaction.action.click.userDescription").replace("__element__",rabbit.interaction.manager.getElementTitle(_c2));
}
},defineEvent:function(_c3){
var _c4=document.getElementById(_c3.data.stencilId);
if(_c3.data.action.button=="right"){
$(_c4).on("contextmenu",function(e){
rabbit.interaction.manager.raiseInteraction(_c3,rabbit.interaction.manager.serializeEvent(e));
return false;
});
}else{
if(false){
var _c5;
var _c6;
var _c7=200;
var _c8=500;
_c4.addEventListener("touchstart",function(e){
if(!_c3.data.action.numberOfFinger||(_c3.data.action.numberOfFinger&&(_c3.data.action.numberOfFinger==="any"||parseInt(_c3.data.action.numberOfFinger,10)===e.touches.length))){
_c5=new Date().getTime();
}
e.preventDefault();
},false);
_c4.addEventListener("touchend",function(e){
if(_c5){
var end=new Date().getTime();
if(_c7>(end-_c5)){
rabbit.interaction.manager.raiseInteraction(_c3,rabbit.interaction.manager.serializeEvent(e));
_c5=null;
}
}
e.preventDefault();
},false);
}else{
if(rabbit.interaction.manager.actions.click.makeableOnDesktop(_c3.data.action)){
_c4.addEventListener("click",function(e){
rabbit.interaction.manager.raiseInteraction(_c3,rabbit.interaction.manager.serializeEvent(e));
});
}
}
}
}},doubleClick:{makeableOnDesktop:true,render:function(_c9){
return t("interaction.action.doubleClick.userDescription").replace("__element__",rabbit.interaction.manager.getElementTitle(_c9));
},defineEvent:function(_ca){
var _cb=document.getElementById(_ca.data.stencilId);
if(_ca.data.action.button=="right"){
$(_cb).on("contextmenu",function(e){
rabbit.interaction.manager.raiseInteraction(_ca,rabbit.interaction.manager.serializeEvent(e));
return false;
});
}else{
if(false){
var _cc;
var _cd;
var _ce=200;
var _cf=500;
_cb.addEventListener("touchstart",function(e){
_cc=new Date().getTime();
if(_cf<(_cc-_cd)){
_cd=null;
}
e.preventDefault();
},false);
_cb.addEventListener("touchend",function(e){
if(_cc){
var end=new Date().getTime();
if(_ce>(end-_cc)){
if(!_cd){
_cd=end;
}else{
if(_cf>(end-_cd)){
rabbit.interaction.manager.raiseInteraction(_ca,rabbit.interaction.manager.serializeEvent(e));
_cc=null;
_cd=null;
}
_cd=null;
}
}
}
e.preventDefault();
},false);
}else{
_cb.addEventListener("dblclick",function(e){
rabbit.interaction.manager.raiseInteraction(_ca,rabbit.interaction.manager.serializeEvent(e));
});
}
}
}},hover:{makeableOnDesktop:true,render:function(_d0){
return t("interaction.action.hover.userDescription").replace("__element__",rabbit.interaction.manager.getElementTitle(_d0));
},defineEvent:function(_d1){
if(!_d1.data.action.trigger){
_d1.data.action.trigger="enter";
}
if(_d1.data.action.trigger=="both"||_d1.data.action.trigger=="enter"){
$("#"+_d1.data.stencilId).on("mouseenter",function(e){
rabbit.interaction.manager.raiseInteraction(_d1,rabbit.interaction.manager.serializeEvent(e));
});
}
if(_d1.data.action.trigger=="both"||_d1.data.action.trigger=="leave"){
$("#"+_d1.data.stencilId).on("mouseleave",function(e){
rabbit.interaction.manager.raiseInteraction(_d1,rabbit.interaction.manager.serializeEvent(e));
});
}
}},swipe:{makeableOnDesktop:false,render:function(_d2){
return t("interaction.action.swipe.userDescription").replace("__element__",rabbit.interaction.manager.getElementTitle(_d2));
},defineEvent:function(_d3){
var _d4=Hammer(document.getElementById(_d3.data.stencilId),{swipe_max_touches:5,drag_block_horizontal:true,drag_block_vertical:true,swipe_velocity:0.4});
_d4.on("swipe",function(e){
if(_d3.data.action.direction==="any"||e.gesture.direction===_d3.data.action.direction){
rabbit.facade.markHighlightTouchesAsSuccessful();
rabbit.interaction.manager.raiseInteraction(_d3,rabbit.interaction.manager.serializeEvent(e));
}
});
}},pinch:{makeableOnDesktop:false,render:function(_d5){
return t("interaction.action.pinch.userDescription").replace("__element__",rabbit.interaction.manager.getElementTitle(_d5));
},defineEvent:function(_d6){
var _d7=Hammer(document.getElementById(_d6.data.stencilId),{prevent_default:true});
var _d8=null;
var _d9=false;
if(_d6.data.action.direction==="in"){
_d8="pinchin";
}else{
if(_d6.data.action.direction==="out"){
_d8="pinchout";
}else{
_d8="pinch";
}
}
_d7.on("transformstart",function(e){
_d9=false;
});
_d7.on("transformend",function(e){
if(_d9){
rabbit.facade.markHighlightTouchesAsSuccessful();
rabbit.interaction.manager.raiseInteraction(_d6,rabbit.interaction.manager.serializeEvent(e));
}
});
_d7.on(_d8,function(e){
_d9=true;
});
}}},getInterinteractionEventId:function(_da){
return "interaction."+_da;
},raiseInteraction:function(_db,e){
if(this.isInteractionExecutable(_db)){
rabbit.facade.raiseEvent(_db.data.uniqueId,e);
return true;
}else{
return false;
}
},isLayerHidden:function(_dc){
return $(_dc).css("display")==="none";
},isInteractionExecutable:function(_dd){
var _de=$("#"+_dd.data.stencilId);
var _df=_de.parents(".layer");
for(var i=0;i<_df.length;i++){
if(this.isLayerHidden(_df.get(i))){
return false;
}
}
if(_de.length===0||_de.hasClass("layer")&&this.isLayerHidden(_de)){
return false;
}
return true;
},renderAction:function(_e0){
return rabbit.interaction.manager.actions[_e0.data.action.type].render(_e0);
},getElementTitle:function(_e1){
var _e2=$("#"+_e1.data.stencilId).data("interactive-element-type");
return t("stencils."+_e2+"-palette");
},registerAction:function(_e3,_e4){
if(_.has(rabbit.interaction.manager.actions,_e3)){
throw "Action with name "+_e3+" already exists.";
}else{
rabbit.interaction.manager.actions[_e3]=_e4;
}
},registerReaction:function(_e5,_e6){
if(_.has(rabbit.interaction.manager.reactions,_e5)){
throw "Action with name "+_e5+" already exists.";
}else{
rabbit.interaction.manager.reactions[_e5]=_e6;
}
},reactions:{showPage:{init:function(_e7,_e8){
var _e9=rabbit.interaction.manager.reactions.showPage.getOpeningMethod(_e8);
if(rabbit.data.pageStore.objects[_e8.target]&&(_e9==="withoutReloadOnly"||_e9==="withoutReloadIframe")){
rabbit.facade.loadLayer(_e8.target);
}
},getOpeningMethod:function(_ea){
var _eb=_ea.options;
if(!_eb){
if(_ea.inNewTab==="true"){
_eb="reloadNewTab";
}else{
if(_ea.withoutReload=="true"){
_eb="withoutReloadOnly";
}else{
if(_ea.withoutReload!==undefined){
_eb="reloadOnly";
}
}
}
}
return _eb;
},callback:function(_ec,_ed,_ee){
var _ef=_ee.target;
var _f0=rabbit.interaction.manager.reactions.showPage.getOpeningMethod(_ee);
if(_f0==="reloadNewTab"){
rabbit.result.manager.goToPage(_ef,true);
}else{
if(_f0==="withoutReloadOnly"){
rabbit.facade.showPage($("#repository"),_ef,true,_ee.transition);
}else{
if(_f0==="withoutReloadIframe"){
var _f1=document.getElementById(_ed.data.stencilId);
var _f2=rabbit.facade.getRepositoryFromStencil(_f1);
var _f3=false;
if(_f2.attr("id")==="repository"){
_f3=true;
}
rabbit.facade.showPage(_f2,_ef,_f3,_ee.transition);
}else{
rabbit.result.manager.goToPage(_ef);
}
}
}
}},toggleLayer:{init:function(_f4,_f5){
rabbit.facade.loadLayer(_f5.layer);
},callback:function(_f6,_f7,_f8){
var _f9=document.getElementById(_f7.data.stencilId);
var _fa=rabbit.facade.getRepositoryFromStencil(_f9);
if(_f8.visibility==="toggle"){
rabbit.facade.toggleLayer(_fa,_f8.layer);
}else{
if(_f8.visibility==="show"){
rabbit.facade.showLayer(_fa,_f8.layer);
}else{
if(_f8.visibility==="hide"){
rabbit.facade.hideLayer(_fa,_f8.layer);
}
}
}
}},vibrate:{callback:function(_fb,_fc,_fd){
navigator.vibrate=navigator.vibrate||navigator.mozVibrate||navigator.webkitVibrate||undefined;
if(navigator.vibrate){
navigator.vibrate(_fd.duration);
}else{
if(window.parentBody){
window.parentBody.trigger("pidoco:vibrate",[{duration:_fd.duration}]);
}else{
}
}
}},browserBack:{callback:function(_fe,_ff,_100){
rabbit.facade.browserBack();
}},browserForward:{callback:function(_101,_102,_103){
rabbit.facade.browserForward();
}},closeBrowserWindow:{callback:function(_104,_105,_106){
rabbit.facade.closeBrowserWindow();
}}},registerInteraction:function(_107,_108,_109,_10a){
if(_107[0]==="-"){
return;
}
if(!_.isArray(_10a)){
_10a=[_10a];
}
var _10b=new rabbit.data.Interaction(_107,_108,_109,_10a);
_10b.initializeAction();
_10b.initializeReactions();
rabbit.facade.raiseEvent(rabbit.events.newInteractionRegistered,_10b);
},serializeEvent:function(e){
return {};
}};
rabbit.mobile={bind:function(_10c,_10d){
if(rabbit.facade.runningInApp()){
document.addEventListener(_10c,_10d);
}
},unbind:function(_10e,_10f){
if(rabbit.facade.runningInApp()){
document.removeEventListener(_10e,_10f);
}
},trigger:function(_110,data){
if(rabbit.facade.runningInApp()){
window.parentBody.trigger(_110,data);
}
}};
rabbit.facade=function _returnFacade(){
var _111=rabbit.event.manager;
return {_availablePlugins:[],vml:false,isIOS:navigator.userAgent.match(/iPad|iPhone/),isAndroid:navigator.userAgent.match(/Android/),registerPlugin:function registerPlugin(_112,_113){
try{
var _114=Array.prototype.slice.call(arguments);
_114.shift();
_112._initialArguments=_114;
this._availablePlugins.push(_112);
}
catch(e){
console.log(e);
}
},registerOnEvent:function registerOnEvent(_115,_116,_117){
try{
if(_.isArray(_115)){
for(var i=0;i<_115.length;i++){
console.debug("Registering a handler for "+_115[i]);
_111.registerOnEvent(_115[i],_116,_117,true);
}
}else{
if(_.isString(_115)){
console.debug("Registering a handler for "+arguments[0]);
_111.registerOnEvent(_115,_116,_117,false);
}
}
}
catch(e){
console.error(e);
return undefined;
}
},registerOnCategoryEvent:function(_118,_119,_11a){
try{
_111.registerOnCategoryEvent(_118,_119,_11a,true);
}
catch(e){
console.error(e);
return undefined;
}
},raiseEvent:function raiseEvent(_11b){
console.debug("Raising a "+arguments[0]+" event");
try{
return _111.raiseEvent.apply(_111,arguments);
}
catch(e){
console.error(e);
return undefined;
}
},fireMouseOn:function fireMouseOn(_11c){
var _11d=document.getElementById(_11c);
if(_11d===null){
return;
}
console.debug("Forwarding a click event to "+_11c);
_11d.click();
_11d.focus();
},showPage:function(){
return rabbit.result.manager.showPage.apply(rabbit.result.manager,arguments);
},getBaseUrl:function getBaseUrl(){
return rabbit.result.manager.baseUrl;
},getPageUrl:function getPageUrl(){
return this.getBaseUrl()+"/"+rabbit.result.manager.currentPageNr;
},getRole:function getRole(){
return rabbit.result.manager.currentRole;
},getUrlPattern:function(){
return rabbit.result.manager.urlPattern;
},getCurrentPageId:function(){
return rabbit.result.manager.currentPageNr;
},getCurrentPage:function(){
return rabbit.data.pageStore.objects[rabbit.result.manager.currentPageNr];
},loadLayer:function(){
return rabbit.data.layerStore.loadLayer.apply(rabbit.data.layerStore,arguments);
},getLayer:function(){
return rabbit.ui.manager.getLayer.apply(rabbit.ui.manager,arguments);
},showLayer:function(){
return rabbit.ui.manager.showLayer.apply(rabbit.ui.manager,arguments);
},hideLayer:function(){
return rabbit.ui.manager.hideLayer.apply(rabbit.ui.manager,arguments);
},toggleLayer:function(){
return rabbit.ui.manager.toggleLayer.apply(rabbit.ui.manager,arguments);
},getMode:function(){
return document.getElementById("mode").firstChild.nodeValue;
},getInteractionsAvailableForToolbar:function(){
return rabbit.interaction.manager.interactionsAvailableForToolbar;
},raiseInteraction:function(){
return rabbit.interaction.manager.raiseInteraction.apply(rabbit.interaction.manager,arguments);
},renderAction:function(_11e){
return rabbit.interaction.manager.renderAction.apply(rabbit.interaction.manager,arguments);
},registerAction:function(){
return rabbit.interaction.manager.registerAction.apply(rabbit.interaction.manager,arguments);
},registerReaction:function(){
return rabbit.interaction.manager.registerReaction.apply(rabbit.interaction.manager,arguments);
},goBack:function(){
return rabbit.result.manager.goBack.apply(rabbit.result.manager,arguments);
},setNextPageIsARefresh:function(){
return rabbit.result.manager.setNextPageIsARefresh.apply(rabbit.result.manager,arguments);
},runningInApp:function(){
return rabbit.result.manager.fromApp;
},browserBack:function(){
history.go(-1);
},browserForward:function(){
history.go(1);
},closeBrowserWindow:function(){
window.close();
},getLayerFromStencil:function(_11f){
return $(_11f).closest(".layer");
},getRepositoryFromStencil:function(_120){
return $(_120).closest(".repository");
},isExport:function(){
return rabbit.result.manager.isExport;
},mobile:{bind:function(_121){
return rabbit.mobile.bind.apply(rabbit.mobile,arguments);
},unbind:function(_122){
return rabbit.mobile.unbind.apply(rabbit.mobile,arguments);
},trigger:function(_123){
return rabbit.mobile.trigger.apply(rabbit.mobile,arguments);
}},markHighlightTouchesAsSuccessful:function(){
return rabbit.plugins.gestureHighlight.markHighlightTouchesAsSuccessful.apply(rabbit.plugins.gestureHighlight,arguments);
},"alert":function(_124,text,_125){
rabbit.plugins.systemAlert.alert(_124,text,_125);
}};
}();
rabbit.data.Base=rabbit.util.Class(function(){
this.init=function(){
this.data={};
};
this.getData=function(){
return this.data;
};
this.setData=function(data){
this.data=data;
return this;
};
});
rabbit.data.layerStore={objects:{},init:function(){
},loadLayer:function(_126){
if(typeof this.objects[_126]==="undefined"){
var url=null;
if(rabbit.result.manager.isExport){
var _127=(rabbit.browser==="ie")?"-ie":"";
url=rabbit.communication.manager.getUrl("loadLayerExport",{layerId:_126,browser:_127,mode:rabbit.util.getMode()});
}else{
url=rabbit.communication.manager.getUrl("loadLayer",{prototypeId:rabbit.result.manager.currentPrototypeId,layer:_126});
}
var _128=(rabbit.result.manager.isExport)?"jsonp":"html";
var ajax=rabbit.communication.manager.get(url,_128,{containerId:"__containerId__",mode:rabbit.util.getMode()},{crossDomain:rabbit.result.manager.isExport});
if(!rabbit.result.manager.isExport){
ajax.done(this.addLayerFromHtml.bind(this));
}
this.objects[_126]=new rabbit.data.Layer(_126,null,null);
}
return this.objects[_126];
},addLayerFromHtml:function(html){
layerElements=$($.trim(html));
$(layerElements).children().each(function(_129,_12a){
_12a=$(_12a);
var _12b=_12a.data("layer-id");
var _12c=_12a.data("layer-type");
var html=$.trim(_12a[0].outerHTML);
if(this.objects[_12b]){
this.objects[_12b].data.id=_12b;
this.objects[_12b].data.layerType=_12c;
this.objects[_12b].data.html=html;
}else{
this.objects[_12b]=new rabbit.data.Layer(_12b,_12c,html);
}
rabbit.facade.raiseEvent(rabbit.events.layerLoaded,this.objects[_12b]);
}.bind(this));
}};
rabbit.data.Layer=rabbit.util.Class(rabbit.data.Base,function(sup){
this.init=function(id,_12d,html){
this.data={id:id,layerType:_12d,html:html};
};
});
rabbit.data.pageStore={objects:{},init:function(){
var _12e=$("#pageNames").html();
if((_12e!==null)&&(_12e!=="__pageNames__")){
_12e=JSON.parse(_12e);
}
var _12f=rabbit.data.raw.pages;
for(var id in _12f){
this.objects[id]=new rabbit.data.Page(_.extend(_12f[id],{id:id}));
this.objects[id].data.pageName=_12e[id];
}
rabbit.event.manager.raiseEvent(rabbit.events.pageStoreLoaded);
}};
rabbit.data.Page=rabbit.util.Class(rabbit.data.Base,function(sup){
this.init=function(data){
sup.init.apply(this);
this.data=data||{};
};
this.getUrl=function(){
if(rabbit.result.manager.isExport){
return this.data.pageName;
}else{
return rabbit.communication.manager.getUrl("pageLink",{page:this.data.id});
}
};
});
rabbit.data.folderStore={objects:{},init:function(){
var _130=rabbit.data.raw.folders;
for(var id in _130){
this.objects[id]=new rabbit.data.Folder(_.extend(_130[id],{id:id}));
}
rabbit.event.manager.raiseEvent(rabbit.events.folderStoreLoaded);
}};
rabbit.data.Folder=rabbit.util.Class(rabbit.data.Base,function(sup){
this.init=function(data){
sup.init.apply(this);
this.data=data||{};
};
});
rabbit.data.Interaction=rabbit.util.Class(rabbit.data.Base,function(sup){
this.init=function(_131,_132,_133,_134){
this.data={stencilId:_131,interactionId:_132,uniqueId:_131+"-"+_132,action:_133,reactions:_134};
};
this.initializeAction=function(){
if(!_.has(rabbit.interaction.manager.actions,this.data.action.type)){
console.error("Action \""+this.data.action.type+"\" is not supported");
return;
}
var init=rabbit.interaction.manager.actions[this.data.action.type].init;
if(typeof init==="function"){
init(this);
}
rabbit.interaction.manager.actions[this.data.action.type].defineEvent(this);
};
this.initializeReactions=function(){
_.each(this.data.reactions,function(_135){
if(!_.has(rabbit.interaction.manager.reactions,_135.type)){
console.error("Reaction \""+_135.type+"\" is not supported");
return;
}
var init=rabbit.interaction.manager.reactions[_135.type].init;
if(typeof init==="function"){
init(this,_135);
}
}.bind(this));
rabbit.facade.registerOnEvent(this.data.uniqueId,function(e){
_.each(this.data.reactions,function(_136){
var _137=parseInt(_136.delay,10)||0;
setTimeout(function(){
rabbit.interaction.manager.reactions[_136.type].callback(e,this,_136);
}.bind(this),_137);
}.bind(this));
},this,this.data.stencilId);
};
});
rabbit.data.discussionStore={writeAccess:false,name:"discussion",objects:{},init:function(){
},createDiscussion:function(_138,_139,x,y,data){
var url=rabbit.communication.manager.getUrl("createDiscussion",{layerId:_138});
data=data||{};
data=_.defaults(data,{title:_139,x:x,y:y,pageX:x,pageY:y,referenceId:rabbit.facade.getCurrentPageId(),pageId:rabbit.facade.getCurrentPageId(),layerContainerId:rabbit.facade.getCurrentPageId()});
return rabbit.data.discussionStore.callAjax(url,data);
},deleteDiscussion:function(_13a){
delete this.objects[_13a.data.id];
var url=rabbit.communication.manager.getUrl("deleteDiscussion",{layerId:_13a.data.layerId});
return this.callAjax(url,{discussion:_13a.data.id});
},flush:function(){
this.objects={};
rabbit.event.manager.raiseEvent(rabbit.events.discussionStoreChanged);
},getFromLayer:function(_13b){
var url=rabbit.communication.manager.getUrl("getDiscussions",{layerId:_13b});
return rabbit.data.discussionStore.callAjax(url);
},callAjax:function(url,data){
var ajax=rabbit.communication.manager.post(url,"json",data);
ajax.done(function(data){
for(var id in data.discussions){
var _13c=this.objects[id];
if(_13c){
_13c.setData(data.discussions[id]);
}else{
_13c=new rabbit.data.Discussion();
_13c.setData(data.discussions[id]);
this.objects[id]=_13c;
}
}
this.writeAccess=data.writeAccess;
if(data.newdiscussion){
rabbit.event.manager.raiseEvent(rabbit.events.discussionStoreAdded,this.objects[data.newdiscussion]);
}
rabbit.event.manager.raiseEvent(rabbit.events.discussionStoreChanged);
}.bind(this));
return ajax;
}};
rabbit.data.Discussion=rabbit.util.Class(rabbit.data.Base,function(sup){
this.init=function(){
sup.init.apply(this);
this.data.title="";
this.data.entries=[];
this.data.status="";
};
this.move=function(x,y,_13d,_13e,_13f,_140,_141,_142){
this.data.x=x;
this.data.y=y;
this.data.pageX=_13d;
this.data.pageY=_13e;
this.data.referenceId=_13f;
this.data.pageId=_140;
this.data.layerId=_141;
this.data.layerContainerId=_142;
var url=rabbit.communication.manager.getUrl("moveDiscussion",{layerId:this.data.layerId});
return rabbit.data.discussionStore.callAjax(url,{discussion:this.data.id,x:x,y:y,pageX:_13d,pageY:_13e,referenceId:_13f,pageId:_140,layerId:_141,layerContainerId:_142});
};
this.rename=function(_143){
if(this.data.title===_143){
return;
}
var _144=this.data.title;
this.data.title=_143;
var url=rabbit.communication.manager.getUrl("renameDiscussion",{layerId:this.data.layerId});
var ajax=rabbit.data.discussionStore.callAjax(url,{discussion:this.data.id,title:this.data.title});
var _145=t("result.discussion.title-changed").replace("__oldTitle__",_144).replace("__newTitle__",_143);
this.addEntry(_145);
return ajax;
};
this.addEntry=function(text){
var url=rabbit.communication.manager.getUrl("postEntryDiscussion",{layerId:this.data.layerId});
return rabbit.data.discussionStore.callAjax(url,{discussion:this.data.id,text:text});
};
this.setState=function(_146){
var url=rabbit.communication.manager.getUrl("setStateDiscussion",{layerId:this.data.layerId});
return rabbit.data.discussionStore.callAjax(url,{discussion:this.data.id,state:_146});
};
});
if(typeof console.debug==="undefined"){
console.warn=console.log;
console.debug=console.log;
}else{
if(rabbit.logLevel==="error"){
console.warn=function(){
};
console.log=function(){
};
console.debug=function(){
};
}else{
if(rabbit.logLevel==="warn"){
console.log=function(){
};
console.debug=function(){
};
}else{
if(rabbit.logLevel==="log"){
console.debug=function(){
};
}
}
}
}
rabbit.plugins.background=function(){
var _147=rabbit.facade;
return {init:function init(){
},adjustBackgroundImage:function adjustBackgroundImage(_148){
var _149=document.getElementById("borderDiv");
_149.style.width=_148.data.width+"px";
_149.style.height=_148.data.height+"px";
var _14a=document.getElementById("repositorybackground");
_14a.setAttribute("width",_148.data.width);
_14a.setAttribute("height",_148.data.height);
_14a.setAttribute("style","width:"+_148.data.width+"px;height:"+_148.data.height+"px;");
this._replaceBackgroundImage(_148);
},_replaceBackgroundImage:function _replaceBackgroundImage(_14b){
var _14c,_14d;
if(!_147.vml){
_14c=document.getElementById("repositorybackground");
_14d=_14c.getElementsByTagNameNS("http://www.w3.org/2000/svg","image")[0];
_14d.setAttribute("width",_14b.data.width);
_14d.setAttribute("height",_14b.data.height);
if(_14b.data.image!==""){
_14d.setAttribute("display","inherit");
_14d.setAttributeNS("http://www.w3.org/1999/xlink","href",_14b.data.image);
}else{
_14d.setAttribute("display","none");
_14d.removeAttributeNS("http://www.w3.org/1999/xlink","href");
}
}else{
_14c=document.getElementById("repositorybackground");
_14d=document.createElement("img");
_14d.style.width="";
_14d.style.height="";
_14d.setAttribute("src",_14b.data.image.replace(/_(\d)+\Z/,""));
_14c.replaceChild(_14d,_14c.firstChild);
if(_14b.data.image===""){
_14d.style.display="none";
}else{
_14d.style.display="inline";
this._adjustBackgroundImgSize(_14b.data.width,_14b.data.height);
}
}
},_adjustBackgroundImgSize:function _adjustBackgroundImgSize(_14e,_14f){
if(!document.images[0].complete){
window.setTimeout("rabbit.plugins.background._adjustBackgroundImgSize("+_14e+", "+_14f+");",100);
return;
}
var _150=document.images[0].width;
var _151=document.images[0].height;
if(_150/_151>_14e/_14f){
document.images[0].width=_14e;
document.images[0].height=_151*_14e/_150;
}else{
document.images[0].width=_150*_14f/_151;
document.images[0].height=_14f;
}
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.background);
rabbit.plugins.gps=function(){
var _152=rabbit.facade;
var _153={};
var _154=[];
var _155={nyc:{latitude:40.714353,longitude:-74.005973},paris:{latitude:48.856614,longitude:2.352222},pidoco:{latitude:52.509561,longitude:13.451579},warschauer60:{latitude:52.509754,longitude:13.451715},alexanderplatz:{latitude:52.521832,longitude:13.413168}};
return {trackPositionWithJavaScript:true,trackPosition:false,init:function init(){
this.startTrackPositon();
_152.registerOnEvent("positionChanged",this.positionChanged,this);
_152.registerAction("gps",{availableOnDesktop:false,init:function(){
rabbit.plugins.gps.trackPosition=true;
},render:function(_156){
if(_156.trigger==="both"){
return t("interaction.action.gps.userDescription.both");
}else{
if(_156.trigger==="enter"){
return t("interaction.action.gps.userDescription.enter");
}else{
if(_156.trigger==="leave"){
return t("interaction.action.gps.userDescription.leave");
}
}
}
},defineEvent:function(_157){
var area=JSON.parse(_157.data.action.area);
rabbit.plugins.gps.registerMoveInOutZone(area.latitude,area.longitude,area.distance,_157.data.action.trigger,function(e){
rabbit.interaction.manager.raiseInteraction(_157,e);
});
}});
},startTrackPositon:function(){
var _158=null;
var _159=5000;
if(navigator.geolocation){
var _15a=function(){
if(rabbit.plugins.gps.trackPosition){
if(rabbit.plugins.gps.trackPositionWithJavaScript){
navigator.geolocation.getCurrentPosition(function(_15b){
rabbit.plugins.gps.positionChanged(_15b.coords);
_158=setInterval(_15a,_159);
},function(){
console.log("ERROR GPS!");
},{maximumAge:_159,enableHighAccuracy:true,timeout:10000});
}
clearInterval(_158);
}
};
_158=setInterval(_15a,_159);
}
},moveToDummyPosition:function(name){
if(!_.has(_155,name)){
throw "Dummy position "+name+" not found.";
}
this.positionChanged({latitude:_155[name].latitude,longitude:_155[name].longitude});
},registerMoveInOutZone:function(_15c,_15d,_15e,_15f,_160){
_154.push({latitude:_15c,longitude:_15d,distance:_15e,callback:_160,trigger:_15f,wasInArea:false});
},positionChanged:function(_161){
for(var i=0;i<_154.length;i++){
var area=_154[i];
var _162=this.isPositionInArea(_161,area);
if(_162&&!area.wasInArea&&area.trigger==="enter"||!_162&&area.wasInArea&&area.trigger==="leave"||_162!==area.wasInArea&&area.trigger==="both"){
area.callback();
}
area.wasInArea=_162;
}
},isPositionInArea:function(_163,area){
return this.calculateDistance(_163.latitude,_163.longitude,area.latitude,area.longitude)<area.distance;
},calculateDistance:function(lat1,lon1,lat2,lon2){
var _164=function(deg){
return deg*(Math.PI/180);
};
var R=6371;
var dLat=_164(lat2-lat1);
var dLon=_164(lon2-lon1);
var a=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(_164(lat1))*Math.cos(_164(lat2))*Math.sin(dLon/2)*Math.sin(dLon/2);
var c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
var d=R*c;
return d*1000;
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.gps);
rabbit.plugins.keypress=function(){
var _165=rabbit.facade;
return {init:function(){
_165.registerAction("keypress",{makeableOnDesktop:true,render:function(_166){
return t("interaction.action.keypress.userDescription");
},defineEvent:function(_167){
var _168=_167.data.action.sequence;
if(_168){
Mousetrap.bind(_168,function(){
rabbit.interaction.manager.raiseInteraction(_167,{});
});
}
}});
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.keypress);
rabbit.plugins.sound=function(){
var _169=rabbit.facade;
return {audiofiles:{},audios:{},init:function(){
_169.registerReaction("sound",{init:function(_16a,_16b){
var id=_16b.soundUploader;
if(rabbit.result&&rabbit.result.manager.isExport){
url=rabbit.communication.manager.getUrl("mp3Export",{audioId:id});
}else{
url=rabbit.communication.manager.getUrl("mp3",{prototypeId:rabbit.result.manager.currentPrototypeId,audioId:id});
}
rabbit.plugins.sound.audiofiles[id]=new Audio(url);
},callback:function(_16c,_16d,_16e){
rabbit.plugins.sound.audiofiles[_16e.soundUploader].play();
if(_16e.duration!==""){
setTimeout(function(){
rabbit.plugins.sound.audiofiles[_16e.soundUploader].pause();
rabbit.plugins.sound.audiofiles[_16e.soundUploader].currentTime=0;
},_16e.duration);
}
}});
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.sound);
rabbit.plugins.systemAlert=function(){
var _16f=rabbit.facade;
return {init:function(){
_16f.registerReaction("systemAlert",{callback:function(_170,_171,_172){
this.alert(_172.title,_172.text,_172.buttonName);
}.bind(this)});
},alert:function(_173,text,_174){
if(_16f.runningInApp()){
rabbit.facade.mobile.trigger("pidoco:systemAlert",{title:_173,text:text,buttonName:_174});
}else{
alert(text);
}
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.systemAlert);
rabbit.plugins.flip=function(){
var _175=rabbit.facade;
return {init:function(){
_175.registerAction("flip",{makeableOnDesktop:false,render:function(_176){
return t("interaction.action.flip.userDescription");
},defineEvent:function(_177){
new Fliptiltshake("flip",function(){
rabbit.interaction.manager.raiseInteraction(_177,{});
});
Fliptiltshake.start();
}});
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.flip);
rabbit.plugins.tilt=function(){
var _178=rabbit.facade;
return {paused:false,init:function(){
_178.registerAction("tilt",{makeableOnDesktop:false,render:function(_179){
return t("interaction.action.tilt.userDescription");
},defineEvent:function(_17a){
new Fliptiltshake("tilt",{rotation:_17a.data.action.rotation,direction:(_17a.data.action.direction==="both")?null:_17a.data.action.direction,angle:_17a.data.action.angle,callback:function(){
if(rabbit.plugins.tilt.paused){
return;
}
var _17b=rabbit.interaction.manager.raiseInteraction(_17a,{});
if(_17b){
rabbit.plugins.tilt.paused=true;
setTimeout(function(){
rabbit.plugins.tilt.paused=false;
},500);
}
}});
Fliptiltshake.start();
}});
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.tilt);
rabbit.plugins.shake=function(){
var _17c=rabbit.facade;
return {init:function(){
_17c.registerAction("shake",{makeableOnDesktop:false,render:function(_17d){
return t("interaction.action.shake.userDescription");
},defineEvent:function(_17e){
var _17f=(_17c.isIOS)?_17e.data.action.intensity:_17e.data.action.intensity*10;
new Fliptiltshake("shake",{threshold:_17f,durationMin:_17e.data.action.duration,callback:function(){
rabbit.interaction.manager.raiseInteraction(_17e,{});
}});
Fliptiltshake.start();
}});
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.shake);
rabbit.plugins.orientation=function(){
var _180=rabbit.facade;
var _181=null;
return {trackPositionWithJavaScript:true,trackPosition:false,init:function(){
rabbit.facade.mobile.bind("pidoco:orientationchange",function(e){
rabbit.plugins.orientation.orientationChanged(e.data.orientation);
});
window.addEventListener("orientationchange",function(){
rabbit.plugins.orientation.orientationChanged(window.orientation);
});
_180.registerAction("orientation",{makeableOnDesktop:false,render:function(_182){
var _183=_182.data.action;
if(_183.direction==="portrait"){
return t("interaction.action.orientation.userDescription.portrait");
}else{
return t("interaction.action.orientation.userDescription.landscape");
}
},defineEvent:function(_184){
_180.registerOnEvent("orientationChanged",function(_185){
if(_184.data.action.direction==_185){
rabbit.interaction.manager.raiseInteraction(_184,{});
}
},this);
}});
},orientationChanged:function(_186){
var _187=(_186===90||_186===-90)?"landscape":"portrait";
if(_181!=_187){
_181=_187;
_180.raiseEvent("orientationChanged",_187);
}
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.orientation);
rabbit.plugins.mobileInteractionTrigger={groupTopOffset:30,template:"<div class=\"trigger-container\">"+"</div>",interactions:{},triggerGroups:{},init:function(){
if(rabbit.facade.runningInApp()){
return;
}
this.container=$(this.template).appendTo("#borderDiv");
rabbit.facade.registerOnEvent(rabbit.events.newInteractionRegistered,this.newInteractionRegistered,this);
rabbit.facade.registerOnEvent(rabbit.events.showLayer,this.showLayerListener,this);
rabbit.facade.registerOnEvent(rabbit.events.hideLayer,this.hideLayerListener,this);
},newInteractionRegistered:function(_188){
var _189=_188.data.action;
var _18a=typeof rabbit.interaction.manager.actions[_189.type].makeableOnDesktop==="function"?rabbit.interaction.manager.actions[_189.type].makeableOnDesktop(_189):rabbit.interaction.manager.actions[_189.type].makeableOnDesktop;
if(_18a){
return;
}
if(this.interactions[_188.data.uniqueId]){
return;
}
var _18b=_188.data.stencilId;
var _18c=document.getElementById(_18b);
if($(_18c).parents(".transition-wrapper:first").length){
return;
}
var _18d=$(_18c).closest(".mobile-interaction-potential-trigger");
var _18e=_18d.attr("id");
var _18f=$(_18d).position();
var _190=true;
if($(_18c).hasClass("layer")){
_190=false;
}
var _191=this.triggerGroups[_18e];
if(!_191){
_191=$("<div class=\"mobile-interactions-trigger-group-"+_18e+" mobile-interactions-trigger-group\" data-trigger-id=\""+_18e+"\"></div>");
this.triggerGroups[_18e]=_191;
$(_18d).mouseenter(function(e){
this.displayInteractions(_191);
return false;
}.bind(this)).mouseleave(function(e){
this.hideAllInteractions();
if(_190){
var id=$(_18c).closest(".repository").attr("id");
this.displayInteractions($(".mobile-interactions-trigger-group-"+id));
}
return false;
}.bind(this));
_191.css({left:_18f.left,top:_18f.top-this.groupTopOffset});
this.container.append(_191);
$(_191).mouseenter(function(e){
this.displayInteractions(_191);
return false;
}.bind(this)).mouseleave(function(e){
this.hideAllInteractions();
if(_190){
var id=$(_18c).closest(".repository").attr("id");
this.displayInteractions($(".mobile-interactions-trigger-group-"+id));
}
return false;
}.bind(this));
}
var _192=$("<div class=\"active interaction-trigger interaction-trigger-"+_188.data.uniqueId+" interaction-trigger-"+_189.type+"\" title=\""+t("interaction-trigger-"+_188.data.action.type+"-tooltip")+"\">"+t("trigger-label-"+_189.type)+"</div>");
if(!_190){
_192.addClass("interaction-trigger-layer-"+_18b.replace("-layer",""));
}
_192.click(function(){
rabbit.facade.raiseInteraction(_188);
this.hideAllInteractions();
}.bind(this));
_191.append(_192);
this.interactions[_188.data.uniqueId]=_188;
},hideAllInteractions:function(){
$(".mobile-interactions-trigger-group").removeClass("visible");
},displayInteractions:function(_193){
$(".mobile-interactions-trigger-group").removeClass("visible");
this.updateTriggerGroupPosition(_193);
$(_193).addClass("visible");
},showLayerListener:function(data){
if(data.repositoryId==="repository"){
$(".interaction-trigger-layer-"+data.repositoryId+data.layerId).addClass("active");
$(".mobile-interactions-trigger-group").each(function(_194,_195){
this.updateTriggerGroupPosition($(_195));
}.bind(this));
}
},hideLayerListener:function(data){
if(data.repositoryId==="repository"){
$(".interaction-trigger-layer-"+data.repositoryId+data.layerId).removeClass("active");
}
},updateTriggerGroupPosition:function(_196){
var _197=$("#"+_196.data("trigger-id"));
if(_197.length){
var _198=_197.position();
$(_196).css({left:_198.left,top:_198.top-this.groupTopOffset});
}
},updateAllTriggerGroupPosition:function(){
for(var _199 in this.triggerGroups){
this.updateTriggerGroupPosition(this.triggerGroups[_199]);
}
}};
rabbit.facade.registerPlugin(rabbit.plugins.mobileInteractionTrigger);
rabbit.plugins.toolbar={template:"<div class=\"toolbar\">"+"<div class=\"left\">"+"<a class=\"edit-btn btn\" href=\"#\"><span class=\"icon\" /><%= t('toolbar.edit') %></a>"+"<a class=\"sketched-btn btn\" href=\"#\"><%= t('toolbar.sketched') %></a> "+"<a class=\"sketched-arial-btn btn\" href=\"#\"><%= t('toolbar.sketchedArial') %></a> "+"<a class=\"plain-btn btn\" href=\"#\"><%= t('toolbar.plain') %></a>"+"</div>"+"<div class=\"center\">"+"</div>"+"</div>",init:function(){
if(rabbit.facade.runningInApp()){
return;
}
this.toolbar=$($.trim(_.template(this.template)())).appendTo(".toolbar-wrapper>.container");
rabbit.facade.registerOnEvent(rabbit.events.pageStoreLoaded,this.pageStoreLoaded,this);
rabbit.facade.registerOnEvent(rabbit.events.pageLoaded,this.pageLoaded,this);
if(rabbit.facade.getRole()!="EDITOR"){
this.toolbar.find(".edit-btn").hide();
}
},pageStoreLoaded:function(){
this.mode=document.getElementById("mode").innerHTML;
this.changeLinks(rabbit.result.manager.currentPageNr);
},pageLoaded:function(page,_19a){
this.changeLinks(page.data.id);
},changeLinks:function(_19b){
var _19c=rabbit.communication.manager.buildEditUrl(rabbit.result.manager.currentPageNr);
var _19d=rabbit.facade.getUrlPattern().replace("__page__",_19b);
var _19e=_19d.replace(this.mode,"sketched").replace("?fontFamily=arial","");
var _19f=_19d.replace(this.mode,"sketchedArial");
var _1a0=_19d.replace(this.mode,"plain").replace("?fontFamily=arial","");
this.toolbar.find(".edit-btn").attr("href",_19c);
this.toolbar.find(".sketched-btn").attr("href",_19e);
this.toolbar.find(".sketched-arial-btn").attr("href",_19f);
this.toolbar.find(".plain-btn").attr("href",_1a0);
}};
rabbit.facade.registerPlugin(rabbit.plugins.toolbar);
rabbit.plugins.overlay={shownOverlays:[],rectangles:{},init:function(){
$("#borderDiv").append("<div class=\"overlay-background\"></div>");
rabbit.facade.registerReaction("showOverlay",{init:function(_1a1,_1a2){
this.prepareOverlay(_1a1.data.uniqueId,_1a2.target);
}.bind(this),callback:function(_1a3,_1a4,_1a5){
this.showOverlay(_1a4.data.uniqueId,_1a5.target);
}.bind(this)});
rabbit.facade.registerReaction("hideOverlay",{callback:function(_1a6,_1a7,_1a8){
this.hideOverlay();
}.bind(this)});
},prepareOverlay:function(_1a9,_1aa){
var _1ab=$("<div></div>");
var id="overlay-"+_1a9;
var page=rabbit.data.pageStore.objects[_1aa];
var url,ajax;
if(page){
_1ab.addClass("overlay").addClass("repository").attr("id",id).attr("data-original-layer-id",_1aa).attr("data-page-id",_1aa).appendTo("body").css({width:page.data.width+"px",height:page.data.height+"px"}).data("has-rectangle",false);
this.loadRectangle(page.data.width,page.data.height);
rabbit.ui.manager.createWrappers(id,_1aa,true);
rabbit.facade.loadLayer(_1aa);
}
},loadRectangle:function(_1ac,_1ad){
if(this.hasRectangle(_1ac,_1ad)){
return;
}
if(rabbit.result.manager.isExport){
var _1ae=(rabbit.browser==="ie")?"-ie":"";
url=rabbit.communication.manager.getUrl("rectangleExport",{height:_1ad,width:_1ac,mode:rabbit.util.getMode()});
ajax=rabbit.communication.manager.get(url,"jsonp",{},{crossDomain:rabbit.result.manager.isExport});
}else{
url=rabbit.communication.manager.getUrl("rectangle",{prototypeId:rabbit.result.manager.currentPrototypeId,mode:rabbit.facade.getMode()});
ajax=rabbit.communication.manager.get(url,"html",{height:_1ad,width:_1ac});
ajax.success(function(html){
var _1af=$(html).children().first();
this.setRectangle(_1ac,_1ad,_1af);
}.bind(this));
}
},setRectangle:function(_1b0,_1b1,html){
this.rectangles[_1b0+"x"+_1b1]=html;
},getRectangle:function(_1b2,_1b3){
return $(this.rectangles[_1b2+"x"+_1b3]).clone();
},hasRectangle:function(_1b4,_1b5){
return typeof this.rectangles[_1b4+"x"+_1b5]!=="undefined";
},showOverlayBackground:function(){
$(".overlay-background").show();
},hideOverlayBackground:function(){
$(".overlay-background").hide();
},showOverlay:function(_1b6,_1b7){
var id="overlay-"+_1b6;
var page=rabbit.data.pageStore.objects[_1b7];
var _1b8=rabbit.facade.getCurrentPage();
var _1b9=$("#"+id);
if(page){
var _1ba=page.data.width;
var _1bb=page.data.height;
if(!_1b9.data("has-rectangle")){
_1b9.append(this.getRectangle(_1ba,_1bb));
_1b9.data("has-rectangle",true);
}
var _1bc=$("#repository").offset();
var _1bd=$(document).height()>$(window).height();
var top,left;
if(_1bd){
top=(window.innerHeight-parseInt(_1bb))/2;
left=(rabbit.facade.getMode()==="plain")?(_1b8.data.width-parseInt(_1ba))/2:(window.innerWidth-parseInt(_1ba))/2;
}else{
top=_1bc.top+(_1b8.data.height-parseInt(_1bb))/2;
left=_1bc.left+(_1b8.data.width-parseInt(_1ba))/2;
}
_1b9.show().css({top:top,left:left});
rabbit.ui.manager.showPage($("#"+id),_1b7);
this.showOverlayBackground();
this.shownOverlays.push(_1b9);
}else{
}
},hideOverlay:function(){
var _1be=this.shownOverlays.pop();
_1be.hide();
this.hideOverlayBackground();
}};
rabbit.facade.registerPlugin(rabbit.plugins.overlay);
rabbit.plugins.scrollTo=function(){
var _1bf=rabbit.facade;
return {init:function(){
_1bf.registerReaction("scrollTo",{callback:function(_1c0,_1c1,_1c2){
this.scrollTo(_1c2.position,_1c2.duration);
}.bind(this)});
},scrollTo:function(_1c3,_1c4){
if(_1c3==="bottom"){
$("html, body").animate({scrollTop:$(document).height()},parseInt(_1c4));
}else{
$("html, body").animate({scrollTop:0},parseInt(_1c4));
}
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.scrollTo);
rabbit.plugins.startDialer={shownOverlays:[],rectangles:{},init:function(){
rabbit.facade.registerReaction("startDialer",{callback:function(_1c5,_1c6,_1c7){
this.startDialer(_1c7.phoneNumber);
}.bind(this)});
},startDialer:function(_1c8){
window.location.href="tel:"+_1c8;
}};
rabbit.facade.registerPlugin(rabbit.plugins.startDialer);
rabbit.plugins.gestureHighlight=function(){
return {init:function(){
},touchListener:function(e){
this.emptyTouches();
for(var i=0;i<e.targetTouches.length;i++){
var _1c9=e.targetTouches[i];
var _1ca=this.makeCircle(_1c9.pageX-this.offset.left,_1c9.pageY-this.offset.top);
this.touchViewer[0].appendChild(_1ca);
}
e.preventDefault();
},touchEndListener:function(){
setTimeout(function(){
var _1cb=this.touchViewer.find("div");
_1cb.each(function(){
if(!$(this).hasClass("touch-success")){
$(this).addClass("touch-fail");
}
});
setTimeout(function(){
_1cb.fadeOut();
},500);
}.bind(this),300);
},touchSuccess:function(){
var _1cc=this.touchViewer.find("div");
_1cc.each(function(){
$(this).removeClass("touch-fail");
$(this).addClass("touch-success");
});
setTimeout(function(){
_1cc.fadeOut();
},500);
},makeCircle:function(cx,cy){
var el=document.createElement("div");
el.setAttribute("class","touch");
el.style.left=cx+"px";
el.style.top=cy+"px";
return el;
},emptyTouches:function(){
this.touchViewer[0].innerHTML="";
},markHighlightTouchesAsSuccessful:function(){
var _1cd=document.getElementsByClassName("touch");
for(var i=0;i<_1cd.length;i++){
_1cd[i].setAttribute("class",_1cd[i].getAttribute("class")+" touch-success");
}
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.gestureHighlight);
rabbit.plugins.hold={init:function(){
rabbit.facade.registerAction("hold",{makeableOnDesktop:true,render:function(_1ce){
return t("interaction.action.hold.userDescription");
},defineEvent:function(_1cf){
var _1d0=Hammer(document.getElementById(_1cf.data.stencilId),{hold_timeout:_1cf.data.action.timeout});
_1d0.on("hold",function(e){
rabbit.interaction.manager.raiseInteraction(_1cf,{});
});
}});
}};
rabbit.facade.registerPlugin(rabbit.plugins.hold);
rabbit.plugins.valueChanged={listenedGroups:{},init:function(){
rabbit.facade.registerAction("booleanValueChanged",{makeableOnDesktop:true,render:function(_1d1){
return t("interaction.action.booleanValueChanged.userDescription");
},defineEvent:function(_1d2){
var _1d3=_1d2.data.stencilId;
var _1d4=$("#"+_1d3);
if(_1d4.hasClass("radiobutton")){
var _1d5=_1d4.find("input:first").attr("name");
if(!_.has(rabbit.plugins.valueChanged.listenedGroups,_1d5)){
rabbit.plugins.valueChanged.listenedGroups[_1d5]=[];
$("input[name=\""+_1d5+"\"]").change(function(e){
var _1d6=$(e.target).val();
var _1d7=$(e.target).data("old-selected-radiobutton-id");
for(var i=0;i<rabbit.plugins.valueChanged.listenedGroups[_1d5].length;i++){
var _1d8=rabbit.plugins.valueChanged.listenedGroups[_1d5][i];
var _1d9=_1d8.data.stencilId;
var _1da=_1d8.data.action.selected;
if(_1d6===_1d9&&_1da==="yes"||_1d7===_1d9&&_1da==="no"||(_1d6===_1d9||_1d7===_1d9)&&_1da==="toggle"){
rabbit.interaction.manager.raiseInteraction(_1d8,rabbit.interaction.manager.serializeEvent(e));
}
}
$("input[name=\""+_1d5+"\"]").data("old-selected-radiobutton-id",_1d6);
});
}
rabbit.plugins.valueChanged.listenedGroups[_1d5].push(_1d2);
}else{
if(_1d4.hasClass("checkbox")){
$("#"+_1d2.data.stencilId+" input:first").change(function(e){
if($(e.target).is(":checked")===(_1d2.data.action.selected==="yes")||_1d2.data.action.selected==="toggle"){
rabbit.interaction.manager.raiseInteraction(_1d2,rabbit.interaction.manager.serializeEvent(e));
}
});
}else{
if(_1d4.hasClass("iphoneSwitch")){
var _1db=function(id){
if(_1d2.data.stencilId===id){
rabbit.interaction.manager.raiseInteraction(_1d2);
}
};
if(_1d2.data.action.selected==="yes"||_1d2.data.action.selected==="toggle"){
rabbit.facade.registerOnEvent(rabbit.events.switchOffSwitch,_1db,this);
}
if(_1d2.data.action.selected==="no"||_1d2.data.action.selected==="toggle"){
rabbit.facade.registerOnEvent(rabbit.events.switchOnSwitch,_1db,this);
}
}
}
}
}});
rabbit.facade.registerAction("stringValueChanged",{makeableOnDesktop:true,render:function(_1dc){
return t("interaction.action.stringValueChanged.userDescription");
},defineEvent:function(_1dd){
$("#"+_1dd.data.stencilId).change(function(e){
if(e.target.value===_1dd.data.action.value){
rabbit.interaction.manager.raiseInteraction(_1dd,rabbit.interaction.manager.serializeEvent(e));
}
});
}});
}};
rabbit.facade.registerPlugin(rabbit.plugins.valueChanged);
rabbit.plugins.footnote={name:"export",detailFootnotes:{},discussionFootnotes:{},counterDetailFootnotes:0,counterDiscussionFootnotes:0,placedMarkers:[],placedMarkersInPageCoordinateSystem:[],markerSize:20,init:function(){
rabbit.facade.registerOnEvent(rabbit.events.newInteractionRegistered,function(_1de){
var _1df=document.getElementById(_1de.getData().stencilId);
var _1e0=_1df.hasAttribute("data-stencil-id");
var _1e1=_1df.hasAttribute("data-layer-id");
var id=_1de.getData().stencilId;
if(!_1e0&&!_1e1&&!this.detailFootnotes[id]){
this.detailFootnotes[id]=_.size(this.detailFootnotes)+1;
}
},this);
rabbit.facade.registerOnEvent(rabbit.events.pageReady,function(){
$(".has-footnote").each(function(_1e2,_1e3){
var _1e4=_1e3.getAttribute("data-stencil-id");
if(!_1e4){
_1e4=_1e3.getAttribute("data-layer-id");
}
if(!this.detailFootnotes[_1e4]){
this.detailFootnotes[_1e4]=_.size(this.detailFootnotes)+1;
}
}.bind(this));
},this);
},showAllFootnotes:function(){
this.hideFootnotes();
this.showDiscussionFootnotes();
this.showDetailFootnotes();
},showFootnote:function(_1e5,x,y,type,_1e6,_1e7,_1e8,_1e9,text,_1ea){
var _1eb=_1e5.offset();
var _1ec=x;
var _1ed=y;
if(!_1e8){
_1ec-=_1eb.left;
_1ed-=_1eb.top;
}
var _1ee,_1ef;
if(!_1e7){
if(type=="detail"){
_1ee=(this.counterDetailFootnotes++)+1;
}else{
if(type=="discussion"){
_1ee=this.getDiscussionLetters(this.counterDiscussionFootnotes++);
}
}
_1ef=$("<div class=\"footnote-marker footnote-marker-"+type+"\">"+_1ee+"</div>").css({left:_1ec,top:_1ed});
_1e5.append(_1ef);
}
this.placedMarkers.push({stencilOrLayerId:_1e6,stencilUniqueId:_1e5.attr("id"),type:type,index:_1ee,x:x,y:y,outsideOfPage:_1e7,inStencilInteraction:_1e8,target:_1e9,text:text,footnoteId:_1ea,footnoteElement:_1ef});
},getShownFootnoteIndexes:function(type){
var _1f0={};
for(var i=0;i<this.placedMarkers.length;i++){
var _1f1=this.placedMarkers[i];
if(!type||_1f1.type==type){
_1f0[_1f1.index]={index:_1f1.index,stencilUniqueId:_1f1.stencilUniqueId,outsideOfPage:_1f1.outsideOfPage,inStencilInteraction:_1f1.inStencilInteraction,stencilOrLayerId:_1f1.stencilOrLayerId,target:_1f1.target,text:_1f1.text,footnoteId:_1f1.footnoteId};
}
}
return _1f0;
},hideFootnotes:function(){
this.counterDetailFootnotes=0;
this.counterDiscussionFootnotes=0;
this.placedMarkers=[];
$(".footnote-marker, .footnote-marker-line").remove();
},showDetailFootnotes:function(_1f2){
for(var _1f3 in this.detailFootnotes){
var _1f4=false;
var _1f5=$("[data-stencil-id=\""+_1f3+"\"], .wrapper[data-layer-id=\""+_1f3+"\"][data-layer-id=\""+_1f2+"\"]");
var _1f6=null,text=null;
if(!_1f5.length){
_1f5=$("#"+_1f3);
_1f4=true;
_1f6=_1f5.attr("data-href");
text=_.str.clean(_1f5.text());
text=_.str.truncate(text,20);
_1f3=null;
}
for(var i=0;i<_1f5.length;i++){
var _1f7=$(_1f5.get(i));
if(!_1f7.closest(".wrapper[data-layer-id=\""+_1f2+"\"]").length){
continue;
}
var _1f8=_1f7.offset();
var _1f9=_1f7.width();
if(_1f4){
_1f9=_1f7.width()/2;
}
var x=_1f8.left+_1f9;
var y=_1f8.top-20;
var _1fa=this.findPosition(x,y,"x",1);
this.placedMarkersInPageCoordinateSystem.push({x:_1fa.x,y:_1fa.y});
if(_1f4){
var _1fb=_1f7.position();
_1fa.x=_1fb.left+_1f9+(x-_1fa.x);
_1fa.y=_1fb.top-20+(y-_1fa.y);
}
this.showFootnote(_1f7,_1fa.x,_1fa.y,"detail",_1f3,_1fa.outsideOfPage,_1f4,_1f6,text);
}
}
this.sortFootenotes();
},sortFootenotes:function(){
this.placedMarkers=_.sortBy(this.placedMarkers,function(_1fc){
return ($(_1fc.footnoteElement).offset())?$(_1fc.footnoteElement).offset().left:100000;
});
for(var i=0;i<this.placedMarkers.length;i++){
var _1fd=this.placedMarkers[i].footnoteElement;
$(_1fd).text(i+1);
this.placedMarkers[i].index=i+1;
}
},getShownDetailFootnotes:function(){
return this.getShownFootnoteIndexes("detail");
},getDiscussionLetters:function(_1fe){
var v="abcdefghijklmnopqrstuvwxyz".split("");
var _1ff="";
var nr=Math.floor(_1fe/26);
var mod=_1fe%26;
for(var j=1,jj=1;j<=nr;j=Math.pow(26,jj)+1,jj++){
_1ff+=v[(nr-1)%26];
}
_1ff+=v[mod];
return _1ff;
},showDiscussionFootnotes:function(_200){
var _201="abcdefghijklmopqrestuvwxyz".split("");
var _202=$("#repository").offset();
var _203=this.discussionFootnotes[_200];
if(_.isArray(_203)){
for(var i=0;i<_203.length;i++){
var _204=_203[i];
var _205=_204.referenceId;
var _206=$(".wrapper-"+_200+">.layer [data-stencil-id=\""+_205+"\"]");
if(_206.length===0){
_206=$("[data-page-id=\"page0001\"]");
}
for(var j=0;j<_206.length;j++){
var _207=$(_206.get(j));
var _208=_207.offset();
var x=_208.left+_204.x;
var y=_208.top+_204.y;
var _209=this.findPosition(x,y,"x",1);
this.placedMarkersInPageCoordinateSystem.push({x:_209.x,y:_209.y});
this.showFootnote(_207,_209.x,_209.y,"discussion",_204.id,_209.outsideOfPage,null,null,null,_204.id);
}
}
}
},getShownDiscussionFootnotes:function(){
return this.getShownFootnoteIndexes("discussion");
},findPosition:function(x,y,_20a,deep){
deep=deep||1;
var xMin=0-2*this.markerSize;
var yMin=0-2*this.markerSize;
var xMax=$("#repository").width()+2*this.markerSize;
var yMax=$("#repository").height()+2*this.markerSize;
if(x<xMin||x>xMax||y<yMin||y>yMax){
return {outsideOfPage:true};
}else{
return this._findPosition(x,y,_20a,deep);
}
},_findPosition:function(x,y,_20b,deep){
var _20c={x:x,y:y,outsideOfPage:false};
var _20d=false;
var _20e=null;
var _20f=null;
var _210=null;
var _211=null;
var xMax=$("#repository").width()-this.markerSize;
var yMax=$("#repository").height()-this.markerSize;
if(x<0){
_20b="x";
_20d=true;
}else{
if(y<0){
_20b="y";
_20d=true;
}else{
if(x>xMax){
_20b="x";
_20d=true;
}else{
if(y>yMax){
_20b="y";
_20d=true;
}else{
for(var i=0;i<this.placedMarkers.length;i++){
var _212=true;
var _213=true;
var _214=this.placedMarkersInPageCoordinateSystem[i];
var _215=x-_214.x;
if(Math.abs(_215)<this.markerSize){
_212=false;
if(_215>0){
_20e=Math.abs(_215);
}else{
_20f=Math.abs(_215);
}
}
var _216=y-_214.y;
if(Math.abs(_216)<this.markerSize){
_213=false;
if(_216>0){
_210=Math.abs(_216);
}else{
_211=Math.abs(_216);
}
}
if(!_212&&!_213){
_20d=true;
break;
}
}
}
}
}
}
_20c.x=Math.min(_20c.x,$("#repository").width()-2*this.markerSize);
_20c.y=Math.min(_20c.y,$("#repository").height()-2*this.markerSize);
if(_20d&&deep<100){
if(_20b=="x"){
var _217=true;
if(_20f===null&&x<xMax||_20e!==null&&_20f<_20e||x<0){
_217=false;
}
if(_217){
_20c.x=x-this.markerSize;
}else{
_20c.x=x+this.markerSize;
}
}
if(_20b=="y"){
var _218=true;
if(_211===null&&y<yMax||_210!==null&&_211<_210||y<0){
_218=false;
}
if(_218){
_20c.y=y-this.markerSize;
}else{
_20c.y=y+this.markerSize;
}
}
return this.findPosition(_20c.x,_20c.y,(_20b==="x")?"y":"x",++deep);
}else{
return _20c;
}
}};
rabbit.facade.registerPlugin(rabbit.plugins.footnote);
rabbit.plugins.stencilHighlighter={init:function(){
},highlightStencil:function(_219){
var _21a=$("<div class=\"stencil-highlighter-highlighted\"></div>");
_219.append(_21a);
},hideHighlightLayer:function(_21b){
$(".layer[data-layer-id=\""+_21b+"\"] .stencil .stencil-highlighter-highlighted").remove();
},showHighlightLayer:function(_21c){
this.hideHighlightLayer(_21c);
var _21d=$(".layer[data-layer-id=\""+_21c+"\"] .stencil");
for(var i=0;i<_21d.length;i++){
this.highlightStencil($(_21d.get(i)));
}
},deopacify:function(){
$(".stencil-highlighter-opacifyied").removeClass("stencil-highlighter-opacifyied");
},opacifyExceptLayer:function(_21e){
this.deopacify();
var _21f=$(".stencil");
for(var i=0;i<_21f.length;i++){
var _220=$(_21f.get(i));
if(!_220.closest(".layer[data-layer-id=\""+_21e+"\"]").length){
_220.addClass("stencil-highlighter-opacifyied");
}
}
}};
rabbit.facade.registerPlugin(rabbit.plugins.stencilHighlighter);
rabbit.plugins.tinymcelinks={init:function(){
rabbit.facade.registerOnEvent("pageReady",function(){
var _221=document.querySelectorAll(".layer");
for(var i=0;i<_221.length;i++){
this.activateLinksForLayer(_221[i]);
}
},this);
rabbit.facade.registerOnEvent("layerStoreInserted",this.activateLinksForLayer,this);
},activateLinksForLayer:function(_222){
var _223=_222.querySelectorAll(".default-text2-container a[href]");
for(var i=0;i<_223.length;i++){
var link=_223[i];
if(!link.id){
link.id=Math.floor(Math.random()*1000000000);
}
var id=link.id;
var _224=link.getAttribute("href");
rabbit.interaction.manager.registerInteraction(id,"tinymce-interaction-"+id,{"button":"left","id":"tinymce-action-"+id,"numberOfFinger":"1","type":"click"},[{"delay":"0","id":"tinymce-reaction-"+id,"options":"reloadOnly","target":_224,"transition":"none","type":"showPage"}]);
link.className=link.className+" pidoco-clickable-element";
link.setAttribute("data-href",_224);
link.removeAttribute("href");
}
}};
rabbit.facade.registerPlugin(rabbit.plugins.tinymcelinks);
rabbit.plugins.fonticon={init:function(){
if(rabbit.facade.isExport()){
return;
}
$.ajax({url:rabbit.common.baseUrl+rabbit.util.appendVersionQuery("common/stencil-icons.svg"),method:"GET",success:function(data,_225,_226){
var body=document.body;
body.insertBefore(data.firstChild,body.firstChild);
}});
}};
rabbit.facade.registerPlugin(rabbit.plugins.fonticon);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.autocomplete=(function(){
return {init:function init(){
},setupAutocomplete:function setupAutocomplete(id,_227){
_227=_227.split("|c");
var oDS=new YAHOO.util.LocalDataSource(_227);
oDS.responseSchema={fields:["state"]};
var oAC=new YAHOO.widget.AutoComplete(id+"-input",id+"-con",oDS);
oAC.prehighlightClassName="yui-ac-prehighlight";
oAC.useShadow=false;
$("#"+id+"-input").click(function(){
rabbit.facade.markHighlightTouchesAsSuccessful();
});
}};
})();
rabbit.facade.registerPlugin(rabbit.stencils.autocomplete);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.textinput=(function(){
return {init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.layerStoreInserted,this.layerStoreInsertedListener,this);
rabbit.facade.registerOnEvent(rabbit.events.pageReady,this.pageReadyListener,this);
},layerStoreInsertedListener:function(_228){
$(_228).find(".stencil.textinput").click(function(){
rabbit.facade.markHighlightTouchesAsSuccessful();
});
},pageReadyListener:function(){
$(".stencil.textinput").click(function(){
rabbit.facade.markHighlightTouchesAsSuccessful();
});
}};
})();
rabbit.facade.registerPlugin(rabbit.stencils.textinput);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.combobox=(function(){
return {init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.layerStoreInserted,this.layerStoreInsertedListener,this);
rabbit.facade.registerOnEvent(rabbit.events.pageReady,this.pageReadyListener,this);
},layerStoreInsertedListener:function(_229){
$(_229).find(".stencil.combobox").click(function(){
rabbit.facade.markHighlightTouchesAsSuccessful();
});
},pageReadyListener:function(){
$(".stencil.combobox").click(function(){
rabbit.facade.markHighlightTouchesAsSuccessful();
});
}};
})();
rabbit.facade.registerPlugin(rabbit.stencils.combobox);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.accordion=function(){
var _22a=600;
var _22b=".accordion-header";
var _22c=".accordion-content";
var _22d="accordion-active";
var _22e=30;
var _22f=function(_230){
var _231=$(_230).parents().children(_22b);
var _232=_231.index(_230);
return _232;
};
var _233=function(_234){
return $(_234).parent().parent().parent().attr("id");
};
var _235=function(_236){
return $("#"+_236).find(_22b).length;
};
var _237=function(_238,_239,_23a){
var _23b=$("#"+_238+">div>"+_22b).length;
$("#"+_238).find(_22c+">div, "+_22c+">iframe").css("position","relative").css("left","0px").css("top","0px").css("width",_239+"px").css("height",(_23a-_23b*_22e-2)+"px");
};
return {_accordions:{},init:function init(){
},setupAccordion:function(id,_23c,_23d,_23e){
var _23f=_235(id);
if(_23e<1){
_23e=1;
}
if(_23e>_23f){
_23e=_23f;
}
_23e--;
$("#"+id).find(_22b).click({"accordionObject":this},this.raiseClickCallback);
_237(id,_23c,_23d);
this.showTab(id,_23e,false);
},showTab:function(id,_240,_241){
this._accordions[id]=_240;
if(_241){
$("#"+id).find(_22c).slideUp(_22a);
}else{
$("#"+id).find(_22c).hide();
}
var _242=$("#"+id).find(_22b).removeClass(_22d)[_240];
$(_242).addClass(_22d).next().slideDown(_22a,function onCompleteCallback(){
if(BrowserDetect.browser=="MSIE"){
$(this).css("width",$(this).css("width"));
}
});
},raiseClickCallback:function(evt){
evt.data.accordionObject.clickCallback(evt.data.accordionObject,this);
},clickCallback:function(that,_243){
var _244=_22f(_243);
var _245=_233(_243);
if(that._accordions[_245]===_244){
return;
}
rabbit.facade.markHighlightTouchesAsSuccessful();
that.showTab(_245,_244,true);
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.accordion);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.button=function(){
var _246=rabbit.facade;
return {init:function init(){
_246.registerOnEvent(rabbit.events.buttonMouseOver,this.onMouseOver,this);
_246.registerOnEvent(rabbit.events.buttonMouseOut,this.onMouseOut,this);
},onMouseOver:function onMouseOver(id){
document.getElementById(id).className="ClickableSketchHover";
},onMouseOut:function onMouseOut(id){
document.getElementById(id).className="ClickableSketch";
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.button);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.checkBox=function(){
var _247=rabbit.facade;
return {init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.checkBoxClicked,this.onClick,this);
},onClick:function onClick(_248,_249){
rabbit.facade.markHighlightTouchesAsSuccessful();
console.log("Click to checkbox "+_248);
var _24a=document.getElementById(_248);
if(_24a==null){
return true;
}
var _24b=document.getElementById(_249);
if(_24b==null){
return true;
}
if(!_24a.checked){
_24b.setAttribute("visibility","hidden");
}else{
_24b.setAttribute("visibility","inherit");
}
return true;
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.checkBox);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.datepicker=function(){
var _24c=rabbit.facade;
var _24d=[];
var _24e=false;
var _24f=null;
var _250=function(id){
for(var i=0;i<_24d.length;i++){
var _251=_24d[i];
if(_251.calendarId==id){
return _251;
}
}
return null;
};
var _252=function(id,year,_253){
var _254=_250(id);
_254.calendar.setYear(year);
_254.calendar.setMonth(_253);
_254.calendar.render();
};
var _255=function _hideCalendar(id,_256,_257){
if(_256){
document.getElementById(id+"_input").value=_256;
}
var _258=_250(id);
_258.calendarVisible=false;
var svg=document.getElementById(_258.calendarId+"_open_calendar");
if(svg){
svg.style.display="none";
}
_258.calendar.hide();
_258.overlay.hide();
_24e=false;
$("html").unbind("click",_24f);
};
var _259=function _showCalendar(id,_25a){
var _25b=_250(id);
_25b.calendarVisible=true;
_25b.calendar.show();
_25b.overlay.show();
_24e=true;
var svg=document.getElementById(_25b.calendarId+"_open_calendar");
if(svg){
svg.style.display="block";
}
_24f=function(e){
if(!rabbit.util.isElementChildOfSelector(e.target,"#"+id)){
_255(id);
}
};
$("html").bind("click",_24f);
};
var _25c=function _25c(_25d){
for(var i=0;i<_25d.childNodes.length;i++){
var _25e=_25d.childNodes[i];
if(_25e.nodeType!=1){
continue;
}
if(_25e.getAttribute("id")==undefined){
_25e.setAttribute("id",_25d.getAttribute("id")+"_"+i);
}
arguments.callee(_25e);
}
};
var _25f=function _25f(evt){
if(!evt){
return;
}
if(!_24c.vml){
evt.stopPropagation();
}else{
evt.cancelBubble=true;
}
};
return {init:function init(){
_24c.registerOnEvent(rabbit.events.click,this.hideDatePickerOnClick,this);
rabbit.facade.registerOnEvent(rabbit.events.showDatepicker,_259,this);
rabbit.facade.registerOnEvent(rabbit.events.hideDatepicker,_255,this);
rabbit.facade.registerOnEvent(rabbit.events.changeDatepickerPage,_252,this);
},calendarOpen:function(id){
return _24e;
}(),setupDatepicker:function setupDatepicker(id){
try{
var _260=new YAHOO.widget.Overlay(id+"_ov",{zIndex:9990,width:"200px",height:"200px",context:[id+"_input","tl","bl"]});
_260.render();
if(rabbit.result.lang=="de"){
var cal=new YAHOO.widget.Calendar(id+"_cal",{START_WEEKDAY:1});
cal.cfg.setProperty("DATE_FIELD_DELIMITER",".");
cal.cfg.setProperty("MDY_DAY_POSITION",1);
cal.cfg.setProperty("MDY_MONTH_POSITION",2);
cal.cfg.setProperty("MDY_YEAR_POSITION",3);
cal.cfg.setProperty("MD_DAY_POSITION",1);
cal.cfg.setProperty("MD_MONTH_POSITION",2);
cal.cfg.setProperty("MONTHS_SHORT",["Jan","Feb","MŠr","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"]);
cal.cfg.setProperty("MONTHS_LONG",["Januar","Februar","MŠrz","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"]);
cal.cfg.setProperty("WEEKDAYS_1CHAR",["S","M","D","M","D","F","S"]);
cal.cfg.setProperty("WEEKDAYS_SHORT",["So","Mo","Di","Mi","Do","Fr","Sa"]);
cal.cfg.setProperty("WEEKDAYS_MEDIUM",["Son","Mon","Die","Mit","Don","Fre","Sam"]);
cal.cfg.setProperty("WEEKDAYS_LONG",["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"]);
}else{
var cal=new YAHOO.widget.Calendar(id+"_cal");
}
var _261=new Object();
_261["calendar"]=cal;
_261.overlay=_260;
_261["calendarId"]=id;
_261["calendarVisible"]=false;
_24d.push(_261);
cal.selectEvent.subscribe(rabbit.util.bind(function(evt,d){
var _262=this.formatIsoDate(d[0][0][0],d[0][0][1],d[0][0][2]);
rabbit.facade.raiseEvent(rabbit.events.hideDatepicker,_261.calendarId,_262,rabbit.util.userRole,"displayMouseClick");
},this),cal,true);
cal.render();
cal.hide();
_260.hide();
var _263=id+"_cal";
_25c(document.getElementById(id+"_cal"));
cal.changePageEvent.subscribe(rabbit.util.bind(function(evt,d){
var date=cal.cfg.getProperty("pagedate");
var year=date.getUTCFullYear();
var _264=date.getMonth();
rabbit.facade.raiseEvent(rabbit.events.changeDatepickerPage,_261.calendarId,year,_264,rabbit.util.userRole,"displayMouseClick");
_25c(document.getElementById(_263));
},this),cal,true);
YAHOO.util.Event.addListener(id+"_button","click",rabbit.util.bind(this.toggleCalendarCallback,this),_261);
YAHOO.util.Event.addListener(id+"_input","focus",rabbit.util.bind(this.toggleCalendarCallback,this),_261);
YAHOO.util.Event.addListener(id+"_ov","click",_25f);
}
catch(e){
console.error("Error setting up datepicker");
console.error(e);
}
},hideDatePickerOnClick:function hideDatePickerOnClick(e){
rabbit.facade.markHighlightTouchesAsSuccessful();
if(this.calendarOpen){
for(var i=0;i<_24d.length;i++){
var _265=_24d[i];
if(_265.calendarVisible){
rabbit.facade.raiseEvent(rabbit.events.hideDatepicker,_265.calendarId,null,rabbit.util.userRole,"displayMouseClick");
}
}
}
},toggleCalendarCallback:function toggleCalendarCallback(evt,_266){
if(!_266.calendarVisible){
rabbit.facade.raiseEvent(rabbit.events.showDatepicker,_266.calendarId,rabbit.util.userRole,"displayMouseClick");
this.calendarOpen=true;
}else{
rabbit.facade.raiseEvent(rabbit.events.hideDatepicker,_266.calendarId,null,rabbit.util.userRole,"displayMouseClick");
this.calendarOpen=false;
}
_25f(evt);
},formatIsoDate:function formatIsoDate(y,m,d){
return y.toString()+(m<10?"-0":"-")+m.toString()+(d<10?"-0":"-")+d.toString();
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.datepicker);
rabbit.stencils.menu=function(){
var _267=[];
var _268=function(_269){
for(var i=0;i<_267.length;i++){
var menu=_267[i];
if(menu.domId==_269){
return menu;
}
}
return null;
};
var _26a=function(_26b,_26c){
var menu=_268(_26b);
if(menu){
for(var i=0;i<_26c.length;i++){
var _26d=menu.getSubmenus();
for(var j=0;j<_26d.length;j++){
if(_26d[j].id==_26c[i]){
menu=_26d[j];
}
}
}
}
return menu;
};
var _26e=function(_26f,_270,_271){
if(_271!=null&&_271!=rabbit.util.userRole){
var _272=_26a(_26f,_270);
if(_272){
_272.show();
}
}
};
var _273=function(_274,_275,_276){
if(_276!=null&&_276!=rabbit.util.userRole){
var _277=_26a(_274,_275);
if(_277){
_277.hide();
}
}
};
var _278=function(obj){
var menu=obj;
var _279=[];
while(menu.getRoot()!=menu){
_279.push(menu.id);
menu=menu.getRoot();
}
var _27a=menu.domId;
var _27b=[];
for(var i=_279.length-1;i>=0;i--){
_27b.push(_279[i]);
}
return [_27a,_27b];
};
var _27c=function(){
var _27d=_278(this);
rabbit.facade.raiseEvent(rabbit.events.subMenuShow,_27d[0],_27d[1],rabbit.util.userRole);
};
var _27e=function(){
var _27f=_278(this);
rabbit.facade.raiseEvent(rabbit.events.subMenuHide,_27f[0],_27f[1],rabbit.util.userRole);
};
return {init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.subMenuShow,_26e,this);
rabbit.facade.registerOnEvent(rabbit.events.subMenuHide,_273,this);
},convertMethodIntoFunction:function(_280){
for(var i=0;i<_280.length;i++){
var _281=_280[i].onclick;
if(_281&&_281.fn!=="undefined"){
_281.fn=eval(_281.fn);
}
if(_280[i].submenu){
var _282=_280[i].submenu.itemdata;
this.convertMethodIntoFunction(_282);
}
}
},setupMenu:function setupMenu(id,_283,_284){
try{
_283=_283.replace(/:rabbit.result.manager.menuClick,/g,":\"rabbit.result.manager.menuClick\",");
_283=JSON.parse(_283);
this.convertMethodIntoFunction(_283);
if(_284=="vertical"){
var _285=new YAHOO.widget.Menu(id+"-bar",{itemdata:_283,visible:true,position:"static",hidedelay:750,lazyload:true});
}else{
var _285=new YAHOO.widget.MenuBar(id+"-bar",{lazyload:true,autosubmenudisplay:true,showdelay:10,itemdata:_283});
}
_285.render(id+"-menu-container");
_285.show();
_285.domId=id;
_267.push(_285);
_285.subscribe("show",_27c);
_285.subscribe("hide",_27e);
}
catch(e){
console.error(e);
}
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.menu);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.radioButton=function(){
var _286=rabbit.facade;
return {init:function init(){
_286.registerOnEvent(rabbit.events.radioButtonClicked,this.onClick,this);
$(".radiobutton input:checked").each(function(){
var name=$(this).attr("name");
$("input[name=\""+name+"\"]").data("old-selected-radiobutton-id",$(this).attr("value"));
});
},getAllRadioButtons:function getAllRadioButtons(){
var _287=[];
var _288=document.getElementsByTagName("input");
for(var i=0;i<_288.length;i++){
if(_288[i].type==="radio"){
_287.push(_288[i]);
}
}
return _287;
},onClick:function onClick(_289,_28a){
rabbit.facade.markHighlightTouchesAsSuccessful();
console.log("Click to radioButton "+_289);
var _28b=this.getAllRadioButtons();
for(var i=0;i<_28b.length;i++){
var _28c=_28b[i];
var _28d=_28c.getAttribute("id")+"_svgChecked";
var _28e=document.getElementById(_28d);
if(_28e!=null){
if(!_28c.checked){
if(rabbit.facade.vml){
_28e.style.setAttribute("display","none");
}else{
_28e.setAttribute("visibility","hidden");
}
}else{
if(rabbit.facade.vml){
_28e.style.removeAttribute("display");
}else{
_28e.setAttribute("visibility","inherit");
}
}
}
}
return true;
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.radioButton);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.slider=function(){
var _28f={};
var _290=function(_291,_292,_293){
var _294=_28f[_291];
if(!_294){
return;
}
if(_293!=null&&_293!=rabbit.util.userRole){
console.log("_sliderChangedCallback "+_292);
_294.setValue(_292);
}
};
return {init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.sliderChangedEvent,_290,this);
},setupSlider:function(id,_295,_296,_297,_298){
try{
_295=parseInt(_295);
_297=parseInt(_297);
if(_298){
_298=parseInt(_298)*2;
}else{
_298=0;
}
var _299=(_297-(_297)/21)/10;
var _29a=_299*_295;
var _29b=_297-_29a;
var _29c=null;
if(_296=="vertical"){
_29c=YAHOO.widget.Slider.getVertSlider(id,id+"_thumb_vert",_29b,_29a,_299);
}else{
_29c=YAHOO.widget.Slider.getHorizSlider(id,id+"_thumb_horiz",_29b,_29a,_299);
}
_28f[id]=_29c;
_29c.animate=false;
_29c.subscribe("change",function(){
var _29d=Math.round(this.getValue()+_298);
rabbit.facade.raiseEvent(rabbit.events.sliderChangedEvent,id,_29d,rabbit.util.userRole);
});
}
catch(e){
console.error(e);
}
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.slider);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.stencil=function(){
var _29e=rabbit.facade;
var _29f=function _29f(_2a0,_2a1){
var node=document.getElementById(_2a0);
if(node){
node.style.setProperty("fill",_2a1,"");
}
};
var _2a2=function _2a2(_2a3,_2a4){
var _2a5,node=document.getElementById(_2a3);
if(node){
if(_2a4=="url(#sketchedHover)"){
_2a5=node.ownerDocument.createElement("v:fill");
_2a5.setAttribute("src",rabbit.common.baseUrl+"result/icons/sketchedFilledButton.png");
_2a5.setAttribute("type","tile");
_2a5.setAttribute("origin","0.1,0.1");
_2a5.setAttribute("size","175pt,75pt");
_2a5.setAttribute("on","true");
node.getElementsByTagName("fill")[0].parentNode.replaceChild(_2a5,node.getElementsByTagName("fill")[0]);
}else{
_2a5=node.ownerDocument.createElement("v:fill");
_2a5.setAttribute("color",_2a4);
_2a5.setAttribute("on"," true");
node.getElementsByTagName("fill")[0].parentNode.replaceChild(_2a5,node.getElementsByTagName("fill")[0]);
}
}
};
return {init:function init(){
_29e.registerOnEvent(rabbit.events.svgFocus,this.onSvgFocus,this);
_29e.registerOnEvent(rabbit.events.svgBlur,this.onSvgBlur,this);
_29e.registerOnEvent(rabbit.events.propertyChange,this.onPropertyChanged,this);
},setFill:function setFill(id,_2a6){
if(rabbit.facade.vml){
_2a2(id,_2a6);
}else{
_29f(id,_2a6);
}
},onSvgFocus:function onSvgFocus(_2a7){
var _2a8;
if(_2a7 instanceof Array){
for(var key in _2a7){
_2a8=document.getElementById(_2a7[key]);
if(_2a8!=null){
_2a8.setAttribute("class","svg_selected_element");
}
}
}else{
_2a8=document.getElementById(_2a7);
if(_2a8!=null){
_2a8.setAttribute("class","svg_selected_element");
}
}
},onSvgBlur:function onSvgBlur(_2a9){
var _2aa;
if(_2a9 instanceof Array){
for(var key in _2a9){
_2aa=document.getElementById(_2a9[key]);
if(_2aa!=null){
_2aa.setAttribute("class","svg_unselected_element");
}
}
}else{
_2aa=document.getElementById(_2a9);
if(_2aa!=null){
_2aa.setAttribute("class","svg_unselected_element");
}
}
},onPropertyChanged:function onPropertyChanged(_2ab,_2ac){
var _2ad=document.getElementById(_2ac);
if(_2ad==null){
return true;
}
console.debug("Property changed on "+_2ab);
if(event.srcElement[event.propertyName]==false){
_2ad.style.setAttribute("display","none");
}else{
_2ad.style.removeAttribute("display");
}
return true;
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.stencil);
rabbit.stencils.tabButton=function(){
var _2ae=rabbit.facade;
var _2af=function _2af(_2b0,_2b1){
var node=document.getElementById(_2b0);
if(node){
node.style.setProperty("fill",_2b1,"");
}
};
var _2b2=function _2b2(_2b3,_2b4){
var _2b5,node=document.getElementById(_2b3);
if(node){
if(_2b4=="url(#sketchedHover)"){
_2b5=node.ownerDocument.createElement("v:fill");
_2b5.setAttribute("src",rabbit.common.baseUrl+"result/icons/sketchedFilledButton.png");
_2b5.setAttribute("type","tile");
_2b5.setAttribute("origin","0.1,0.1");
_2b5.setAttribute("size","175pt,75pt");
_2b5.setAttribute("on","true");
node.getElementsByTagName("fill")[0].parentNode.replaceChild(_2b5,node.getElementsByTagName("fill")[0]);
}else{
_2b5=node.ownerDocument.createElement("v:fill");
_2b5.setAttribute("color",_2b4);
_2b5.setAttribute("on"," true");
node.getElementsByTagName("fill")[0].parentNode.replaceChild(_2b5,node.getElementsByTagName("fill")[0]);
}
}
};
return {init:function init(){
_2ae.registerOnEvent(rabbit.events.tabButtonMouseOver,this.handleMouseOver,this);
_2ae.registerOnEvent(rabbit.events.tabButtonMouseOut,this.handleMouseOut,this);
_2ae.registerOnEvent(rabbit.events.pageLoaded,this.changeTab,this);
_2ae.registerOnEvent(rabbit.events.pageReady,this.changeTab,this);
this.oldPageId=null;
},changeTab:function(page,_2b6){
var _2b7="";
if(page){
_2b7=page.data.id;
}
if(this.oldPageId===null){
_2b7=_2ae.getCurrentPageId();
}
var _2b8=selectorUtil.getElementsByName("target"+this.oldPageId);
for(var i=0;i<_2b8.length;i++){
rabbit.util.removeClass(_2b8[i],"selected");
}
var _2b8=selectorUtil.getElementsByName("target"+_2b7);
for(var i=0;i<_2b8.length;i++){
rabbit.util.addClass(_2b8[i],"selected");
}
this.oldPageId=_2ae.getCurrentPageId();
},handleMouseOver:function handleMouseOut(id,mode){
if(typeof id!=="string"||(mode!=="result"&&mode!=="sketched")){
console.error("Updating tabButton "+id+" failed.");
return;
}
try{
if(mode==="sketched"){
rabbit.util.addClass(id+"_div_small","ClickableSketchHover");
rabbit.util.addClass(id+"_div_big","ClickableSketchHover");
}else{
if(rabbit.vml){
_2b2(id+"_big_path","#EEEEEE");
_2b2(id+"_small_path","#EEEEEE");
}else{
_2af(id+"_big_path","#EEEEEE");
_2af(id+"_small_path","#EEEEEE");
}
}
}
catch(e){
console.error("Updating tabButton "+id+" failed.");
console.error(e);
}
},handleMouseOut:function handleMouseOut(id,mode){
if(typeof id!=="string"||(mode!=="result"&&mode!=="sketched")){
console.error("Updating tabButton "+id+" failed.");
return;
}
try{
if(mode==="sketched"){
_setClass(id+"_div_small","ClickableSketch");
_setClass(id+"_div_big","ClickableSketch");
}else{
if(rabbit.vml){
_2b2(id+"_big_path","white");
_2b2(id+"_small_path","white");
}else{
_2af(id+"_big_path","white");
_2af(id+"_small_path","white");
}
}
}
catch(e){
console.error("Updating tabButton "+id+" failed.");
console.error(e);
}
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.tabButton);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.togglesection=function(){
var _2b9=0;
var _2ba=".togglesection-header";
var _2bb=".togglesection-content";
var _2bc="content";
var _2bd="#borderDiv";
var _2be="open";
var _2bf=rabbit.facade;
var _2c0=function(_2c1,_2c2){
$("#"+_2c1+_2bc).find(".iframe").css("width",_2c2+"px");
};
return {togglers:{},init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.pageLoaded,this.pageLoaded,this);
rabbit.facade.registerOnEvent(rabbit.events.toggleToggleSection,this.toggle,this);
},setupToggler:function(id,_2c3,_2c4){
this.togglers[id]={id:id,page:_2c3};
$("#"+id).find(_2ba).click(function(){
rabbit.facade.markHighlightTouchesAsSuccessful();
rabbit.facade.raiseEvent(rabbit.events.toggleToggleSection,id);
});
$(_2bd).append($("#"+id).find(_2bb));
},pageLoaded:function(_2c5){
for(var _2c6 in this.togglers){
$("#"+this.togglers[_2c6].id+_2bc).hide();
}
},toggle:function(_2c7){
var _2c8=$("#"+_2c7+">div").data("iframe-url");
var page=rabbit.data.pageStore.objects[_2c8];
$("#"+_2c7+_2bc).slideToggle(_2b9,function(){
$("#"+_2c7).toggleClass(_2be);
});
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.togglesection);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.iphoneSwitch=function(){
var _2c9=rabbit.facade;
return {init:function init(){
_2c9.registerOnEvent(rabbit.events.iphoneSwitchClicked,this.onClick,this);
},onClick:function onClick(id){
rabbit.facade.markHighlightTouchesAsSuccessful();
var _2ca=$("#"+id+" > div");
var _2cb=rabbit.events.switchOffSwitch;
_2ca.toggleClass("switch-selected");
if(_2ca.hasClass("switch-selected")){
_2cb=rabbit.events.switchOnSwitch;
}
_2c9.raiseEvent(_2cb,id);
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.iphoneSwitch);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.rating=function(){
var _2cc="rating_white.png";
var _2cd="rating_black.png";
var _2ce=rabbit.facade;
var _2cf=new Array();
var _2d0=function(id){
if(_2cf[id]){
return parseInt(_2cf[id]);
}
return 0;
};
var _2d1=function(id,_2d2){
_2cf[id]=_2d2;
};
var _2d3=function(id,_2d4){
var i=1;
_2d4=parseInt(_2d4);
while(true){
var _2d5=document.getElementById(id+"-"+i);
if(_2d5==null){
break;
}
var _2d6=_2d5.getAttribute("src");
_2d6=_2d6.substring(0,_2d6.lastIndexOf("/")+1);
if(i>=_2d4+1){
_2d6+=_2cc;
}else{
_2d6+=_2cd;
}
_2d5.setAttribute("src",_2d6);
i++;
}
};
return {init:function init(){
_2ce.registerOnEvent(rabbit.events.ratingResultChangedEvent,this.onClick,this);
_2ce.registerOnEvent(rabbit.events.ratingMouseOut,this.onMouseOut,this);
_2ce.registerOnEvent(rabbit.events.ratingMouseOver,this.onMouseOver,this);
},onLoad:function onLoad(id,_2d7){
_2d1(id,_2d7);
},onClick:function onClick(id,_2d8){
rabbit.facade.markHighlightTouchesAsSuccessful();
_2d1(id,_2d8);
_2d3(id,_2d8);
},onMouseOut:function onMouseOut(id){
_2d3(id,_2d0(id));
},onMouseOver:function onMouseOver(id,_2d9){
_2d3(id,parseInt(_2d9));
},checkMouseOutDiv:function(id,_2da){
if(_2da.relatedTarget){
return _2da.relatedTarget.id.indexOf(id)==-1;
}else{
return _2da.toElement.id.indexOf(id)==-1;
}
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.rating);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.tree=function(){
var _2db=20;
return {_trees:{},init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.treeViewNodeClicked,this.clickCallback,this);
rabbit.facade.registerOnEvent(rabbit.events.treeViewScrolled,this.scrollCallback,this);
},setupTree:function setupMenu(id,_2dc){
try{
_2dc=_2dc.replace(/&quot;/g,"\"");
_2dc=JSON.parse(_2dc);
this._trees[id]=_2dc;
}
catch(e){
console.error(e);
}
},clickCallback:function(_2dd,sth){
var _2de=document.getElementById(_2dd+"-buttonvline");
var _2df="open";
if(_2de){
if(_2de.style.display=="none"){
_2df="closed";
}
if(_2df=="closed"){
_2de.style.display="";
}else{
_2de.style.display="none";
}
var elem=document.getElementById(_2dd+"-treeviewnodeid");
if(elem&&elem.nextSibling){
if(_2df=="closed"){
elem.nextSibling.style.display="none";
}else{
elem.nextSibling.style.display="";
}
this.update(_2dd,_2df);
}
}
},scrollCallback:function(id,_2e0,_2e1){
var _2e2=document.getElementById(id);
_2e2.scrollTop=_2e0;
_2e2.scrollLeft=_2e1;
},update:function(_2e3,_2e4){
this.setStatus(_2e3,_2e4);
this.recalculateLineLengths(_2e3);
},setStatus:function(_2e5,_2e6){
var tree=this.getTree(_2e5);
if(tree){
this.setStatusOnSubtree(this.getTreeName(_2e5),tree,_2e5,_2e6);
}
},setStatusOnSubtree:function(_2e7,tree,_2e8,_2e9){
if(tree){
for(var i=0;i<tree.length;i++){
var node=tree[i];
var _2ea=_2e7+"-"+i;
if(_2ea==_2e8){
node.treeItemType=(_2e9=="closed"?"-":"+");
return true;
}
if(node.subtree){
if(this.setStatusOnSubtree(_2ea,node.subtree,_2e8,_2e9)){
return true;
}
}
}
}
},recalculateLineLengths:function(_2eb){
var tree=this.getTree(_2eb);
if(tree){
var _2ec=this.getTreeName(_2eb);
var _2ed=document.getElementById(_2ec+"-openingvline");
this.traverseTree(_2ec,_2ed,tree,null);
}
},traverseTree:function(_2ee,node,_2ef,_2f0){
var _2f1=false;
if(_2f0===null){
_2f0={0:0,1:0};
_2f1=true;
}
var rows=0;
var _2f2=0;
var _2f3=0;
var _2f4=0;
_2f0[0]=0;
_2f0[1]=0;
if(!_2f1){
rows++;
}
if(_2ef){
for(var i=0;i<_2ef.length;i++){
var _2f5=_2ef[i];
var _2f6=null;
if(_2f5.subtree){
_2f6=_2f5.subtree;
}
this.traverseTree(_2ee+"-"+i,_2f5,_2f6,_2f0);
_2f3=_2f2+1;
_2f2=_2f2+_2f0[0];
_2f4=_2f4+_2f0[1];
}
}
var _2f7=null;
if(_2f1){
_2f7=node;
}else{
_2f7=document.getElementById(_2ee+"-openingvline");
}
if(_2f7){
var _2f8=_2f7.parentNode;
_2f8.style.height=""+(_2db*_2f2)+"px";
var _2f9=(_2f3-_2f4)*_2db;
_2f7.style.top=""+_2f9+"px";
}else{
}
if(_2f1||"+"==node.treeItemType){
_2f0[0]=rows+_2f2;
}else{
_2f0[0]=rows;
}
_2f0[1]=rows+_2f4;
},getTree:function(_2fa){
if(_2fa){
var _2fb=this.getTreeName(_2fa);
if(this._trees[_2fb]){
return this._trees[_2fb];
}else{
return null;
}
}
},getTreeName:function(_2fc){
return _2fc.substring(0,_2fc.indexOf("-"));
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.tree);
rabbit.common={baseUrl:"/rabbit/"};
if(rabbit.common==undefined){
rabbit.common={};
}
rabbit.common.i18n={translation:{},init:function(_2fd){
this.lang=_2fd.lang;
if((!this.lang)||(!this.translation[this.lang])){
this.lang="en";
}
},t:function(key,_2fe){
if(_2fe){
var _2ff=key.toLowerCase();
_2ff=_2ff.replace(/ /g,"-");
_2ff=_2fe+"."+_2ff;
}else{
var _2ff=key;
}
var lang=rabbit.common.i18n.lang;
if(!rabbit.common.i18n.translation[lang]){
console.log("no lang found for",key);
lang="en";
}
if(!rabbit.common.i18n.translation[lang]){
console.log("no lang found for",key);
return key;
}
var _300=rabbit.common.i18n.translation[lang][_2ff];
if(_300!==undefined){
return _300;
}
return key;
},tReverse:function(_301){
for(var lang in rabbit.common.i18n.translation){
for(var _302 in rabbit.common.i18n.translation[lang]){
var _303=rabbit.common.i18n.translation[lang][_302];
if(_303==_301){
return _302;
}
}
}
return null;
},tr:function(key,_304){
var _305=this.t(key);
for(var k in _304){
_305=_305.replace(k,_304[k]);
}
return _305;
},translation:{}};
var t=rabbit.common.i18n.t;
var tr=rabbit.common.i18n.tr;

