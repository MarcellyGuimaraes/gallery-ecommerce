import multer from 'multer'
import path from 'path'

// Define o destino onde as imagens serão salvas
const storage = multer.diskStorage({
  destination: './public/images',
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    )
  },
})

// Cria um objeto de upload do Multer
const upload = multer({ storage })

export default function handler(req, res) {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: err.message })
    }
    return res.status(200).json({ message: 'Imagem enviada com sucesso!' })
  })
}
