import { Schema, model, models } from "mongoose";


const scriptSchema = new Schema({
    fileName: String,
    content: String,
},{
    timestamps: true,
    versionKey : false
})


export default models.Script || model('Script', scriptSchema);