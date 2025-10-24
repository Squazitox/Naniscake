import React, { useState } from 'react';

const FORMSPREE = 'https://formspree.io/f/mwprgwaz';

const products = [
  { id:1, name:'Green Velvet Sin Azúcar', price:45, image: "/cake.png", desc:'Torta sin azúcar para diabéticos' },
  { id:2, name:'Chocolate Keto', price:50, desc:'Apta para celíacos y sin azúcar' },
  { id:3, name:'Vainilla Esponjosa', price:35, desc:'Ideal para celebraciones' },
];

export default function App(){
  const [cart, setCart] = useState([]);
  const [showContact, setShowContact] = useState(false);
  const [form, setForm] = useState({ name:'', email:'', address:'' });
  const [sending, setSending] = useState(false);
  const [thankYou, setThankYou] = useState(false);

  const addToCart = (p)=> setCart(prev=>[...prev,p]);
  const removeFromCart = (i)=> setCart(prev=>prev.filter((_,idx)=>idx!==i));
  const total = cart.reduce((s,p)=>s+p.price,0);

  const handleContact = async (e)=>{
    e.preventDefault();
    setSending(true);
    const payload = {
      Nombre: form.name,
      Correo: form.email,
      Direccion: form.address,
      Tipo: 'Contacto'
    };
    try{
      await fetch(FORMSPREE, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      setThankYou(true);
      setShowContact(false);
      setForm({ name:'', email:'', address:'' });
      setTimeout(()=>setThankYou(false),4000);
    }catch(err){
      console.error(err);
      alert('Error al enviar contacto');
    }finally{ setSending(false); }
  };

  const submitOrder = async ()=>{
    if(cart.length===0){ alert('El carrito está vacío'); return; }
    setSending(true);
    const items = cart.map((p,i)=>`${i+1}. ${p.name} - S/ ${p.price.toFixed(2)}`).join('\n');
    const payload = { Pedido: items, Total: `S/ ${total.toFixed(2)}`, Cantidad: cart.length, Tipo:'Pedido' };
    try{
      await fetch(FORMSPREE, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      setThankYou(true);
      setCart([]);
      setTimeout(()=>setThankYou(false),4000);
    }catch(err){
      console.error(err);
      alert('Error al enviar pedido');
    }finally{ setSending(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#fff8ff] to-[#fff0fb] p-6 font-sans">
      <header className="max-w-6xl mx-auto p-6 rounded-2xl" style={{background:'linear-gradient(180deg, rgba(214,128,242,0.12), rgba(214,128,242,0.06))', borderBottom:'4px solid', borderImage:'linear-gradient(90deg,#d4b26b,#f7e4b8) 1'}}>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <div className='w-14 h-14 rounded-full shadow-lg flex items-center justify-center' style={{ background:'radial-gradient(circle at 30% 20%, #ffffffaa, #d680f2)' }}>
              <img src="/Naniscake/public/cake.png" alt="logo" style={{width:40}}/>
            </div>
            <div>
              <h1 className='text-2xl font-extrabold' style={{color:'#3b0b3b'}}>Nani's Cake</h1>
              <p className='text-sm opacity-80'>Pastelería sin azúcar • Apta para diabéticos y celíacos</p>
            </div>
          </div>
          <nav className='flex items-center gap-4'>
            <button className='px-4 py-2 rounded-full shadow-sm font-semibold' style={{ background:'linear-gradient(90deg,#d680f2,#ff7ab8)', color:'white' }} onClick={()=>setShowContact(true)}>Contáctenos</button>
            <div className='relative'>
              <button className='relative p-2 rounded-full' style={{background:'#fff'}} onClick={()=>window.scrollTo({top:document.body.scrollHeight, behavior:'smooth'})}>
                <svg width='22' height='22' viewBox='0 0 24 24' fill='none'><path d='M6 6h15l-1.5 9h-12z' stroke='#d680f2' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/><circle cx='9' cy='20' r='1' fill='#d680f2'/><circle cx='18' cy='20' r='1' fill='#d680f2'/></svg>
                {cart.length>0 && <span style={{position:'absolute', top:-6, right:-6, background:'#ffd88a', padding:'2px 6px', borderRadius:999, fontSize:12, fontWeight:700}}>{cart.length}</span>}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main className='max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6'>
        <section className='md:col-span-2'>
          <h2 className='text-xl font-bold mb-4'>Nuestros Productos</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            {products.map(p => (
              <article key={p.id} className='rounded-2xl p-4 shadow-lg transform transition duration-700 ease-in-out' style={{animation:'fadeIn 600ms ease forwards'}}>
                <div className='h-40 flex items-center justify-center rounded-lg' style={{ background:'linear-gradient(180deg,#fff,#ffeefc)' }}>
                  <img src='/Naniscake/public/cake.png' alt={p.name} style={{width:120}}/>
                </div>
                <div className='mt-4 flex items-start justify-between'>
                  <div>
                    <h3 className='font-semibold'>{p.name}</h3>
                    <p className='text-sm opacity-80'>{p.desc}</p>
                  </div>
                  <div className='text-right'>
                    <div className='font-bold'>S/ {p.price.toFixed(2)}</div>
                    <button className='mt-2 px-3 py-1 rounded-full text-sm' style={{ background:'linear-gradient(90deg,#ffd88a,#d6b26b)', border:'none' }} onClick={()=>addToCart(p)}>Agregar</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className='rounded-2xl p-4 shadow-lg'>
          <h3 className='font-bold'>Carrito</h3>
          <div className='mt-3 space-y-2'>
            {cart.length===0 ? <p className='opacity-80'>Tu carrito está vacío.</p> : cart.map((p,i)=>(
              <div key={i} className='flex items-center justify-between bg-white/60 p-2 rounded-lg'>
                <div>
                  <div className='font-semibold'>{p.name}</div>
                  <div className='text-sm opacity-80'>S/ {p.price.toFixed(2)}</div>
                </div>
                <div className='flex gap-2 items-center'>
                  <div className='text-sm'>1</div>
                  <button onClick={()=>removeFromCart(i)} className='text-xs px-2 py-1 rounded-full' style={{ background:'#ffdede' }}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>

          <div className='mt-4 border-t pt-4'>
            <div className='flex justify-between items-center'>
              <div className='font-semibold'>Total</div>
              <div className='font-bold'>S/ {total.toFixed(2)}</div>
            </div>
            <div className='mt-4 flex gap-2'>
              <button onClick={submitOrder} disabled={sending} className='flex-1 py-2 rounded-full font-semibold' style={{ background:'linear-gradient(90deg,#d680f2,#ff7ab8)', color:'white' }}>{sending ? 'Enviando...' : 'Comprar (Contra entrega)'}</button>
              <button onClick={()=>setCart([])} className='py-2 px-4 rounded-full' style={{ background:'#fff5f8' }}>Vaciar</button>
            </div>
          </div>
        </aside>
      </main>

      <footer className='max-w-6xl mx-auto mt-10 p-6 rounded-2xl flex items-center justify-between' style={{ background:'linear-gradient(180deg, rgba(214,128,242,0.03), rgba(214,128,242,0.01))' }}>
        <div>
          <p className='font-semibold'>Nani's Cake</p>
          <p className='text-sm opacity-80'>Delicias sin azúcar • Apto para celíacos y diabéticos</p>
        </div>
        <div className='flex items-center gap-3'>
          <a href='https://www.instagram.com/naniscakeperu/' target='_blank' rel='noreferrer' aria-label='instagram' className='p-3 rounded-full shadow-sm' style={{ background:'#fff' }}>
            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none'><rect x='3' y='3' width='18' height='18' rx='5' stroke='#d680f2' strokeWidth='1.5'/><circle cx='12' cy='12' r='3.2' stroke='#d680f2' strokeWidth='1.5'/><circle cx='17.5' cy='6.5' r='0.5' fill='#d680f2'/></svg>
          </a>
          <a href='https://tiktok.com/@naniscake' target='_blank' rel='noreferrer' aria-label='tiktok' className='p-3 rounded-full shadow-sm' style={{ background:'#fff' }}>
            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none'><path d='M9 8v8a4 4 0 1 0 4-4V6h2' stroke='#d680f2' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/></svg>
          </a>
        </div>
      </footer>

      {showContact && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
          <div className='bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl'>
            <h3 className='text-lg font-bold'>Contáctenos</h3>
            <form onSubmit={handleContact} className='mt-4 space-y-3'>
              <input required value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} placeholder='Nombre' className='w-full p-3 rounded-lg border' />
              <input required value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} placeholder='Correo' type='email' className='w-full p-3 rounded-lg border' />
              <input required value={form.address} onChange={(e)=>setForm({...form, address:e.target.value})} placeholder='Dirección' className='w-full p-3 rounded-lg border' />
              <div className='flex gap-2 justify-end'>
                <button type='button' onClick={()=>setShowContact(false)} className='px-4 py-2 rounded-full'>Cancelar</button>
                <button type='submit' disabled={sending} className='px-4 py-2 rounded-full' style={{ background:'linear-gradient(90deg,#d680f2,#ff7ab8)', color:'#fff' }}>{sending ? 'Enviando...' : 'Enviar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {thankYou && (
        <div className='fixed bottom-6 right-6 bg-white rounded-xl shadow-lg p-4'>
          <strong>¡Gracias por tu pedido, te contactaremos pronto!</strong>
        </div>
      )}

      <style>{`@keyframes fadeIn { from { opacity:0; transform: translateY(8px); } to { opacity:1; transform: translateY(0); } }`}</style>
    </div>
  );
}
