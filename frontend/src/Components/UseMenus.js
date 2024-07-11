import { useEffect, useState } from "react";
import axios from "axios";
const useMenus = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get("https://cec-canteen-backend.vercel.app/api/menu");
        setMenus(response.data.data);
      } catch (error) {
        console.error("Failed to fetch menus:", error);
      }
    };

    fetchMenus();
  }, []);
  return [menus];
};

export default useMenus;
