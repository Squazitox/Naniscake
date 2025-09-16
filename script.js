
document.getElementById('navToggle').addEventListener('click', function(){
  const nav = document.getElementById('mainNav');
  if(nav.style.display === 'flex') nav.style.display = '';
  else nav.style.display = 'flex';
});

document.querySelectorAll('.card').forEach(c=>{
  c.addEventListener('mouseenter', ()=> c.style.transform='translateY(-8px) scale(1.01)');
  c.addEventListener('mouseleave', ()=> c.style.transform='');
});

// Simple form handler (no backend) - shows an alert
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  alert('Gracias! Hemos recibido tu mensaje. (Formulario demo)');
});
