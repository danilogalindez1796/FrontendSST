import React, { useEffect, useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineBarChart,
  AiOutlineCheckSquare,
  AiOutlineBook,
  AiOutlineUser,
  AiOutlineHome,
  AiOutlineTool,
} from "react-icons/ai";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [nombre, setNombre] = useState("");

  const ocultarSidebar =
    location.pathname === "/" || location.pathname === "/Registro";
  if (ocultarSidebar) {
    return null;
  }

  useEffect(() => {
    // Para pruebas
    setNombre("Usuario de Prueba");
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const menuItems = [
    { icon: <AiOutlineHome className="text-4xl" />, label: "Inicio", path: "/nav/inicio" },
    { icon: <AiOutlineBarChart className="text-4xl" />, label: "Reportes", path: "/nav/reportes" },
    { icon: <AiOutlineBook className="text-4xl" />, label: "Actividades Lúdicas", path: "/nav/actLudica" },
    { icon: <AiOutlineCheckSquare className="text-4xl" />, label: "Listas de Chequeo", path: "/nav/ListasChequeo" },
    { icon: <AiOutlineTool className="text-4xl" />, label: "Gestión EPP", path: "/nav/gestionEpp" },
    { icon: <AiOutlineUser className="text-4xl" />, label: "Lista de Usuarios", path: "/nav/usuarios" },
  ];

  return (
  <div className="flex h-screen w-screen overflow-hidden font-sans">
    {/* Sidebar */}
    <div
      className={`${
        isCollapsed ? "w-20" : "w-72"
      } h-full text-white flex flex-col transition-all duration-500 ease-in-out border-r border-gray-700 shadow-2xl backdrop-blur-lg relative`}
      style={{
        backgroundImage:
          "linear-gradient(160deg, rgba(15,23,42,0.96) 0%, rgba(30,41,59,0.85) 100%), url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Botón menú */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
        {!isCollapsed && (
          <h1 className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent drop-shadow-md">
            Panel de Control
          </h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-blue-500/30 transition-all duration-300 hover:scale-110"
        >
          <AiOutlineMenu className="text-2xl" />
        </button>
      </div>

      {/* Perfil */}
      {!isCollapsed && (
        <div className="flex flex-col items-center py-6 border-b border-gray-700">
          <div className="relative">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="Perfil"
              className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg hover:scale-105 hover:rotate-1 transition-transform duration-300"
            />
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900 shadow"></span>
          </div>
          <h2 className="mt-3 font-semibold text-lg text-gray-100 tracking-wide">
            {nombre || "Usuario"}
          </h2>
          <p className="text-gray-400 text-sm italic">Administrador</p>
        </div>
      )}

      {/* Menú */}
      <nav
        className={`flex-1 mt-4 overflow-y-auto ${
          isCollapsed ? "flex flex-col items-center gap-4" : "px-2"
        }`}
      >
        <ul className={`${isCollapsed ? "space-y-0" : "space-y-2 w-full"}`}>
          {menuItems.map((item, index) => (
            <li key={index} className="group relative">
              <button
                onClick={() => navigate(item.path)}
                className={`flex items-center w-full ${
                  isCollapsed
                    ? "justify-center p-3 rounded-full bg-black/30 hover:bg-blue-500/30 shadow-md"
                    : "gap-3 px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20"
                } text-sm font-medium transition-all duration-300`}
              >
                <span className="text-blue-300 group-hover:text-blue-400 transition-colors text-lg">
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="text-gray-200 group-hover:text-blue-300 transition-colors">
                    {item.label}
                  </span>
                )}
              </button>

              {/* Tooltip al estar colapsado */}
              {isCollapsed && (
                <span className="absolute left-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 bg-gray-900 text-white text-xs px-2 py-1 rounded-md shadow-lg z-50">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-700 text-center text-xs text-gray-400">
          <button
            onClick={logout}
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 rounded-lg w-full font-bold text-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            🔒 Cerrar sesión
          </button>
          <p className="mt-3 opacity-70">© 2025 Tu Empresa</p>
        </div>
      )}
    </div>

    {/* Contenido principal */}
    <div
      className="flex-1 overflow-auto"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.9)), url('https://img.freepik.com/fotos-premium/trabajador-textura-oscura-fondo-concepto-sst-seguridad-salud-trabajo_488220-50664.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="p-8 animate-fadeIn">
        <Outlet />
      </div>
    </div>
  </div>
);

};

export default Sidebar;
