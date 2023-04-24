import fs from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async (req, res) => {
  if (req.method === 'GET') {
    const fileData = fs.readFileSync('data.json')
    const { products } = JSON.parse(fileData)
    res.status(200).json({ products })
  } else {
    res.status(404).json({ message: 'Recurso não encontrado.' })
  }
}
