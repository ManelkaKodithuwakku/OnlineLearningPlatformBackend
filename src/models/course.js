import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: {type:String, require:true},
    content: {type: String, require:true}
})

const Course = mongoose.model("course", courseSchema);

export {Course};