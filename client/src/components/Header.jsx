import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from 'react-icons/ai';
import { Button } from 'flowbite-react';
import { FaMoon } from 'react-icons/fa';

export default function Header() {
  return (
    <Navbar className='border-b-2'>
      {/* SMALL AND ABOVE: sm:aaaaa */}
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Bryce's</span>
        Blog
      </Link>
      <form>
        <input
          type='text'
          placeholder='Search...'
          // You can't directly pass a component as a prop, so we need to render it
          // Assuming you wanted to use a search icon from react-icons library
          rightIcon={AiOutlineSearch }
          className='hidden lg:inline'
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill >
        <AiOutlineSearch/>
      </Button>
      <div className="">
        <Button className="w-12 h-10 hidden sm:inline" color='gray' pill>
            <FaMoon />
        </Button>
        <Link to='/sign-in'></Link>

      </div>
    </Navbar>
  );
}
