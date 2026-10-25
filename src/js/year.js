// year.js — tahun dinamis di footer
export function initYear(){
  const el=document.getElementById('year');
  if(el) el.textContent=new Date().getFullYear();
}
