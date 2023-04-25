import { IncomingForm } from 'formidable'
const mv = require('mv')
const fs = require('fs').promises
const path = require('path')

export const config = {
  api: {
    bodyParser: false,
  },
}

async function saveData(data) {
  try {
    const filePath = path.join(process.cwd(), 'data.json')
    let fileContent = await fs.readFile(filePath, 'utf-8')

    let jsonData = { products: [] }
    if (fileContent) {
      jsonData = JSON.parse(fileContent)
    }

    const imagePath = data.image.replace(/^\.\/public/, '')
    const imageDir = path.join(process.cwd(), 'public', 'images')

    // Verifica se o diretório de imagens existe
    if (!fs.existsSync(imageDir)) {
      await fs.mkdir(imageDir, { recursive: true })
      console.log('Diretório de imagens criado com sucesso.')
    }

    const product = {
      ...data,
      image: imagePath,
      price: Number(data.price),
      active: Boolean(data.active === 'true'),
    }

    jsonData.products.push(product)

    await fs.writeFile(filePath, JSON.stringify(jsonData))

    console.log('Dados salvos no arquivo com sucesso.')
  } catch (error) {
    console.error('Erro ao salvar os dados no arquivo:', error)
  }
}

export default async (req, res) => {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm()

    form.on('error', (err) => {
      console.error('Form error:', err)
      reject(err)
    })

    return form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Parse error:', err)
        reject(err)
      }

      const oldPath = files.file.filepath
      const newPath = `./public/images/${files.file.originalFilename}`
      console.log('OLD PATH: ', oldPath)
      console.log('NEW PATH: ', newPath)

      mv(oldPath, newPath, function (err) {
        if (err) {
          console.error('Error moving file:', err)
          reject(err)
        }

        const data = {
          image: newPath,
          title: fields.title,
          description: fields.description,
          price: fields.price,
          active: fields.active,
          whatsappLink: fields.whatsappLink,
        }

        resolve(data)
      })
    })
  })

  await saveData(data)

  res.status(200).json({ message: 'Upload feito com sucesso!', data })
}
