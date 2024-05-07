import './App.css';
import Header from './component/Header';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Weatherpage from './component/Weatherpage';
import Main from '././weather/Main'
import GeoLocation from './weather/GeoLocation';


function App() {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Header />,

    },
    {
      path: 'weather/:city',
      element: <Main />
    },
    {
      path: 'weather/:country',
      element: <Main />
    },
    {
      path: 'map',
      element: <GeoLocation />
    }
  ])
  return (
    <div className="bg-gray-700 text-white flex flex-col items-center justify-center ">
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App;


// import React from 'react'
// import Main from './weather/Main'

// const App = () => {

//   return (
//     <div>
//       <Main />
//     </div>
//   )
// }

// export default App
