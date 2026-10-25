// nav.js — menu navigasi untuk layar kecil
export function initNav(){
  const toggle=document.getElementById('navToggle');
  const links=document.getElementById('navLinks');
  if(!toggle||!links) return;
  toggle.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',open);});
  links.addEventListener('click',()=>links.classList.remove('open'));
}
