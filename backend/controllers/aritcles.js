import Article from "../models/articles.js";

export const createArticle = async (req, res) => {
    try {
        const { title, content, author, tags, published } = req.body;

        if (!title || !content || !author) {
            return res.status(400).json({ message: 'Title, content, and author are required', success: false });
        }

        const newArticle = new Article({
            title,
            content,
            author,
            tags,
            published,
            publishedAt: published ? new Date() : null,
        });

        await newArticle.save();

        res.status(201).json({ message: 'Article created successfully', success: true, data: newArticle });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', success: false });
    }
};

export const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find({published: true}).populate('author', 'username email');
        res.status(200).json({ success: true, data: articles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', success: false });
    }
};


export const getArticleById = async (req, res) => {
    try {
        const { id } = req.params;

        const article = await Article.findOne({_id: id, published: true}).populate('author', 'username email');

        if (!article) {
            return res.status(404).json({ message: 'Article not found', success: false });
        }

        res.status(200).json({ success: true, data: article });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', success: false });
    }
};

export const updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, tags, published } = req.body;

        const updatedFields = { title, content, tags };
        if (published !== undefined) {
            updatedFields.published = published;
            updatedFields.publishedAt = published ? new Date() : null;
        }

        const updatedArticle = await Article.findByIdAndUpdate(id, updatedFields, {
            new: true,
            runValidators: true,
        });

        if (!updatedArticle) {
            return res.status(404).json({ message: 'Article not found', success: false });
        }

        res.status(200).json({ message: 'Article updated successfully', success: true, data: updatedArticle });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', success: false });
    }
};

export const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedArticle = await Article.findByIdAndDelete(id);

        if (!deletedArticle) {
            return res.status(404).json({ message: 'Article not found', success: false });
        }

        res.status(200).json({ message: 'Article deleted successfully', success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', success: false });
    }
};

export const fetchArticlesByInstId = async (req, res) => {
    try {
      const { instId } = req.body;
  
      console.log("Received instId:", instId); // Debugging log
  
      if (!instId) {
        return res.status(400).json({ message: "Instructor ID is required", success: false });
      }
  
      // Validate the format of instId
      if (!mongoose.Types.ObjectId.isValid(instId)) {
        return res.status(400).json({ message: "Invalid Instructor ID format", success: false });
      }
  
      // Convert instId to ObjectId
      const objectId = mongoose.Types.ObjectId(instId);
  
      // Fetch articles by author (instructor ID)
      const articles = await Article.find({ author: objectId });
  
      if (!articles.length) {
        return res.status(404).json({ message: "No articles found for this instructor", success: false });
      }
  
      res.status(200).json({ success: true, data: articles });
    } catch (error) {
      console.error("Error in fetchArticlesByInstId:", error);
      res.status(500).json({ message: "Server error", success: false });
    }
  };