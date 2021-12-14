(function(t){function e(e){for(var a,s,r=e[0],c=e[1],l=e[2],u=0,v=[];u<r.length;u++)s=r[u],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&v.push(i[s][0]),i[s]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);d&&d(e);while(v.length)v.shift()();return n.push.apply(n,l||[]),o()}function o(){for(var t,e=0;e<n.length;e++){for(var o=n[e],a=!0,r=1;r<o.length;r++){var c=o[r];0!==i[c]&&(a=!1)}a&&(n.splice(e--,1),t=s(s.s=o[0]))}return t}var a={},i={app:0},n=[];function s(e){if(a[e])return a[e].exports;var o=a[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,s),o.l=!0,o.exports}s.m=t,s.c=a,s.d=function(t,e,o){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(o,a,function(e){return t[e]}.bind(null,a));return o},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=e,r=r.slice();for(var l=0;l<r.length;l++)e(r[l]);var d=c;n.push([0,"chunk-vendors"]),o()})({0:function(t,e,o){t.exports=o("cd49")},"421a":function(t,e,o){"use strict";o("ef7d")},4631:function(t,e,o){"use strict";o("9864")},9864:function(t,e,o){},cd49:function(t,e,o){"use strict";o.r(e);var a=o("2b0e"),i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-app",[o("Header"),o("v-main",[o("v-container",[o("router-view",{attrs:{selectedBook:t.selectedBook,books:t.books,"is-duplicate-book":t.isDuplicateBook},on:{"delete-local-storage":t.deleteLocalStorage,"add-book-list":t.addBook,"update-book-info":t.updateBookInfo,"show-edit-page":t.showEditPage,"delete-book":t.deleteBook,"close-dialog":function(e){t.isDuplicateBook=!1}}})],1)],1)],1)},n=[],s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("v-app-bar",{attrs:{app:"",color:"primary",dark:""}},[o("v-app-bar-nav-icon",{on:{click:function(e){t.drawer=!0}}}),o("v-toolbar-title",[t._v(" Book Search App ")]),o("v-spacer")],1),o("v-navigation-drawer",{attrs:{absolute:"",temporary:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[o("v-list-item",[o("v-list-item-content",[o("v-list-item-title",{staticClass:"text-h6"},[t._v(" Book Seach App ")]),o("v-list-item-subtitle",[t._v(" broden your knowledge ")])],1)],1),o("v-divider"),o("v-list",{attrs:{nav:"",dense:""}},[o("v-list-item-group",{attrs:{"active-class":"blue lighten-4"},model:{value:t.selectedItem,callback:function(e){t.selectedItem=e},expression:"selectedItem"}},t._l(t.items,(function(e,a){return o("v-list-item",{key:a,attrs:{to:e.url}},[o("v-list-item-icon",[o("v-icon",[t._v(t._s(e.icon))])],1),o("v-list-item-title",[t._v(t._s(e.name))])],1)})),1)],1)],1)],1)},r=[],c=a["a"].extend({name:"Header",data:function(){return{drawer:!1,items:[{name:"Search Books",icon:"mdi-book-search",url:"/search"},{name:"My Books",icon:"mdi-bookshelf",url:"/"}],selectedItem:-1}}}),l=c,d=o("2877"),u=o("6544"),v=o.n(u),m=o("40dc"),h=o("5bc1"),p=o("ce7e"),f=o("132d"),k=o("8860"),b=o("da13"),g=o("5d23"),w=o("1baa"),y=o("34c3"),x=o("f774"),_=o("2fa4"),S=o("2a7f"),V=Object(d["a"])(l,s,r,!1,null,null,null),B=V.exports;v()(V,{VAppBar:m["a"],VAppBarNavIcon:h["a"],VDivider:p["a"],VIcon:f["a"],VList:k["a"],VListItem:b["a"],VListItemContent:g["a"],VListItemGroup:w["a"],VListItemIcon:y["a"],VListItemSubtitle:g["b"],VListItemTitle:g["c"],VNavigationDrawer:x["a"],VSpacer:_["a"],VToolbarTitle:S["a"]});var C="books",I=a["a"].extend({name:"App",components:{Header:B},data:function(){return{books:[],newBook:"",selectedBook:{id:"",title:"",image:"",description:"",readDate:"",memo:""},isDuplicateBook:!1}},mounted:function(){if(localStorage.getItem(C))try{this.books=JSON.parse(localStorage.getItem(C)||"{}")}catch(t){localStorage.removeItem(C)}},methods:{addBook:function(t){var e={id:t.id,title:t.title,image:t.img,description:t.description,readDate:"",memo:""},o=this.checkIsDuplicate(e);o?this.isDuplicateBook=!0:this.goToEditPage(e)},removeBook:function(t){this.books.splice(t,1),this.saveBooks()},saveBooks:function(){var t=JSON.stringify(this.books);localStorage.setItem(C,t)},updateBookInfo:function(t){var e=-1,o={id:"",title:"",image:"",description:"",readDate:"",memo:""},a=!0;this.books.forEach((function(i,n){i.id===t.id&&(e=n,o=i,a=!1)}));var i={id:a?t.id:o.id,readDate:t.readDate,memo:t.memo,title:a?t.title:o.title,image:a?t.image:o.image,description:a?t.description:o.description};a?this.books.push(i):this.books.splice(e,1,i),this.saveBooks(),this.$router.push("/")},goToEditPage:function(t){this.selectedBook=t,this.$router.push("/edit/"+t.id)},showEditPage:function(t){this.goToEditPage(t)},deleteBook:function(t){var e=this,o="";try{o=JSON.parse(localStorage.getItem(C)||"{}")}catch(a){console.log(a)}o.forEach((function(a,i){if(t.id===a.id){o.splice(i,1),e.books.splice(i,1),localStorage.removeItem(C);var n=JSON.stringify(e.books);localStorage.setItem(C,n),window.location.reload()}}))},deleteLocalStorage:function(){var t="Are you sure?\nAll of the books in My Books are going to be deleted.";window.confirm(t)&&(localStorage.setItem(C,""),localStorage.removeItem(C),this.books=[],window.location.reload())},checkIsDuplicate:function(t){var e=this.books.filter((function(e){return t.id===e.id})),o=!!e.length;return o}}}),D=I,R=o("7496"),O=o("a523"),j=o("f6c4"),T=Object(d["a"])(D,i,n,!1,null,null,null),E=T.exports;v()(T,{VApp:R["a"],VContainer:O["a"],VMain:j["a"]});var L=o("8c4f"),P=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("v-row",[o("v-col",{staticClass:"text-h6 d-flex align-center"},[o("v-icon",{staticClass:"mr-2"},[t._v(" mdi-bookshelf ")]),t._v(" My Books "),o("v-spacer"),o("v-btn",{directives:[{name:"show",rawName:"v-show",value:t.books.length,expression:"books.length"}],attrs:{color:"error"},on:{click:t.deleteLocalStorage}},[o("v-icon",{attrs:{dark:"",left:""}},[t._v(" mdi-delete ")]),t._v(" Delete all ")],1)],1)],1),t.books.length?o("v-row",t._l(t.books,(function(e){return o("v-col",{key:e.id,attrs:{cols:"12",sm:"6"}},[o("v-card",{staticStyle:{height:"250px"}},[o("v-container",[o("v-row",[o("v-col",{staticClass:"d-flex align-center justify-center",staticStyle:{height:"250px"},attrs:{cols:"4"}},[o("v-img",{staticStyle:{"max-height":"230px",width:"auto","max-width":"200px"},attrs:{src:e.image}})],1),o("v-col",{attrs:{cols:"8"}},[o("div",{staticStyle:{"min-height":"120px"}},[o("v-card-title",{staticClass:"pa-0 my-2 trancate-one-line font-weight-bold"},[t._v(" "+t._s(e.title)+" ")]),o("div",{staticClass:"caption grey--text text--darken-1"},[t._v(" finished date ")]),o("div",{staticClass:"body-1 mb-1"},[t._v(" "+t._s(t.utils_.formatDate(e.readDate))+" ")]),o("div",{staticClass:"caption grey--text text--darken-1"},[t._v("comment")]),o("div",{staticClass:"trancate-one-line body-1"},[t._v(" "+t._s(e.memo?e.memo:"no comment")+" ")])],1),o("v-spacer"),o("v-divider",{staticClass:"pa-0 mt-5"}),o("v-card-actions",{staticClass:"justify-end"},[o("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(a){var i=a.on;return[o("v-btn",t._g({staticClass:"mr-4",attrs:{color:"indigo",fab:"",dark:""},on:{click:function(o){return t.goToEdit(e)}}},i),[o("v-icon",[t._v(" mdi-pencil ")])],1)]}}],null,!0)},[o("span",[t._v("edit this book")])]),o("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(a){var i=a.on;return[o("v-btn",t._g({attrs:{fab:"",dark:"",color:"indigo"},on:{click:function(o){return t.deleteBook(e)}}},i),[o("v-icon",{attrs:{dark:""}},[t._v(" mdi-delete ")])],1)]}}],null,!0)},[o("span",[t._v("delete from My Books")])])],1)],1)],1)],1)],1)],1)})),1):o("v-row",[o("v-col",[o("div",[t._v("there are no books.")]),o("div",{staticClass:"d-flex align-center justify-start"},[o("v-btn",{staticClass:"pl-0",attrs:{text:"",color:"primary",to:"/search"}},[o("v-icon",{attrs:{left:"",color:"primary"}},[t._v(" mdi-arrow-right ")]),t._v(" go to Search Books page ")],1)],1)])],1)],1)},$=[],N=o("5a0c"),M=o.n(N),A={formatDate:function(t,e){return e?M()(t).format(e):M()(t).format("YYYY/MM/DD")}},J=a["a"].extend({name:"BookIndex",data:function(){return{utils_:void 0}},props:{books:{type:Array,default:function(){return[]}}},created:function(){this.utils_=A},methods:{deleteBook:function(t){var e="Are you sure to delete this book?";window.confirm(e)&&this.$emit("delete-book",t)},goToEdit:function(t){this.$emit("show-edit-page",t)},deleteLocalStorage:function(){this.$emit("delete-local-storage")}}}),Y=J,q=(o("421a"),o("8336")),H=o("b0af"),F=o("99d9"),G=o("62ad"),U=o("adda"),z=o("0fd9"),K=o("3a2f"),Q=Object(d["a"])(Y,P,$,!1,null,"f9e188b0",null),W=Q.exports;v()(Q,{VBtn:q["a"],VCard:H["a"],VCardActions:F["a"],VCardTitle:F["c"],VCol:G["a"],VContainer:O["a"],VDivider:p["a"],VIcon:f["a"],VImg:U["a"],VRow:z["a"],VSpacer:_["a"],VTooltip:K["a"]});var X=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("v-row",[o("v-col",{attrs:{cols:"12"}},[o("v-card",{staticClass:"mx-auto"},[o("v-container",[o("v-row",[o("v-col",{attrs:{cols:"4"}},[o("v-img",{attrs:{src:t.book.image}})],1),o("v-col",{attrs:{cols:"8"}},[o("v-card-title",{staticClass:"font-weight-bold "},[t._v(" "+t._s(t.book.title)+" ")]),o("v-card-text",[o("v-menu",{attrs:{"close-on-content-click":!1,"nudge-right":40,transition:"scale-transition","offset-y":"","min-width":"auto"},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,i=e.attrs;return[o("v-text-field",t._g(t._b({attrs:{value:t.utils_.formatDate(t.book.readDate),label:"finished date",placeholder:"select date","prepend-icon":"mdi-calendar",readonly:""}},"v-text-field",i,!1),a))]}}]),model:{value:t.menu,callback:function(e){t.menu=e},expression:"menu"}},[o("v-date-picker",{on:{input:function(e){t.menu=!1}},model:{value:t.book.readDate,callback:function(e){t.$set(t.book,"readDate",e)},expression:"book.readDate"}})],1),o("v-textarea",{staticClass:"mx-2",attrs:{label:"comment",filled:"",name:"comment"},model:{value:t.book.memo,callback:function(e){t.$set(t.book,"memo",e)},expression:"book.memo"}},[t._v(" "+t._s(t.book.memo)+" ")]),o("v-card-actions",[o("v-btn",{attrs:{color:"primary"},on:{click:t.updateBookInfo}},[t._v("save")])],1)],1)],1)],1)],1)],1)],1)],1)],1)},Z=[],tt=a["a"].extend({name:"BookEdit",data:function(){return{book:{id:"",title:"",image:"",description:"",readDate:"",memo:""},date:"",menu:!1,utils_:void 0}},methods:{updateBookInfo:function(){this.$emit("update-book-info",this.book)}},props:{selectedBook:{type:Object}},created:function(){this.utils_=A},beforeRouteEnter:function(t,e,o){o((function(t){t.$nextTick((function(){t.book=t.selectedBook,t.book.readDate?t.date=t.book.readDate:t.book.readDate=(new Date).toISOString().substr(0,10)}))}))}}),et=tt,ot=o("2e4b"),at=o("e449"),it=o("8654"),nt=o("a844"),st=Object(d["a"])(et,X,Z,!1,null,null,null),rt=st.exports;v()(st,{VBtn:q["a"],VCard:H["a"],VCardActions:F["a"],VCardText:F["b"],VCardTitle:F["c"],VCol:G["a"],VContainer:O["a"],VDatePicker:ot["a"],VImg:U["a"],VMenu:at["a"],VRow:z["a"],VTextField:it["a"],VTextarea:nt["a"]});var ct=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("v-row",[o("v-col",{staticClass:"text-h6 d-flex align-center"},[o("v-icon",{staticClass:"mr-2"},[t._v(" mdi-book-search ")]),t._v(" Search Books ")],1)],1),o("v-row",[o("v-col",{attrs:{cols:"12",sm:"6"}},[o("v-radio-group",{staticClass:"mt-0",attrs:{row:"",mandatory:""},model:{value:t.selectedRadio,callback:function(e){t.selectedRadio=e},expression:"selectedRadio"}},[o("v-radio",{attrs:{label:"search by book title"}}),o("v-radio",{attrs:{label:"search by author name"}})],1),o("div",{staticClass:"d-flex align-center pt-0"},[o("v-text-field",{attrs:{label:0===t.selectedRadio?"book title":"author name",placeholder:0===t.selectedRadio?"search by book title":"search by author name",filled:"",dense:"","hide-details":"auto"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(t.keyword)}},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}}),o("v-btn",{staticClass:"ml-10",attrs:{color:"primary"},on:{click:function(e){return t.search(t.keyword)}}},[t._v(" Search ")])],1)],1)],1),o("v-row",[o("v-col",[o("v-divider"),o("div",{staticClass:"d-flex align-center my-3"},[o("v-icon",{staticClass:"mr-2"},[t._v("mdi-book-multiple")]),o("div",{staticClass:"text-h6"},[t._v("Result")]),o("v-spacer"),o("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowResult,expression:"isShowResult"}]},[o("div",{staticStyle:{"white-text":"nowrap"}},[t._v(" "+t._s(t.isShowResult?t.currentItems[0].index+1:"")+"- "+t._s(t.totalBookNum())+" / "+t._s(t.maxSearchResults)+" ")])])],1),o("v-row",t._l(t.currentItems,(function(e){return o("v-col",{key:e.id,attrs:{cols:"12",md:"6"}},[o("v-card",{staticStyle:{height:"250px"}},[o("v-container",[o("v-row",[o("v-col",{staticClass:"d-flex align-center justify-center",staticStyle:{height:"250px"},attrs:{cols:"4"}},[o("v-img",{staticStyle:{"max-height":"230px",width:"auto","max-width":"200px"},attrs:{src:e.img}})],1),o("v-col",{attrs:{cols:"8"}},[o("div",{staticStyle:{"min-height":"120px"}},[o("v-card-title",{staticClass:"pa-0 my-2 trancate-one-line font-weight-bold"},[t._v(" "+t._s(e.title)+" ")]),o("div",{staticClass:"trancate-three-line"},[t._v(" "+t._s(e.description?e.description:"no description")+" ")])],1),o("v-spacer"),o("v-divider",{staticClass:"pa-0 mt-5"}),o("v-card-actions",{staticClass:"justify-end"},[o("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(a){var i=a.on;return[o("v-btn",t._g({attrs:{fab:"",dark:"",color:"indigo"},on:{click:function(o){return t.addBookList(e)}}},i),[o("v-icon",{attrs:{dark:""}},[t._v(" mdi-plus ")])],1)]}}],null,!0)},[o("span",[t._v("add to My Books")])])],1)],1)],1)],1)],1)],1)})),1)],1)],1),o("v-row",{directives:[{name:"show",rawName:"v-show",value:t.isShowResult,expression:"isShowResult"}]},[o("v-col",[o("div",{staticClass:"text-center"},[o("v-pagination",{attrs:{length:t.pagenationLength},on:{input:t.onChangePageNumber},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}})],1)])],1),o("v-row",{directives:[{name:"show",rawName:"v-show",value:!t.currentItems,expression:"!currentItems"}]},[o("v-col",[o("div",[t._v(" there are no results for your search. ")])])],1),o("v-dialog",{attrs:{"max-width":"500px"},model:{value:t.isDialogOpen,callback:function(e){t.isDialogOpen=e},expression:"isDialogOpen"}},[o("v-card",[o("v-container",[o("v-card-title",[t._v(" this book is already in My Books. ")]),o("v-card-actions",[o("v-btn",{attrs:{color:"primary",text:""},on:{click:t.closeDialog}},[t._v(" Close ")])],1)],1)],1)],1)],1)},lt=[],dt=o("9ab4"),ut=a["a"].extend({name:"BookSearch",data:function(){return{keyword:"",searchResults:[],page:1,maxSearchResults:30,chunk:10,pagenationLength:0,isShowResult:!1,currentItems:[],isDialogOpen:!1,selectedRadio:1}},props:{isDuplicateBook:{type:Boolean}},watch:{isDuplicateBook:{immediate:!0,handler:function(){this.isDialogOpen=!!this.isDuplicateBook}}},created:function(){this.pagenationLength=this.maxSearchResults/10,this.currentItems=[],this.searchResults=[]},methods:{onChangePageNumber:function(){this.currentItems=this.searchResults?this.searchResults[this.page-1]:[]},search:function(t){return Object(dt["a"])(this,void 0,void 0,(function(){var e,o,a,i,n,s;return Object(dt["b"])(this,(function(r){switch(r.label){case 0:return this.isShowResult=!1,this.searchResults=[],e="https://www.googleapis.com/books/v1/volumes?",o={q:"",maxResults:this.maxSearchResults},0===this.selectedRadio?o.q="intitle:"+t:o.q="inauthor:"+t,a=new URLSearchParams(o),[4,fetch(e+a).then((function(t){return t.json()}))];case 1:if(i=r.sent(),n=[],i.items){for(i.items.forEach((function(t,e){var o=t.volumeInfo.title,a=t.volumeInfo.imageLinks,i=t.volumeInfo.description,s=t.id;n.push({title:o||"",img:a?a.thumbnail:"",description:i?i.slice(0,150):"",id:s,index:e})})),s=0;s<n.length;s+=this.chunk)this.searchResults.push(n.slice(s,s+this.chunk));this.isShowResult=!0}return this.onChangePageNumber(),[2]}}))}))},addBookList:function(t){this.$emit("add-book-list",t)},totalBookNum:function(){var t=0;return this.currentItems&&(t=this.currentItems.length>9?this.currentItems[this.chunk-1].index+1:this.currentItems.length),t},closeDialog:function(){this.isDialogOpen=!1,this.$emit("close-dialog")}}}),vt=ut,mt=(o("4631"),o("169a")),ht=o("891e"),pt=o("67b6"),ft=o("43a6"),kt=Object(d["a"])(vt,ct,lt,!1,null,"295580e4",null),bt=kt.exports;v()(kt,{VBtn:q["a"],VCard:H["a"],VCardActions:F["a"],VCardTitle:F["c"],VCol:G["a"],VContainer:O["a"],VDialog:mt["a"],VDivider:p["a"],VIcon:f["a"],VImg:U["a"],VPagination:ht["a"],VRadio:pt["a"],VRadioGroup:ft["a"],VRow:z["a"],VSpacer:_["a"],VTextField:it["a"],VTooltip:K["a"]}),a["a"].use(L["a"]);var gt=[{path:"/",name:"BookIndex",component:W},{path:"/search",name:"BookSearch",component:bt},{path:"/edit/:id",name:"BookEdit",component:rt},{path:"*",redirect:"/"}],wt=new L["a"]({routes:gt}),yt=wt,xt=o("f309");a["a"].use(xt["a"]);var _t=new xt["a"]({});a["a"].config.productionTip=!1,new a["a"]({router:yt,vuetify:_t,render:function(t){return t(E)}}).$mount("#app")},ef7d:function(t,e,o){}});
//# sourceMappingURL=app.a45f79f5.js.map