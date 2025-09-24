import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from '../Components/Button'
import Hello from '../Components/Hello'
import Counter from '../Containers/Counter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id='App'>
      <Counter />
      <Button text='Натисни мене' alert='Кнопка натиснута' />
      <Hello />
    </div>
  )
}

export default App
