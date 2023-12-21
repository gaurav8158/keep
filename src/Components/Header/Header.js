import React, { useContext, useState } from 'react'
import "./Header.css"
import logo from "../../Assets/keep1.png"
import FeatherIcon from 'feather-icons-react/build/FeatherIcon'
import KeepContext from '../KeepContext/KeepContext'

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const { setFilterText } = useContext(KeepContext);
  const handleSearch = () => {
    setFilterText(searchText);
  }
  return (
    <div className='nav'>
      <div className='hidden'>
        <div className='hidden menu-icon'>
          <FeatherIcon className="hidden" icon="menu" />
        </div>
        <img src={logo} className='hidden logo-img' alt="logo" />
      </div>

      <div className='text-box'>
        <input type="text" onChange={(e) => setSearchText(e.target.value)} />
        <div onClick={handleSearch}>
          <FeatherIcon className="search-icon" icon="search" />
        </div>
      </div>

    </div>
  )
}

export default Header