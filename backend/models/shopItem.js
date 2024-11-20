const mongoose = require('mongoose');

const shopItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number, 
    required: true,
    min: 1,
  },
  stock: {
    type: Number,
    required: true,
    default: 0, 
  },
  image:{
    type: String,
    require: true,
  }
});

const ShopItem = mongoose.model('ShopItem', shopItemSchema);

export default ShopItem;
