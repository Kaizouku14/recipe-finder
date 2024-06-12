import { 
  Dialog, 
  DialogPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels
} from '@tremor/react';
import { useEffect, useState} from 'react';
import { queryIngredients, queryNutrients , queryInstructions} from '../service/RecipeApi';
import { toast } from 'sonner'

export const InfoDialog = ({ isOpen, setOnClose, ID }) => {
  const [ingredients, setIngredients] = useState([]);
  const [nutrients, setNutrients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [loadingIngredients, setLoadingIngredients] = useState(true);
  const [loadingNutrients, setLoadingNutrients] = useState(true);
  const [loadingInstructions, setLoadingInstructions] = useState(true)
  const [activeTab, setActiveTab] = useState("Ingredients"); 

  useEffect(() => {
    if (!isOpen) {
      setActiveTab("Ingredients");
    }

    if (ID <= 0) return;

    const fetchData = async (queryFunction, setDataFunction, setLoadingFunction, errorMessage) => {
      setLoadingFunction(true);
      try {
        const res = await queryFunction(ID);
        setTimeout(() => {
          setDataFunction(res);
          setLoadingFunction(false);
        }, 2000);
      } catch (err) {
        toast.error(`Error: ${errorMessage}`);
        setLoadingFunction(false);
      }
    };

    fetchData(queryIngredients, setIngredients, setLoadingIngredients, 'Ingredients not found')
    fetchData(queryNutrients, setNutrients, setLoadingNutrients, 'Nutrients not found')
    fetchData(queryInstructions, setInstructions, setLoadingInstructions, 'Instructions not found')

    return () => {
      clearTimeout(fetchData);
    };

  }, [isOpen, ID]);

   const handleTabClick = (tabName) => {
       setActiveTab(tabName)
   }

  return (
    <Dialog open={isOpen} onClose={() => setOnClose(false)} static={true}>
      <DialogPanel className='bg-white rounded-xl h-[450px] relative'>
        <TabGroup>
          <TabList variant="line">
            <Tab className={`hover:text-blue-500 ${activeTab === 'Ingredients' ? 'text-blue-500 ' : ''}`} 
                 onClick={() => handleTabClick("Ingredients")}>Ingredients</Tab>
            <Tab className={`hover:text-blue-500 ${activeTab === 'Nutritions' ? 'text-blue-500 ' : ''}`} 
                 onClick={() => handleTabClick("Nutritions")} >Nutritions</Tab>
            <Tab className={`hover:text-blue-500 ${activeTab === 'Instructions' ? 'text-blue-500 ' : ''}`}
                 onClick={() => handleTabClick("Instructions")} >Instructions</Tab>
          </TabList>
          <TabPanels>
            <TabPanel className='h-[360px] rounded-md border-2 border-slate-500 overflow-auto'>
              {loadingIngredients ? (
                <div className="flex items-center justify-center h-[310px]">
                  <p className='text-center'>Loading...</p>
                </div>
              ) : (
                <div className='max-h-[350px] overflow-y-auto'>
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Image</th>
                        <th className="px-4 py-2">Amount</th>
                        <th className="px-4 py-2">Ingredient</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ingredients.length > 0 && ingredients.map((ingredient, index) => (
                        <tr key={index}>
                          <td className="border px-4 py-2">
                            <img
                              src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                              alt={ingredient.name}
                              className="h-10 w-10 object-cover"
                            />
                          </td>
                          <td className="border px-4 py-2 text-[0.80rem]">
                            {ingredient.amount.metric.value} {ingredient.amount.metric.unit}
                          </td>
                          <td className="border px-4 py-2 text-[0.80rem]">
                            {ingredient.name}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabPanel>
            <TabPanel className='h-[360px] rounded-md border-2 border-slate-500 overflow-auto'>
              {loadingNutrients ? (
                <div className="flex items-center justify-center h-[310px]">
                  <p className='text-center'>Loading...</p>
                </div>
              ) : (
                <div className='max-h-[350px] overflow-y-auto'>
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Amount</th>
                        <th className="px-4 py-2">Percent Of Daily Needs</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nutrients.length > 0 && nutrients.map((nutrient, index) => (
                        <tr key={index}>
                          <td className="border px-4 py-2 text-[0.80rem]">
                            {nutrient.name}
                          </td>
                          <td className="border px-4 py-2 text-[0.80rem]">
                            {nutrient.amount} {nutrient.unit}
                          </td>
                          <td className="border px-4 py-2 text-[0.80rem]">
                            {nutrient.percentOfDailyNeeds}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabPanel>
            <TabPanel className='h-[360px] rounded-md border-2 border-slate-500 overflow-auto'>
              {loadingInstructions ? (
                <div className="flex items-center justify-center h-[310px]">
                  <p className='text-center'>Loading...</p>
                </div>
              ) : (
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Step No.</th>
                      <th className="px-4 py-2">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {instructions.length > 0 && instructions.map((instruction, instructionIndex) => (
                      instruction.steps.map((step, stepIndex) => (
                        <tr key={instructionIndex + '-' + stepIndex}>
                          <td className="border px-4 py-2">{step.number}</td>
                          <td className="border px-4 py-2">{step.step}</td>
                        </tr>
                      ))
                    ))}
                  </tbody>
                </table>
              )}
            </TabPanel>
          </TabPanels>
        </TabGroup>
        <button type="button" className="absolute right-2 top-2 bg-gray-300 rounded-md p-2 inline-flex items-center justify-center hover:text-gray-500 hover:bg-gray-100 
                          focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                          onClick={() => setOnClose(false)}>
          <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </DialogPanel>
    </Dialog>
  )
}
