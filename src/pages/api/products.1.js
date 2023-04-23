import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import upload from '@/utils/multer'

export default function handler(req, res) {
  if (req.method === 'GET') {
    const fileData = fs.readFileSync('data.json')
    const { products } = JSON.parse(fileData)
    res.status(200).json({ products })
  } else if (req.method === 'POST') {
    let body = []
    let imageFile = {}

    req
      .on('data', (chunk) => {
        body.push(chunk)
      })
      .on('end', () => {
        body = Buffer.concat(body)

        const contentType = req.headers['content-type']

        if (contentType.includes('multipart/form-data')) {
          // Processar os campos do formulário e a imagem binária
          const boundary = contentType.split('; ')[1].split('=')[1]
          const formFields = body.toString().split(boundary).slice(1, -1)

          const produto = {}

          formFields.forEach((formField) => {
            const formFieldName = formField.match(/name="(.+?)"/)[1]

            if (formField.includes('filename=')) {
              // A parte do formulário é um arquivo de imagem
              const filename = formField.match(/filename="(.+?)"/)[1]
              const imageBinary = formField.split('\r\n\r\n')[1].slice(0, -2)

              imageFile = {
                filename: filename,
                binary: imageBinary,
              }
            } else {
              // A parte do formulário é um campo de texto
              const value = formField.split('\r\n\r\n')[1].slice(0, -2)

              if (formFieldName === 'descricao') {
                produto.descricao = value
              } else if (formFieldName === 'preco') {
                produto.preco = parseFloat(value)
              }

              // Faça algo com o campo de texto (por exemplo, salvar em um banco de dados)
              // ...
            }
          })

          // Salvar a imagem em algum lugar (por exemplo, na pasta "public/imagens" no seu projeto Next.js)
          const caminhoDaImagem = path.join(
            process.cwd(),
            'public',
            'imagens',
            imageFile.filename,
          )
          fs.writeFileSync(caminhoDaImagem, imageFile.binary, 'binary')

          produto.imagem = `/imagens/${imageFile.filename}`

          // Faça algo com o produto (por exemplo, salvar em um banco de dados)
          // ...

          // Serializar o objeto JSON em uma string JSON e retornar na resposta da API
          const json = JSON.stringify(produto)
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(json)
        } else {
          res.statusCode = 400
          res.end('Erro: tipo de conteúdo inválido')
        }
      })
  } else {
    res.status(404).json({ message: 'Recurso não encontrado.' })
  }
}
