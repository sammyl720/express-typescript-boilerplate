import { Schema, Types, model } from 'mongoose';

const ProductSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    required: true
  },
  details: {
    type: Object,
    default: {}
  },
  quantity: {
    type: Number,
    default: 0
  },
  inStock: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    default: 0
  },
  id: String
})

// add an id on pre save
ProductSchema.pre('save', function (next) {
  this.id = this._id.toString();
  next();
});




const ProductModel = model('Product', ProductSchema);

export default ProductModel;