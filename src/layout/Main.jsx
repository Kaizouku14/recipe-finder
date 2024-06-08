import { useEffect, useState } from "react";
import { InfoDialog } from "../components/InfoDialog";
import { ListCard } from "../components/ListCard";
import { queryRandomRecipe } from "../service/RecipeApi";
import { Toaster, toast } from 'sonner';

export const Main = ({ getLists }) => {
  const [showInfoCard, setShowInfoCard] = useState(false);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [listId, setListId] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    queryRandomRecipe()
      .then(res => {
        setLoading(false);
        setList(res);
      })
      .catch(err => toast.error('Error: Ingredients not found'));
  }, []);

  useEffect(() => {
    setList(getLists);
  }, [getLists]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + list.length) % list.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % list.length);
  };

  return (
    <main className='h-[598px] px-5 pt-[110px] flex justify-center items-center'>
      {loading ? (
        <div className="flex items-center justify-center h-full w-full">
            <p className='text-xl text-white'>Loading...</p>
       </div>
      ) : (
        <>
        <div className='h-full grid grid-cols-5 gap-5 overflow-auto max-md:hidden'>
          {list.length > 0 && list.map((value, index) => (
            <ListCard
              key={index}
              image={value.image}
              foodName={value.title}
              onClick={() => { setShowInfoCard(true); setListId(value.id); }}
            />
          ))}
        </div>
        
        <div id="controls-carousel" className="relative w-full hidden max-md:block" data-carousel="static">
          <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
            {list.length > 0 && list.map((value, index) => (
              <div
                key={index}
                className={`${index === currentIndex ? 'block' : 'hidden'} `}
                data-carousel-item
                onClick={() => { setShowInfoCard(true); setListId(value.id); }}
              >
                <img
                  src={value.image}
                  className="absolute block w-full object-cover"
                  alt="recipe"
                />
              <p className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2">{value.title}</p>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            onClick={handlePrev}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-white group-hover:bg-white/50 dark:group-hover:bg-gray-300  group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            onClick={handleNext}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-white group-hover:bg-white/50 dark:group-hover:bg-gray-300 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
       </>
      )}
      <InfoDialog isOpen={showInfoCard} setOnClose={(val) => setShowInfoCard(val)} ID={listId} />
      <Toaster richColors position="top-center" />
    </main>
  );
};
