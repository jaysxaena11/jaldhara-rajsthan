import fetch from 'node-fetch';

const cache = new Map();

async function libreTranslate(text, target, source = 'hi') {
  const res = await fetch(`${process.env.LIBRETRANSLATE_URL}/translate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      q: text, source, target, format: 'text',
      api_key: process.env.LIBRETRANSLATE_API_KEY || undefined
    })
  });
  if (!res.ok) throw new Error('LibreTranslate failed');
  const data = await res.json();
  return data.translatedText;
}

async function googleTranslate(text, target, source = 'hi') {
  const key = process.env.GOOGLE_TRANSLATE_API_KEY;
  const res = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${key}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: text, target, source, format: 'text' })
  });
  if (!res.ok) throw new Error('Google Translate failed');
  const data = await res.json();
  return data.data.translations[0].translatedText;
}

export async function translate(text, target, source = 'hi') {
  if (!text || target === source) return text;
  const cacheKey = `${source}:${target}:${text}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  const engine = process.env.TRANSLATE_ENGINE || 'libretranslate';
  let result;
  
  try {
    result = engine === 'google'
      ? await googleTranslate(text, target, source)
      : await libreTranslate(text, target, source);
    cache.set(cacheKey, result);
    return result;
  } catch (e) {
    console.error('Translation failed:', e.message);
    // Fallback: try the other engine
    try {
      result = engine === 'google'
        ? await libreTranslate(text, target, source)
        : await googleTranslate(text, target, source);
      cache.set(cacheKey, result);
      return result;
    } catch (e2) {
      console.error('Both translation engines failed:', e2.message);
      // Final fallback: return original text with language note
      return text + ' [Original: ' + source + ']';
    }
  }
}
