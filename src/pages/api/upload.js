import multer from 'multer'

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    )
  },
})

const upload = multer({ storage })

export default function handler(req, res) {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: 'Erro ao enviar imagem' })
    }
    return res.status(200).json({ message: 'Imagem enviada com sucesso!' })
  })
}
