import mongoose, { Document, Schema } from 'mongoose';

export interface ITranslation extends Document {
  japanese: string;
  english: string;
  rating?: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TranslationSchema: Schema = new Schema({
  japanese: {
    type: String,
    required: true,
    trim: true
  },
  english: {
    type: String,
    required: true,
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

export default mongoose.models.Translation || mongoose.model<ITranslation>('Translation', TranslationSchema); 