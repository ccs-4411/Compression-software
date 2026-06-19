/*! coi-serviceworker v0.1.7 | MIT License | https://github.com/gzuidhof/coi-serviceworker */
let n=navigator;if("serviceWorker" in n){let e=n.serviceWorker;e.controller?e.controller.postMessage("ping"):e.register(window.document.currentScript.src).then((n=>n.installing||n.waiting||e.addEventListener("controllerchange",(()=>window.location.reload()))))}
