import { useEffect, useState } from "react";
import menuData from "../assets/fakeData/menu.json";

const useMenus = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    // Set the menus state directly from the imported JSON file
    setMenus(menuData);
  }, []);

  return [menus];
};

export default useMenus;
