// Simple test script to verify the new translation API
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000/api';

async function testTranslation() {
  try {
    console.log('Testing Japanese to English translation...');
    
    // Test Japanese to English
    const jaToEnResponse = await fetch(`${BASE_URL}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: 'こんにちは',
        sourceLanguage: 'ja',
        targetLanguage: 'en'
      })
    });
    
    const jaToEnResult = await jaToEnResponse.json();
    console.log('JA->EN Result:', jaToEnResult);
    
    console.log('\nTesting English to Japanese translation...');
    
    // Test English to Japanese
    const enToJaResponse = await fetch(`${BASE_URL}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: 'Hello',
        sourceLanguage: 'en',
        targetLanguage: 'ja'
      })
    });
    
    const enToJaResult = await enToJaResponse.json();
    console.log('EN->JA Result:', enToJaResult);
    
    console.log('\nTesting backward compatibility (no language params - should default to JA->EN)...');
    
    // Test backward compatibility
    const legacyResponse = await fetch(`${BASE_URL}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: 'さようなら'
      })
    });
    
    const legacyResult = await legacyResponse.json();
    console.log('Legacy Result:', legacyResult);
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testTranslation();
