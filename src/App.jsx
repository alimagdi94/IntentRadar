import { useState } from 'react';
import './App.css';

function App() {
  const [keyword, setKeyword] = useState('');
  const [platform, setPlatform] = useState('reddit'); // 'reddit' or 'facebook'
  const [language, setLanguage] = useState('both'); // 'en', 'ar', 'both'

  // Predefined monetization keywords for Egyptian/Arabic market + English
  const queries = {
    reddit: {
      en: [
        `site:reddit.com "${keyword}" "hiring"`,
        `site:reddit.com "${keyword}" "looking for"`,
        `site:reddit.com "${keyword}" "need help with"`,
        `site:reddit.com "${keyword}" "willing to pay"`,
      ],
      ar: [
        `site:reddit.com "${keyword}" "محتاج"`,
        `site:reddit.com "${keyword}" "عايز"`,
        `site:reddit.com "${keyword}" "حد يعرف"`,
        `site:reddit.com "${keyword}" "فري لانس"`,
      ]
    },
    facebook: {
      en: [
        `site:facebook.com "${keyword}" "hiring"`,
        `site:facebook.com "${keyword}" "looking for"`,
        `site:facebook.com "${keyword}" "paid"`,
      ],
      ar: [
        `site:facebook.com "${keyword}" "محتاج"`,
        `site:facebook.com "${keyword}" "عايز"`,
        `site:facebook.com "${keyword}" "مطلوب"`,
        `site:facebook.com "${keyword}" "حد يعرف"`,
        `site:facebook.com "${keyword}" "ترشيح"`,
        `site:facebook.com "${keyword}" "حد جرب"`,
      ]
    }
  };

  const getLinks = () => {
    if (!keyword.trim()) return [];

    let links = [];
    const p = platform;

    // Helper to add google search link
    const addLink = (q, label) => ({
      query: q,
      label: label,
      url: `https://www.google.com/search?q=${encodeURIComponent(q)}`
    });

    if (language === 'en' || language === 'both') {
      queries[p].en.forEach(q => links.push(addLink(q, 'English Dork')));
    }
    if (language === 'ar' || language === 'both') {
      queries[p].ar.forEach(q => links.push(addLink(q, 'Arabic/Egyptian Dork')));
    }

    return links;
  };

  const links = getLinks();

  return (
    <div className="app-container">
      <div className="glass-card">
        <h1 className="title">Support Dorker</h1>
        <p className="subtitle">Find monetizable opportunities on Social Media</p>

        <div className="tabs">
          <button
            className={`tab ${platform === 'reddit' ? 'active' : ''}`}
            onClick={() => setPlatform('reddit')}
          >
            Reddit
          </button>
          <button
            className={`tab ${platform === 'facebook' ? 'active' : ''}`}
            onClick={() => setPlatform('facebook')}
          >
            Facebook
          </button>
        </div>

        <div className="input-group">
          <label>Niche Keyword (e.g., "Graphic Design", "تصميم")</label>
          <input
            type="text"
            className="input-field"
            placeholder="Enter service or niche..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <div className="tabs" style={{ marginBottom: '1rem' }}>
          <button className={`tab ${language === 'en' ? 'active' : ''}`} onClick={() => setLanguage('en')}>English Only</button>
          <button className={`tab ${language === 'both' ? 'active' : ''}`} onClick={() => setLanguage('both')}>Both</button>
          <button className={`tab ${language === 'ar' ? 'active' : ''}`} onClick={() => setLanguage('ar')}>Arabic (Egyptian)</button>
        </div>

        <div className="results-area">
          {links.length > 0 ? (
            links.map((link, idx) => (
              <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="result-card">
                <div className="result-title">{link.label}</div>
                <div className="result-query">{link.query}</div>
              </a>
            ))
          ) : (
            <div style={{ textAlign: 'center', opacity: 0.5 }}>Enter a keyword to generate dorks</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
