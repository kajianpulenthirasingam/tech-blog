const User = require("./User");
const BlogPost = require("./Blogpost");
const Comment = require("./Comment");

User.hasMany(BlogPost, {
  foreignKey: "created_by",
  onDelete: "CASCADE",
});

BlogPost.belongsTo(User, {
  foreignKey: "created_by",
});

User.hasMany(Comment, {
  foreignKey: "created_by",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "created_by",
});

BlogPost.hasMany(Comment, {
  foreignKey: "blog_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(BlogPost, {
  foreignKey: "blog_id",
});

module.exports = { User, BlogPost, Comment };