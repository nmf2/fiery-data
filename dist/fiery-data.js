!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("FieryData",[],t):"object"==typeof exports?exports.FieryData=t():e.FieryData=t()}(this,function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=12)}([function(e,t,r){"use strict";function n(e){return"[object Object]"===Object.prototype.toString.call(e)}function o(e){return"function"==typeof e}function a(e){return"string"==typeof e}function i(e){return e&&e instanceof Array}function s(e){return e&&e instanceof Date}function c(e){return void 0!==e}function u(e){return"number"==typeof e&&isFinite(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.isObject=n,t.isFunction=o,t.isString=a,t.isArray=i,t.isDate=s,t.isDefined=c,t.isNumber=u,t.parseDate=function(e){return s(e)?e:e&&o(e.toDate)?e.toDate():u(e)?new Date(e):e},t.coalesce=function(e,t){return c(e)?e:t},t.isCollectionSource=function(e){return!!e.where},t.getFields=function(e,t){return e?a(e)?[e]:e:t},t.forEach=function(e,t){if(i(e)){for(var r=0;r<e.length;r++)t(e[r],r,e);return!0}if(n(e)){for(var o in e)e.hasOwnProperty(o)&&t(e[o],o,e);return!0}return!1},t.isEqual=function e(t,r){if(t===r)return!0;if(!t||!r)return!1;if(typeof t!=typeof r)return!1;if(i(t)&&i(r)){if(t.length!==r.length)return!1;for(var o=0;o<t.length;o++)if(!e(t[o],r[o]))return!1;return!0}if(s(t)&&s(r))return t.getTime()===r.getTime();if(n(t)&&n(r)){for(var a in t)if(!e(t[a],r[a]))return!1;for(var a in r)if(!(a in t))return!1;return!0}return!1}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(6),o=r(4),a=r(8),i=r(2),s=r(3);function c(e,r,o){void 0===o&&(o=!1);var a=e.storeKey+n.constants.UID_SEPARATOR+r.path;if(a in t.globalCache)return d(t.globalCache[a],e,o),t.globalCache[a];var i=e.options.newDocument();i[n.constants.PROP_UID]=a;var c={uid:a,data:i,ref:r,exists:null,uses:0,sub:{},firstEntry:e,entries:[],removed:!1};return t.globalCache[a]=c,d(c,e,!0),y(i,e),s.callbacks.onCacheCreate(c),e.options.triggerEvent(i,"create"),c}function u(e){return t.globalCache[e[n.constants.PROP_UID]]}function f(e,t){if(t&&t.uid in e.children){e.options;var r=t.entries,n=r.indexOf(e);-1!==n&&r.splice(n,1),delete e.children[t.uid];for(var a=!1,i=0;i<r.length;i++)if(r[i].instance===e.instance){a=!0;break}if(a||p(t,e.instance,!0),t.uses>0)for(var c in t.sub)l(t,c)||(s.callbacks.onSubDestroy(t.data,c,t),o.closeEntry(t.sub[c],!0))}}function l(e,t){for(var r=e.entries,n=(e.sub,0);n<r.length;n++){var o=r[n].options.sub;if(o&&t in o)return!0}return!1}function d(e,t,r){void 0===r&&(r=!1),e.uid in t.instance.cache||(t.instance.cache[e.uid]=e,e.uses++),e.uid in t.children?r&&v(e,t):(e.entries.push(t),t.children[e.uid]=e,v(e,t))}function p(e,t,r){if(void 0===r&&(r=!0),e.uid in t.cache){e.uses--,delete t.cache[e.uid];for(var n=e.entries,o=n.length-1;o>=0;o--){var a=n[o];a.instance===t&&f(a,e)}r&&e.uses<=0&&g(e)}}function g(e,r){void 0===r&&(r=!1);for(var n=e.entries,a=0;a<n.length;a++)p(e,n[a].instance,!1);for(var i in e.sub)o.closeEntry(e.sub[i],!0);e.uses<=0&&!e.removed&&(s.callbacks.onCacheDestroy(e),e.firstEntry.options.triggerEvent(e.data,"destroy"),delete t.globalCache[e.uid],delete e.ref,delete e.sub,delete e.data,e.uses=0,e.entries.length=0,e.removed=!0)}function v(e,t){var r=t.options,i=e.data,c=e.ref;if(r.sub&&c)for(var u in r.sub)if(!h(e,u)){var f=r.sub[u],l=e.uid+n.constants.ENTRY_SEPARATOR+u,d=f.doc?c.parent.doc(e.uid.split(n.constants.PATH_SEPARATOR).pop()+n.constants.PATH_SEPARATOR+u):c.collection(u),p=o.getEntry(t.instance,d,f,l,!1);p.parent=e,e.sub[u]=p,i[u]=a.factory(p),s.callbacks.onSubCreate(i,u,e)}}function h(e,t){return t in e.sub&&e.sub[t].live}function y(e,t){return t.options.record&&Object.defineProperties(e,t.recordProperties),e}t.globalCache=Object.create(null),t.destroyGlobalCache=function(){for(var e in t.globalCache)g(t.globalCache[e],!0)},t.getCacheForReference=c,t.getCacheForDocument=function(e,t,r){return void 0===r&&(r=!1),i.stats.reads++,c(e,t.ref,r)},t.getCacheForData=u,t.removeDataFromEntry=function(e,t){f(e,u(t))},t.removeCacheFromEntry=f,t.isReferencedSub=l,t.addCacheToEntry=d,t.removeCacheFromInstance=p,t.destroyCache=g,t.addSubs=v,t.hasLiveSub=h,t.createRecord=y},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.stats={queries:0,reads:0,deletes:0,updates:0,sets:0,writes:0}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.callbacks={onInvalidOperation:function(e,t){},onUpdate:function(e,t,r){},onSet:function(e,t,r){},onDelete:function(e,t){},onClear:function(e,t){},onGetChanges:function(e,t,r){},onRefresh:function(e,t){},onBuild:function(e,t){},onCacheCreate:function(e){},onCacheDestroy:function(e){},onSubCreate:function(e,t,r){},onSubDestroy:function(e,t,r){},onCollectionAdd:function(e,t,r){},onCollectionRemove:function(e,t,r){},onCollectionModify:function(e,t,r){},onCollectionChanged:function(e,t){},onDocumentUpdate:function(e,t){},onDocumentMissing:function(e,t){},onInstanceCreate:function(e){},onInstanceDestroy:function(e){}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0),o=r(7),a=r(15),i=r(1),s=r(9);function c(e,t){if(void 0===t&&(t=!1),e&&e.live&&(e.off&&(e.off(),delete e.off),e.live=!1,t)){var r=e.instance;n.isDefined(e.index)&&(r.entryList[e.index]=null,delete e.index),e.name&&e.name in r.entry&&delete r.entry[e.name],n.forEach(e.children,function(t){i.removeCacheFromEntry(e,t)})}}function u(e){return{refresh:function(t){return s.refresh.call(e,this,t)},sync:function(t){return s.sync.call(e,this,t)},update:function(t){return s.update.call(e,this,t)},save:function(t){return s.save.call(e,this,t)},remove:function(t){return void 0===t&&(t=!1),s.remove.call(e,this,t)},ref:function(t){return s.ref.call(e,this,t)},clear:function(t){return s.clear.call(e,this,t)},build:function(t,r){return s.buildSub.call(e,this,t,r)},create:function(t,r){return s.createSub.call(e,this,t,r)},getChanges:function(t,r){return s.getChanges.call(e,this,t,r)}}}function f(e,t){var r={};for(var n in e.recordOptions){r[e.recordOptions[n]]={value:t[n]}}return r}t.closeEntry=c,t.getEntry=function(e,t,r,n,i){void 0===i&&(i=!0);var s=o.getOptions(r,e),l=a.getStoreKey(t);if(n&&n in e.entry){var d=e.entry[n];return c(d),s.id!==d.options.id&&o.recycleOptions(d.options),d.source=t,d.options=s,d.storeKey=l,d.live=!0,n&&i&&(e.sources[n]=t),d}var p=u(e),g={name:n,options:s,source:t,instance:e,storeKey:l,children:{},recordFunctions:p,recordProperties:f(s,p),live:!0};return n&&n in e.entry||(g.index=e.entryList.length,e.entryList.push(g)),n&&(e.entry[n]=g),n&&i&&(e.sources[n]=t),g},t.updatePointers=function(e,t){var r=t.docs;e.first=r[0],e.last=r[r.length-1]},t.getChanges=function(e){return n.isFunction(e.docChanges)?e.docChanges():n.isArray(e.docChanges)?e.docChanges:[]},t.getEntryRecordFunctions=u,t.getEntryRecordProperties=f},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0);function o(e,t,r){for(var n in r)e.setProperty(t,n,r[n]);return t}function a(e,t){if(t.decode)e=t.decode(e);else if(t.decoders)for(var r in t.decoders)r in e&&(e[r]=t.decoders[r](e[r],e));return e}function i(e,t){var r,o=e.data(),a=n.isObject(o)?o:((r={})[t.propValue]=o,r);return a&&t.key&&(a[t.key]=e.id),a}t.refreshData=function(e,t,r){var n=r.instance.system,s=r.options,c=a(i(t,s),s),u=e.data;return o(n,u,c),s.propExists&&n.setProperty(u,s.propExists,t.exists),s.propParent&&r.parent&&n.setProperty(u,s.propParent,r.parent.data),e.exists=t.exists,s.triggerEvent(u,"update"),u},t.copyData=o,t.decodeData=a,t.encodeData=function(e,t,r){var o={},a=n.getFields(r,t.include);if(a)for(var i=0;i<a.length;i++)(s=a[i])in e&&(o[s]=e[s]);else for(var s in e)s in t.exclude||(o[s]=e[s]);if(t.encoders)for(var s in t.encoders)s in o&&(o[s]=t.encoders[s](o[s],e));return o},t.parseDocument=i},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.constants={PROP_VALUE:".value",PROP_UID:".uid",UID_SEPARATOR:"///",ENTRY_SEPARATOR:"/",PATH_SEPARATOR:"/",RECORD_OPTIONS:{refresh:"$refresh",sync:"$sync",update:"$update",save:"$save",remove:"$remove",ref:"$ref",clear:"$clear",build:"$build",create:"$create",getChanges:"$getChanges"},EVENTS_OPTIONS:{create:"$onCreate",missing:"$onMissing",update:"$onUpdate",remove:"$onRemove",destroy:"$onDestroy"}}},function(e,t,r){"use strict";var n=this&&this.__assign||Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e};Object.defineProperty(t,"__esModule",{value:!0});var o=r(6),a=r(0);function i(e,r){if(r)for(var n in t.mergeOptions){var o=n,a=t.mergeOptions[o];e[o]=a(e[o],r[o])}}t.globalOptions={defined:{},user:void 0,defaults:{onError:function(e){},onMissing:function(){},onSuccess:function(e){},onRemove:function(){},onMutate:function(e){e()},onPromise:function(e){},streamInitial:20,streamMore:10,liveOptions:{},propValue:o.constants.PROP_VALUE,recordOptions:o.constants.RECORD_OPTIONS,newDocument:function(e){return{}},eventsOptions:o.constants.EVENTS_OPTIONS,triggerEvent:function(e,t){var r=this.eventsOptions[t];this.events&&r&&e[r]&&e[r]()}},id:0,map:{}},t.getOptionsByKey=function(e){return t.globalOptions.map[parseInt(e)]},t.getOptions=function e(r,n){if(a.isString(r)){if(!(r in t.globalOptions.defined))throw"The definition "+r+" was not found. You must call define before you use the definition";return e(t.globalOptions.defined[r])}if(r&&a.isObject(r)||(r={}),r.id&&r.id in t.globalOptions.map)return r;if(r.id||(r.id=++t.globalOptions.id,t.globalOptions.map[r.id]=r),r.extends&&i(r,e(r.extends)),i(r,t.globalOptions.user),i(r,t.globalOptions.defaults),n&&!r.shared&&(r.instance=n,n.options[r.id]=r),r.type){var s=r.type;r.newDocument=function(e){return new s}}r.newCollection||(r.newCollection=r.map?function(){return{}}:function(){return[]});var c={};if(r.exclude?a.isArray(r.exclude)?a.forEach(r.exclude,function(e,t){return c[e]=!0}):c=r.exclude:r.key&&(c[r.key]=!0),c[r.propValue]=!0,c[o.constants.PROP_UID]=!0,a.forEach(r.recordOptions,function(e,t){return c[e]=!0}),r.exclude=c,r.sub)for(var u in r.sub){var f=e(r.sub[u],n);f.parent=r,r.sub[u]=f,f.ref||(c[u]=!0)}if(a.isArray(r.timestamps)&&r.timestamps.length){var l=r.decoders||{};a.forEach(r.timestamps,function(e){e in l||(l[e]=a.parseDate)}),r.decoders=l}return r},t.recycleOptions=function(e){var t=e.instance;t&&delete t.options[e.id]},t.define=function(e,r){if(a.isString(e))(o=r).shared=!0,t.globalOptions.defined[e]=o;else for(var n in e){var o;(o=e[n]).shared=!0,t.globalOptions.defined[n]=o}},t.setGlobalOptions=function(e){e&&(e.shared=!0),t.globalOptions.user=e},t.performMerge=i,t.mergeStrategy={ignore:function(e,t){return e},replace:function(e,t){return a.coalesce(e,t)},chain:function(e,t){return a.isDefined(t)?a.isDefined(e)?function(){t.apply(this,arguments)(e).apply(this,arguments)}:t:e},shallow:function(e,t){return a.isDefined(t)?a.isDefined(e)?n({},t,e):t:e},concat:function(e,t){if(!a.isDefined(t))return e;if(!a.isDefined(e))return t;if(a.isArray(e)&&a.isArray(t)){for(var r=e.concat(t),n={},o=r.length-1;o>=0;o--)r[o]in n?r.splice(o,1):n[r[o]]=!0;return r}},exclude:function(e,r){var n=t.mergeStrategy.concat(e,r);if(!n&&e&&r){var o={},i=a.isArray(r),s=a.isArray(e);return a.forEach(r,function(e,t){return e?o[i?e:t]=!0:0}),a.forEach(e,function(e,t){return e?o[s?e:t]=!0:0}),o}return n}},t.mergeOptions={extends:t.mergeStrategy.ignore,id:t.mergeStrategy.ignore,parent:t.mergeStrategy.ignore,shared:t.mergeStrategy.ignore,vm:t.mergeStrategy.ignore,key:t.mergeStrategy.replace,query:t.mergeStrategy.replace,map:t.mergeStrategy.replace,once:t.mergeStrategy.replace,stream:t.mergeStrategy.replace,streamInitial:t.mergeStrategy.replace,streamMore:t.mergeStrategy.replace,type:t.mergeStrategy.replace,nullifyMissing:t.mergeStrategy.replace,newDocument:t.mergeStrategy.replace,newCollection:t.mergeStrategy.replace,decode:t.mergeStrategy.replace,decoders:t.mergeStrategy.shallow,encoders:t.mergeStrategy.shallow,record:t.mergeStrategy.replace,recordOptions:t.mergeStrategy.replace,recordFunctions:t.mergeStrategy.replace,events:t.mergeStrategy.replace,eventsOptions:t.mergeStrategy.replace,triggerEvent:t.mergeStrategy.replace,propValue:t.mergeStrategy.replace,propExists:t.mergeStrategy.replace,propParent:t.mergeStrategy.replace,onceOptions:t.mergeStrategy.replace,liveOptions:t.mergeStrategy.replace,include:t.mergeStrategy.concat,exclude:t.mergeStrategy.exclude,timestamps:t.mergeStrategy.concat,onError:t.mergeStrategy.replace,onSuccess:t.mergeStrategy.replace,onMissing:t.mergeStrategy.replace,onRemove:t.mergeStrategy.replace,onMutate:t.mergeStrategy.replace,onPromise:t.mergeStrategy.replace,sub:t.mergeStrategy.shallow}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(14),o=r(10),a=r(11),i=r(17);function s(e){return(e.source.where?e.options.stream?i.default:e.options.map?o.default:a.default:n.default)(e)}t.factory=s,t.default=s},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(5),o=r(0),a=r(1),i=r(2),s=r(3),c=r(16);function u(e,t){var r=this;void 0===t&&(t=!1);var n=a.getCacheForData(e);if(n&&n.ref){var c=n.firstEntry.options;if(!t&&c.sub)for(var f in c.sub)o.forEach(e[f],function(e){u.call(r,e)});return i.stats.deletes++,s.callbacks.onDelete(e,n),n.ref.delete()}return s.callbacks.onInvalidOperation(e,"remove"),Promise.reject("The given data is out of scope and cannot be operated on.")}function f(e,t,r){var n=t.options,i=e.doc(),c=a.getCacheForReference(t,i);return n.defaults&&o.forEach(n.defaults,function(e,t){r&&t in r||(c.data[t]=o.isFunction(e)?e():e)}),r&&o.forEach(r,function(e,t){c.data[t]=e}),s.callbacks.onBuild(c.data,c),c.data}t.pager=function(e){var t=this.entryFor(e);return t?t.pager?t.pager:t.pager=c.getPager(t):null},t.more=function(e,t){var r=this.entryFor(e);return r&&r.more?r.more(t):Promise.reject(void 0)},t.hasMore=function(e){var t=this.entryFor(e);return!(!t||!t.hasMore)},t.refresh=function(e,t){void 0===t&&(t=!1);var r=a.getCacheForData(e);if(r&&r.ref){var o=r.firstEntry,c=o.options,u=o.instance.system,f={source:t?"cache":"default"};return i.stats.reads++,s.callbacks.onRefresh(e,t),r.ref.get(f).then(function(e){c.onMutate(function(){return e.exists?n.refreshData(r,e,o):(c.propExists&&u.setProperty(r.data,c.propExists,!1),r.exists=!1),r.data})})}return s.callbacks.onInvalidOperation(e,"refresh"),Promise.reject("The given data is out of scope and cannot be operated on.")},t.save=function(e,t){var r=a.getCacheForData(e);if(r&&r.ref){var o=r.firstEntry.options,c=n.encodeData(e,o,t);return r.exists?(i.stats.writes++,i.stats.updates++,s.callbacks.onUpdate(e,c,r),r.ref.update(c)):r.ref.get().then(function(t){if(i.stats.writes++,t.exists)return i.stats.updates++,s.callbacks.onUpdate(e,c,r),r.ref.update(c);var a=n.encodeData(e,o);return i.stats.sets++,s.callbacks.onSet(e,a,r),r.ref.set(a)})}return s.callbacks.onInvalidOperation(e,"save"),Promise.reject("The given data is out of scope and cannot be operated on.")},t.update=function(e,t){var r=a.getCacheForData(e);if(r&&r.ref){var o=r.firstEntry.options,c=n.encodeData(e,o,t);return i.stats.writes++,i.stats.updates++,s.callbacks.onUpdate(e,c,r),r.ref.update(c)}return s.callbacks.onInvalidOperation(e,"update"),Promise.reject("The given data is out of scope and cannot be operated on.")},t.sync=function(e,t){var r=a.getCacheForData(e);if(r&&r.ref){var o=r.firstEntry.options,c=n.encodeData(e,o,t);return i.stats.sets++,i.stats.writes++,s.callbacks.onSet(e,c,r),r.ref.set(c)}return s.callbacks.onInvalidOperation(e,"sync"),Promise.reject("The given data is out of scope and cannot be operated on.")},t.remove=u,t.clear=function(e,t){var r=this,n=a.getCacheForData(e),c=o.getFields(t);if(n&&n.ref){for(var f=n.firstEntry.options,l=n.ref,d=l.firestore,p=[],g={},v=0,h=0,y=c;h<y.length;h++){var m=y[h];if(f.sub&&m in f.sub&&e[m])o.forEach(e[m],function(e){p.push(u.call(r,e))});else if(m in e){var b=d.app.firebase_;b&&(g[m]=b.firestore.FieldValue.delete(),v++)}}return v>0&&(i.stats.updates++,i.stats.writes++,p.push(l.update(g))),s.callbacks.onClear(e,c),Promise.all(p)}return s.callbacks.onInvalidOperation(e,"clear"),Promise.reject("The given data is out of scope and cannot be operated on.")},t.getChanges=function(e,t,r){var c=a.getCacheForData(e);if(c&&c.ref){var u=o.isFunction(t)?void 0:o.getFields(t),f=(u?r:t)||o.isEqual,l=c.firstEntry.options,d=n.encodeData(e,l,u);return i.stats.reads++,s.callbacks.onGetChanges(e,c,u),c.ref.get().then(function(e){var t=n.parseDocument(e,l),r={},o={},a=!1;for(var i in d){var s=t[i],c=d[i];f(s,c)||(a=!0,r[i]=s,o[i]=c)}return Promise.resolve({changed:a,remote:r,local:o})})}return s.callbacks.onInvalidOperation(e,"getChanges"),Promise.reject("The given data is out of scope and cannot be operated on.")},t.ref=function(e,t){var r=a.getCacheForData(e);if(r&&r.ref){var n=r.ref;return t?n.collection(t):n}throw"The given data is out of scope and cannot be referenced."},t.create=function(e,t){var r=this.build(e,t);return r&&this.sync(r),r},t.createSub=function(e,t,r){var n=this.buildSub(e,t,r);return n&&this.sync(n),n},t.build=function(e,t){var r=this.entryFor(e);if(r)return f(r.source,r,t);throw"Cannot build "+e+NaN},t.buildSub=function(e,t,r){var n=a.getCacheForData(e);if(n&&n.ref&&t in n.sub){var o=n.sub[t];return f(n.ref.collection(t),o,r)}throw"Cannot build in the sub collection "+t+NaN},t.buildFromCollection=f},function(e,t,r){"use strict";var n=this&&this.__assign||Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e};Object.defineProperty(t,"__esModule",{value:!0});var o=r(0),a=r(5),i=r(1),s=r(2),c=r(4),u=r(3);function f(e){var t=e.options,r=e.instance.system;return function(s){var f=e.target,l=n({},f);return t.onMutate(function(){return s.forEach(function(t){var n=i.getCacheForDocument(e,t,!0);a.refreshData(n,t,e),r.setProperty(f,t.id,n.data),delete l[t.id],u.callbacks.onCollectionAdd(n.data,f,e)},t.onError),o.forEach(l,function(e,t){return r.removeProperty(f,t)}),f}),o.forEach(l,function(t){u.callbacks.onCollectionRemove(t,f,e),i.removeDataFromEntry(e,t)}),t.onSuccess(f),c.updatePointers(e,s),u.callbacks.onCollectionChanged(f,e),f}}function l(e){var t=e.options,r=e.instance.system;return function(n){var o=e.target;t.onMutate(function(){return c.getChanges(n).forEach(function(n){var s=n.doc,c=i.getCacheForDocument(e,s);switch(n.type){case"modified":var f=a.refreshData(c,s,e);r.setProperty(o,s.id,f),u.callbacks.onCollectionModify(f,o,e);break;case"added":var l=a.refreshData(c,s,e);r.setProperty(o,s.id,l),u.callbacks.onCollectionAdd(l,o,e);break;case"removed":u.callbacks.onCollectionRemove(c.data,o,e),r.removeProperty(o,s.id),s.exists?i.removeCacheFromEntry(e,c):(t.propExists&&r.setProperty(c.data,t.propExists,!1),c.exists=!1,t.triggerEvent(c.data,"remove"),i.destroyCache(c))}},t.onError),o}),t.onSuccess(o),c.updatePointers(e,n),u.callbacks.onCollectionChanged(o,e)}}function d(e,t,r){var n=l(e),o=t;return function(t){o(t),r(e.target),o=n}}t.getInitialHandler=f,t.getUpdateHandler=l,t.getLiveHandler=d,t.default=function(e){var t=e.options,r=t.query?t.query(e.source):e.source;return e.requery=function(r){var n=f(e);if(e.target||(e.target=t.newCollection()),s.stats.queries++,t.once)e.promise=r.get(t.onceOptions).then(n).catch(t.onError);else{var o=function(){},a=function(){};e.promise=new Promise(function(e,t){o=e,a=t}),e.off=r.onSnapshot(t.liveOptions,d(e,n,o),function(e){a(e),t.onError(e)})}t.onPromise(e.promise)},e.requery(e.query=r),e.target}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(6),o=r(5),a=r(1),i=r(0),s=r(4),c=r(2),u=r(3);function f(e){var t=e.options,r=t.query?t.query(e.source):e.source;return e.requery=function(r){var n=l(e);if(e.target||(e.target=t.newCollection()),c.stats.queries++,t.once)e.promise=r.get(t.onceOptions).then(n).catch(t.onError);else{var o=function(){},a=function(){};e.promise=new Promise(function(e,t){o=e,a=t}),e.off=r.onSnapshot(t.liveOptions,p(e,n,o),function(e){a(e),t.onError(e)})}t.onPromise(e.promise)},e.requery(e.query=r),e.target}function l(e){var t=e.options,r=e.instance.system,c=e.target;return function(f){var l=e.target,d={};if(c)for(var p=0;p<l.length;p++){var g=l[p];d[g[n.constants.PROP_UID]]=g}return t.onMutate(function(){return r.arrayResize(l,0),f.forEach(function(t){var n=a.getCacheForDocument(e,t,!0);o.refreshData(n,t,e),r.arrayAdd(l,n.data),delete d[n.uid],u.callbacks.onCollectionAdd(n.data,l,e)},t.onError),l}),i.forEach(d,function(t){u.callbacks.onCollectionRemove(t,l,e),a.removeDataFromEntry(e,t)}),t.onSuccess(l),s.updatePointers(e,f),u.callbacks.onCollectionChanged(l,e),l}}function d(e){var t=e.options,r=e.instance.system;return function(n){var i=e.target;t.onMutate(function(){return s.getChanges(n).forEach(function(n){var s=n.doc,c=a.getCacheForDocument(e,s);switch(n.type){case"added":var f=o.refreshData(c,s,e);r.arrayInsert(i,n.newIndex,f),u.callbacks.onCollectionAdd(f,i,e);break;case"removed":r.arrayRemove(i,n.oldIndex),u.callbacks.onCollectionRemove(c.data,i,e),s.exists?a.removeCacheFromEntry(e,c):(t.propExists&&r.setProperty(c.data,t.propExists,!1),c.exists=!1,t.triggerEvent(c.data,"remove"),a.destroyCache(c));break;case"modified":var l=o.refreshData(c,s,e);n.oldIndex!==n.newIndex&&r.arrayMove(i,n.oldIndex,n.newIndex,l),u.callbacks.onCollectionModify(l,i,e)}},t.onError),r.arrayResize(i,n.size),i}),t.onSuccess(i),s.updatePointers(e,n),u.callbacks.onCollectionChanged(i,e)}}function p(e,t,r){var n=d(e),o=t;return function(t){o(t),r(e.target),o=n}}t.factory=f,t.getInitialHandler=l,t.getUpdateHandler=d,t.getLiveHandler=p,t.default=f},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(13);t.getInstance=n.getInstance,function(e){for(var r in e)t.hasOwnProperty(r)||(t[r]=e[r])}(r(6));var o=r(2);t.stats=o.stats;var a=r(3);t.callbacks=a.callbacks;var i=r(7);t.define=i.define,t.setGlobalOptions=i.setGlobalOptions,t.mergeStrategy=i.mergeStrategy,t.mergeOptions=i.mergeOptions,t.getOptions=i.getOptions;var s=r(1);t.getCacheForData=s.getCacheForData,t.destroyCache=s.destroyCache,t.destroyGlobalCache=s.destroyGlobalCache,t.default=n.getInstance},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0),o=r(8),a=r(4),i=r(1),s=r(7),c=r(3),u=r(9);function f(){var e=this;n.forEach(this.options,function(e){return delete s.globalOptions.map[e.id]}),n.forEach(this.cache,function(t){return i.removeCacheFromInstance(t,e)}),n.forEach(this.entryList,function(e){return a.closeEntry(e,!0)}),this.entry={},this.entryList=[],this.options={},this.sources={},this.cache={},c.callbacks.onInstanceDestroy(this)}function l(e){var t=this.entryFor(e);null!==t&&a.closeEntry(t,!0)}function d(e){if(n.isString(e))return this.entry[e];for(var t=this.entryList,r=0;r<t.length;r++){var o=t[r];if(o&&o.target===e)return o}return null}function p(e){for(var t=this.entryList,r=0;r<t.length;r++){var n=t[r];if(null!==n)if(!n.options.parent&&!n.name)for(var o in e)if(e[o]===n.target){n.name=o,this.entry[o]=n,this.sources[o]=n.source;break}}}t.getInstance=function(e){var t=function(e){var t=e||{};for(var r in g){var n=r;n in t||(t[n]=g[n])}return t}(e),r=function(e,t,n){return o.factory(a.getEntry(r,e,t,n))};return r.system=t,r.entry={},r.entryList=[],r.options={},r.sources={},r.cache={},r.pager=u.pager,r.more=u.more,r.hasMore=u.hasMore,r.refresh=u.refresh,r.update=u.update,r.save=u.save,r.sync=u.sync,r.remove=u.remove,r.clear=u.clear,r.getChanges=u.getChanges,r.ref=u.ref,r.create=u.create,r.createSub=u.createSub,r.build=u.build,r.buildSub=u.buildSub,r.entryFor=d,r.destroy=f,r.free=l,r.linkSources=p,c.callbacks.onInstanceCreate(r),r};var g={removeNamed:function(e){},setProperty:function(e,t,r){e[t]=r},removeProperty:function(e,t){delete e[t]},arrayRemove:function(e,t){e.splice(t,1)},arrayInsert:function(e,t,r){e.splice(t,0,r)},arrayMove:function(e,t,r,n){e.splice(t,1),e.splice(r,0,n)},arrayAdd:function(e,t){e.push(t)},arrayResize:function(e,t){e.length>t&&e.splice(t,e.length-t)}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(5),o=r(1),a=r(2),i=r(3);function s(e){var t=e.source,r=e.options,n=o.getCacheForReference(e,t,!0),i=e.target,s=!1,u=function(){},f=function(){},l=function(t){return r.onMutate(function(){return c(n,e,t),n.data}),s=!t.exists,u(n.data),n.data};return i&&i!==n.data&&o.removeDataFromEntry(e,i),e.target=n.data,a.stats.queries++,r.once?e.promise=t.get(r.onceOptions).then(l).catch(r.onError):(e.promise=new Promise(function(e,t){u=e,f=t}),e.off=t.onSnapshot(r.liveOptions,l,function(e){f(e),r.onError(e)})),r.onPromise(e.promise),s&&r.nullifyMissing?null:e.target}function c(e,t,r){var a=t.options,s=t.instance.system;r.exists?(n.refreshData(e,r,t),a.onSuccess(e.data),i.callbacks.onDocumentUpdate(e.data,t)):(a.propExists&&s.setProperty(e.data,a.propExists,!1),null===e.exists?(i.callbacks.onDocumentMissing(e.data,t),a.triggerEvent(e.data,"missing")):a.triggerEvent(e.data,"remove"),e.exists=!1,a.nullifyMissing&&(o.destroyCache(e),t.name&&s.removeNamed(t.name)))}t.factory=s,t.handleDocumentUpdate=c,t.default=s},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.stores={keyNext:0,map:{},idToKey:{}},t.getStoreKey=function(e){var r=e.firestore,n=r.app.name,o=t.stores.idToKey[n];return o||(o=++t.stores.keyNext,t.stores.map[o]=r,t.stores.idToKey[n]=o),o}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0);t.getPager=function(e){var t;return{index:0,hasQuery:function(){return!(!e.query||!e.requery)},hasData:function(){var t=e.target;if(n.isArray(t))return t.length>0;if(n.isObject(t))for(var r in t)return!0;return!1},hasNext:function(){return this.hasQuery()&&this.hasData()},hasPrev:function(){return this.hasQuery()&&this.index>0},next:function(){var r=e.query,n=e.requery,o=e.last,a=e.first,i=e.off;return r&&n&&o&&this.hasData()&&(i&&i(),delete e.off,delete e.last,this.index++,t=a,n(r.startAfter(o)),e.promise)?e.promise:Promise.reject("The pager could not execute next")},prev:function(){var r=e.query,n=e.requery,o=e.first,a=e.off;return r&&n&&(o||t)&&this.index>0&&(a&&a(),delete e.off,this.index--,o?(delete e.first,n(r.endBefore(o))):(n(r.startAt(t)),t=void 0),e.promise)?e.promise:Promise.reject("The pager could not execute prev")}}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(4),o=r(2),a=r(11),i=r(10);function s(e){var t=e.options;if(!t.query)throw"query is required for streaming";if(!t.streamInitial)throw"streamInitial is required for streaming";var r=t.query(e.source);return e.requery=function(r){var n=t.map?i.getInitialHandler(e):a.getInitialHandler(e),s=t.streamInitial;e.target||(e.target=t.newCollection()),o.stats.queries++,e.hasMore=!0,e.promise=r.limit(s).get(t.onceOptions).then(function(t){o.stats.queries++,e.hasMore=t.size>=s,n(t),c(e,n,r)}).catch(t.onError)},e.more=function(s){var u=s||t.streamMore;if(!u||u<0)throw"streamMore is required for streaming";if(!e.last||!e.hasMore)return Promise.reject("There are no more results to load.");var f=t.map?i.getInitialHandler(e):a.getInitialHandler(e);return r.startAfter(e.last).limit(u).get(t.onceOptions).then(function(t){o.stats.queries++,e.hasMore=t.size>=u,n.updatePointers(e,t),c(e,f,r)}).catch(t.onError)},e.requery(e.query=r),e.target}function c(e,t,r){var n=e.options,o=function(){},s=function(){};e.promise=new Promise(function(e,t){o=e,s=t});var c=n.map?i.getLiveHandler(e,t,o):a.getLiveHandler(e,t,o);e.off&&e.off(),e.last&&(r=r.endAt(e.last)),e.off=r.onSnapshot(n.liveOptions,c,function(e){s(e),n.onError(e)}),n.onPromise(e.promise)}t.factory=s,t.default=s}])});
//# sourceMappingURL=fiery-data.js.map