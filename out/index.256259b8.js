var e=document.querySelector("#theme-bullets div:nth-child(1)"),t=document.querySelector("#theme-bullets div:nth-child(2)"),n=document.querySelector("#theme-bullets div:nth-child(3)"),o=document.querySelector("#bullet");e.addEventListener("click",(function(){o.style.marginRight="0",document.body.classList.remove("theme2","theme3")})),t.addEventListener("click",(function(){o.style.marginRight="-45px",document.body.classList.remove("theme1","theme3"),document.body.classList.add("theme2")})),n.addEventListener("click",(function(){o.style.marginRight="-90px",document.body.classList.remove("theme2","theme1"),document.body.classList.add("theme3")}));var l=document.querySelector("section span"),c="",r=[],i=0,d=!1,s=!1;function u(){0===r.length&&(c="0"),l.textContent=c}function a(e,t){return parseFloat(e)+parseFloat(t)}function m(e,t){return parseFloat(e)*parseFloat(t)}function h(e,t){return parseFloat(e)/parseFloat(t)}document.querySelectorAll(".value").forEach((e=>{e.addEventListener("click",(function(){var e=this.textContent;console.log(d),d?(s=!1,r.length=0,r[i=0]=e,d=!1):r[i]?r[i]+=e:r[i]=e,console.log(r),c=s?r.map((e=>0===r.indexOf(e)?Math.round(1e4*e)/1e4:e)).join(""):r.join(""),u()}))})),document.querySelectorAll(".operand").forEach((e=>{e.addEventListener("click",(function(){d=!1;var e=this.textContent;r[i]?(i++,r[i]=e,i++):(r[i]=e,i++),console.log(r),c=s?r.map((e=>0===r.indexOf(e)?Math.round(1e4*e)/1e4:e)).join(""):r.join(""),u()}))})),document.querySelector("#del").addEventListener("click",(function(){i&&i--,r.pop(),c=s?r.map((e=>0===r.indexOf(e)?Math.round(1e4*e)/1e4:e)).join(""):r.join(""),u(),console.log(r)})),document.querySelector("#reset").addEventListener("click",(function(){r.length=0,i=0,u(),console.log(r),s=!1})),document.querySelector("#equals").addEventListener("click",(function(){!function(){if("-"===r[0]||"+"===r[0]||"x"===r[0]||"/"===r[0])return c="ERROR",u(),r.length=0,void(i=0);var e;for(;-1!=(e=r.indexOf("/"));){if(0===parseFloat(r[e+1]))return c="ERROR",u(),r.length=0,i=0,void console.log(r);r[e]="x",r[e+1]=h(1,r[e+1])}console.log(r);for(;-1!=(e=r.indexOf("x"));){var t=m(r[e-1],r[e+1]);r.splice(e,2),r[e-1]=t}console.log(r);for(;-1!=(e=r.indexOf("-"));)r[e]="+",r[e+1]=m(-1,r[e+1]);console.log(r);for(;-1!=(e=r.indexOf("+"));){var n=a(r[e-1],r[e+1]);r.splice(e,2),r[e-1]=n}if(console.log(r),r.includes(NaN))return c="ERROR",u(),r.length=0,i=0,void console.log(r);c=Math.round(1e4*r[0])/1e4,u(),i=0,console.log(r)}(),d=!0,s=!0}));