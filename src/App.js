import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from 'components/display/Header';
import HomeScreen from 'screens/home';
import PostScreen from 'screens/post';
import LastestScreen from 'screens/lastest';
import NotFound from 'components/display/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <div className='body-container'>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/post/:articleSlug" element={<PostScreen />} />
          <Route path="/lastest" element={<LastestScreen />} />
          <Route element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
