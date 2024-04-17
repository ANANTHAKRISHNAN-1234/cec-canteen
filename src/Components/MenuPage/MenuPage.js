import React from "react";
import useMenus from "../UseMenus";
import Menu from "../Menu/Menu";
import PageBanner from "../PageBanner/PageBanner";
import "./MenuPage.css";
import Navbar from "../Navbar/Navbar";

const MenuPage = () => {
  const [menus] = useMenus();

  return (
    <div className="menu-page">
      <Navbar></Navbar>
      <PageBanner>
        <span>food menus</span>
      </PageBanner>
      <div className="container" style={{ minHeight: "700px" }}>
        <div className="row">
          {menus.map((menu) => (
            <Menu
              menu={menu}
              key={menu._id}
              bgColor="#f1f1f1"
              fgColor="#f9f9f9"
            ></Menu>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
