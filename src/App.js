import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
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
import Thankyou from './pages/Thankyou';
import Six from './components/Six';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';




const PromoBanner = () => {
  return (
    <div className="w-full bg-[#5d3c77] text-white py-2 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap text-sm sm:text-base font-semibold tracking-wide">
        <span className="mx-10">
          FREE Shipping. Order Fast
        </span>
        <span className="mx-10">
          FREE Shipping. Order Fast
        </span>
        <span className="mx-10">
          FREE Shipping. Order Fast
        </span>
        <span className="mx-10">
          FREE Shipping. Order Fast
        </span>
        <span className="mx-10">
          FREE Shipping. Order Fast
        </span>
        <span className="mx-10">
          FREE Shipping. Order Fast
        </span>
        <span className="mx-10">
          FREE Shipping. Order Fast
        </span>
        <span className="mx-10">
          FREE Shipping. Order Fast
        </span>
        <span className="mx-10">
          FREE Shipping. Order Fast
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
      <div className='overflow-hidden'>
        <Three />
      </div>
      <Four />
      <Five />
      <Six />
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cancellation" element={<Cancellation />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/returns" element={<Return />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/thank-you" element={<Thankyou />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
