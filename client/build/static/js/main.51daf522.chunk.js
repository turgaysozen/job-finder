(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{53:function(e,t,a){e.exports=a(75)},58:function(e,t,a){},60:function(e,t,a){},75:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(9),o=a.n(r),c=(a(58),a(20)),i=a(36),s=a.n(i),u=(a(60),a(47)),m=a(102);function d(e){var t=e.job,a=e.counter,n=e.handleClick;return l.a.createElement("div",null,l.a.createElement(u.a,{className:"counter",variant:"h6"},a+1),!0===t.url.includes("github")?l.a.createElement(u.a,{style:{fontSize:"11px",marginTop:"10px",color:"blue",fontWeight:"bold"}},"Source: Github"):!0===t.url.includes("stackoverflow")?l.a.createElement(u.a,{style:{fontSize:"11px",marginTop:"10px",color:"blue",fontWeight:"bold"}},"Source: Stackoverflow"):"",l.a.createElement(m.a,{onClick:n,style:{backgroundColor:"#f1f1f1"},className:"job"},l.a.createElement("div",null,l.a.createElement(u.a,{variant:"h5"},t.title),l.a.createElement(u.a,{variant:"h6"},t.company),l.a.createElement(u.a,null,t.location),l.a.createElement(u.a,{style:{fontSize:"12px"},className:"tags"},t.categories)),l.a.createElement("div",null,l.a.createElement("img",{alt:"",style:{height:"60x",width:"60px"},src:t.company_logo}),l.a.createElement(u.a,{style:{fontSize:"12px"},className:"postedDay"},t.diffDays<1?"Today Posted":1===t.diffDays?"Yesterday Posted":t.diffDays+" Day Ago Posted"))))}var f=a(111),p=a(110),E=a(107),h=a(105),b=a(106),g=a(104),v=a(103),y=l.a.forwardRef((function(e,t){return l.a.createElement(v.a,Object.assign({direction:"up",ref:t},e))}));function w(e){var t=e.job,a=e.open,n=e.handleClose,r=e.howToApplyStr;return""===t.title?l.a.createElement("div",null):l.a.createElement("div",null,l.a.createElement(p.a,{fullWidth:!0,maxWidth:"md",open:a,TransitionComponent:y,keepMounted:!0,onClose:n,"aria-labelledby":"alert-dialog-slide-title","aria-describedby":"alert-dialog-slide-description"},l.a.createElement(g.a,{id:"alert-dialog-slide-title"},l.a.createElement("div",null,l.a.createElement("label",{style:{fontSize:"30px"}},t.title),l.a.createElement("img",{style:{height:"40px",float:"right",marginRight:"50px"},alt:"",src:t.company_logo}))),l.a.createElement(h.a,null,l.a.createElement(b.a,{id:"alert-dialog-slide-description",dangerouslySetInnerHTML:{__html:t.description}})),l.a.createElement(E.a,null,l.a.createElement(f.a,{onClick:n,color:"primary"},"Close"),l.a.createElement(f.a,{color:"primary"},l.a.createElement("a",{target:"_blank",href:r},"Apply")))))}var x,S=a(108),j=a(109),C=a(112),k=a(39),D=a.n(k),T=a(40),N=a.n(T),O=Object(S.a)({root:{maxWidth:600,flexGrow:1}});function L(e){var t=e.jobs,a=l.a.useState({}),n=Object(c.a)(a,2),r=n[0],o=n[1],i=l.a.useState(!1),s=Object(c.a)(i,2),m=s[0],p=s[1],E=O(),h=Object(j.a)(),b=l.a.useState(0),g=Object(c.a)(b,2),v=g[0],y=g[1],x=l.a.useState(""),S=Object(c.a)(x,2),k=S[0],T=S[1],L=l.a.useState(!1),_=Object(c.a)(L,2),A=_[0],z=_[1];function M(e){var t=-window.scrollY/(e/15),a=setInterval((function(){0!==window.scrollY?window.scrollBy(0,t):clearInterval(a)}),15)}t.map((function(e){var t=new Date,a=new Date(t.toString()).getTime(),n=new Date(e.lastAdded).getTime(),l=Math.floor((a-n)/864e5);return e.diffDays=l})),t.sort((function(e,t){return e.diffDays-t.diffDays}));var I="";t=t.filter((function(e,t){if(0===t){var a=(new Date).toISOString(),n=Math.floor(Math.abs(new Date(a).getTime()+108e5-new Date(e.lastAdded).getTime())/36e5);I=0===n?1:n>24?n-24:n}return e.diffDays<101}));var J=null;void 0!==r.how_to_apply&&(J=""===r.how_to_apply?r.url:r.how_to_apply.split('"')[1]),t=t.filter((function(e){var t=e.description.toLowerCase(),a=e.title.toLowerCase();return!(!t.includes(k.toLocaleLowerCase())&&!a.includes(k.toLocaleLowerCase()))})),A&&(t=t.filter((function(e){var t=e.title.toLowerCase(),a=void 0!==e.location?e.location.toLowerCase():"";return!(!t.includes("remote")&&!a.includes("remote"))}))),console.log(t);var B=t.slice(25*v,25*(v+1));return l.a.createElement("div",{className:"jobs"},l.a.createElement(w,{open:m,job:r,handleClose:function(){p(!1)},howToApplyStr:J}),l.a.createElement(u.a,{className:"JobsTitle",variant:"h2"},l.a.createElement("a",{className:"JobsTitle",href:"/"},"Jobs")),l.a.createElement("br",null),l.a.createElement(u.a,{style:{fontSize:"28px",marginTop:"20px",marginBottom:"10px"}},"Options"),l.a.createElement(u.a,{className:"jobfilter"},l.a.createElement("label",null,l.a.createElement("input",{onClick:function(){return z(!A)},type:"checkbox"})," Remote"),l.a.createElement("input",{onInput:function(e){return T(e.target.value)},placeholder:"search job"})),l.a.createElement("div",{className:"updateInfo"},l.a.createElement("b",null,"Last Updated: ",1===I?I+" Hour Ago":I+" Hours Ago")),l.a.createElement("hr",null),l.a.createElement("div",{className:"jobCount"},0!==t.length?"Total "+t.length+" Jobs Listed":null),B.map((function(e,t,a){return l.a.createElement(d,{handleClick:function(){p(!0),o(e)},key:t+25*v,job:e,counter:t+25*v,diffDays:a})})),l.a.createElement("div",null,"Page ",v+1," of ",Math.ceil(t.length/25)),l.a.createElement(C.a,{variant:"progress",steps:Math.ceil(t.length/25),position:"static",activeStep:v,className:E.root,nextButton:l.a.createElement(f.a,{size:"small",onClick:function(){y((function(e){return e+1})),M(300)},disabled:v===Math.ceil(t.length/25)-1},"Next","rtl"===h.direction?l.a.createElement(D.a,null):l.a.createElement(N.a,null)),backButton:l.a.createElement(f.a,{size:"small",onClick:function(){y((function(e){return e-1})),M(300)},disabled:0===v},"rtl"===h.direction?l.a.createElement(N.a,null):l.a.createElement(D.a,null),"Back")}))}x="/jobs";var _=function(){var e=l.a.useState([]),t=Object(c.a)(e,2),a=t[0],n=t[1];return l.a.useEffect((function(){!function(e){var t,a;s.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,s.a.awrap(fetch(x));case 2:return t=n.sent,n.next=5,s.a.awrap(t.json());case 5:a=n.sent,console.log("Hello"),console.log(a),e(JSON.parse(a));case 9:case"end":return n.stop()}}))}(n)}),[]),l.a.createElement("div",{className:"App"},l.a.createElement(L,{jobs:a}))};o.a.render(l.a.createElement(_,null),document.getElementById("root"))}},[[53,1,2]]]);
//# sourceMappingURL=main.51daf522.chunk.js.map