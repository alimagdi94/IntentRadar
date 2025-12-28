import { useState } from 'react';
import './App.css';

function App() {
  const [keyword, setKeyword] = useState('');
  const [platform, setPlatform] = useState('reddit'); // Default platform
  const [language, setLanguage] = useState('both'); // 'en', 'ar', 'both'

  const platforms = [
    { id: 'reddit', name: 'Reddit', site: 'reddit.com' },
    { id: 'facebook', name: 'Facebook', site: 'facebook.com' },
  ];

  // Smart high-intent keywords (General urgency & Need focused)
  const intents = {
    en: [
      "urgently need", "looking for", "where to find", "willing to pay",
      "recommendations needed", "does anyone know", "best place for",
      "ISO", "urgent", "need a pro", "looking to buy", "immediately", "ASAP"
    ],
    ar: [
      "محتاج ضروري", "عايز", "حد يعرف", "منين اجيب",
      "ترشيح", "مطلوب حالاً", "حد جرب", "مستعجل",
      "ادفع كام", "افضل مكان", "ضروري جدا", "في اسرع وقت", "ألاقي فين"
    ]
  };

  const getLinks = () => {
    if (!keyword.trim()) return [];

    let links = [];
    const selectedPlatformData = platforms.find(p => p.id === platform);
    const domainQuery = `site:${selectedPlatformData.site}`;

    // Helper to add google search link
    const addLink = (intent, label) => {
      const q = `${domainQuery} "${keyword}" "${intent}"`;
      return {
        query: q,
        label: label,
        url: `https://www.google.com/search?q=${encodeURIComponent(q)}`
      };
    };

    if (language === 'en' || language === 'both') {
      intents.en.forEach(intent => links.push(addLink(intent, 'English Dork')));
    }
    if (language === 'ar' || language === 'both') {
      intents.ar.forEach(intent => links.push(addLink(intent, 'Arabic Dork')));
    }

    return links;
  };

  const links = getLinks();

  return (
    <div className="app-container">
      <div className="glass-card">
        <h1 className="title">IntentRadar</h1>
        <p className="subtitle">Find urgent needs & opportunities on Social Media</p>

        <div className="tabs platform-tabs">
          {platforms.map(p => (
            <button
              key={p.id}
              className={`tab ${platform === p.id ? 'active' : ''}`}
              onClick={() => setPlatform(p.id)}
            >
              {p.name}
            </button>
          ))}
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
