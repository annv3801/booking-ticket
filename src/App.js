import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Film from "./pages/Film";
import TicketBooking from "./pages/TicketBooking";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";

function App() {
  return (
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/film/:slug" element={<Film></Film>}></Route>
          <Route path="/seats/:id" element={<TicketBooking></TicketBooking>}></Route>
          <Route path="/nextpage" element={<Checkout></Checkout>}></Route>
      </Routes>
  );
}

export default App;
