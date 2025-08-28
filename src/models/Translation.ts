import mongoose, { Document, Schema } from 'mongoose';

export interface ITranslation extends Document {
  sourceText: string;
  targetText: string;
  sourceLanguage: 'ja' | 'en' | 'zh' | 'ko';
  targetLanguage: 'ja' | 'en' | 'zh' | 'ko';
  // Keep legacy fields for backward compatibility
  japanese?: string;
  english?: string;
  rating?: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TranslationSchema: Schema = new Schema({
  sourceText: {
    type: String,
    required: true,
    trim: true
  },
  targetText: {
    type: String,
    required: true,
    trim: true
  },
  sourceLanguage: {
    type: String,
    required: true,
    enum: ['ja', 'en', 'zh', 'ko'],
    default: 'ja'
  },
  targetLanguage: {
    type: String,
    required: true,
    enum: ['ja', 'en', 'zh', 'ko'],
    default: 'en'
  },
  // Keep legacy fields for backward compatibility
  japanese: {
    type: String,
    trim: true
  },
  english: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },
  comment: {
    type: String,
    trim: true,
    default: ''
  }
}, {
  timestamps: true
});

// Index for better query performance
TranslationSchema.index({ rating: 1 });
TranslationSchema.index({ createdAt: -1 });
TranslationSchema.index({ sourceLanguage: 1, targetLanguage: 1 });

export default mongoose.models.Translation || mongoose.model<ITranslation>('Translation', TranslationSchema); 