import { useMemo, useState } from 'react';

const categories = [
  { name: 'Fashion', icon: '👗' },
  { name: 'Electronics', icon: '📱' },
  { name: 'Sweets & Bakery', icon: '🍰' },
  { name: 'Gifts', icon: '🎁' },
  { name: 'Jewellery', icon: '💍' },
  { name: 'Home & Decoration', icon: '🏠' },
  { name: 'Footwear', icon: '👟' },
  { name: 'Beauty', icon: '💄' },
  { name: 'Restaurants', icon: '🍽️' }
];

const initialBusinesses = [
  {
    id: 1,
    name: 'Aarav Boutique',
    category: 'Fashion',
    location: 'Bandra West',
    rating: 4.9,
    distance: '1.2 km',
    offer: 'Flat 35% Off on Festive Wear',
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
    logo: 'AB',
    hours: '10:00 AM - 10:00 PM',
    description: 'Premium festive fashion for men and women with handcrafted embroidery and modern silhouettes.'
  },
  {
    id: 2,
    name: 'Saffron Spark',
    category: 'Sweets & Bakery',
    location: 'Andheri East',
    rating: 4.8,
    distance: '2.4 km',
    offer: 'Buy 1 Box Get 1 Half Price',
    image:
      'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=900&q=80',
    logo: 'SS',
    hours: '9:00 AM - 9:30 PM',
    description: 'Mithai boxes, gifting hampers and artisanal sweets made fresh for Diwali gatherings.'
  },
  {
    id: 3,
    name: 'TechNest',
    category: 'Electronics',
    location: 'Powai',
    rating: 4.7,
    distance: '3.1 km',
    offer: 'Up to 40% Off Smart Devices',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    logo: 'TN',
    hours: '10:30 AM - 9:00 PM',
    description: 'Smart gadgets, home automation and gadgets tailored for festive gifting and upgrades.'
  }
];

const initialOffers = [
  {
    id: 1,
    business: 'Aarav Boutique',
    offer: 'Festive Collection 35% OFF',
    category: 'Fashion',
    location: 'Bandra West',
    validUntil: '30 Nov 2026',
    logo: 'AB',
    price: '₹1,999',
    discount: '35%'
  },
  {
    id: 2,
    business: 'Saffron Spark',
    offer: 'Classic Sweet Hamper 25% OFF',
    category: 'Sweets & Bakery',
    location: 'Andheri East',
    validUntil: '15 Nov 2026',
    logo: 'SS',
    price: '₹1,299',
    discount: '25%'
  },
  {
    id: 3,
    business: 'TechNest',
    offer: 'Smart TV & Audio Bundle 40% OFF',
    category: 'Electronics',
    location: 'Powai',
    validUntil: '18 Nov 2026',
    logo: 'TN',
    price: '₹32,990',
    discount: '40%'
  },
  {
    id: 4,
    business: 'Dazzle Jewels',
    offer: 'Gold & Diamond Exchange Offer',
    category: 'Jewellery',
    location: 'Ghatkopar',
    validUntil: '25 Nov 2026',
    logo: 'DJ',
    price: '₹8,500',
    discount: '30%'
  }
];

const posterTemplates = [
  { name: 'Traditional', accent: '#ea6a1b', bg: 'linear-gradient(135deg, #fff7e6 0%, #f9d59b 100%)' },
  { name: 'Luxury', accent: '#d4af37', bg: 'linear-gradient(135deg, #141414 0%, #8a6b2d 100%)' },
  { name: 'Modern', accent: '#7c3aed', bg: 'linear-gradient(135deg, #f5f7ff 0%, #dbeafe 100%)' },
  { name: 'Discount Sale', accent: '#ef4444', bg: 'linear-gradient(135deg, #fff1f2 0%, #fed7aa 100%)' },
  { name: 'Sweet Shop', accent: '#f59e0b', bg: 'linear-gradient(135deg, #fff7ed 0%, #fde68a 100%)' }
];

const initialAnalytics = {
  profileViews: 1824,
  offerViews: 3992,
  posterDownloads: 647,
  whatsappClicks: 505,
  callClicks: 230,
  directionClicks: 174
};

