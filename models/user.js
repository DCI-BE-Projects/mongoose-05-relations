import { Schema, model } from "mongoose";


const userSchema = new Schema({
name: {
type: String,
required: true
},
posts : [{
type: Schema.Types.ObjectId,
ref: 'Post'
}]
});

const User = model('User', userSchema);
export default User;
