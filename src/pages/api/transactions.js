import { checkAPI } from '../../library/functionsBack';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const data = await checkAPI();
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}