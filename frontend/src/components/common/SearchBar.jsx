import React, { useState, useEffect, useContext, useRef } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { LocationContext } from '../../context/LocationContext';
import { LanguageContext } from '../../context/LanguageContext';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { setLocation } = useContext(LocationContext);
  const { t } = useContext(LanguageContext);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 3) {
        setSuggestions([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/v1/geocode?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setSuggestions(data);
        }
      } catch (e) {
        console.error("Geocoding failed", e);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Handle clicking outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (suggestion) => {
    const newLat = parseFloat(suggestion.lat);
    const newLng = parseFloat(suggestion.lon);
    const name = suggestion.display_name?.split(',')[0] || query;
    
    setLocation(newLat, newLng, name);
    setQuery(''); // Clear the search bar
    setShowSuggestions(false); // Hide the dropdown
  };

  return (
    <div className="relative w-full max-w-sm" ref={wrapperRef}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
        <Search className="h-4 w-4 text-[var(--color-text-secondary)]" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-white/50 rounded-full leading-5 bg-white/40 backdrop-blur-md placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:bg-white/60 shadow-sm transition-all sm:text-sm text-[var(--color-text-primary)]"
        placeholder={t('common.search_placeholder') || 'Search your city...'}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && suggestions.length > 0) {
            handleSelect(suggestions[0]);
          }
        }}
      />
      
      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <Loader2 className="h-4 w-4 text-[var(--color-accent)] animate-spin" />
        </div>
      )}

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-2 glass-panel border border-white/50 rounded-xl shadow-xl max-h-60 overflow-auto text-sm text-[var(--color-text-primary)] custom-scrollbar">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="px-4 py-3 hover:bg-black/5 cursor-pointer border-b border-[var(--color-border)] last:border-0 transition-colors font-medium"
              onClick={() => handleSelect(s)}
            >
              {s.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
