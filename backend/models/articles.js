import mongoose from "mongoose";
const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,     
      trim: true,          
      minlength: 5,        
      maxlength: 200,      
    },
    content: {
      type: String,
      required: true,      
      minlength: 50,      
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',        
      required: true,      
    },
    tags: [{
      type: String,        
      lowercase: true,     
      trim: true,         
    }],
    published: {
      type: Boolean,
      default: true,     
    },
    publishedAt: {
      type: Date,

      default: Date.now(),      
    },
    views: {
      type: Number,
      default: 0,          
    },
  },
  {
    timestamps: true,     
  }
);

const Article = mongoose.model('Article', articleSchema);

export default Article;
