const router = require("express").Router();
const { BlogPost } = require("../../models");

router.post("/create-post", async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create({
      title: req.body.title,
      content: req.body.content,
      created_by: req.session.user_id,
    });
    res.status(200).json(newBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/update-post/:id", async (req, res) => {
  try {
    const updateBlogPost = await BlogPost.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updateBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deleteBlogPost = await BlogPost.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deleteBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;