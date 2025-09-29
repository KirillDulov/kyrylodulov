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


function App() {
  const [count, setCount] = useState(0)

  return (
    <div id='App'>
      <Counter />
      <Button text='Натисни мене' alert='Кнопка натиснута' />
      <Hello />
      <ControlledInput />
      <ControlledSelect />
      <UncontrolledInput />
      <UserProfile />
    </div>
  )
}

export default App
