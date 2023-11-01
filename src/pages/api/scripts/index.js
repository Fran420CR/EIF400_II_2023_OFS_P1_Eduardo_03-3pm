import {dbConnect} from '../../../utils/mongoose'
import Script from '../../../models/script'

dbConnect();

export default async function handler (req, res){

    const {method, body} = req;
    switch(method){
        case "GET":
        try{
            const scripts = await Script.find();
            return res.status(200).json(scripts);
        }catch(error){
            return res.status(500).json({error: error.messahe});
        }


        case "POST":
            try{
                const newScript = new Script(body);
                const savedScript = await newScript.save();
                return res.status(200).json(savedScript);
            }catch(error){
                return res.status(500).json({error: error.messahe});
            }

        default:
            return res.status(400).json({msg: "este metodo no es soportado"});
    }

}
