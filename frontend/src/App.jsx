
import { useState } from 'react'
import './App.css'

function App() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    if (!url.trim() || loading) return

    setLoading(true)
    setShortUrl('')
    setError('')
    setCopied(false)

    try {
      const response = await fetch('https://url-shortener-api-6w4r.onrender.com/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Something went wrong')
        return
      }

      setShortUrl(`https://url-shortener-api-6w4r.onrender.com/${data.data.shortId}`)
    } catch (err) {
      setError('Backend se connect nahi ho pa raha. Check karo server running hai ya nahi.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }



  return (
    <div className="app">
      <nav className="navbar">
        <a className="brand" href="/">
          <span className="brand-icon">↗</span>
          <span>shortly<span className="brand-dot">.</span></span>
        </a>

        <div className="nav-right">
          <span className="status-dot" />
          <span className="nav-status">URL management, simplified</span>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="eyebrow">
            <span>✦</span> YOUR LINKS, REIMAGINED
          </div>

          <h1>
            Short links.
            <br />
            <span>Big possibilities.</span>
          </h1>

          <p className="hero-description">
            Transform long, messy URLs into clean, memorable links.
            Share smarter and keep everything organized.
          </p>

          <form className="shorten-card" onSubmit={handleSubmit}>
            <label htmlFor="url-input">Paste your long URL</label>

            <div className="input-row">
              <span className="input-icon">↗</span>
              <input
                id="url-input"
                type="url"
                placeholder="https://example.com/your/very/long/link"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? 'Shortening...' : 'Shorten URL'}
                {!loading && <span>→</span>}
              </button>

            </div>

            <div className="card-footer">
              <span>↳</span>
              <span>Simple. Fast. Easy to share.</span>
              <span className="secure-label">● Ready to shorten</span>
            </div>
          </form>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {shortUrl && (
            <div className="short-url-result">
              <p>Your shortened link is ready!</p>
              <a href={shortUrl} target="_blank" rel="noreferrer">
                {shortUrl}
              </a>

              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(shortUrl)
                    setCopied(true)
                  } catch (err) {
                    setError('Link copy nahi ho paya. Manually copy karo.')
                  }
                }}
              >
                {copied ? 'Copied! ✓' : 'Copy link'}
              </button>


            </div>
          )}


          <div className="trust-row">
            <span className="trust-icon">✓</span>
            No complicated setup
            <span className="trust-separator">·</span>
            <span className="trust-icon">✓</span>
            Links you can manage
          </div>
        </section>

        <section className="features">
          <div className="section-heading">
            <span>BUILT FOR BETTER SHARING</span>
            <h2>Everything your links need.</h2>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <div className="feature-icon purple">↗</div>
              <h3>Short & shareable</h3>
              <p>Turn lengthy URLs into compact links that are easy to share anywhere.</p>
              <span className="feature-number">01 / SIMPLE</span>
            </article>

            <article className="feature-card">
              <div className="feature-icon blue">⌁</div>
              <h3>Track your links</h3>
              <p>Keep an eye on link activity with click statistics and link insights.</p>
              <span className="feature-number">02 / INSIGHTS</span>
            </article>

            <article className="feature-card">
              <div className="feature-icon orange">⏱</div>
              <h3>Stay in control</h3>
              <p>Use custom aliases and expiration dates to manage your links your way.</p>
              <span className="feature-number">03 / CONTROL</span>
            </article>
          </div>
        </section>

        <footer className="footer">
          <a className="brand footer-brand" href="/">
            <span className="brand-icon">↗</span>
            <span>shortly<span className="brand-dot">.</span></span>
          </a>
          <span>Less URL. More possibilities.</span>
          <span>Built with care © 2026</span>
        </footer>
      </main>
    </div>
  )
}

export default App
