import { Schema, model } from "mongoose";

const postSchema = new Schema({
	owner: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	content: {
		type: String,
		required: true
	}
});

const Post = model('Post', postSchema);
export default Post;