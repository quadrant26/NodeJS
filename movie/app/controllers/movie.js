/**
 * Created by Administrator on 2016/11/22.
 */

var Movie = require("../models/movie")
var Category = require("../models/category")
var Comment = require("../models/comment")
var _ = require("underscore")

//加载 detail page
exports.detail = function (req, res){

    var id = req.params.id

     Movie.findById(id, function (err, movie){
         Comment
            .find({movie:id})
            .populate('from', 'name')
            .populate('reply.from reply.to', 'name')
            .exec(function (err, comments){
                 // console.log(comments)
                 res.render('detail', {
                     title : 'iMooc 详情页',
                     movie : movie,
                     comments : comments
                })
         })
     })
}

// 从表单提交的数据 admin post movie
exports.new = function (req, res){

    Category.find({}, function (err, categories){
        res.render('admin', {
            title : 'imooc 后台录入页',
            categories : categories,
            movie : {}
        })
    })
}

// admin update movie
exports.update = function (req, res){

    var id = req.params.id
    if(id){
        Movie.findById(id, function (err, movie){
            Category.findById(id, function (err, categories){
                res.render('admin', {
                    title : 'imooc 后台更新页',
                    movie : movie,
                    categories : categories
                })
            })
        })
    }
}

//加载 admin page
exports.save = function (req, res){
    console.log('movies 62', req.body)

    /*var movieObj = req.body.movie
    var _movie
    console.log(movieObj);

    if(id){
        Movie.findById(id, function (err, movie){
            if(err){
                console.log(err)
            }

            _movie = _.extend(movie, movieObj)
            _movie.save(function (err, movie){
                if(err){
                    console.log(err)
                }

                res.redirect('/movie/' + movie._id)
            })
        })
    }
    else{
        _movie = new Movie(movieObj)

        var categoryId = movieObj.category
        var categoryName = movieObj.categoryName

        _movie.save(function (err, movie){
            if(err){
                console.log(err)
            }

            if( categoryId ){
                Category.findById(categoryId, function (err, category){
                    category.movies.push(movie._id)

                    category.save(function (err, category){
                        res.redirect('/movie/' + movie._id)
                    })
                })
            }
            else if( categoryName ){
                var category = new Category({
                    name : categoryName,
                    movies : [movie._id]
                })

                category.save(function (err, category){
                    movie.category = category._id
                    movie.save(function (err, movie){
                        res.redirect('/movie/' + movie._id)
                    })

                })
            }


        })
    }
    */

    res.render('admin', {
        title : 'imooc 后台录入页',
        movie : {
            _id : '',
            title : '港囧',
            doctor : '徐铮',
            country : '中国',
            year : '2015',
            poster : 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2390670272,2122151632&fm=58',
            flash : 'http://static.youku.com/v20161110.0/v/swf/player_yknpsv.swf',
            summary : '《港囧》是由北京真乐道文化传播有限公司、北京光线影业有限公司等联合出品的爱情喜剧影片，该影片由徐峥执导，由徐峥、赵薇、包贝尔、杜鹃、葛民辉联合主演。影片于2015年9月25日在全国上映。影片讲述了徐来陪伴老婆及家人来到香港旅游',
            language : '中文'
        }
    })
}

//加载 list page
exports.list = function (req, res){

    Movie
        .find({})
        .populate('category', 'name')
        .exec(function (err, movies){
        if(err){
            console.log(err)
        }

        res.render('list', {
            title : 'imooc 列表页',
            movies : movies
        })
    })
}

// 删除一条数据
exports.del = function (req, res){
    var id = req.query.id

    if(id){
        Movie.remove({_id:id}, function (err, movie){
            if(err){
                console.log(err)
            }
            else{
                res.json({success : 1})
            }
        })
    }
}