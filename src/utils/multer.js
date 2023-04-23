// const multer = require('multer')
// const path = require('path')

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/images') // O caminho onde a imagem será salva
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
//     cb(
//       null,
//       file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname),
//     ) // Nome da imagem - exemplo: image-1636708421043-4567890.jpg
//   },
// })

// const upload = multer({ storage })

// module.exports = upload
