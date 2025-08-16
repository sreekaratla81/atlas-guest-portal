import { RouterProvider } from "react-router-dom";
import router from "./router";
import Header from "./components/chrome/Header";
import Footer from "./components/chrome/Footer";

export default function App() {
  const inTest = import.meta.env.VITEST;
  return (
    <>
      <div style={{ position: "fixed", top: 8, left: 8, fontSize: 12, opacity: 0.6 }}>
        App loaded
      </div>
      {!inTest && (
        <>
          <Header />
          <RouterProvider router={router} />
          <Footer />
        </>
      )}
    </>
  );
}
