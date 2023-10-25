import React from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/common/footer";
import RoutesMap from "./routes/routes";

function App() {
  return (
    <>
      <RoutesMap />
      <Footer />
    </>
  );
}

export default App;
