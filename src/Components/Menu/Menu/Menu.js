import React from "react";
import ContentLoader from "react-content-loader";
import "./Menu.css";
import { useNavigate } from 'react-router-dom';

const Menu = (props) => {
   const { bgColor, fgColor } = props; // Destructure bgColor and fgColor from props
   const { menu } = props; // Destructure menu from props
   const navigate = useNavigate();

   const handleDetails = (id) => {
      const url = `/menu/${id}`;
      navigate(url);
   };

   return (
      <div className="col-sm-6 col-lg-4 text-center mx-auto">
         {menu ? ( // Ensure menu data is available before rendering
            <div onClick={() => handleDetails(menu._id)} className="menu-box">
               <div className="img-box">
                  <img className="img-fluid" src={menu.image} alt="" />
               </div>
               <div className="info">
                  <h5 className="name">{menu.name}</h5>
                  <p>{menu.description.slice(0, 80)}</p>
                  {props.children ? (
                     <span className="link">{props.children}</span>
                  ) : (
                     <h4 className="price">${menu.price}</h4>
                  )}
               </div>
            </div>
         ) : (
            <ContentLoader
               viewBox="0 0 440 382"
               backgroundColor={bgColor}
               foregroundColor={fgColor}
            >
               <circle cx="227" cy="100" r="100" />
               <rect x="150" y="220" rx="10" ry="10" width="150" height="20" />
               <rect x="100" y="260" rx="10" ry="10" width="250" height="20" />
               <rect x="175" y="300" rx="10" ry="10" width="100" height="20" />
            </ContentLoader>
         )}
      </div>
   );
};

export default Menu;
