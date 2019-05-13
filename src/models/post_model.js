import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  authorName: String,
  title: String,
  tags: String,
  cover_url: String,
  content: String,
}, {
  toJSON: {
    virtuals: true,
  },
});

// create model class
const PostModel = mongoose.model('posts', PostSchema);

export default PostModel;
