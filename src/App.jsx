import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Weatherpage from './component/Weatherpage';
import Main from '././weather/Main'
import Body from './component/Body';
// import GeoLocation from './weather/GeoLocation';
import bcgimg from './assets/bcg_img.png'


function App() {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Body />,

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
      path: 'weather/:delhi',
      element: <Main />
    },
    // {
    //   path: 'map',
    //   element: <GeoLocation />
    // }
  ])
  return (
    <div className="bg-gray-700 text-white flex flex-col items-center justify-center bg-cover" style={{ backgroundImage: `url(${bcgimg})` }} >
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
