import React from "react";
import Menu from "../components/Menu";
import emailValidator from "email-validator";

export default function SignUp() {
  const [user, setUser] = React.useState({email: '', password: ''});
  const [secondPassword, setSecondPassword] = React.useState('');
  const [message, setMessage] = React.useState('');

  function changeUser(name, value) {
    setUser({
      ...user,
      [name] : value
    })
    console.log(user)
  }

  function signUp () {
    setMessage('')
    if(!user.email || !user.password || !secondPassword) {
      setMessage("Заполните все поля")
      return
    }
    if(secondPassword !== user.password) {
      setMessage('')
      setMessage("Пароли не совподают")
      return
    }if (!emailValidator.validate(user.email)) {
      setMessage('')
      setMessage("Email не верный")
      return
    }
  }

  return (
    <div>
      <Menu />
      <div className={'container text-center'}>
         <h1>
            Регистрация
        </h1>
        <div className={'message'}>{message}</div>
        <form className={'sign-up'}>
          <div>
            <label>Email</label>
            <div>
              <input type={'text'} name={'email'} onChange={e=> changeUser('email', e.target.value)} value={user.email}/>
            </div>
          </div>
          <div>
            <label>Пароль</label>
            <div>
              <input type={'password'} onChange={e => changeUser('password', e.target.value)} value={user.password}/>
            </div>
          </div>
          <div>
            <label>Пароль еще раз</label>
            <div>
              <input type={'password'} onChange={e => setSecondPassword(e.target.value)}/>
            </div>
          </div>
          <div>
            <button type={'button'} onClick={signUp}>Зарегистрироваться</button>
          </div>
        </form>
      </div>
    </div>
  )
}