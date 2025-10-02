export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json({ message: 'GET request received; Hello, World!' });
    }

    else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