const defaultBusinessForm = {
  name: '',
  owner: '',
  phone: '',
  whatsapp: '',
  category: 'Fashion',
  address: '',
  city: 'Mumbai',
  description: '',
  logo: '',
  cover: ''
};

const defaultOfferForm = {
  business: 'Aarav Boutique',
  product: 'Festive Kurta Set',
  originalPrice: '2999',
  offerPrice: '1999',
  discount: '33',
  description: 'Limited-time festival collection with premium fabric and festive embroidery.',
  startDate: '2026-11-01',
  endDate: '2026-11-30',
  location: 'Bandra West',
  contact: '+91 98765 43210'
};

const defaultPosterForm = {
  businessName: 'Aarav Boutique',
  offerText: 'Diwali Festive Collection',
  discount: '35% Off',
  productName: 'Designer Sari & Kurta Sets',
  price: 'Starting at ₹1,999',
  phone: '+91 98765 43210',
  address: 'Bandra West, Mumbai',
  website: '@aaravboutique'
};

const defaultReelForm = {
  businessName: 'Aarav Boutique',
  offer: 'Festive Collection',
  product: 'Traditional Wear',
  discount: '30% off',
  location: 'Bandra West',
  contact: '+91 98765 43210'
};

const defaultReviewForm = {
  business: 'Aarav Boutique',
  name: 'Riya',
  rating: 5,
  review: 'Beautiful collection and excellent service. The festive quality was superb!'
};

