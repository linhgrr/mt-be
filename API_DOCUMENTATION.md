# Translation API Documentation

## Overview
The translation API now supports bidirectional translation between Japanese and English.

## Supported Translation Directions
- Japanese to English (`ja` → `en`)
- English to Japanese (`en` → `ja`)

## API Endpoint
`POST /api/translate`

## Request Format

### New Format (Recommended)
```json
{
  "text": "Text to translate",
  "sourceLanguage": "ja|en",
  "targetLanguage": "en|ja"
}
```

### Legacy Format (Still Supported)
```json
{
  "text": "Japanese text to translate"
}
```
*Note: Legacy format defaults to Japanese → English translation*

## Response Format

### New Response Format
```json
{
  "original_text": "Input text",
  "translated_text": "Translated text",
  "source_language": "ja|en",
  "target_language": "en|ja",
  "translation_id": "mongodb_id"
}
```

### Legacy Response Format (for backward compatibility)
When using legacy request format, the response maintains the old structure:
```json
{
  "original_text": "Input text",
  "english_translation": "Translated text",
  "translation_id": "mongodb_id"
}
```

## Examples

### Japanese to English
```bash
curl -X POST http://localhost:3000/api/translate \
  -H "Content-Type: application/json" \
  -d '{
    "text": "おはようございます",
    "sourceLanguage": "ja",
    "targetLanguage": "en"
  }'
```

### English to Japanese
```bash
curl -X POST http://localhost:3000/api/translate \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Good morning",
    "sourceLanguage": "en",
    "targetLanguage": "ja"
  }'
```

### Legacy Format (Japanese to English)
```bash
curl -X POST http://localhost:3000/api/translate \
  -H "Content-Type: application/json" \
  -d '{
    "text": "おはようございます"
  }'
```

## Error Responses

### Validation Errors
- **400**: Invalid language codes
- **400**: Source and target languages are the same
- **400**: Missing or empty text
- **400**: Invalid request format

### Server Errors
- **500**: Translation service failure
- **500**: Database connection issues

## Database Schema Updates

### New Fields
- `sourceText`: The original input text
- `targetText`: The translated text
- `sourceLanguage`: Source language code (`ja` or `en`)
- `targetLanguage`: Target language code (`ja` or `en`)

### Legacy Fields (Maintained for Compatibility)
- `japanese`: Japanese text (deprecated but maintained)
- `english`: English text (deprecated but maintained)

## Migration Notes
- Existing translations will continue to work with legacy fields
- New translations are stored with both new and legacy fields for compatibility
- APIs will gradually transition to use new field names
- Legacy field support will be maintained for backward compatibility
