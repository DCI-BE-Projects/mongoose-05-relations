**lastday**
    - CRUD operations
    - soft vs hard delete
**today**
    - review
    - data relationships

## Regular vs Soft Delete

- **Regular Delete**:
  - Permanently removes the document from the database.
  - Can use when data should no longer exist in the system.

  - **Example**:
    ```javascript
    await Product.findByIdAndDelete(id);
    ```

- **Soft Delete**:
  - Marks a document as deleted without removing it from the database.
  - Can use when you need to retain deleted data for recovery or audit purposes.

  - **Implementation**: 
    - Add a field like `isDeleted` or `deletedAt` to the schema and update it instead of deleting the document.

  - **Example**:
    ```javascript
    // Soft delete implementation
    const productSchema = new mongoose.Schema({
      name: String,
      price: Number,
      deletedAt: { type: Date, default: null }
    });

    await Product.findByIdAndUpdate(id, { deletedAt: new Date() });
    // Querying non deleted products
    const products = await Product.find({ deletedAt: null });
    // Querying deleted items
    const deletedProducts = await Product.find({ deletedAt: { $ne: null }});
    ```

## Data Relations

- Think about Facebook/Twitter/Mastodon/Instagram/...
- User has Posts
  - Post has Likes
  - Post has Comments
    - Comment has Likes
    - Comment has Comments
- User has Users that they follow
- User has favorite Posts

**Collections are commonly related as follows:**

### One-to-One

- One Post belongs to one User (creator)

- **Example**:
  ```javascript
  const postSchema = new mongoose.Schema({
    content: String,
    owner: userID
  });

  const User = mongoose.model('User', userSchema);
  const Post = mongoose.model('Post', postSchema);
  ```

### One-to-Many

- One User has many Posts
- One Post has many Comments

- **Example**:
  ```javascript
  const userSchema = new mongoose.Schema({
    name: String,
    posts: [postIDs]
  });

  const postSchema = new mongoose.Schema({
    content: String,
    comments: [commentIDs]
  });
  ```

### Many-to-Many

- One User has many Posts in their favorites list
- One Post has many Users that have added it to their favorites list

- **Example**:
  ```javascript
  const userSchema = new mongoose.Schema({
    name: String,
    favoritePosts: [postIDs]
  });

  const postSchema = new mongoose.Schema({
    content: String,
    favoritedBy: [userIDs]
  });
  ```

## Implementing Relations in MongoDB

- Let's say you want to view a User profile and browse their Posts
  - GET /user/42 - Get the details of user 42
    ```js
    {
        _id: 42,
        name: "Otto the Great",
        posts: [4,71,142,144]
    } 
    ```
    - Would you then get the post one by one?
        - GET /post/4
        - GET /post/71
        - GET /post/142
        - GET /post/144

    - There are three alternatives
        - GET /user/42/posts - Get Posts belonging to a user
        - GET /post?forUser=42 - Get Posts belonging to a user (alternate)
        - GET /user/42?include=posts - Get user 42 including posts

- Let's build a users-and-posts API to practice

- **Mongoose Documentation**: 
  - For more details, refer to the [Mongoose Populate Documentation](https://mongoosejs.com/docs/populate.html).

# Wrap-up

- **Relationship Types**:
  - Understand one-to-one, one-to-many, and many-to-many relationships.
  - Implement these relationships using the `ref` schema option in Mongoose.

- **Populating Results**:
  - Use the `populate` method to retrieve related documents.