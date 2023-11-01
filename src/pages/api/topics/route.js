import connectMongoDB from "../../../../libs/mongodb.js";
import Topic from "../../../../models/topic.js";
import {NextResponse} from "next/server"

export async function POST(request){
    const {name , content} = await request.json();
    await connectMongoDB();

    await Topic.create({name, content});
    return  NextResponse.json({messaje : "Archivo Guardado"}, {status: 201})
}
