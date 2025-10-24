import React, { useState } from 'react'

const products = [
  { id: 1, name: 'Torta Red Velvet', price: 60, image: '/cake.png' },
  { id: 2, name: 'Cheesecake Sin Azúcar', price: 55, image: '/cake.png' },
  { id: 3, name: 'Torta de Zanahoria Fit', price: 50, image: '/cake.png' },
]

export default function App() {
  const [cart, setCart] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', address: '' })
  const [message, setMessage] = useState('')

  const addToCart = (product) => setCart([...cart, product])
  const total = cart.reduce((sum, item) => sum + item.price, 0)

  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const response = await fetch('https://formspree.io/f/mwprgwaz', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    })

    if (response.ok) {
      setMessage('¡Gracias por tu pedido, te contactaremos pronto!')
      setFormData({ name: '', email: '', address: '' })
      setCart([])
    } else alert('Ocurrió un error. Intenta nuevamente.')
  }

  return (
    <div className="bg-pink-50 min-h-screen font-[Poppins]">
      <header className="bg-[#d680f2]/80 text-white shadow-md border-b-4 border-yellow-400 py-4 px-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold drop-shadow-md">🎂 Nani's Cake</h1>
        <nav className="space-x-6">
          <a href="#productos" className="hover:text-yellow-200">Productos</a>
          <button onClick={() => setShowPopup(true)} className="bg-yellow-400 text-purple-800 px-4 py-2 rounded-2xl font-semibold shadow-md hover:bg-yellow-300 transition">
            Contáctenos
          </button>
        </nav>
      </header>

      <main className="p-8 text-center">
        <h2 id="productos" className="text-4xl mb-6 text-[#d680f2] font-semibold">Nuestros Productos</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition transform hover:scale-105 animate-fadeIn">
              <img src={p.image} alt={p.name} className="rounded-xl mx-auto mb-3 w-40 h-40 object-cover" />
              <h3 className="text-xl font-semibold text-[#d680f2]">{p.name}</h3>
              <p className="text-gray-700 mb-2">S/ {p.price}</p>
              <button onClick={() => addToCart(p)} className="bg-[#d680f2] text-white px-4 py-2 rounded-xl hover:bg-fuchsia-500 transition">Agregar al carrito</button>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="mt-10 bg-white rounded-2xl shadow-md p-6 inline-block animate-fadeIn">
            <h3 className="text-2xl mb-4 font-semibold text-[#d680f2]">Carrito 🛒</h3>
            {cart.map((item, i) => (
              <p key={i}>{item.name} - S/ {item.price}</p>
            ))}
            <p className="font-bold mt-3">Total: S/ {total}</p>
            <button onClick={() => setShowPopup(true)} className="bg-yellow-400 text-purple-800 px-4 py-2 rounded-2xl font-semibold shadow-md hover:bg-yellow-300 transition mt-3">
              Comprar (Contra entrega)
            </button>
          </div>
        )}
      </main>

      <footer className="mt-10 bg-[#d680f2]/80 text-white py-6">
        <p className="mb-2">Síguenos:</p>
        <div className="flex justify-center space-x-6">
          <a href="https://www.instagram.com/naniscakeperu/" target="_blank" rel="noreferrer" className="hover:text-yellow-300">Instagram</a>
          <a href="https://www.tiktok.com/@naniscake" target="_blank" rel="noreferrer" className="hover:text-yellow-300">TikTok</a>
        </div>
        <p className="mt-4 text-sm">© 2025 Nani's Cake - Pastelería sin azúcar</p>
      </footer>

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
            <h3 className="text-2xl font-bold mb-4 text-[#d680f2]">Contáctenos 🍰</h3>
            {message ? (
              <p className="text-green-600 text-center font-semibold">{message}</p>
            ) : (
              <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleFormChange} className="w-full mb-3 border rounded-xl p-2" required />
                <input type="email" name="email" placeholder="Correo" value={formData.email} onChange={handleFormChange} className="w-full mb-3 border rounded-xl p-2" required />
                <textarea name="address" placeholder="Dirección" value={formData.address} onChange={handleFormChange} className="w-full mb-3 border rounded-xl p-2" required />
                <button type="submit" className="bg-[#d680f2] text-white px-4 py-2 rounded-xl hover:bg-fuchsia-500 transition w-full">Enviar</button>
              </form>
            )}
            <button onClick={() => setShowPopup(false)} className="text-sm text-gray-500 mt-4 underline w-full">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  )
}
