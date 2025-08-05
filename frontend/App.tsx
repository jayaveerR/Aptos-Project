import { BrowserRouter, Routes, Route } from "react-router-dom";
import WalletConnectCard from "./WalletConnectCard";
import DisconnectPage from "./DisconnectPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<WalletConnectCard />} />
        <Route path="/disconnect" element={<DisconnectPage />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
