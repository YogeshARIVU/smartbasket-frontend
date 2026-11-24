
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

type Product = {
  id: number;
  name: string;
  category: string;
  mrp: number;
  price: number;
  unit: string;
  stock: number;
  icon: string;
};

type CartItem = Product & {
  quantity: number;
  purchased: boolean;
};

const products: Product[] = [
  { id: 1, name: "Premium Rice", category: "Grains", mrp: 70, price: 65, unit: "kg", stock: 100, icon: "🍚" },
  { id: 2, name: "Wheat Flour", category: "Grains", mrp: 45, price: 40, unit: "kg", stock: 80, icon: "🌾" },
  { id: 3, name: "Rava", category: "Grains", mrp: 50, price: 45, unit: "kg", stock: 60, icon: "🥣" },
  { id: 4, name: "Toor Dal", category: "Pulses", mrp: 130, price: 115, unit: "kg", stock: 50, icon: "🫘" },
  { id: 5, name: "Moong Dal", category: "Pulses", mrp: 110, price: 95, unit: "kg", stock: 45, icon: "🫘" },
  { id: 6, name: "Chana Dal", category: "Pulses", mrp: 90, price: 80, unit: "kg", stock: 40, icon: "🫘" },
  { id: 7, name: "Fresh Milk", category: "Dairy", mrp: 30, price: 27, unit: "litre", stock: 100, icon: "🥛" },
  { id: 8, name: "Curd", category: "Dairy", mrp: 35, price: 30, unit: "pack", stock: 50, icon: "🥣" },
  { id: 9, name: "Butter", category: "Dairy", mrp: 60, price: 52, unit: "pack", stock: 30, icon: "🧈" },
  { id: 10, name: "Potato", category: "Vegetables", mrp: 30, price: 25, unit: "kg", stock: 100, icon: "🥔" },
  { id: 11, name: "Onion", category: "Vegetables", mrp: 40, price: 35, unit: "kg", stock: 100, icon: "🧅" },
  { id: 12, name: "Tomato", category: "Vegetables", mrp: 35, price: 29, unit: "kg", stock: 80, icon: "🍅" },
  { id: 13, name: "Cooking Oil", category: "Essentials", mrp: 150, price: 135, unit: "litre", stock: 60, icon: "🫗" },
  { id: 14, name: "Sugar", category: "Essentials", mrp: 45, price: 40, unit: "kg", stock: 70, icon: "🍬" },
  { id: 15, name: "Salt", category: "Essentials", mrp: 25, price: 20, unit: "kg", stock: 90, icon: "🧂" },
];

const recommendationPlan = [
  { productId: 1, quantity: 10 },
  { productId: 2, quantity: 5 },
  { productId: 4, quantity: 2 },
  { productId: 7, quantity: 30 },
  { productId: 10, quantity: 5 },
  { productId: 13, quantity: 3 },
  { productId: 15, quantity: 1 },
];

const shops = [
  { id: 1, name: "SmartBasket Main Store", location: "Salem" },
  { id: 2, name: "SmartBasket Express", location: "Salem" },
];

const money = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

function getSavedUser() {
  return localStorage.getItem("smartbasket-user");
}

function Login({ onAuthenticated }: { onAuthenticated: () => void }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Please enter your email and password.");
      return;
    }

    localStorage.setItem("smartbasket-user", email.trim());
    onAuthenticated();
    navigate("/dashboard", { replace: true });
  }

  return (
      <AuthLayout>
        <div className="auth-card">
          <div className="brand-mark">S</div>
          <p className="eyebrow">WELCOME BACK</p>
          <h1>Your smarter<br />grocery journey.</h1>
          <p className="muted">
            Sign in to plan your groceries, discover offers, and stay within budget.
          </p>

          <form onSubmit={handleLogin} className="auth-form">
            <label>Email address</label>
            <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
            />

            <label>Password</label>
            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
            />

            <button className="primary-button full-button" type="submit">
              Sign in <span>→</span>
            </button>
          </form>

          <p className="auth-footer">
            New to SmartBasket? <Link to="/signup">Create an account</Link>
          </p>
          <p className="demo-note">Demo mode: any valid email and password will work.</p>
        </div>
      </AuthLayout>
  );
}

