import { useState } from "react"
import { InfoDialog } from "../components/InfoDialog"
import { ListCard } from "../components/ListCard"
import { queryRandomRecipe } from "../service/RecipeApi"
import { Toaster ,toast } from 'sonner';

export const Main = ({getLists}) => {
  const [showInfoCard, setShowInfoCard] = useState(false)
  const [loading , setLoading] = useState(true)
  const [list , setList] = useState([])
  const [listId, setListId] = useState(0)

  useState(() => {
    queryRandomRecipe()
       .then(res => {
          setList(res);
          setLoading(false)
       })
       .catch(err => toast.error('Error : Ingredients not found'))
  }, [])

  useState(() =>{
      setList(getLists)
  }, [getLists])

  return (
    <main className='h-[598px] px-5 pt-[110px]'>
      {loading ? (
          <div className="flex items-center justify-center h-full w-full">
            <p className='text-xl text-white'>Loading...</p>
          </div>        
        ) : ( 
          <div className='h-full grid grid-cols-5 gap-5 overflow-auto'>
            {list.length > 0 && list.map((value, index) => (
              <ListCard 
                key={index}
                image={value.image} 
                foodName={value.title}
                onClick={() => {setShowInfoCard(true); setListId(value.id)}}
              />
            ))}
          </div>
        )}
      <InfoDialog isOpen={showInfoCard} setOnClose={(val) => setShowInfoCard(val)} ID={listId}/>
      <Toaster richColors position="top-center"/>
    </main>
  )
}


