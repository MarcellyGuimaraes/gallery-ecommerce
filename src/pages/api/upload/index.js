import { IncomingForm } from 'formidable'
import { promises as fs } from 'fs'

var mv = require('mv')

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async (req, res) => {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm()

    form.on('error', (err) => {
      console.error('Form error:', err)
    })

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      console.log(fields, files)
      console.log(files.file.filepath)
      var oldPath = files.file.filepath
      var newPath = `./public/uploads/${files.file.originalFilename}`
      mv(oldPath, newPath, function (err) {
        if (err) {
          console.error('Error moving file:', err)
          return reject(err)
        }
        res.status(200).json({ fields, files })
      })
      res.status(200).json({ fields, files })
    })
  })
}
