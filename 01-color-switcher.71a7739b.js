!function(){var t,n=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),o=document.body;n.addEventListener("click",(function(){t||(t=setInterval((function(){o.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3)),n.disable=!0})),e.addEventListener("click",(function(){clearInterval(t),t=null,n.disable=!1}))}();
//# sourceMappingURL=01-color-switcher.71a7739b.js.map
