const express = require('express');
const router = express.Router();
const Rating = require('../dal/rating');
const Comment = require('../dal/comment');
const mongoose = require('mongoose');
router.get('/comments', (req, res) => {

    Comment.find().then((comments)=>{
        Rating.aggregate([{$group: {_id: "$comment", averageRating: {$avg: '$rating'}}}]).then((ratings)=>{
            comments = comments.map((curComment)=>{

                //there is DEFINITELY a better way to get mongoose to format the results. But I am not very experienced with
                //mongo/mongoose (or other NoSQL) dbs for that matter. Due to time constraints I had to "manually" format the
                //the results.
                //Besides. If its stupid but it works, it's not stupid :P

                //Had I started from scratch I'd probably build the DB different. Comments referencing many ratings,
                //and not the other way around like here.
                let commentBody = JSON.parse(JSON.stringify(curComment));//copy object by vals instead of refs
                let savedRating = ratings.find((curRating)=>{ return curComment._id.equals(curRating._id)});
                if(savedRating) {
                    commentBody.averageRating = savedRating.averageRating ;
                }

                return commentBody;
            });


            res.json(comments)
        });
    });
});



router.get('/comments/:commentId/rating', (req,res)=>{

    //allow specifying multiple comments, comma delimited.
    let requestedCommentIds = req.params.commentId.indexOf(",") > -1 ? req.params.commentId.split(",") : [req.params.commentId];

    Rating.find({'commentId' : {$in : requestedCommentIds}}).then((ratings)=>{
        res.json(ratings);
    })
});

router.put('/comments/:commentId/rating', (req, res)=>{
    Rating.findOne({comment:req.body.commentId, userId: req.body.userId}).then((savedRating)=>{

        if(savedRating){
            savedRating.rating = req.body.rating;

        }
        else {
            let {commentId, userId, rating} = req.body;
            savedRating = new Rating({comment: commentId, userId, rating});
        }
        return savedRating.save().then(()=>{res.status(200).send()})

    }).catch(()=>{res.status(500).send()})
});

module.exports = router;