function Signup({ onAuthenticated }: { onAuthenticated: () => void }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !email.trim() || password.length < 4) {
      alert("Enter your name, a valid email, and a password with at least 4 characters.");
      return;
    }

    localStorage.setItem("smartbasket-user", email.trim());
    localStorage.setItem("smartbasket-name", name.trim());

    onAuthenticated();
    navigate("/dashboard", { replace: true });
  }

  return (
      <AuthLayout>
        <div className="auth-card">
          <div className="brand-mark">S</div>
          <p className="eyebrow">GET STARTED</p>
          <h1>Shop smart.<br />Save more.</h1>
          <p className="muted">
            Create your account and make every grocery rupee count.
          </p>

          <form onSubmit={handleSignup} className="auth-form">
            <label>Your name</label>
            <input
                placeholder="Enter your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
            />

            <label>Email address</label>
            <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
            />

            <label>Password</label>
            <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={4}
                required
            />

            <button className="primary-button full-button" type="submit">
              Create account <span>→</span>
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
          <p className="demo-note">Demo mode: account details are stored in this browser only.</p>
        </div>
      </AuthLayout>
  );
}

function AuthLayout({ children }: { children: ReactNode }) {
  return (
      <main className="auth-page">
        <div className="auth-orb orb-one" />
        <div className="auth-orb orb-two" />

        <section className="auth-showcase">
          <div className="showcase-label">SMARTBASKET / 2026</div>
          <div className="showcase-content">
            <div className="floating-basket">🛒</div>
            <h2>Less spending.<br /><span>More living.</span></h2>
            <p>
              Your groceries, your budget, your control. Discover a better way
              to shop for everyday essentials.
            </p>
            <div className="showcase-stats">
              <div><strong>15+</strong><span>Essentials</span></div>
              <div><strong>₹</strong><span>Budget first</span></div>
              <div><strong>24/7</strong><span>Smart planning</span></div>
            </div>
          </div>
        </section>

        <section className="auth-form-area">{children}</section>
      </main>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<"light" | "dark">(
      (localStorage.getItem("smartbasket-theme") as "light" | "dark") || "light"
  );
  const [budget, setBudget] = useState(3000);
  const [selectedShop, setSelectedShop] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState("Overview");

  const userEmail = getSavedUser() || "customer@example.com";
  const userName =
      localStorage.getItem("smartbasket-name") ||
      userEmail.split("@")[0] ||
      "Customer";

  const recommendations = useMemo(() => {
    let remaining = Math.max(0, budget);

    return recommendationPlan.flatMap((plan) => {
      const product = products.find((item) => item.id === plan.productId);
      if (!product) return [];

      const quantity = Math.min(
          plan.quantity,
          product.stock,
          Math.floor(remaining / product.price)
      );

      if (quantity <= 0) return [];

      remaining -= quantity * product.price;

      return [{
        ...product,
        quantity,
        total: quantity * product.price,
        mrpTotal: quantity * product.mrp,
      }];
    });
  }, [budget]);

  const recommendationTotal = recommendations.reduce((sum, item) => sum + item.total, 0);
  const recommendationMrp = recommendations.reduce((sum, item) => sum + item.mrpTotal, 0);
  const recommendationSavings = recommendationMrp - recommendationTotal;
  const recommendationRemaining = Math.max(0, budget - recommendationTotal);

  const cartTotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
  );

  const purchasedTotal = cart
      .filter((item) => item.purchased)
      .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("smartbasket-theme", nextTheme);
  }

  function addToCart(product: Product, quantity = 1) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
            item.id === product.id
                ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
                : item
        );
      }

      return [
        ...current,
        {
          ...product,
          quantity: Math.min(quantity, product.stock),
          purchased: false,
        },
      ];
    });
  }

  function addRecommendedBasket() {
    recommendations.forEach((item) => {
      addToCart(item, item.quantity);
    });
    setActiveTab("Shopping List");
  }

  function updateQuantity(productId: number, change: number) {
    setCart((current) =>
        current
            .map((item) =>
                item.id === productId
                    ? { ...item, quantity: Math.min(item.stock, item.quantity + change) }
                    : item
            )
            .filter((item) => item.quantity > 0)
    );
  }

  function togglePurchased(productId: number) {
    setCart((current) =>
        current.map((item) =>
            item.id === productId ? { ...item, purchased: !item.purchased } : item
        )
    );
  }

  function logout() {
    onLogout();
    navigate("/login", { replace: true });
  }

  return (
      <div className="app-shell" data-theme={theme}>
        <aside className="sidebar">
          <Link to="/dashboard" className="sidebar-brand">
            <span className="brand-mark small-mark">S</span>
            <span>Smart<span>Basket</span></span>
          </Link>

          <div className="sidebar-label">WORKSPACE</div>
          {["Overview", "Recommendations", "Products", "Shopping List"].map((tab) => (
              <button
                  key={tab}
                  className={`nav-item ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
              >
                <span className="nav-dot" />
                {tab}
              </button>
          ))}

          <div className="sidebar-bottom">
            <div className="sidebar-promo">
              <span className="promo-icon">✦</span>
              <strong>Spend smarter.</strong>
              <p>Small savings today. Better habits tomorrow.</p>
            </div>
            <button className="nav-item logout-button" onClick={logout}>
              <span className="nav-dot" /> Sign out
            </button>
          </div>
        </aside>

        <main className="main-content">
          <header className="topbar">
            <div>
              <p className="eyebrow">YOUR GROCERY SPACE</p>
              <h2>Good day, {userName} <span className="wave">✦</span></h2>
            </div>

            <div className="topbar-actions">
              <select
                  className="shop-select"
                  value={selectedShop}
                  onChange={(event) => setSelectedShop(Number(event.target.value))}
              >
                {shops.map((shop) => (
                    <option key={shop.id} value={shop.id}>{shop.name}</option>
                ))}
              </select>
              <button className="theme-button" onClick={toggleTheme} title="Toggle theme">
                {theme === "light" ? "☾" : "☀"}
              </button>
              <div className="user-avatar">{userName.charAt(0).toUpperCase()}</div>
            </div>
          </header>

          <div className="content-wrap">
            {activeTab === "Overview" && (
                <>
                  <section className="hero-panel">
                    <div className="hero-copy">
                      <span className="hero-tag">YOUR MONEY, YOUR RULES</span>
                      <h1>Make every<br /><span>rupee count.</span></h1>
                      <p>
                        Plan your essentials, discover better prices, and keep
                        your grocery spending under control.
                      </p>
                      <button className="hero-button" onClick={() => setActiveTab("Recommendations")}>
                        Explore recommendations <span>↗</span>
                      </button>
                    </div>
                    <div className="hero-art">
                      <div className="hero-circle circle-back" />
                      <div className="hero-circle circle-front" />
                      <div className="hero-basket">🛒</div>
                      <div className="floating-chip chip-one">− Save more</div>
                      <div className="floating-chip chip-two">₹ Budget friendly</div>
                      <div className="floating-chip chip-three">✦ Smart picks</div>
                    </div>
                  </section>

                  <section className="budget-section">
                    <div className="section-heading">
                      <div>
                        <p className="eyebrow">MONTHLY PLANNER</p>
                        <h2>Your grocery budget</h2>
                      </div>
                      <span className="soft-badge">November 2026</span>
                    </div>

                    <div className="budget-panel">
                      <div className="budget-input-area">
                        <label htmlFor="budget">Set your monthly budget</label>
                        <div className="budget-input-wrap">
                          <span>₹</span>
                          <input
                              id="budget"
                              type="number"
                              min="0"
                              value={budget}
                              onChange={(event) => setBudget(Math.max(0, Number(event.target.value)))}
                          />
                        </div>
                        <p>Change your budget to refresh your recommendations.</p>
                      </div>

                      <div className="budget-summary">
                        <div>
                          <span>Recommended total</span>
                          <strong>{money(recommendationTotal)}</strong>
                        </div>
                        <div>
                          <span>Money left</span>
                          <strong className="success-text">{money(recommendationRemaining)}</strong>
                        </div>
                        <div className="budget-progress">
                          <div
                              className="progress-fill"
                              style={{
                                width: `${budget > 0 ? Math.min(100, (recommendationTotal / budget) * 100) : 0}%`,
                              }}
                          />
                        </div>
                        <small>
                          {budget > 0
                              ? `${Math.round((recommendationTotal / budget) * 100)}% of your budget planned`
                              : "Enter a budget to see your plan"}
                        </small>
                      </div>
                    </div>
                  </section>

                  <section className="stats-grid">
                    <StatCard label="Your budget" value={money(budget)} icon="◎" detail="Monthly limit" />
                    <StatCard label="Planned groceries" value={money(recommendationTotal)} icon="🛍" detail="At offer prices" />
                    <StatCard label="Potential savings" value={money(recommendationSavings)} icon="↘" detail="Compared with MRP" />
                    <StatCard label="Shopping list" value={String(cart.length)} icon="☷" detail={`${money(cartTotal)} current total`} />
                  </section>

                  <RecommendationSection
                      recommendations={recommendations}
                      total={recommendationTotal}
                      mrp={recommendationMrp}
                      savings={recommendationSavings}
                      remaining={recommendationRemaining}
                      budget={budget}
                      onAdd={addRecommendedBasket}
                  />

                  <ProductSection
                      products={filteredProducts.slice(0, 6)}
                      search={search}
                      setSearch={setSearch}
                      category={category}
                      setCategory={setCategory}
                      categories={categories}
                      onAdd={addToCart}
                      compact
                  />

                  <ShoppingList
                      cart={cart}
                      total={cartTotal}
                      purchasedTotal={purchasedTotal}
                      onQuantity={updateQuantity}
                      onPurchased={togglePurchased}
                      onRemove={(id) => setCart((current) => current.filter((item) => item.id !== id))}
                  />
                </>
            )}

            {activeTab === "Recommendations" && (
                <RecommendationSection
                    recommendations={recommendations}
                    total={recommendationTotal}
                    mrp={recommendationMrp}
                    savings={recommendationSavings}
                    remaining={recommendationRemaining}
                    budget={budget}
                    onAdd={addRecommendedBasket}
                />
            )}

            {activeTab === "Products" && (
                <ProductSection
                    products={filteredProducts}
                    search={search}
                    setSearch={setSearch}
                    category={category}
                    setCategory={setCategory}
                    categories={categories}
                    onAdd={addToCart}
                />
            )}

            {activeTab === "Shopping List" && (
                <ShoppingList
                    cart={cart}
                    total={cartTotal}
                    purchasedTotal={purchasedTotal}
                    onQuantity={updateQuantity}
                    onPurchased={togglePurchased}
                    onRemove={(id) => setCart((current) => current.filter((item) => item.id !== id))}
                />
            )}

            <footer className="page-footer">
              SmartBasket <span>•</span> Spend wisely. Live freely.
              <small>Demo frontend — product prices and recommendations are sample data.</small>
            </footer>
          </div>
        </main>
      </div>
  );
}

function StatCard({
                    label,
                    value,
                    icon,
                    detail,
                  }: {
  label: string;
  value: string;
  icon: string;
  detail: string;
}) {
  return (
      <div className="stat-card">
        <div className="stat-top">
          <span>{label}</span>
          <span className="stat-icon">{icon}</span>
        </div>
        <strong>{value}</strong>
        <small>{detail}</small>
      </div>
  );
}

function RecommendationSection({
                                 recommendations,
                                 total,
                                 mrp,
                                 savings,
                                 remaining,
                                 budget,
                                 onAdd,
                               }: {
  recommendations: (Product & { quantity: number; total: number; mrpTotal: number })[];
  total: number;
  mrp: number;
  savings: number;
  remaining: number;
  budget: number;
  onAdd: () => void;
}) {
  return (
      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CURATED FOR YOUR BUDGET</p>
            <h2>Smart recommendations</h2>
            <p className="section-description">
              Essential groceries selected to fit your budget, with offer prices shown upfront.
            </p>
          </div>
          <span className="soft-badge">Budget-aware picks</span>
        </div>

        <div className="recommendation-summary">
          <div>
            <span>Original MRP total</span>
            <strong className="mrp-text">{money(mrp)}</strong>
          </div>
          <div>
            <span>Your offer total</span>
            <strong>{money(total)}</strong>
          </div>
          <div>
            <span>You save</span>
            <strong className="success-text">{money(savings)}</strong>
          </div>
          <div>
            <span>Budget remaining</span>
            <strong className="success-text">{money(remaining)}</strong>
          </div>
        </div>

        <div className="recommendation-note">
          <span className="note-icon">✦</span>
          <div>
            <strong>{total <= budget ? "Your recommended basket fits your budget." : "Your budget needs attention."}</strong>
            <p>
              {total <= budget
                  ? `These selected quantities cost ${money(total)} at offer prices, leaving ${money(remaining)} from your ${money(budget)} budget.`
                  : "Adjust your budget or quantities to create a basket that fits."}
            </p>
          </div>
        </div>

        <div className="product-grid">
          {recommendations.map((product) => (
              <article className="product-card recommended-card" key={product.id}>
                <div className="product-visual">
              <span className="discount-pill">
                {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
              </span>
                  <span className="product-emoji">{product.icon}</span>
                </div>
                <div className="product-info">
                  <span className="category-label">{product.category}</span>
                  <h3>{product.name}</h3>
                  <div className="price-line">
                    <strong>{money(product.price)}</strong>
                    <del>{money(product.mrp)}</del>
                    <span>/{product.unit}</span>
                  </div>
                  <div className="recommendation-details">
                    <span>Recommended quantity</span><strong>{product.quantity} {product.unit}</strong>
                    <span>Basket cost</span><strong>{money(product.total)}</strong>
                    <span>You save</span><strong className="success-text">{money(product.mrpTotal - product.total)}</strong>
                  </div>
                  <p className="reason-text">
                    Offer price is lower than MRP. This essential item fits your current budget plan.
                  </p>
                </div>
              </article>
          ))}
        </div>

        <button className="primary-button add-basket-button" onClick={onAdd} disabled={recommendations.length === 0}>
          Add recommended basket to shopping list <span>→</span>
        </button>
      </section>
  );
}

function ProductSection({
                          products: visibleProducts,
                          search,
                          setSearch,
                          category,
                          setCategory,
                          categories,
                          onAdd,
                          compact = false,
                        }: {
  products: Product[];
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  categories: string[];
  onAdd: (product: Product, quantity?: number) => void;
  compact?: boolean;
}) {
  return (
      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE EVERYDAY ESSENTIALS</p>
            <h2>{compact ? "Explore products" : "Product catalogue"}</h2>
            <p className="section-description">Compare original prices with current demo offer prices.</p>
          </div>
        </div>

        <div className="catalogue-toolbar">
          <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search groceries..."
          />
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>

        <div className="product-grid">
          {visibleProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-visual">
              <span className="discount-pill">
                {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
              </span>
                  <span className="product-emoji">{product.icon}</span>
                </div>
                <div className="product-info">
                  <span className="category-label">{product.category}</span>
                  <h3>{product.name}</h3>
                  <div className="price-line">
                    <strong>{money(product.price)}</strong>
                    <del>{money(product.mrp)}</del>
                    <span>/{product.unit}</span>
                  </div>
                  <p className="stock-text">{product.stock} units available</p>
                  <button className="outline-button" onClick={() => onAdd(product)}>
                    Add to list <span>+</span>
                  </button>
                </div>
              </article>
          ))}
          {visibleProducts.length === 0 && (
              <p className="empty-state">No products match your search.</p>
          )}
        </div>
      </section>
  );
}

function ShoppingList({
                        cart,
                        total,
                        purchasedTotal,
                        onQuantity,
                        onPurchased,
                        onRemove,
                      }: {
  cart: CartItem[];
  total: number;
  purchasedTotal: number;
  onQuantity: (id: number, change: number) => void;
  onPurchased: (id: number) => void;
  onRemove: (id: number) => void;
}) {
  return (
      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR GROCERY CHECKLIST</p>
            <h2>Shopping list</h2>
            <p className="section-description">Update quantities and mark items as purchased.</p>
          </div>
          <span className="soft-badge">{cart.length} items</span>
        </div>

        <div className="shopping-panel">
          {cart.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">🛍</span>
                <h3>Your list is waiting.</h3>
                <p>Add products or your recommended basket to get started.</p>
              </div>
          ) : (
              <>
                <div className="shopping-list">
                  {cart.map((item) => (
                      <div className={`shopping-row ${item.purchased ? "is-purchased" : ""}`} key={item.id}>
                        <button
                            className={`purchase-check ${item.purchased ? "checked" : ""}`}
                            onClick={() => onPurchased(item.id)}
                            aria-label="Toggle purchased"
                        >
                          {item.purchased ? "✓" : ""}
                        </button>
                        <span className="shopping-emoji">{item.icon}</span>
                        <div className="shopping-product">
                          <strong>{item.name}</strong>
                          <small>{money(item.price)} / {item.unit}</small>
                        </div>
                        <div className="quantity-control">
                          <button onClick={() => onQuantity(item.id, -1)}>−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => onQuantity(item.id, 1)}>+</button>
                        </div>
                        <strong className="shopping-total">{money(item.price * item.quantity)}</strong>
                        <button className="remove-button" onClick={() => onRemove(item.id)}>×</button>
                      </div>
                  ))}
                </div>
                <div className="shopping-footer">
                  <div><span>Purchased</span><strong>{money(purchasedTotal)}</strong></div>
                  <div><span>Shopping list total</span><strong>{money(total)}</strong></div>
                </div>
              </>
          )}
        </div>
      </section>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(() => Boolean(getSavedUser()));

  function handleAuthenticated() {
    setLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem("smartbasket-user");
    localStorage.removeItem("smartbasket-name");
    setLoggedIn(false);
  }

  return (
      <Routes>
        <Route
            path="/"
            element={<Navigate to={loggedIn ? "/dashboard" : "/login"} replace />}
        />
        <Route
            path="/login"
            element={
              loggedIn
                  ? <Navigate to="/dashboard" replace />
                  : <Login onAuthenticated={handleAuthenticated} />
            }
        />
        <Route
            path="/signup"
            element={
              loggedIn
                  ? <Navigate to="/dashboard" replace />
                  : <Signup onAuthenticated={handleAuthenticated} />
            }
        />
        <Route
            path="/dashboard"
            element={
              loggedIn
                  ? <Dashboard onLogout={handleLogout} />
                  : <Navigate to="/login" replace />
            }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  );
}
