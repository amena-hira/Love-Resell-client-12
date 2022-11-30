import Toaster from 'react-hot-toast'
import './App.css';
import { RouterProvider } from 'react-router-dom';
import routes from './routes/routes/routes';

function App() {
  return (
    <div>
      <RouterProvider router={routes}>
      </RouterProvider>
    </div>
  );
}

export default App;
