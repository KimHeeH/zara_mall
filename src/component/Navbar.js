import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMenuSharp } from "react-icons/io5";

const Navbar = () => {
  const menuList = ["WOMAN", "MAN", "KIDS", "HOME", "BEAUTY"];
  const sideMenuList = [
    {
      name: "WOMAN",
      subMenu: ["Tops", "Bottoms", "Dresses", "Skirts", "Knit", "Shoes", "bag"],
    },
    {
      name: "MAN",
      subMenu: ["Shirts", "Pants", "Jackets", "Denim Pants", "Short Pants"],
    },
    { name: "KIDS", subMenu: ["Tops", "Bottoms", "Outerwear"] },
    { name: "HOME", subMenu: ["Furniture", "Decor", "Lighting", "Dining"] },
    { name: "BEAUTY", subMenu: ["Skincare", "Makeup", "Fragrance"] },
  ];
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const navigate = useNavigate();

  const goHomePage = () => {
    navigate("/");
  };

  const goProductPage = (keyword) => {
    navigate(`/?q=${keyword}`);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      goProductPage(event.target.value);
    }
  };

  const handleSubMenuClick = (subItem) => {
    goProductPage(subItem);
  };

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <div className="navbar-container">
      <div className="container">
        <IoMenuSharp
          className="bar"
          size={35}
          color="black"
          onClick={toggleSideMenu}
        />
        <div className="img-area">
          <img
            width="190px"
            src="https://mblogthumb-phinf.pstatic.net/MjAyMjExMTFfMTg2/MDAxNjY4MTM2NTEyMzQ0.1416sIx-zJidH1JjoDznD2dn0kXPSOcOE480Fpf5Z7Yg.aOoS6znzduaOiOb5vXpjcODBwUf5AEJewYnDrJL28VEg.PNG.cnd6305/Zara_logo_PNG3dfsfs.png?type=w800"
            style={{ cursor: "pointer" }}
            onClick={goHomePage}
          />
        </div>
        <div>
          <ul className="menu-list">
            {menuList.map((menu) => (
              <li className="menu" key={menu}>
                {menu}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-end-box">
          <div>로그인</div>
          <div>도움말</div>
          <div>바스킷백</div>
        </div>
        <div className="input-area">
          <input
            className="input-box"
            type="text"
            onKeyDown={handleInputKeyDown}
          />
          <button
            className="button"
            onClick={() =>
              goProductPage(document.querySelector(".input-box").value)
            }
          >
            검색
          </button>
        </div>
      </div>
      {isSideMenuOpen && (
        <div className="side-menu">
          {sideMenuList.map((item, index) => (
            <div key={index} className="side-menu-item">
              <h3>{item.name}</h3>
              <ul>
                {item.subMenu.map((subItem, subIndex) => (
                  <li
                    key={subIndex}
                    className="sub-menu-item"
                    onClick={() => handleSubMenuClick(subItem)}
                  >
                    {subItem}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
