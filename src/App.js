import './App.css';
import AccountsList from './pages/AccountsList';
import ContactsList from './pages/ContactsList';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route strict exact path="/accounts" element={<AccountsList />} />
        <Route strict exact path="/contacts" element={<ContactsList />} />
        <Route strict exact path="/" element={<ContactsList />} />
      </Routes>
    </div>
  );
}

export default App;
