import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