function App() {
  const [selectedLocation, setSelectedLocation] = useState('Bandra West');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Nearby');
  const [businesses, setBusinesses] = useState(initialBusinesses);
  const [offers, setOffers] = useState(initialOffers);
  const [businessForm, setBusinessForm] = useState(defaultBusinessForm);
  const [offerForm, setOfferForm] = useState(defaultOfferForm);
  const [posterForm, setPosterForm] = useState(defaultPosterForm);
  const [selectedTemplate, setSelectedTemplate] = useState('Traditional');
  const [reelForm, setReelForm] = useState(defaultReelForm);
  const [selectedReelStyle, setSelectedReelStyle] = useState('Traditional');
  const [reviews, setReviews] = useState([
    { id: 1, business: 'Aarav Boutique', name: 'Seema', rating: 5, review: 'Amazing festive collection with premium quality.' },
    { id: 2, business: 'Aarav Boutique', name: 'Nikhil', rating: 4, review: 'Great offers and helpful staff.' },
    { id: 3, business: 'Saffron Spark', name: 'Anika', rating: 5, review: 'Delicious sweets and beautiful gifting boxes.' }
  ]);
  const [reviewForm, setReviewForm] = useState(defaultReviewForm);
  const [authView, setAuthView] = useState('login');
  const [authUserType, setAuthUserType] = useState('customer');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');

  const nearbyDeals = useMemo(() => {
    return businesses.filter((business) => business.location === selectedLocation || business.location.includes(selectedLocation.split(' ')[0]));
  }, [selectedLocation, businesses]);

  const searchResults = useMemo(() => {
    const term = searchQuery.trim().toLowerCase();
    if (!term) return offers;
    return offers.filter((offer) => {
      const haystack = `${offer.business} ${offer.offer} ${offer.category} ${offer.location}`.toLowerCase();
      return haystack.includes(term);
    });
  }, [searchQuery, offers]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 2200);
  };

  const handleBusinessSubmit = (event) => {
    event.preventDefault();
    const required = ['name', 'owner', 'phone', 'category', 'address', 'city'];
    const missing = required.find((field) => !businessForm[field]?.trim());

    if (missing) {
      setError('Please complete the required business profile fields.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newBusiness = {
        id: Date.now(),
        name: businessForm.name,
        category: businessForm.category,
        location: `${businessForm.city}`,
        rating: 4.8,
        distance: '0.8 km',
        offer: 'Fresh festive promotion is live!',
        image:
          businessForm.cover ||
          'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=80',
        logo: businessForm.logo || businessForm.name.slice(0, 2).toUpperCase(),
        hours: '9:00 AM - 9:00 PM',
        description: businessForm.description || 'A new Diwali-ready business profile made for local discovery.'
      };

      setBusinesses((current) => [newBusiness, ...current]);
      setBusinessForm(defaultBusinessForm);
      setError('');
      setLoading(false);
      showToast('Business profile created successfully!');
    }, 800);
  };

  const handleOfferSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const nextOffer = {
        id: Date.now(),
        business: offerForm.business,
        offer: `${offerForm.product} • ${offerForm.discount}% OFF`,
        category: 'Featured',
        location: offerForm.location,
        validUntil: offerForm.endDate,
        logo: offerForm.business.slice(0, 2).toUpperCase(),
        price: `₹${offerForm.offerPrice}`,
        discount: `${offerForm.discount}%`
      };

      setOffers((current) => [nextOffer, ...current]);
      setOfferForm(defaultOfferForm);
      setLoading(false);
      showToast('Diwali offer created and published!');
    }, 700);
  };

  const handlePosterGenerate = (event) => {
    event.preventDefault();
    const template = posterTemplates.find((item) => item.name === selectedTemplate) || posterTemplates[0];
    if (!posterForm.businessName || !posterForm.offerText) {
      setError('Business name and offer text are required to create your poster.');
      return;
    }
    setError('');
    showToast(`${template.name} poster ready for sharing!`);
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    const exists = reviews.some(
      (item) => item.business === reviewForm.business && item.name === reviewForm.name
    );

    if (exists) {
      setError('You have already reviewed this business.');
      return;
    }

    setReviews((current) => [
      {
        id: Date.now(),
        business: reviewForm.business,
        name: reviewForm.name,
        rating: reviewForm.rating,
        review: reviewForm.review
      },
      ...current
    ]);
    setReviewForm(defaultReviewForm);
    setError('');
    showToast('Review posted successfully!');
  };

  const templateStyle = posterTemplates.find((item) => item.name === selectedTemplate) || posterTemplates[0];
  const reelSceneLines = [
    '🪔 Diwali Sale is Here!',
    `🔥 Flat ${reelForm.discount} OFF`,
    `✨ ${reelForm.product}`,
    `📍 Visit ${reelForm.location} Today`,
    `📞 Contact ${reelForm.contact}`
  ];

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">🪔</div>
          <div>
            <div className="brand-name">Diwali Business Booster</div>
            <div className="brand-tag">Promote Your Business. Celebrate Diwali. Get More Customers.</div>
          </div>
        </div>
        <nav className="primary-nav">
          <a href="#home">Home</a>
          <a href="#offers">Offers</a>
          <a href="#business">Business</a>
          <a href="#poster">Poster</a>
          <a href="#analytics">Analytics</a>
        </nav>
        <button className="ghost-btn">Login</button>
      </header>

      <main className="page-container">
        <section id="home" className="hero card">
          <div className="hero-copy">
            <span className="pill">🎉 Diwali Business Booster</span>
            <h1>Find the Best Diwali Offers Near You</h1>
            <div className="search-panel">
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search shops, products or offers..."
              />
              <select value={selectedLocation} onChange={(event) => setSelectedLocation(event.target.value)}>
                <option>Bandra West</option>
                <option>Andheri East</option>
                <option>Powai</option>
                <option>Ghatkopar</option>
                <option>Chembur</option>
              </select>
            </div>
            <div className="cta-row">
              <button className="primary-btn">Explore Offers</button>
              <button className="secondary-btn">Find Nearby Businesses</button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-banner">
              <div className="mini-badge">🔥 Diwali Deal</div>
              <h3>Smart Festival Shopping</h3>
              <p>20+ businesses active today</p>
            </div>
            <div className="mini-stats">
              <div>
                <strong>3.2k</strong>
                <span>Offers</span>
              </div>
              <div>
                <strong>1.8k</strong>
                <span>Businesses</span>
              </div>
            </div>
          </div>
        </section>

        <section id="offers" className="section-block">
          <div className="section-head">
            <div>
              <span className="eyebrow">🔥 Trending Diwali Offers</span>
              <h2>Top local deals this week</h2>
            </div>
            <button className="chip-btn">View all</button>
          </div>

          <div className="offer-grid">
            {offers.map((offer) => (
              <article key={offer.id} className="offer-card card">
                <div className="offer-top">
                  <div className="avatar">{offer.logo}</div>
                  <div>
                    <h3>{offer.business}</h3>
                    <span>{offer.category}</span>
                  </div>
                </div>
                <div className="offer-banner">{offer.offer}</div>
                <div className="meta-row">
                  <span>📍 {offer.location}</span>
                  <span>⏳ {offer.validUntil}</span>
                </div>
                <div className="offer-footer">
                  <div>
                    <strong>{offer.discount}</strong>
                    <small>discount</small>
                  </div>
                  <button className="primary-btn small">View Offer</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block">
          <div className="section-head">
            <div>
              <span className="eyebrow">🛍️ Shop by Category</span>
              <h2>Popular Diwali categories</h2>
            </div>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <button key={category.name} className="category-card card">
                <span>{category.icon}</span>
                <strong>{category.name}</strong>
              </button>
            ))}
          </div>
        </section>

        <section className="section-block">
          <div className="section-head">
            <div>
              <span className="eyebrow">📍 Nearby Diwali Deals</span>
              <h2>{selectedLocation} businesses</h2>
            </div>
          </div>

          <div className="business-grid">
            {nearbyDeals.length ? (
              nearbyDeals.map((business) => (
                <article key={business.id} className="business-card card">
                  <img src={business.image} alt={business.name} />
                  <div className="business-info">
                    <div className="rating-row">
                      <strong>{business.name}</strong>
                      <span>⭐ {business.rating}</span>
                    </div>
                    <div className="meta-line">
                      <span>📍 {business.distance}</span>
                    </div>
                    <p>{business.offer}</p>
                    <button className="primary-btn small">View Business</button>
                  </div>
                </article>
              ))
            ) : (
              <div className="empty-state card">No nearby businesses found for this location yet.</div>
            )}
          </div>
        </section>

        <section id="business" className="dashboard-layout">
          <div className="form-panel card">
            <span className="eyebrow">🏪 Register Business</span>
            <h2>Create a business profile</h2>
            <form onSubmit={handleBusinessSubmit} className="stacked-form">
              <div className="two-col">
                <label>
                  <span>Business name</span>
                  <input value={businessForm.name} onChange={(event) => setBusinessForm({ ...businessForm, name: event.target.value })} placeholder="Vivid Decor" />
                </label>
                <label>
                  <span>Owner name</span>
                  <input value={businessForm.owner} onChange={(event) => setBusinessForm({ ...businessForm, owner: event.target.value })} placeholder="Ramesh Shah" />
                </label>
              </div>
              <div className="two-col">
                <label>
                  <span>Phone number</span>
                  <input value={businessForm.phone} onChange={(event) => setBusinessForm({ ...businessForm, phone: event.target.value })} placeholder="+91 98765 43210" />
                </label>
                <label>
                  <span>WhatsApp number</span>
                  <input value={businessForm.whatsapp} onChange={(event) => setBusinessForm({ ...businessForm, whatsapp: event.target.value })} placeholder="+91 91234 56789" />
                </label>
              </div>
              <div className="two-col">
                <label>
                  <span>Business category</span>
                  <select value={businessForm.category} onChange={(event) => setBusinessForm({ ...businessForm, category: event.target.value })}>
                    {categories.map((category) => (
                      <option key={category.name} value={category.name}>{category.name}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>City</span>
                  <input value={businessForm.city} onChange={(event) => setBusinessForm({ ...businessForm, city: event.target.value })} placeholder="Mumbai" />
                </label>
              </div>
              <label>
                <span>Address</span>
                <input value={businessForm.address} onChange={(event) => setBusinessForm({ ...businessForm, address: event.target.value })} placeholder="22 Khar Road, Mumbai" />
              </label>
              <label>
                <span>Description</span>
                <textarea value={businessForm.description} onChange={(event) => setBusinessForm({ ...businessForm, description: event.target.value })} placeholder="Your Diwali-ready business story..." rows="4" />
              </label>
              <div className="two-col">
                <label>
                  <span>Business logo</span>
                  <input value={businessForm.logo} onChange={(event) => setBusinessForm({ ...businessForm, logo: event.target.value })} placeholder="Upload or add initials" />
                </label>
                <label>
                  <span>Cover image</span>
                  <input value={businessForm.cover} onChange={(event) => setBusinessForm({ ...businessForm, cover: event.target.value })} placeholder="Paste image URL" />
                </label>
              </div>
              {error && <div className="error-box">{error}</div>}
              <button type="submit" className="primary-btn full" disabled={loading}>
                {loading ? 'Creating profile...' : 'Create Business Profile'}
              </button>
            </form>
          </div>

          <div className="form-panel card">
            <span className="eyebrow">🔥 Create Diwali Offer</span>
            <h2>Launch a new offer</h2>
            <form onSubmit={handleOfferSubmit} className="stacked-form">
              <div className="two-col">
                <label>
                  <span>Business name</span>
                  <input value={offerForm.business} onChange={(event) => setOfferForm({ ...offerForm, business: event.target.value })} />
                </label>
                <label>
                  <span>Product/service</span>
                  <input value={offerForm.product} onChange={(event) => setOfferForm({ ...offerForm, product: event.target.value })} />
                </label>
              </div>
              <div className="two-col">
                <label>
                  <span>Original price</span>
                  <input value={offerForm.originalPrice} onChange={(event) => setOfferForm({ ...offerForm, originalPrice: event.target.value })} />
                </label>
                <label>
                  <span>Offer price</span>
                  <input value={offerForm.offerPrice} onChange={(event) => setOfferForm({ ...offerForm, offerPrice: event.target.value })} />
                </label>
              </div>
              <div className="two-col">
                <label>
                  <span>Discount percentage</span>
                  <input value={offerForm.discount} onChange={(event) => setOfferForm({ ...offerForm, discount: event.target.value })} />
                </label>
                <label>
                  <span>Business location</span>
                  <input value={offerForm.location} onChange={(event) => setOfferForm({ ...offerForm, location: event.target.value })} />
                </label>
              </div>
              <label>
                <span>Offer description</span>
                <textarea value={offerForm.description} onChange={(event) => setOfferForm({ ...offerForm, description: event.target.value })} rows="3" />
              </label>
              <div className="two-col">
                <label>
                  <span>Offer start date</span>
                  <input type="date" value={offerForm.startDate} onChange={(event) => setOfferForm({ ...offerForm, startDate: event.target.value })} />
                </label>
                <label>
                  <span>Offer end date</span>
                  <input type="date" value={offerForm.endDate} onChange={(event) => setOfferForm({ ...offerForm, endDate: event.target.value })} />
                </label>
              </div>
              <label>
                <span>Contact number</span>
                <input value={offerForm.contact} onChange={(event) => setOfferForm({ ...offerForm, contact: event.target.value })} />
              </label>
              <button type="submit" className="primary-btn full">🔥 Create Diwali Offer</button>
            </form>
            <div className="action-row">
              <button className="mini-btn">Edit</button>
              <button className="mini-btn">Delete</button>
              <button className="mini-btn">Share</button>
              <button className="mini-btn">Download</button>
              <button className="mini-btn">Post to WhatsApp</button>
            </div>
          </div>
        </section>

        <section className="poster-layout">
          <div className="poster-form card">
            <span className="eyebrow">🎨 Diwali Poster Maker</span>
            <h2>Create a festive poster</h2>
            <form onSubmit={handlePosterGenerate} className="stacked-form">
              <div className="two-col">
                <label>
                  <span>Business name</span>
                  <input value={posterForm.businessName} onChange={(event) => setPosterForm({ ...posterForm, businessName: event.target.value })} />
                </label>
                <label>
                  <span>Offer text</span>
                  <input value={posterForm.offerText} onChange={(event) => setPosterForm({ ...posterForm, offerText: event.target.value })} />
                </label>
              </div>
              <div className="two-col">
                <label>
                  <span>Discount</span>
                  <input value={posterForm.discount} onChange={(event) => setPosterForm({ ...posterForm, discount: event.target.value })} />
                </label>
                <label>
                  <span>Product name</span>
                  <input value={posterForm.productName} onChange={(event) => setPosterForm({ ...posterForm, productName: event.target.value })} />
                </label>
              </div>
              <div className="two-col">
                <label>
                  <span>Price</span>
                  <input value={posterForm.price} onChange={(event) => setPosterForm({ ...posterForm, price: event.target.value })} />
                </label>
                <label>
                  <span>Phone number</span>
                  <input value={posterForm.phone} onChange={(event) => setPosterForm({ ...posterForm, phone: event.target.value })} />
                </label>
              </div>
              <div className="two-col">
                <label>
                  <span>Address</span>
                  <input value={posterForm.address} onChange={(event) => setPosterForm({ ...posterForm, address: event.target.value })} />
                </label>
                <label>
                  <span>Website / social</span>
                  <input value={posterForm.website} onChange={(event) => setPosterForm({ ...posterForm, website: event.target.value })} />
                </label>
              </div>

              <div className="template-row">
                {posterTemplates.map((template) => (
                  <button
                    key={template.name}
                    type="button"
                    className={`template-pill ${selectedTemplate === template.name ? 'active' : ''}`}
                    onClick={() => setSelectedTemplate(template.name)}
                  >
                    {template.name}
                  </button>
                ))}
              </div>

              {error && <div className="error-box">{error}</div>}
              <div className="action-row">
                <button type="submit" className="primary-btn">Generate Poster</button>
                <button type="button" className="secondary-btn">Download</button>
                <button type="button" className="secondary-btn">Share</button>
                <button type="button" className="ghost-btn">Create Another</button>
              </div>
            </form>
          </div>

          <div className="poster-preview card" style={{ background: templateStyle.bg }}>
            <div className="poster-header">
              <span className="poster-logo">🪔</span>
              <div>
                <strong>{posterForm.businessName}</strong>
                <small>{posterForm.offerText}</small>
              </div>
            </div>
            <h3>{posterForm.discount}</h3>
            <p>{posterForm.productName}</p>
            <div className="poster-price">{posterForm.price}</div>
            <div className="poster-meta">
              <span>{posterForm.address}</span>
              <span>{posterForm.phone}</span>
              <span>{posterForm.website}</span>
            </div>
          </div>
        </section>

        <section className="reel-section card">
          <div className="section-head narrow">
            <div>
              <span className="eyebrow">🎬 Diwali Reel Maker</span>
              <h2>Create a short promo reel</h2>
            </div>
          </div>
          <div className="reel-layout">
            <form className="stacked-form" onSubmit={(event) => event.preventDefault()}>
              <div className="two-col">
                <label>
                  <span>Business name</span>
                  <input value={reelForm.businessName} onChange={(event) => setReelForm({ ...reelForm, businessName: event.target.value })} />
                </label>
                <label>
                  <span>Offer</span>
                  <input value={reelForm.offer} onChange={(event) => setReelForm({ ...reelForm, offer: event.target.value })} />
                </label>
              </div>
              <div className="two-col">
                <label>
                  <span>Product</span>
                  <input value={reelForm.product} onChange={(event) => setReelForm({ ...reelForm, product: event.target.value })} />
                </label>
                <label>
                  <span>Discount</span>
                  <input value={reelForm.discount} onChange={(event) => setReelForm({ ...reelForm, discount: event.target.value })} />
                </label>
              </div>
              <div className="two-col">
                <label>
                  <span>Location</span>
                  <input value={reelForm.location} onChange={(event) => setReelForm({ ...reelForm, location: event.target.value })} />
                </label>
                <label>
                  <span>Contact number</span>
                  <input value={reelForm.contact} onChange={(event) => setReelForm({ ...reelForm, contact: event.target.value })} />
                </label>
              </div>

              <div className="template-row">
                {['Traditional', 'Luxury', 'Modern', 'Energetic'].map((style) => (
                  <button
                    key={style}
                    type="button"
                    className={`template-pill ${selectedReelStyle === style ? 'active' : ''}`}
                    onClick={() => setSelectedReelStyle(style)}
                  >
                    {style}
                  </button>
                ))}
              </div>
              <button type="submit" className="primary-btn full">Generate Reel Structure</button>
            </form>

            <div className="reel-preview">
              <div className="reel-video-card">
                {reelSceneLines.map((scene, index) => (
                  <div key={scene} className="scene-line">
                    <span className="scene-number">Scene {index + 1}</span>
                    <strong>{scene}</strong>
                  </div>
                ))}
              </div>
              <div className="sound-row">
                <span>🎵 Background music placeholder</span>
                <span>✨ Festive transition</span>
              </div>
            </div>
          </div>
        </section>

        <section className="profile-section card">
          <div className="profile-header">
            <div className="avatar large">AB</div>
            <div>
              <span className="eyebrow">🏪 Business Profile</span>
              <h2>Aarav Boutique</h2>
            </div>
          </div>
          <div className="business-profile-grid">
            <div>
              <div className="rating-row">
                <span>⭐ 4.9</span>
                <span>👗 Fashion</span>
                <span>📍 Bandra West</span>
              </div>
              <p>Premium festive fashion for men and women with handcrafted embroidery and modern silhouettes.</p>
              <div className="hours-bar">⏰ Opening hours: 10:00 AM - 10:00 PM</div>
              <div className="action-row">
                <button className="primary-btn small">Call</button>
                <button className="secondary-btn small">WhatsApp</button>
                <button className="secondary-btn small">Get Directions</button>
                <button className="ghost-btn small">Share</button>
              </div>
            </div>
            <div className="profile-panels">
              <div className="mini-panel">
                <h4>🔥 Current Offers</h4>
                <ul>
                  <li>Festive Collection 35% OFF</li>
                  <li>Free styling on premium purchases</li>
                </ul>
              </div>
              <div className="mini-panel">
                <h4>🛍️ Products</h4>
                <ul>
                  <li>Designer Sarees</li>
                  <li>Festive Kurtas</li>
                  <li>Jewellery Sets</li>
                </ul>
              </div>
              <div className="mini-panel">
                <h4>⭐ Reviews</h4>
                <ul>
                  <li>“Premium quality and lovely service.”</li>
                  <li>“The perfect Diwali shopping destination.”</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="search-section card">
          <div className="section-head">
            <div>
              <span className="eyebrow">🔎 Search</span>
              <h2>Find the perfect local Diwali deal</h2>
            </div>
          </div>
          <div className="search-toolbar">
            <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Businesses, products, categories, offers" />
            <div className="filter-row">
              {['Nearby', 'Highest Discount', 'Popular', 'New Offers', 'Category'].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`filter-pill ${selectedFilter === filter ? 'active' : ''}`}
                  onClick={() => setSelectedFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="search-results">
            {searchResults.length ? (
              searchResults.map((result) => (
                <div key={result.id} className="result-row">
                  <div>
                    <strong>{result.business}</strong>
                    <span>{result.offer}</span>
                  </div>
                  <small>{result.location}</small>
                </div>
              ))
            ) : (
              <div className="empty-state">No search results match your query yet.</div>
            )}
          </div>
        </section>

        <section className="reviews-layout">
          <div className="review-form card">
            <span className="eyebrow">⭐ Reviews</span>
            <h2>Leave a customer review</h2>
            <form onSubmit={handleReviewSubmit} className="stacked-form">
              <label>
                <span>Business</span>
                <select value={reviewForm.business} onChange={(event) => setReviewForm({ ...reviewForm, business: event.target.value })}>
                  {businesses.map((business) => (
                    <option key={business.id} value={business.name}>{business.name}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>Your name</span>
                <input value={reviewForm.name} onChange={(event) => setReviewForm({ ...reviewForm, name: event.target.value })} />
              </label>
              <label>
                <span>Rating</span>
                <select value={reviewForm.rating} onChange={(event) => setReviewForm({ ...reviewForm, rating: Number(event.target.value) })}>
                  {[5, 4, 3, 2, 1].map((item) => (
                    <option key={item} value={item}>{item} stars</option>
                  ))}
                </select>
              </label>
              <label>
                <span>Short review</span>
                <textarea value={reviewForm.review} onChange={(event) => setReviewForm({ ...reviewForm, review: event.target.value })} rows="4" />
              </label>
              {error && <div className="error-box">{error}</div>}
              <button type="submit" className="primary-btn full">Submit Review</button>
            </form>
          </div>

          <div className="review-list card">
            <span className="eyebrow">Customer feedback</span>
            {reviews.map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-top">
                  <strong>{review.name}</strong>
                  <span>{'⭐'.repeat(review.rating)}</span>
                </div>
                <small>{review.business}</small>
                <p>{review.review}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="analytics" className="analytics-section card">
          <div className="section-head">
            <div>
              <span className="eyebrow">📊 Business Analytics</span>
              <h2>Performance dashboard</h2>
            </div>
          </div>

          <div className="stats-grid">
            {Object.entries(initialAnalytics).map(([key, value]) => (
              <div key={key} className="stat-box">
                <span>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <strong>{value.toLocaleString()}</strong>
                <div className="bar-track"><div className="bar-fill" style={{ width: `${Math.min(value / 60, 100)}%` }} /></div>
              </div>
            ))}
          </div>
        </section>

        <section className="pricing-section">
          <div className="section-head">
            <div>
              <span className="eyebrow">💰 Monetization</span>
              <h2>Free platform, optional premium growth</h2>
            </div>
          </div>
          <div className="pricing-grid">
            <div className="plan-card card">
              <h3>Free</h3>
              <ul>
                <li>Business profile</li>
                <li>Basic offers</li>
                <li>Limited poster templates</li>
                <li>WhatsApp sharing</li>
              </ul>
            </div>
            <div className="plan-card card featured-plan">
              <div className="pro-tag">PRO</div>
              <h3>₹99/month</h3>
              <ul>
                <li>Unlimited offers</li>
                <li>Premium poster templates</li>
                <li>AI captions</li>
                <li>Advanced analytics</li>
                <li>Featured listing</li>
              </ul>
            </div>
            <div className="plan-card card">
              <h3>Featured Business Promotion</h3>
              <p>Premium placement in local search and discovery.</p>
              <button className="primary-btn small">Boost my listing</button>
            </div>
          </div>
        </section>

        <section className="auth-section card">
          <div className="section-head narrow">
            <div>
              <span className="eyebrow">🔐 Authentication</span>
              <h2>Customer or business access</h2>
            </div>
          </div>
          <div className="auth-toggle">
            <button type="button" className={authUserType === 'customer' ? 'active' : ''} onClick={() => setAuthUserType('customer')}>Customer</button>
            <button type="button" className={authUserType === 'business' ? 'active' : ''} onClick={() => setAuthUserType('business')}>Business</button>
          </div>
          <div className="auth-panel">
            <div className="auth-forms">
              <button className="toggle-btn" onClick={() => setAuthView('login')}>Login</button>
              <button className="toggle-btn" onClick={() => setAuthView('signup')}>Sign Up</button>
            </div>
            <form className="stacked-form compact">
              <label>
                <span>Email or mobile</span>
                <input placeholder="name@example.com or +91 98xxxx" />
              </label>
              <label>
                <span>Password</span>
                <input type="password" placeholder="••••••••" />
              </label>
              <button type="submit" className="primary-btn full">
                {authView === 'login' ? 'Login' : 'Create Account'}
              </button>
            </form>
          </div>
        </section>

        <section className="database-section card">
          <div className="section-head">
            <div>
              <span className="eyebrow">🗄️ Database Schema</span>
              <h2>Core app collections</h2>
            </div>
          </div>
          <div className="schema-grid">
            <div>Users</div>
            <div>Businesses</div>
            <div>Offers</div>
            <div>Products</div>
            <div>Categories</div>
            <div>Reviews</div>
            <div>Poster Templates</div>
            <div>Reels</div>
            <div>Favorites</div>
            <div>Analytics</div>
          </div>
        </section>
      </main>

      <nav className="mobile-nav">
        <button>🏠 Home</button>
        <button>🔎 Explore</button>
        <button>✨ Create</button>
        <button>💛 Favorites</button>
        <button>👤 Profile</button>
      </nav>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default App;
