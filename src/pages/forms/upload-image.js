import { useState } from 'react'
import axios from 'axios'

export default function UploadForm() {
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    return console.log('teste', event)
  }

  const handleFileChange = (event) => {
    //   // Armazena o arquivo selecionado pelo usuário no estado `file`.
    setFile(event)
    // return console.log('teste', event.target.files)
  }

  console.log('FILE: ', file)

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="image">Escolha uma imagem:</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={(e) => handleFileChange(e)}
        />
      </div>
      <button type="submit">Enviar</button>
      {message && <p>{message}</p>}
    </form>
  )
}
