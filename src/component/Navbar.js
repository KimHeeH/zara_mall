import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMenuSharp } from "react-icons/io5";
import { authenticateAction } from "../redux/actions/authenticateAction";
import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../redux/actions/productAction";
import { useSearchParams } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuList = ["woman", "man", "kids", "home", "beauty"];
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
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 관리
  const authenticate = useSelector((state) => state.auth.authenticate);
  const [query] = useSearchParams();
  const handleSearch = () => {
    let searchQuery = query.get("search") || "";
    console.log("Search Query:", searchQuery); // 검색어 로그로 출력
    dispatch(productAction.getProducts(null, searchQuery, null));
  };
  const goHomePage = () => {
    navigate("/");
  };

  const goProductPage = (keyword) => {
    navigate(`/?search=${keyword}`);
    dispatch(productAction.getProducts(null, searchQuery, null));
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      goProductPage(searchQuery);
    }
  };

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      navigate(`/?search=${searchQuery}`);
      dispatch(productAction.getProducts(null, searchQuery, null));
    }
  };
  const goLoginPage = () => {
    if (authenticate) {
      dispatch(authenticateAction.logout());
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const handleSubMenuClick = async (gender, subItem) => {
    console.log("Clicked subItem:", gender, subItem);

    // 로딩 상태 관리 추가
    try {
      await dispatch(productAction.getProducts(subItem, null, gender));
      console.log("Products updated successfully");
    } catch (error) {
      console.error("Failed to update products:", error);
    }
    navigate(`/?type=${subItem}&gender=${gender}`);
  };

  const goMenuProduct = (menu) => {
    navigate(`/?gender=${menu}`);
    dispatch(productAction.getProducts(null, null, menu));
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
            alt="Logo"
          />
        </div>
        <div>
          <ul className="menu-list">
            {menuList.map((menu) => (
              <li
                className="menu"
                key={menu}
                onClick={() => goMenuProduct(menu)}
              >
                {menu}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-end-box">
          <div style={{ cursor: "pointer" }} onClick={goLoginPage}>
            {authenticate ? "로그아웃" : "로그인"}
          </div>
          <div>도움말</div>
          <div>바스킷백</div>
        </div>
        <div className="input-area">
          <input
            className="input-box"
            style={{ padding: "10px" }}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="검색어를 입력하세요"
          />
          <button className="button" onClick={handleSearchClick}>
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
                    onClick={() => handleSubMenuClick(item.name, subItem)}
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
