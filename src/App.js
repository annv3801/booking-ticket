import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Film from "./pages/Film";
import TicketBooking from "./pages/TicketBooking";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Category from "./pages/Category";
import PaymentSuccess from "./pages/PaymentSuccess";

function App() {
  return (
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category/:slug" element={<Category></Category>}></Route>
          <Route path="/film/:slug" element={<Film></Film>}></Route>
          <Route path="/seats/:id" element={<TicketBooking></TicketBooking>}></Route>
          <Route path="/nextpage" element={<Checkout></Checkout>}></Route>
          <Route path="/payment-success" element={<PaymentSuccess></PaymentSuccess>}></Route>
      </Routes>
  );
}

export default App;
