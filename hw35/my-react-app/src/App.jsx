import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hello from './Components/Hello.jsx'
import Button from './Components/Button.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id='App'>
      <Hello />
      <Button />
    </div>
  )
}

export default App
