import{connect, connection} from 'mongoose'

const conn = {
    isConnected: false
}
export async function dbConnect(){
  if(conn.isConnected) return;
  const db = await connect(process.env.MONGODB_URL);
  conn.isConnected = db.connections[0].readyState
}

connection.on("coneccted", ()=>{
    console.log("Mongo DB is connected");
});

connection.on("error", (err)=>{
    console.log(err);
});