const {Schema}=require('mongoose');
const {model}=require('mongoose');
const details= new Schema({
    certi_id:{type:String,required:true},
    course:{type:String,requires:true},
    name:{type:String,required:true},
    
    grade:{type:String,required:true},
    date:{type:String,required:true}
})

const candi_details=model('candidate_detail',details)
module.exports=candi_details;