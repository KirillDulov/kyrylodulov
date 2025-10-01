import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from '../Components/Button'
import Hello from '../Components/Hello'
import Counter from '../Containers/Counter'
import ControlledInput from '../Components/Forms/ControlledInput'
import ControlledSelect from '../Components/Forms/ControlledSelect'
import UncontrolledInput from '../Components/Forms/UncontrolledInput'
import UserProfile from '../Components/Forms/UserProfile'
import MessageComponent from '../Components/MessageComponent'

function fetchMessage() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("✅ Дані отримані з сервера");
    }, 2000);
  });
}

function App() {
  const [count, setCount] = useState(0)
  const promise = fetchMessage();

  return (
    <div id='App'>
      <Counter />
      <Button text='Натисни мене' alert='Кнопка натиснута' />
      <Hello />
      <ControlledInput />
      <ControlledSelect />
      <UncontrolledInput />
      <UserProfile />
      <MessageComponent promise={promise} />
    </div>
  )
}

export default App
