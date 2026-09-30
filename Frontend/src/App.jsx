import { useState } from "react";
import "./App.css";

const API_BASE = "http://localhost:8010/api";

const rupee = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

function ResultCard({ item }) {
  const { pricing, logistics } = item;
  const isPackage = item.item_type === "package";
  const homeFee = logistics?.home_collection ? logistics.home_collection_fee ?? 0 : 0;
  const total = pricing.offer_price + homeFee;
  const discount =
    pricing.mrp > pricing.offer_price
      ? Math.round(((pricing.mrp - pricing.offer_price) / pricing.mrp) * 100)
      : 0;

  return (
    <article className="card">
      <div className="card-top">
        <span className={`type-badge ${isPackage ? "package" : "single"}`}>
          {isPackage ? "Package" : "Single Test"}
        </span>
        {item.nabl_accredited && <span className="nabl-badge">✓ NABL Certified</span>}
      </div>

      <h2 className="item-name">{item.item_name}</h2>
      <p className="provider">{item.provider_name}</p>

      {isPackage && item.included_tests?.length > 0 && (
        <div className="tags-section">
          <span className="tags-label">
            Includes {item.included_tests.length} tests
          </span>
          <div className="tags">
            {item.included_tests.map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="price-row">
        <span className="offer-price">{rupee(pricing.offer_price)}</span>
        {pricing.mrp > pricing.offer_price && (
          <span className="mrp">{rupee(pricing.mrp)}</span>
        )}
        {discount > 0 && <span className="discount">{discount}% off</span>}
      </div>

      <div className="total">
        <span className="total-label">Total</span>
        <span className="total-value">
          {rupee(pricing.offer_price)}
          {homeFee > 0 && ` + ${rupee(homeFee)} Home Collection`}
          {logistics?.home_collection && homeFee === 0 && " (Free Home Collection)"}
        </span>
        {homeFee > 0 && <span className="total-sum">= {rupee(total)}</span>}
      </div>

      <div className="meta">
        <span>
          {logistics?.home_collection
            ? "🏠 Home collection available"
            : "🏥 Lab visit only"}
        </span>
        {logistics?.report_tat_hours != null && (
          <span>⏱ Report in {logistics.report_tat_hours} hrs</span>
        )}
      </div>
    </article>
  );
}

export default function App() {
  const [testName, setTestName] = useState("");
  const [pincode, setPincode] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");

    if (!/^\d{6}$/.test(pincode.trim())) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams({
        test_name: testName.trim(),
        pincode: pincode.trim(),
      });
      const res = await fetch(`${API_BASE}/search?${params}`);
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
    } catch (err) {
      setResults(null);
      setError(`Could not fetch results. ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>MedScanner Lab Aggregator</h1>
        <p>Compare tests and packages available at your pincode.</p>
      </header>

      <form className="search-form" onSubmit={handleSearch}>
        <div className="field">
          <label htmlFor="test">Test Name</label>
          <input
            id="test"
            type="text"
            placeholder="e.g. Lipid Profile"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="pin">Pincode</label>
          <input
            id="pin"
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="e.g. 110001"
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Searching…" : "Search"}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {results && !error && (
        <>
          <p className="count">
            {results.length} result{results.length !== 1 && "s"} found
          </p>
          {results.length === 0 ? (
            <div className="empty">
              No tests found for this name and pincode. Try a different search.
            </div>
          ) : (
            <div className="grid">
              {results.map((item) => (
                <ResultCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
