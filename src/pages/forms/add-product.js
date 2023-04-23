import { useState } from 'react'

export default function PrivatePage(props) {
  const [image, setImage] = useState(null)
  const [createObjectURL, setCreateObjectURL] = useState(null)

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0]

      setImage(i)
      setCreateObjectURL(URL.createObjectURL(i))
    }
  }

  const uploadToServer = async (event) => {
    event.preventDefault() // Prevent page from reloading on form submit
    const body = new FormData()
    body.append('file', image)
    const response = await fetch('/api/upload', {
      method: 'POST',
      body,
    })
  }

  return (
    <div>
      <div>
        <img src={createObjectURL} />
        <h4>Select Image</h4>
        <form enctype="multipart/form-data">
          <input type="file" name="myImage" onChange={uploadToClient} />
          <button
            className="btn btn-primary"
            type="submit"
            onClick={uploadToServer}
          >
            Send to server
          </button>
        </form>
      </div>
    </div>
  )
}
