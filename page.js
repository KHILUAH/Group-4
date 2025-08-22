'use client';

import { useState } from 'react';

export default function Home() {
  const [items, setItems] = useState([
    {
      name: 'Rice',
      price: '₱50/kg',
      image:
        'https://www.tastingtable.com/img/gallery/enriched-rice-vs-regular-whats-the-difference/l-intro-1668537112.jpg',
    },
    {
      name: 'Eggs (1 Dozen)',
      price: '₱70',
      image:
        'https://cdn.britannica.com/94/151894-050-F72A5317/Brown-eggs.jpg',
    },
    {
      name: 'Bananas',
      price: '₱60/kg',
      image:
        'https://1.bp.blogspot.com/-TlmubMUHIvk/XtkyEbR9V7I/AAAAAAAANb0/GB_l0A_pJoUMy88t00rqhAhAf108aYJugCLcBGAsYHQ/s1600/Wholesale%2BBananas%2Bin%2Bseawoods%252C%2Bripe-unripe-bananas.jpg',
    },
  ]);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!name || !price || !imagePreview) return;

    const newItem = { name, price, image: imagePreview };
    setItems((prev) => [...prev, newItem]);

    // Reset form
    setName('');
    setPrice('');
    setImagePreview('');
  };

  const handleDeleteItem = (indexToDelete) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setItems((prev) => prev.filter((_, index) => index !== indexToDelete));
    }
  };

  return (
    <main
      style={{
        padding: '2rem',
        fontFamily: 'Segoe UI, sans-serif',
        maxWidth: '1000px',
        margin: '0 auto',
      }}
    >
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🛒 G4 Grocery</h1>
      <p style={{ marginBottom: '2rem' }}>
        Your daily essentials delivered <strong>fresh</strong> and <strong>fast</strong>.
      </p>

      <section>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🧺 Grocery Items</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1rem',
                backgroundColor: '#fafafa',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: '100%',
                  height: '140px',
                  objectFit: 'cover',
                  borderRadius: '6px',
                }}
              />
              <h3 style={{ marginTop: '0.75rem', fontSize: '1.1rem' }}>{item.name}</h3>
              <p style={{ marginBottom: '0.5rem', color: '#555' }}>{item.price}</p>
              <button
                onClick={() => handleDeleteItem(index)}
                style={{
                  padding: '0.4rem 0.8rem',
                  backgroundColor: '#e53935',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>➕ Add New Item</h2>
        <form
          onSubmit={handleAddItem}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            maxWidth: '400px',
          }}
        >
          <input
            type="text"
            placeholder="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              padding: '0.6rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="text"
            placeholder="Price (e.g. ₱50/kg)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={{
              padding: '0.6rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            style={{ padding: '0.6rem' }}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                borderRadius: '4px',
              }}
            />
          )}
          <button
            type="submit"
            style={{
              padding: '0.6rem',
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Add Item
          </button>
        </form>
      </section>
    </main>
  );
}
