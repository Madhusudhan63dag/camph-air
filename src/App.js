import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import One from './components/One';
import Two from './components/Two';
import Three from './components/Three';
import Four from './components/Four';
import Five from './components/Five';
import Checkout from './pages/Checkout';
import Cancellation from './pages/Cancellation';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Return from './pages/Return';
import Shipping from './pages/Shipping';



const PromoBanner = () => {
  return (
    <div className="w-full bg-[#5d3c77] text-white py-2 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap text-sm sm:text-base font-semibold tracking-wide">
        <span className="mx-10">
          🎉 First 100 Orders Get 1-Day Delivery + FREE Shipping. Order Fast – Limited Offer!
        </span>
        <span className="mx-10">
          🎉 First 100 Orders Get 1-Day Delivery + FREE Shipping. Order Fast – Limited Offer!
        </span>
        <span className="mx-10">
          🎉 First 100 Orders Get 1-Day Delivery + FREE Shipping. Order Fast – Limited Offer!
        </span>
      </div>
    </div>
  );
};


function Home() {
  return (
    <div className="home">
      <One />
      <PromoBanner />
      <Two />
      <Three />
      <Four />
      <Five />
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cancellation" element={<Cancellation />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/return" element={<Return />} />
          <Route path="/shipping" element={<Shipping />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
