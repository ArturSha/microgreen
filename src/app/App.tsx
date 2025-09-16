import { Suspense } from "react";
import { MainLayout } from "./layouts";
import "./styles/App.css";

function App() {
  return (
    <Suspense fallback="loading...">
      <MainLayout />
    </Suspense>
  );
}

export default App;
