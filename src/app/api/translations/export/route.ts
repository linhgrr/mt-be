import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Translation from '@/models/Translation';

// GET endpoint to export translations with rating >= 4 stars as JSON
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Get translations with rating >= 4
    const translations = await Translation.find({ 
      rating: { $gte: 4 } 
    })
    .select('japanese english sourceText targetText sourceLanguage targetLanguage rating comment createdAt')
    .sort({ createdAt: -1 })
    .lean();
    
    // Transform to the requested format, handling both legacy and new schema
    const exportData = translations.map(translation => {
      // Use new schema if available, fallback to legacy
      const japanese = translation.sourceLanguage === 'ja' ? translation.sourceText : 
                      translation.targetLanguage === 'ja' ? translation.targetText :
                      translation.japanese;
      const english = translation.sourceLanguage === 'en' ? translation.sourceText :
                     translation.targetLanguage === 'en' ? translation.targetText :
                     translation.english;
      
      return {
        japanese: japanese || translation.japanese,
        english: english || translation.english
      };
    });
    
    // Create response with proper headers for file download
    const response = NextResponse.json(exportData, {
      headers: {
        'Access-Control-Allow-Origin': process.env.FRONTEND_URL || '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Disposition': `attachment; filename="high_rated_translations_${new Date().toISOString().split('T')[0]}.json"`,
        'Content-Type': 'application/json',
      },
    });
    
    return response;
    
  } catch (error: any) {
    console.error('Export error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to export translations', 
        details: error.message 
      },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': process.env.FRONTEND_URL || '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  }
}

// OPTIONS endpoint for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': process.env.FRONTEND_URL || '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 