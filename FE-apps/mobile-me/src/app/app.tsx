import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Component/Header';
import './global.css';

const Store = React.lazy(() => import('./Page/Store'));

export function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route
          path='store'
          element={
            <React.Suspense fallback={<div>loading Stores</div>}>
              <Store></Store>
            </React.Suspense>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
