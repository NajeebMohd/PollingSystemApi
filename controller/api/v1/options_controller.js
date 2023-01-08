const Options = require('../../../models/options');
const Question = require('../../../models/questions');

module.exports.DeleteOption = function(req,res){
    Options.findById(req.params.id,function(err,option){
        if(err) return res.json(500,{message:'internal server problem'});
        option.remove();
        Question.findByIdAndUpdate(option.question,{$pull : {options : req.params.id}},function(err,post){
            if(err) return res.json(500,{message:'internal server problem'});
            return res.json(200,{
                message : 'option is deleted sucessfully!!!'
            })
        })
    })
}

module.exports.Addvote = function(req,res){
    Options.findById(req.params.id,function(err,option){
        if(err) return res.json(500,{message:'internal server problem'});
        option.votes += 1;
        option.save();
        return res.json(200,{
            message : 'voted up sucessfully'
        });
    });
}