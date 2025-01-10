import { useState, useCallback, useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
/*import './App.css'*/

function App() {
 /* const [count, setCount] = useState(0)*/
    const [length, setlength] = useState(8);
    const [numberAllowed, setnumberAllowed] = useState(false);
    const [charAllowed, setcharAllowed] = useState(false);
    const [Password, setpassword] = useState("")

    //useref hook
    const passwordRef = useRef(null)



    const PasswordGenerator = useCallback (() =>{
      let pass = ""
      let str = "ABCDEFGHIJKLMANOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

      if(numberAllowed) str+="0123456789"
      if(charAllowed) str+="!@#$%^&*{}_-*~?"

      for(let i=1; i<=length; i++ ){
        let char =Math.floor(Math.random() * str.length+1)
        pass += str.charAt(char)
      }

      setpassword(pass)

    }, [length, numberAllowed, charAllowed,setpassword] )

    const copyPasswordToClipboard = useCallback(() =>{
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0,20)
      window.navigator.clipboard.writeText(Password)
    } , [Password])

    useEffect( ()=>{
      PasswordGenerator()
    }, [length, numberAllowed, charAllowed,PasswordGenerator])

    


  return (
   <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
    <div className= "flex shadow rounded-lg overflow-hidden mb-4">
      <input type="text" 
      value={Password}
     className='outline-none w-full py-1 px-3' 
     placeholder="passoword"
      readOnly
      ref = {passwordRef}/>

      <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
      >Copy</button>
       </div>

       <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={6} max={100} value={length} className='cursor-pointer'
          onChange={(e) => {setlength(e.target.value)}} />
          <label >Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={numberAllowed} id='"numberInput'
          onChange={()=>{
            setnumberAllowed((prev) => !prev);
          }} />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={charAllowed} id='"characterInput'
          onChange={()=>{
            setcharAllowed((prev) => !prev);
          }} />
          <label htmlFor="characterInput">Characters</label>
        </div>

       </div>
       </div>
     </>
  )
}

export default App
