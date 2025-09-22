import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from '../Components/Button'
import Hello from '../Components/Hello'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id='App'>
      <Button />
      <Hello />
    </div>
  )
}

export default App
