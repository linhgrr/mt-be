# Tsuyaku Backend

Translation API Backend for Japanese Railway Announcements using Google Gemini AI.

## Features

- Next.js API routes for easy deployment to Vercel
- Multiple Gemini API key rotation for redundancy
- CORS support for frontend integration
- Environment-based configuration
- Error handling and retry mechanisms

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env.local` file and add your API keys:
   ```env
   # Google Gemini API Keys (add up to 8 keys for rotation)
   GEMINI_API_KEY_1=your_api_key_1_here
   GEMINI_API_KEY_2=your_api_key_2_here
   GEMINI_API_KEY_3=your_api_key_3_here
   GEMINI_API_KEY_4=your_api_key_4_here
   GEMINI_API_KEY_5=your_api_key_5_here
   GEMINI_API_KEY_6=your_api_key_6_here
   GEMINI_API_KEY_7=your_api_key_7_here
   GEMINI_API_KEY_8=your_api_key_8_here
   
   # Frontend URL for CORS (optional, defaults to *)
   FRONTEND_URL=http://localhost:5173
   
   # MongoDB connection string
   MONGO_URL=mongodb+srv://nhatquangpx:8sotamnhe@gymmanagement.8jghrjf.mongodb.net/?retryWrites=true&w=majority&appName=GymManagement
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## API Endpoints

### POST /api/translate

Translates Japanese text to English using Google Gemini AI.

**Request Body:**
```json
{
  "text": "Japanese text to translate"
}
```

**Response:**
```json
{
  "original_text": "Japanese text",
  "english_translation": "English translation"
}
```

**Error Response:**
```json
{
  "error": "Error message",
  "details": "Detailed error information"
}
```

## Deployment to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Add environment variables in Vercel dashboard:**
   - Go to your project settings
   - Add all GEMINI_API_KEY_* variables
   - Set FRONTEND_URL to your frontend domain

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| GEMINI_API_KEY_1 to GEMINI_API_KEY_8 | Google Gemini API keys for rotation | Yes (at least one) |
| FRONTEND_URL | Frontend URL for CORS configuration | No (defaults to *) |

## Features

- **API Key Rotation**: Automatically rotates between multiple API keys for better reliability
- **Error Handling**: Comprehensive error handling with retry mechanisms
- **CORS Support**: Properly configured CORS headers for frontend integration
- **Vercel Ready**: Optimized for deployment on Vercel platform 