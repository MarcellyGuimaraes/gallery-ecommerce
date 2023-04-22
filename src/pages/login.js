import { useState } from 'react'
import { useRouter } from 'next/router'
const PAGE_TITLE = 'Login'
const users = [
  {
    username: 'admin',
    password: '123456',
  },
]
export default function Login() {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  })
  const router = useRouter()
  const handleChange = (event) => {
    const { name, value } = event.target
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const user = users.find(
      (user) =>
        user.username === userData.username &&
        user.password === userData.password,
    )
    if (user) {
      router.push('/add-product')
    } else {
      alert('Usuário ou senha inválidos.')
    }
  }
  return (
    <div>
      <h1>{PAGE_TITLE}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Usuário:
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Senha:
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}
