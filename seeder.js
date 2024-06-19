import Post from "./models/post.js";
import User from "./models/user.js";
import db from "./db.js";

await db.connect();
await User.deleteMany({});
await Post.deleteMany({});

// Insert user
const user1 = await User.create({ name: "John Doe" });
const user2 = await User.create({ name: "John Doe" });

// Inser posts
const post1 = await Post.create({ owner: user1._id, content: "Post 1" });
const post2 = await Post.create({ owner: user1._id, content: "Post 2" });
const post3 = await Post.create({ owner: user2._id, content: "Post 3" });

// add posts to users
user1.posts.push(post1);
user1.posts.push(post2);

// save in DB
await user1.save();

user2.posts.push(post3);
await user2.save();
console.log("Data seeded successfully");