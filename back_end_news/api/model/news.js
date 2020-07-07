const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    newsImages:{type:String, require:true},
    newsImages2:{type:String, require:true},
    newsImages3:{type:String, require:true},
    newsTrailer:{type:String, require:true},
    newsTitle:{type:String, require:true},
    newsIntroduce:{type:String, require:true},
    newsContent:{type:String, require:true},
    newsContent2:{type:String, require:true},
    newsContent3:{type:String, require:true},
    categoryId:{type:mongoose.Schema.Types.ObjectId, ref:'Category', required:true}
    

});


module.exports = mongoose.model('News', newsSchema);