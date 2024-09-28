import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./products";  // Import the Products component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/ProductsWithReduxStore" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
