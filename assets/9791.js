"undefined"==typeof CE2&&(CE2={}),CE2.deviceType=function(t){var e,$,n=t.toLowerCase(),r=0;if(e=t.indexOf("("),-1==e)return 1;if(e++,-1!=($=t.indexOf("Android",e))){if($+=8,t.length>$&&(r=t.charAt($)))switch(r){case"2":if(-1!=t.indexOf("BNTV",$))return 3;if(-1!=n.indexOf("nook",$))return 3;if(-1!=t.indexOf("Kindle",$))return 3;if(-1!=t.indexOf("Touchpad",$))return 3;break;case"3":return 3;case"4":if(-1!=t.indexOf("Silk",$))return 3}return-1!=n.indexOf("tablet",$)?3:-1!=t.indexOf("Mobi",$)?2:3}if(-1!=($=t.indexOf("iP",e)))switch(r=t.charAt($+2)){case"a":return 3;case"h":case"o":return 2}return-1!=($=t.indexOf("BlackBerry",e))?-1!=t.indexOf("Tablet",$+10)?3:2:-1!=t.indexOf("Windows Phone",e)?2:-1!=t.indexOf("BB10",e)?2:"M"!=t.charAt(0)&&-1!=t.indexOf("Opera Mini",e)?2:1},"undefined"==typeof CE2&&(CE2={}),CE2.ignoredElements=[],CE2.clickCaptors=[],CE2.d=document,CE2.w=window,CE2.n=navigator,CE2.p={},function(){var t=CE2.n.userAgent;/\bMSIE\b/.test(t)&&(CE2.ie=1,CE2.ieVersion=parseInt(/MSIE (\d+)\.\d+/.exec(t)[1],10),CE2.ieQuirksMode="BackCompat"==CE2.d.compatMode)}(),CE2.ignore=function(t){t&&(CE2.ignoredElements.push(t),CE2.tracker&&CE2.tracker.ignoredElements.push(t))},CE2.capture=function(t){CE2.clickCaptors.push(t),CE2.tracker&&CE2.tracker.clickCaptors.push(t)},CE2.findMatchingSnapshot=function(t,e,$){var n,r,i,o;if(t&&t.length){for(r=0;i=t[r++];)n=Math.floor((new Date).getTime()/1e3),i.e&&i.e<=n||(!$||/n/.test(i.o||""))&&CE2.matchURL(i.u,$||e,i.o,i.d,CE2.n.userAgent)&&(i.s&&i.s>n?CE2.p[i.id]=i:o||(o=i));return o}},CE2.findMatchingLiveSessions=function(t,e){var $,n,r=[];if(t&&t.length){for($=0;n=t[$++];)CE2.matchURL(n.u,e,n.o,n.d,CE2.n.userAgent)&&r.push(n.id);return r.length?(r.sort(),r):void 0}},CE2.sameSessions=function(t,e){var $,n;if(!t||!e)return!1;if(t.length!=e.length)return!1;for($=0,n=t.length;n>$;$++)if(t[$]!=e[$])return!1;return!0},CE2.startTracking=function(t,e){var $,n;if(t)if(CE2.sampleVisit(t))CE2.testID=t.id,CE2.testVersion=t.v||1;else if(!e)return;e&&(CE2.sessionIDs=e),$=CE2.d.createElement("script"),n="https:"==CE2.w.location.protocol?CE2.TRACKING_SCRIPT_SECURE:CE2.TRACKING_SCRIPT,$.src=n+(t?"?s="+t.id+"&":"?")+"t="+(new Date).getTime(),$.type="text/javascript",$.async=!0,CE2.d.body.appendChild($)},CE2.unescape=function(t){try{return decodeURIComponent(t)}catch(e){return unescape(t)}},CE2.qs2obj=function(t,e){if(null==t||/^\s*$/.test(t))return null;var $,n,r={},i=null,o=t.replace(/\+/g," ").split(e||"&");for($=0,n=o.length;n>$;$++)i=o[$].split("="),i[0]&&(r[CE2.unescape(i[0])]=null==i[1]?null:CE2.unescape(i[1]));return r},CE2.each=function(t,e,$){if(t){var n;if("number"==typeof t.length&&"function"==typeof t.concat)for(var r=0,i=t.length;i>r&&(n=t[r],e.call($,n,r)!==!1);r++);else{var o;for(o in t)if(n=t[o],n!==Object.prototype[o]&&e.call($,n,o)===!1)break}}},CE2.indexOf=function(t,e,$){var n,r;for(n=$||0,r=t.length;r>n;n++)if(t[n]===e)return n;return-1},CE2.listen=CE2.addListener=function(t,e,$){t.addEventListener?t.addEventListener(e,$,!0):t.attachEvent("on"+e,$)},CE2.removeListener=function(t,e,$){t.removeEventListener?t.removeEventListener(e,$,!0):t.detachEvent("on"+e,$)},CE2.userData={},CE2.set=function(t,e){t=parseInt(t,10),t>=1&&5>=t&&(CE2.userData[t]=e+"")},CE2.click=function(){return CE2.tracker?CE2.tracker.click.apply(CE2.tracker,arguments):void 0},CE2.getBox=function(){},CE2.sampleVisit=function(t){return null==t.r?!0:(t.r!==!1&&t.r!==!0&&(t.r=Math.random()>=1/t.r?!1:!0),t.r)},CE2.dontTrack=function(t,e,$,n){if(n&&void 0!==t.external)try{if(t.external.InPrivateFilteringEnabled()===!0)return!0}catch(r){}var i=e.doNotTrack||$.doNotTrack||$.msDoNotTrack||t.doNotTrack;return"1"==i||"yes"==i},CE2.cookies=function(){try{return CE2.qs2obj(document.cookie,/;\s*/g)||{}}catch(t){return{}}}(),CE2.parseJSON=function(src){return"undefined"!=typeof JSON&&"function"==typeof JSON.parse?JSON.parse(src):eval("("+src+")")},CE2.isBot=function(t){return/alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/i.test(t)},"undefined"==typeof CE2&&(CE2={}),CE2.READY_STATE_PATTERN=CE2.ie?/complete/:/complete|interactive/,CE2.autoStart="undefined"==typeof CE_MANUAL_START||!CE_MANUAL_START,CE2.domReady=document.readyState&&CE2.READY_STATE_PATTERN.test(document.readyState),CE2.domReadyListeners=[],CE2.onDOMReady=function(t){return CE2.domReady?setTimeout(t,1):void CE2.domReadyListeners.push(t)},CE2.domReadySetup=function(){var t=function(){for(var t=CE2.domReadyListeners;t.length>0;)t.pop().call();CE2.domReady=!0};if(CE2.domReady&&t(),CE2.listen(window,"load",t),document.addEventListener&&CE2.listen(document,"DOMContentLoaded",t),document.readyState){var e=CE2.READY_STATE_PATTERN;!function(){e.test(document.readyState)?t():setTimeout(arguments.callee,10)}()}},CE2.autoStart&&CE2.domReadySetup(),"undefined"==typeof CE2&&(CE2={}),CE2.matchURL=function(t,e,$,n,r){var i,o,s,a,E,c,C,u,f,d,h,p,l,g,m,v,R=/(default|index)($|\..*)/i,T=!1;if(!t||!e)return!1;if(n&&CE2.indexOf(n,CE2.deviceType(r))<0)return!1;if($=$||"",/n/.test($))return t===e;if(/[re]/.test($))try{return RegExp(t,"i").test(e)}catch(y){return!1}if(i=new CE2.URI(e.toLowerCase()),/h/.test($)&&t.protocol!=i.protocol)return!1;if(s=i.host,o=s.replace(/^www\./,""),u=t.host,f=t.ihost,/w/.test($)&&s!=u&&s!=f)return!1;if(o!=u.replace(/^www\./,"")&&o!=(f&&f.replace(/^www\./,"")))return!1;if(d=t.path?t.path:"/",a=i.path,d!=a){if(/\//.test($))return!1;for(h=d.split("/"),E=a.split("/"),m=0,v=Math.max(h.length,E.length);v>m;m++)if(h[m]||(h[m]=""),E[m]||(E[m]=""),m==v-1&&(h[m]=h[m].replace(R,""),E[m]=E[m].replace(R,"")),h[m]!=E[m])return!1}return c=i.qs,g=/\?/.test($),p=t.qs||"",g&&c&&!p||!c&&p?!1:(CE2.each(p,function(t,e){return c[e]!==t?(T=!0,!1):void 0}),T?!1:g&&(CE2.each(c,function(t,e){return t!=p[e]?T=!0:void 0}),T)?!1:(l=t.hash||"",C=i.hash||"",g=/#/.test($),(g||l)&&l!=C?!1:!0))},"undefined"==typeof CE2&&(CE2={}),void 0===CE2.URI&&(CE2.URI=function(t){if(this.src=t,this.protocol=this.host=this.port=this.path=this.qs=this.hash=this.query=null,t){var e=typeof t;"string"==e?this.initWithString(t):"object"==e&&this.initWithURI(t)}},CE2.URI.pattern=/^\s*([\S]+?:\/\/)?([^\s\/]+?@)?([^:\/\?\#]+)?(\:\d+)?(\/?[^#\?\s]*)?([\?][^#\s]*)?([#]\S+)?/i,CE2.URI.prototype={initWithString:function(t){var e,$,n,r,i,o=CE2.URI.pattern.exec(t);o[1]||"/"==t.charAt(0)?((e=o[1])&&(this.protocol=e.substr(0,e.indexOf(":"))),this.host=o[3]||null,($=o[4])&&(this.port=+$.substr(1)),(n=o[5])?this.path=CE2.unescape(n):this.host&&(this.path="/")):this.path=CE2.unescape((o[3]||"")+(o[5]||"")),(r=o[6])&&(this.qs=CE2.qs2obj(r.substr(1)),this.query=r.substr(1)),(i=o[7])&&(this.hash=CE2.unescape(i.substr(1)))},initWithURI:function(t){CE2.each(t,function(t,e){this[e]=t},this)},isAbsolute:function(){return this.isURL()||this.path&&"/"==this.path.charAt(0)},isURL:function(){return this.protocol&&this.host},getDomain:function(){return this.host&&this.host.replace(/^www\./,"")}}),CE2.userMain=function(){var t=CE2.snapshots,e=CE2.sessions,$=CE2.sites,n=CE2.liveBootstrap||function(){};if(!CE2.isBot(CE2.n.userAgent)&&!CE2.dontTrack(CE2.w,CE2.d,CE2.n,CE2.ie)){CE2.testID=CE2.testVersion=CE2.sessionIDs=null,CE2.GTRK_DEST&&CE2.gtrk&&CE2.gtrk(CE2.GTRK_DEST),CE2.initFlowTracking&&CE2.initFlowTracking();var r=function(){var t,e="!$%&()*+,-.0123456789;<=>?@[]^_`{|}~",$={};for(t=0;t<e.length;t++)$[e.charAt(t)]=t.toString(36);return $}(),i=function(t){return parseInt(t.replace(/./g,function(t){return r[t]}),36)},o=function(t){for(var e,$="",n=/(![^:\/a-z])|([^:\/a-z]{2})|(:[^:\/a-z]{3})|(\/[^:\/a-z]{4})/gi,r=String.fromCharCode;null!=(e=n.exec(t));)e[1]||e[2]?$+=r(i(e[0])):e[3]?$+=r(i(e[3].substr(1))):e[4]&&($+=r(i(e[4].substr(1))));return $};"function"==typeof o&&("string"==typeof t&&(t=CE2.parseJSON(o(t))),"string"==typeof e&&(e=CE2.parseJSON(o(e))),"string"==typeof $&&($=CE2.parseJSON(o($)))),CE2.recording&&CE2.recording.main&&CE2.recording.main($);var s=function(){try{var $=CE2.w.location.href,r=CE2.findMatchingSnapshot(t,$,"string"==typeof CE_SNAPSHOT_NAME&&CE_SNAPSHOT_NAME),i=CE2.findMatchingLiveSessions(e,$);if(n())return;if(!r&&!i)return CE2.testID=CE2.testVersion=CE2.sessionIDs=null,void(CE2.tracker&&(CE2.tracker.cleanup(),CE2.tracker=null));(r&&r.id!=CE2.testID||i&&!CE2.sameSessions(i,CE2.sessionIDs))&&(CE2.startTracking(r,i),CE2.badge&&CE2.badge())}catch(o){}};s(),CE2.autoStart&&(CE2.monitorInterval=setInterval(s,1e3))}},CE2.autoStart&&CE2.onDOMReady(CE2.userMain),"function"==typeof CE_READY?CE2.onDOMReady(CE_READY):"object"==typeof CE_READY&&CE2.onDOMReady(function(){CE2.each(CE_READY,function(t){"function"==typeof t&&t()})}),CE2.TRACKING_SCRIPT="http://trk.cetrk.com/5/t.js",CE2.TRACKING_SCRIPT_SECURE="https://s3.amazonaws.com/trk.cetrk.com/5/t.js",CE2.TRACKING_DEST="http://trk.cetrk.com/",CE2.TRACKING_DEST_SECURE="https://s3.amazonaws.com/trk.cetrk.com/",CE2.uid=299791,"undefined"==typeof CE2&&(CE2={}),CE2.gtrk=function(t){function e(e,$){var n=CE2.d.createElement("img");n.src=t+"/"+e+"?u="+CE2.uid+"&t="+$.toString(36)}function $(t,$){var n=new Date,r=Math.floor(n.getTime()/1e3),i="_ceg."+t,o=CE2.cookies[i],s=o&&parseInt(o,36),a=new CE2.URI(CE2.w.location.href).getDomain(),E=new Date(n.getFullYear(),n.getMonth()+3,n.getDate()).toUTCString();(!s||r-s>$)&&e(t,r),CE2.d.cookie=i+"="+r.toString(36)+";path=/;domain="+a+";expires="+E}/^https?:\/\//.test(t)||(t="https://"+t),$("s",1800),$("u",2592e3)},CE2.GTRK_DEST="gtrk.s3.amazonaws.com",CE2.snapshots="%8&4!}%|%]!}$<$3$1$1$1$5$4$3$,!}%^!}$<$2$5$8$7$6$;$;$5$1$1$,!}&.!}$<$6$,!}&-!}$<&4!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&0&0&0$.&+&(&&&*&,&+&,%?&*&!%|&.%^$.%[&&&$!}$,!}&(%?&,%{!}$<!}$0&*%|&&$-$3$1$2$7$-&&&!&2&$&(%|%[&+$0&&&!&2&$&(%|%[&+$-%_%^%?&,&-&*%^%]$0&-&+%?%|&%$-%@&&&!&,$-%^&!%^%[&,&*%|%[$-%^&%%`%?%`%|&%%`$-%^&,%{%|%[%?&!$0%?&*&,%|%[&!%^$9$;$7$9$4$2$6$.%^%[%^!}&6&6$,&4!}%|%]!}$<$3$1$1$1$5$7$2$,!}%^!}$<$2$5$8$7$7$1$4$1$1$1$,!}&.!}$<$6$,!}&-!}$<&4!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&0&0&0$.&+&(&&&*&,&+&,%?&*&!%|&.%^$.%[&&&$!}$,!}&(%?&,%{!}$<!}$0&*%|&&$-$3$1$2$7$-&&&!&2&$&(%|%[&+$0&+%|&%%]%{&-$-&&&%%^$-&&%_$-&,%{%^$-%@%^&+&,$-&$&&&$%^&%&,&+$-&&%_$-&$&2$-%[%?&*%^%^&*$0%?&*&,%|%[&!%^$9$;$;$9$5$2$4$.%^%[%^!}&6&6$,&4!}%|%]!}$<$3$1$1$1$5$5$9$,!}%^!}$<$2$5$8$7$6$;$;$5$1$1$,!}&.!}$<$6$,!}&-!}$<&4!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&0&0&0$.&+&(&&&*&,&+&,%?&*&!%|&.%^$.%[&&&$!}$,!}&(%?&,%{!}$<!}$0&*%|&&$-$3$1$2$7$-&&&!&2&$&(%|%[&+$0%]%?&2$-$2$4$-&0%{%?&,&+$-%{%?&(&(%^&%%|&%%`$-&,&&%]%?&2$0%?&*&,%|%[&!%^$9$;$;$9$4$2$6$.%^%[%^!}&6&6$,&4!}%|%]!}$<$3$1$1$1$5$4$6$,!}%^!}$<$2$5$8$7$6$;$;$5$1$1$,!}&.!}$<$6$,!}&-!}$<&4!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&0&0&0$.&+&(&&&*&,&+&,%?&*&!%|&.%^$.%[&&&$!}$,!}&(%?&,%{!}$<!}$0%_&&&&&,%@%?&!&!$0!}&6&6$,&4!}%|%]!}$<$3$1$1$1$5$7$1$,!}%^!}$<$2$5$8$7$7$1$4$1$1$1$,!}&.!}$<$6$,!}&-!}$<&4!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&0&0&0$.&+&(&&&*&,&+&,%?&*&!%|&.%^$.%[&&&$!}$,!}&(%?&,%{!}$<!}$0%_&&&&&,%@%?&!&!$0!}&6&6$,&4!}%|%]!}$<$3$1$1$1$5$6$;$,!}%^!}$<$2$5$8$7$7$1$4$1$1$1$,!}&.!}$<$6$,!}&-!}$<&4!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&0&0&0$.&+&(&&&*&,&+&,%?&*&!%|&.%^$.%[&&&$!}$,!}&(%?&,%{!}$<!}$0%[&&&!&-&$&%&+$0!}&6&6$,&4!}%|%]!}$<$3$1$1$1$5$6$6$,!}%^!}$<$2$5$8$7$7$1$4$1$1$1$,!}&.!}$<$6$,!}&-!}$<&4!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&0&0&0$.&+&(&&&*&,&+&,%?&*&!%|&.%^$.%[&&&$!}$,!}&(%?&,%{!}$<!}$0%[&*%|%[%~%^&,$0!}&6&6$,&4!}%|%]!}$<$3$1$1$1$5$4$5$,!}%^!}$<$2$5$8$7$6$;$;$5$1$1$,!}&.!}$<$6$,!}&-!}$<&4!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&0&0&0$.&+&(&&&*&,&+&,%?&*&!%|&.%^$.%[&&&$!}$,!}&(%?&,%{!}$<!}$0%[&*%|%[%~%^&,$0!}&6&6$,&4!}%|%]!}$<$2$;$3$8$3$2$5$,!}%^!}$<$2$5$8$2$6$;$2$9$1$1$,!}&.!}$<$6$,!}&-!}$<&4!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&+&(&&&*&,&+&,%?&*&!%|&.%^$.%[&&&$!}$,!}&(%?&,%{!}$<!}$0!}&6&6$,&4!}%|%]!}$<$3$1$1$1$5$;$4$,!}%^!}$<$2$5$8$7$7$1$4$1$1$1$,!}&.!}$<$6$,!}&-!}$<&4!}&(&*&&&,&&%[&&&!!}$<!}%{&,&,&(!}$,!}%{&&&+&,!}$<!}&$$.&,%{%^%{%|&%%]&-$.%[&&&$!}$,!}&(%?&,%{!}$<!}$0!}&6$,!}%]!}$<%8$3%;&6%;",CE2.sessions=null;