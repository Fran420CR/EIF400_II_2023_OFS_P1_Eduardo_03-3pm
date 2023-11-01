import { dbConnect } from '../../../utils/mongoose'
import Script from '../../../models/script'

dbConnect();
export default async (req, res) => {
    const { method } = req;
    const fileName = req.query.id; // Utiliza req.query.id para obtener el nombre del archivo

    switch (method) {
        case "GET":
            try {
                const script = await Script.findOne({ fileName });
                if (!script) {
                    return res.status(404).json({ msg: "Archivo no encontrado" });
                }
                return res.status(200).json(script);
            } catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        default:
            return res.status(400).json({ msg: "Este método no es soportado" });
    }
}
