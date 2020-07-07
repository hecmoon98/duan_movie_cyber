const mongoose = require("mongoose");
const News = require("../model/news");
const category = require("../model/category");


exports.news_post = (req, res, next) => {
  console.log(req.files["newsImages2"][0].path);
  category
    .findById(req.body.categoryId)
    .then(result => {
      if (!result) {
        return res.status(404).json({
          message: "CategoryId not found"
        });
      }
      const news = new News({
        _id: mongoose.Types.ObjectId(),
        newsImages: req.files["newsImages"][0].path,
        newsImages2: req.files["newsImages2"][0].path,
        newsImages3: req.files["newsImages3"][0].path,
        newsTrailer: req.body.newsTrailer,
        newsTitle: req.body.newsTitle,
        newsIntroduce: req.body.newsIntroduce,
        newsContent: req.body.newsContent,
        newsContent2: req.body.newsContent2,
        newsContent3: req.body.newsContent3,
        categoryId: req.body.categoryId
      });
      return news.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "News Stared",
        createdNews: {
          _id: result._id,
          newsImages:"http://localhost:3002/"+ result.newsImages,
          newsImages2: "http://localhost:3002/"+result.newsImages2,
          newsImages3:"http://localhost:3002/"+ result.newsImages3,
          newsTrailer: result.newsTrailer,
          newsTitle: result.newsTitle,
          newsIntroduce: result.newsIntroduce,
          newsContent: result.newsContent,
          newsContent2: result.newsContent2,
          newsContent3: result.newsContent3,
          categoryId: result.categoryId
        },
        request: {
          type: "GET",
          url: "http://localhost:3002/news/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.news_get_all = (req, res, next) => {
  News.find()
    .populate("categoryId", "name")
    .then(result => {
      res.status(200).json({
        count: result.length,
        news: result.map(item => {
         
          return {
            _id: item._id,
            newsImages: "http://localhost:3002/" + item.newsImages,
            newsImages2: "http://localhost:3002/" + item.newsImages2,
            newsImages3: "http://localhost:3002/" + item.newsImages3,
            newsTrailer: item.newsTrailer,
            newsTitle: item.newsTitle,
            newsIntroduce: item.newsIntroduce,
            newsContent: item.newsContent,
            newsContent2: item.newsContent2,
            newsContent3: item.newsContent3,
            categoryId: item.categoryId,
            request: {
              type: "GET",
              url: "http://localhost:3002/news/" + item._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).status({
        error: err
      });
    });
};

exports.news_delete = (req, res, next) => {
  const id = req.params.newId;
  News.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "News Deleted",
        request: {
          type: "POST",
          url: "http://localhost:3002/news/" + result._id
          // body: { name: "String", price: "Number" }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.news_get_one = (req, res, next) => {
  News.findById(req.params.newId)
    .then(item => {
      if (item) {
        res.status(200).json({
          _id: item._id,
          newsImages: "http://localhost:3002/" + item.newsImages,
          newsImages2: "http://localhost:3002/" + item.newsImages2,
          newsImages3: "http://localhost:3002/" + item.newsImages3,
          newsTrailer: item.newsTrailer,
          newsTitle: item.newsTitle,
          newsIntroduce: item.newsIntroduce,
          newsContent: item.newsContent,
          newsContent2: item.newsContent2,
          newsContent3: item.newsContent3,
          categoryId: item.categoryId,
          request: {
            type: "GET",
            url: "http://localhost:3002/news/" + item._id
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for category ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};



exports.news_put = (req, res, next)=>{
  const id = req.params.newId;
  News.findByIdAndUpdate({ _id: id},req.body)
    .exec()
    .then(() => {
      News.findOne({ _id: id})
      .then(result=>{
        res.status(200).json({
          category:result,
          message: "News Updated",
          request: {
            type: "GET",
            url: "http://localhost:3002/news/" + result._id
          }
        });
      })
      
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}
