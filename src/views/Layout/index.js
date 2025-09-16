import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Layout = () => {
  return (
    <>
      <header className="App">
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        {/* <Footer /> */}
        <hr />
        <p>&copy; 2025 ReAlign. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Layout;
