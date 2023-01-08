const Question = require('../../../models/questions');
const Options = require('../../../models/options');

module.exports.Create = function(req,res){
    console.log('in the controller..');
    Question.findOne({title : req.body.title},function(err,question){
        if(!question){
            Question.create(req.body,function(err,questions){
                if(err){
                    console.log('error while making a question -->> ',err);
                    return res.json(500,{
                        message : 'intenal server problem'
                    });
                }
                return res.json(200,{
                    message : 'successfully added a question',
                    question : questions
                });
            });
        }else{
            return res.json(200,{
                message : 'dulicate question is not allowed'
            });
        }
    })
    
}

module.exports.Fetch = function(req,res){
    Question.findById(req.params.id)
    .populate({
        path : 'options'
    })
    .exec(function(err,question){
        if(err){
            console.log('error while fetching the question ',err);
            return res.json(500,{
                message : 'internal server problem'
            })
        }
        return res.json(200,{
            question : question
        });
    });
}

module.exports.Delete = function(req,res){
    Question.findByIdAndDelete(req.params.id,function(err,question){
        return res.json(200,{
            message : 'delete the question sucessfully'
        })
    });
}

module.exports.CreateOption = function(req,res){
    Question.findById(req.params.id,function(err,question){
        if(question){
            
            Options.create({
                text : req.body.text,
                votes : req.body.votes,
                link_to_vote : req.body.link_to_vote,
                question : req.params.id
            },function(err,option){
                
                question.options.push(option);
                question.save();
                return res.json(200,{
                    message : 'sucessfully added the options'
                });
            });
        }
    });
}