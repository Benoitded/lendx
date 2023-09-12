import { checkAPI } from '../../../library/functionsBack';

export default async function handler(req, res) {
    console.log("appelle back");
    if (req.method === 'GET') {
        try {
            const address = req.query.address;
            const data = await checkAPI(address);
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}