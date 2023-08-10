const router = require("express").Router();
const { BlogPost, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// GET all blogposts for homepage
router.get("/", async (req, res) => {
  try {
    const blogpostData = await BlogPost.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });
    const blogposts = blogpostData.map((blogpost) =>
      blogpost.get({ plain: true })
    );
    res.render("homepage", {
      title: "The Tech Blog",
      logged_in: req.session.logged_in,
      blogposts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const blogpostData = await BlogPost.findAll({
      where: { created_by: req.session.user_id },
    });
    const blogposts = blogpostData.map((blogpost) =>
      blogpost.get({ plain: true })
    );

    res.render("dashboard", {
      title: "Dashboard",
      logged_in: req.session.logged_in,
      blogposts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/my-post/:id", withAuth, async (req, res) => {
  try {
    let id = req.params.id;
    const blogpostData = await BlogPost.findOne({
      where: { id },
      include: [
        {
          model: Comment,
          attributes: ["content", "created_by", "createdAt", "id"],
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });
    const blogpost = blogpostData.get({ plain: true });
    res.render("view-my-post", {
      title: "My Post",
      logged_in: req.session.logged_in,
      blogpost,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/create-post", withAuth, async (req, res) => {
  try {
    res.render("create-post", {
      title: "Dashboard",
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/update-post/:id", withAuth, async (req, res) => {
  try {
    const blogpostData = await BlogPost.findByPk(req.params.id);
    const blogpost = blogpostData.get({ plain: true });
    res.render("update-post", {
      title: "Edit Post",
      logged_in: req.session.logged_in,
      blogpost,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/add-comment/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const blogpostData = await BlogPost.findOne({
      where: { id },
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          attributes: ["content", "created_by", "createdAt", "id"],
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });
    const blogpost = blogpostData.get({ plain: true });
    if (req.session.logged_in) {
      let username = await User.findOne({
        where: { id: req.session.user_id },
        attributes: ["username"],
      });
      username = username.get({ plain: true });
      res.render("comment", {
        title: "Add Comment",
        logged_in: req.session.logged_in,
        blogpost,
        username,
      });
    } else {
      res.render("comment", {
        title: "Tech Posts",
        logged_in: req.session.logged_in,
        blogpost,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/update-comment/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const commentData = await Comment.findOne({
      where: { id },
      include: [{ model: User, attributes: ["username"] }],
    });
    const comment = commentData.get({ plain: true });
    res.render("update-comment", {
      title: "Update Comment",
      logged_in: req.session.logged_in,
      comment,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  try {
    res.render("login", {
      title: "Login",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signup", async (req, res) => {
  try {
    res.render("signup", {
      title: "Signup",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;