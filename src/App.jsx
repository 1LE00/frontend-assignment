import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './components/home/Home';
import Missing from './components/missing/Missing';
import Details from './components/details/Details';
import SearchBar from './components/searchbar/SearchBar';
import { DataProvider } from './context/DataContext';


export default function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='search' element={<SearchBar />} />
          <Route path='products' element={<Details />} />
        <Route path='*' element={<Missing />} />
        </Route>
      </Routes>
    </DataProvider>
  )
}

