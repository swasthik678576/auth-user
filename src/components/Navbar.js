import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const isUserSignedIn = localStorage.getItem('token');
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    const handleSearch = () => {
        if (searchQuery.trim()) {
            console.log('Searching for:', searchQuery);
            // Add your search logic here
            // For example: navigate to search results page or filter content
        }
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        handleSearch();
    }
  return (
    <nav className='flex justify-between p-3 border-b border-zinc-800 items-center bg-[gray]/90 text-zinc-800'>
        <Link to="/"><h1 className='text-3xl'>AuthDB</h1></Link>
        
        {/* Search Section */}
        <div className='flex items-center gap-2'>
            <form onSubmit={handleSearchSubmit} className='flex items-center gap-2'>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='px-3 py-1 border border-zinc-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'
                />
                <button
                    type="submit"
                    className='px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
                >
                    Search
                </button>
            </form>
        </div>

        <ul className='flex gap-6'>
            {isUserSignedIn ? (
                <>
                <Link to="/account"><li>Account</li></Link>
                <li><button onClick={handleSignOut}>Sign Out</button></li>
                </>
            ): (
                <>
                 <Link to="/login"><li>Login</li></Link>
                 <Link to="/signup"><li>SignUp</li></Link>
                </>
            )}
           

        </ul>
    </nav>  
  )
}

export default Navbar