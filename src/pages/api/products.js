import { addTestProducts } from '@/utils/addTestProducts'
import fs from 'fs'

export default function handler(req, res) {
  if (req.method === 'GET') {
    const fileData = fs.readFileSync('data.json')
    const { products } = JSON.parse(fileData)
    res.status(200).json({ products })
  } else if (req.method === 'POST') {
    const newProductList = [...products, req.body]
    fs.writeFileSync('data.json', JSON.stringify({ products: newProductList }))
    res.status(201).json({ message: 'Produto adicionado com sucesso!' })
  } else {
    res.status(404).json({ message: 'Recurso não encontrado.' })
  }
}

addTestProducts()
