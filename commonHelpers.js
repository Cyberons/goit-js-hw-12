import{a as h,i as y,S as b}from"./assets/vendor-483db976.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function c(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=c(e);fetch(e.href,r)}})();const L="42735031-fd0f3d17c4f19f21a7b83deb3",w="https://pixabay.com/api/",d=document.querySelector(".loader");let v=15;async function S(t,o){const c=new URLSearchParams({key:L,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:v});d.style.display="block";try{const s=await h.get(`${w}?${c}`);if(!s.status===200)throw new Error("Network response was not OK!");const e=s.data;return d.style.display="none",e.hits.length===0&&y.error({fontSize:"large",close:!1,position:"topRight",messageColor:"white",timeout:2e3,backgroundColor:"red",message:"Sorry, there are no images matching your search query. Please try again!"}),e}catch(s){throw console.error("Error fetching data:",s),s}}function u(t){return t.hits.map(o=>`<div class="gallery-item">
      <a class="gallery-link" href="${o.largeImageURL}">
          <img class="gallery-image" src="${o.webformatURL}" alt="${o.tags}">
      </a>
      <div class="gallery-image-info">
          <p class="image-info-item"><span class="image-items-text">Likes: </span>${o.likes}</p>
          <p class="image-info-item"><span class="image-items-text">Views: </span>${o.views}</p>
          <p class="image-info-item"><span class="image-items-text">Comments: </span>${o.comments}</p>
          <p class="image-info-item"><span class="image-items-text">Downloads: </span>${o.downloads}</p>
      </div>
  </div>`).join("")}const C=new b(".gallery-link",{captionsData:"alt",captionDelay:250}),m=document.querySelector("#searchForm"),i=document.querySelector(".gallery"),a=document.querySelector(".load-more-btn");let n=1,f=0,p="";a.style.display="none";a.addEventListener("click",$);m.addEventListener("submit",E);i.addEventListener("scroll",x);function E(t){t.preventDefault(),i.innerHTML="",n=1,p=m.elements.searchQuery.value.trim(),g()}function $(){n++,g()}function g(){S(p,n).then(t=>{f=t.totalHits;const o=u(t);i.insertAdjacentHTML("beforeend",o),C.refresh(),P(t)}).catch(t=>console.error("Error fetching data:",t))}function P(t){i.children.length<f?a.style.display="block":n*15>=f?(a.style.display="none",iziToast.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",backgroundColor:"#4CAF50",messageColor:"#fff",titleColor:"#fff",progressBarColor:"#4CAF50",position:"topRight"})):u(t)}function x(){const t=i.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:3*t,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
