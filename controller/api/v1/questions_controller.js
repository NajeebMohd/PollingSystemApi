const Question = require('../../../models/questions');
const Options = require('../../../models/options');

module.exports.Create = function(req,res){
    
    Question.findOne({title : req.body.title},function(err,question){
        if(err){return res.json(500,{message:'internal server problem'});}
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
            return res.json(400,{
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
        if(err){
            console.log('error while deleting the question ',err);
            return res.json(500,{
                message : 'internal server problem'
            });
        }
        return res.json(200,{
            message : 'deleted the question sucessfully'
        })
    });
}

module.exports.CreateOption = async function(req,res){    
    try{
        let question = await Question.findById(req.params.id);
        if(question){
            let option = await Options.create({
                text : req.body.text,
                votes : req.body.votes,            
                question : req.params.id,
                
            });
            option.link_to_vote = "http://localhost:8000/api/v1/options/"+option.id+"/add_vote";
            option.save();
            question.options.push(option);
            question.save();
            return res.json(200,{
                message : 'added the options to the question sucessfully !!!'
            });
        }
    }catch(err){
        console.log('error while creating a option ',err);
        return res.json(500,{
            message : 'internal server problem'
        });
    }
}