import { Link, useLocation, useNavigate } from "react-router-dom"
import { BsSearch } from 'react-icons/bs'
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import { Menu } from "./Menu";
import { UserContext } from "../context/UserContext";


const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();
  // console.log(prompt)
  const path = useLocation().pathname;//it's object contaon pathname
  // console.log(param);
  const showMenu = () => {
    setMenu(!menu);
  }
  const { user } = useContext(UserContext);
  // console.log(user);

  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-xl md:text-xl font-extrabold">
        <Link to='/'>Blog Market</Link>
      </h1>
      {
      path === '/' && <div className="flex justify-center  items-center space-x-0">
        <p onClick={() => navigate(prompt ? "?search=" + prompt : navigate("/"))} className="cursor-pointer"><BsSearch /></p>
        <input onChange={(e) => setPrompt(e.target.value)} className="outline-none px-3 py-0" placeholder="Search a Post"></input>
      </div>
      }
      <div className="hidden md:flex items-center justify-center space-x-4 md:space-x-6">
        {user ? <h3><Link to='/write'>Write</Link></h3> : <h3><Link to='/login'>LogIn</Link></h3>}
        {user ?
          <div onClick={showMenu} >
            <p className="cursor-pointer relative"><FaBars /></p>
            {menu && <Menu />}
          </div>
          : <h3><Link to='/register'>Register</Link></h3>}
      </div>

      <div onClick={showMenu} className="md:hidden text-lg ">
        <p className="cursor-pointer relative"><FaBars /></p>
        {menu && <Menu />}
      </div>
    </div>
  )
}

export default Navbar;