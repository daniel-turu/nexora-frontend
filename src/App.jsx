import { motion } from "framer-motion";
import { ShowAboveProvider } from '@/Context/AboveContext';
import {Home} from './Pages/Home';
import {About} from './Pages/About';
import {Header} from './components/Header';
import {NavigationProvider, useNavigation } from './Context/NavigationContext';
import {Footer} from "./components/Footer";
import { SingleEvent } from "./components/SingleEvent";
import CurriculumOffers from "./components/CurriculumOffers";
import { AcademicCalendar } from "./components/AcademicCalendar";
import { Gallery } from "./components/Gallery";
import { FAQs } from "./components/FAQs";
import { AboutPage } from "./components/AboutPage";
import {Contact} from "./components/Contact";
function AppContent() {
  const { currentPage, currentParams } = useNavigation();

  return (
    <div className='relative'>
      <Header /> 
      <div>
        {currentPage === "Home" && <Home />}
        {currentPage === "About" && <About />}
        {currentPage === "EventDetail" && <SingleEvent eventId={currentParams?.id} />}
        {currentPage === "CurriculumOffers" && <CurriculumOffers />}
        {currentPage === "AcademicCalendar" && <AcademicCalendar />}
        {currentPage === "Gallery" && <Gallery />}
        {currentPage === "FAQs" && <FAQs/>}
        {currentPage === "About" && <AboutPage/>}
        {currentPage === "Contact" && <Contact/>}
      </div>
      

      

      <Footer />
    </div>
  );
}



export default function App() {
  return (
    <NavigationProvider>
      <ShowAboveProvider>
        <AppContent />
      </ShowAboveProvider>
    </NavigationProvider>
  );
}
