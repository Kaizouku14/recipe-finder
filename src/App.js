import { useState } from "react";
import { Header, Main } from "./layout";

function App() {
   const [getList, setGetList] = useState([])

   const handleList = (data) => setGetList(data)

  return (
    <>
     <Header Lists={handleList}/>
     <Main getLists={getList}/>
    </>
  );
}

export default App;
