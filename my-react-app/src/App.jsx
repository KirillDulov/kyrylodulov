import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Button from '../src/Components/Button.jsx'
import Hello from '../src/Components/Hello'
import Counter from '../src/Containers/Counter'
import ControlledInput from '../src/Components/Forms/ControlledInput'
import ControlledSelect from '../src/Components/Forms/ControlledSelect'
import UncontrolledInput from '../src/Components/Forms/UncontrolledInput'
import UserProfile from '../src/Components/Forms/UserProfile'
import MessageComponent from '../src/Components/MessageComponent'

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
