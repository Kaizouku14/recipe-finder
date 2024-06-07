import React, { useState } from 'react'
import { queryRecipe } from '../service/RecipeApi'

export const Header = ({Lists}) => {
  const [inputValue, setInputValue] = useState('')
  
  const handleChanges = (e) => {
     setInputValue(e.target.value)
   
     if(e.key === "Enter"){
        queryRecipe(inputValue)
          .then(response => Lists(response))
          .catch(error => console.log(error))
     }
  }
    
  return (
    <header className='bg-slate-500 h-24 w-full py-7 flex items-center fixed z-10 px-12'>
        <div className='flex items-center '>
            <img className='h-10 ' src="cook-book.png" alt="Cook Book" />
            <h1 className='text-xl text-white ml-4 max-md:hidden 
                '>Food Recipe Finder</h1>
        </div>
        <div className='flex-grow flex justify-center '>
          <div>
            <input className='outline-none p-4 rounded-2xl text-sm w-72 h-[40px] ' 
                type="text"
                placeholder='Search Recipe'
                value={inputValue}
                onChange={handleChanges}
                onKeyDown={handleChanges}
            />
          </div>
        </div>
    </header>
  )
}


