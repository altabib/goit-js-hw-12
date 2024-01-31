import{S,i as l,a as b}from"./assets/vendor-527658dd.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const t of s)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(s){const t={};return s.integrity&&(t.integrity=s.integrity),s.referrerPolicy&&(t.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?t.credentials="include":s.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(s){if(s.ep)return;s.ep=!0;const t=o(s);fetch(s.href,t)}})();const m="/goit-js-hw-12/assets/octagon-fdf1437b.svg",k=document.querySelector(".form"),c=document.querySelector(".gallery"),d=document.querySelector(".loader"),n=document.querySelector("#next-btn");let u=0,f=null;const h=new S(".gallery a",{captionsData:"alt",captionDelay:250});k.addEventListener("submit",$);n.addEventListener("click",v);async function $(e){e.preventDefault();const r=e.currentTarget.elements.input.value;f=r,u=1,n.classList.add("is-hidden");const o=e.currentTarget;if(c.innerHTML="",!r.trim()){l.show({title:"❕",theme:"light",message:"Please, fill in the search field",messageSize:"20px",messageColor:"#808080",backgroundColor:"#e7fc44",position:"topRight",timeout:3e3});return}d.classList.remove("is-hidden");try{const i=await g();if(i.hits.length===0){l.show({iconUrl:m,theme:"dark",message:"Sorry, there are no images matching your search query. Please try again!",messageSize:"16px",messageColor:"white",backgroundColor:"#EF4040",position:"topRight",timeout:5e3}),o.reset();return}c.innerHTML=y(i.hits),h.refresh(),i.hits.length>=40&&n.classList.remove("is-hidden"),p(),o.reset()}catch(i){L(i)}finally{d.classList.add("is-hidden")}}async function g(){const e="https://pixabay.com/api",r=new URLSearchParams({key:"41943973-f526c1169a7b37d0261d5a9a5",image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:40});return(await b.get(`${e}/?${r}&q=${f}&page=${u}`)).data}function y(e){return e.map(({webformatURL:r,largeImageURL:o,tags:i,likes:s,views:t,comments:a,downloads:w})=>`<li class="gallery-item">
        <a class="gallery-link" href="${o}">
           <img
            class="gallery-image"
            src="${r}"
            alt="${i}"
          />
        </a>
        <div class="container-additional-info">
        <div class="container-descr-inner"><p class="description">Likes</p><span class="description-value">${s}</span></div>
        
        <div class="container-descr-inner"><p class="description">Views</p><span class="description-value">${t}</span></div>
        

        <div class="container-descr-inner"><p class="description">Comments</p><span class="description-value">${a}</span></div>
        

        <div class="container-descr-inner"><p class="description">Downloads</p><span class="description-value">${w}</span></div>
        
        </div>
      </li>`).join("")}function L(e){console.error(e),c.innerHTML="",l.show({iconUrl:m,theme:"dark",message:e.stack,messageSize:"16px",messageColor:"white",backgroundColor:"#EF4040",position:"topRight",timeout:5e3}),n.removeEventListener("click",v),n.classList.add("is-hidden")}async function v(){d.classList.remove("is-hidden"),n.classList.add("is-hidden"),u+=1;try{const e=await g();if(u*40>=e.totalHits){l.show({title:"❕",theme:"dark",message:"We're sorry, but you've reached the end of search results.",messageSize:"16px",messageColor:"white",backgroundColor:"#4e75ff",position:"topRight",timeout:5e3}),c.insertAdjacentHTML("beforeend",markup),h.refresh(),n.classList.add("is-hidden"),p();return}c.innerHTML+=y(e.hits),h.refresh(),p(),n.classList.remove("is-hidden")}catch(e){L(e)}finally{d.classList.add("is-hidden")}}function p(){const e=document.querySelector(".gallery-link").getBoundingClientRect();window.scrollBy({top:e.height*2,left:0,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
