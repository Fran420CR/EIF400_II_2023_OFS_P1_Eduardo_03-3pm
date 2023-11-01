import mongoose, {Schema} from "mongoose";

const topicScripts = new Schema(

    {
        name: String,
        content: String
    },
    {
        timestamps : true,
    }
)

const Topic =  mongoose.model.Topic || mongoose.model("Topic", topicScripts);
export default Topic;