import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import routes from './routes/routes/routes';

function App() {
  return (
    <div className='max-w-6xl mx-auto'>
      <RouterProvider router={routes}>

      </RouterProvider>
    </div>
  );
}

export default App;
