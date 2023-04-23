import { IncomingForm } from 'formidable'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import mv from 'mv'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const data = await new Promise((resolve, reject) => {
        const form = new IncomingForm()

        form.parse(req, (err, fields, files) => {
          if (err) return reject(err)

          const { title, description, price } = fields
          const imageFile = files.imagem

          if (!imageFile) {
            console.log('imageFile is not defined:', files)
            res
              .status(400)
              .json({ message: 'Arquivo de imagem não encontrado' })
            return
          }

          const imageName = uuidv4() + path.extname(imageFile.name)
          const imagePath = path.join(
            process.cwd(),
            'public',
            'imagens',
            imageName,
          )

          mv(imageFile.path, imagePath, (err) => {
            if (err) {
              return reject(err)
            }

            // Salvar os campos em um arquivo JSON ou em um banco de dados
            // ...

            res.status(200).json({ message: 'Produto criado com sucesso!' })
          })
        })
      })
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ message: 'Erro interno do servidor' })
    }
  } else if (req.method === 'GET') {
    const fileData = fs.readFileSync('data.json')
    const { products } = JSON.parse(fileData)
    res.status(200).json({ products })
  } else {
    res.status(404).json({ message: 'Recurso não encontrado.' })
  }
}
