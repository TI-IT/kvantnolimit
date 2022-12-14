import React from 'react'
import Menu from "../components/Menu";
import { NavLink } from 'react-router-dom';

export default function Dashboard({server_host}) {

  React.useEffect(() => {document.title = 'Личный кабинет'}, [])
  const [loading, setLoading] = React.useState(true)
  const [needAuth, setNeedAuth] = React.useState(false)
  const [user, setUser] = React.useState({username: ''})
  const [message, setMessage] = React.useState('')
  const [disabled, setDisabled] = React.useState(false)

  React.useEffect(() => {
    (async () => {
      await checkAuth()
    })()
  }, [])

  async function checkAuth() {
    const res = await fetch(server_host + '/users/check/auth', {
      method: 'post',
      credentials: 'include'
    })
    const data = await res.json()

    if (data.ok) {
      setLoading(false)
      await loadData()
    }else {
      setNeedAuth(true)
      setLoading(false)
    }
  }

   async function loadData() {
    const res = await fetch(server_host + '/users/me/', {
      method: 'get',
      credentials: 'include'
    })
    const data = await res.json()

    if (data.ok) {
      setUser(data.user)
    }
  }

  if (loading) {
    return (
      <div className={'container'}>
        <h1>Загрузка...</h1>
      </div>
    )
  }

  if (needAuth) {
    return (
      <div className={'container'}>
        <h1>Необходимо войти</h1>
        <div><NavLink to={'/login'}>Перейти на форму входа</NavLink></div>
      </div>
    )
  }

  function changeUser(name, value) {
    setUser({
      ...user,
      [name] : value
    })
  }

  async function save() {
    setDisabled(true)
    setMessage('')
    const res = await fetch(server_host + "/users/update", {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify(user),
      headers: {
        "Content-Type": 'application/json'
      }
    })
    const data = await res.json()
    console.log(data)
    setDisabled(false)
    if (data.ok) {
      setMessage('Сохранено')
    }else {
      setMessage('Ощибка сохранения')
    }
  }

  return (
    <div>
      <Menu server_host={server_host} />
      <div className={'container'}>
        <h1>
          Личный кабинет
        </h1>
        <div>{message}</div>
        <form className={'dashboard-form'}>
          <label>Имя</label>
          <div>
            <input type={'text'} value={user.name} onChange={e => changeUser('name', e.target.value)}/>
          </div>
          <label>userName</label>
          <div>
            <input type={'text'} value={user.username} onChange={e => changeUser('username', e.target.value)}/>
          </div>
          <label>Дата рождения</label>
          <div>
            <input type={'date'} value={user.birthday} onChange={e => changeUser('birthday', e.target.value)}/>
          </div>
          <label>О себе</label>
          <div>
            <textarea value={user.about} onChange={e => changeUser('about', e.target.value)}/>
          </div>
          <div>
            <button onClick={save} disabled={disabled}>Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  )
}