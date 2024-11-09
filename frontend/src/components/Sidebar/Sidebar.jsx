import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home,
  Calendar,
  UserRound,
  Brain,
  User,
  ShoppingBag
} from 'lucide-react';

import Data from './Data.jsx';

function Sidebar() {
  const sidebarLinks = [
    {
      path: '/dashboard',
      icon: <Home className="h-5 w-5" />,
      label: 'Dashboard'
    },
    {
      path: '/my-appointments',
      icon: <Calendar className="h-5 w-5" />,
      label: 'Appointments'
    },
    {
      path: '/all-doctors',
      icon: <UserRound className="h-5 w-5" />,
      label: 'Doctor List'
    },
    {
      path: '/predict',
      icon: <Brain className="h-5 w-5" />,
      label: 'Dr. Derma'
    },
    {
      path: '/profile',
      icon: <User className="h-5 w-5" />,
      label: 'Profile'
    },
    {
      path: '/buy',
      icon: <ShoppingBag className="h-5 w-5" />,
      label: 'Marketplace'
    }
  ];

  return (
    <div className="col-span-2 row-span-12 h-screen overflow-hidden border-r">
      <Data />
      <div className="min-h-screen bg-white">
        <ul className="mt-5 flex flex-col items-center justify-center text-gray-600">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 md:px-9 md:min-w-60 cursor-pointer transition-colors
                ${
                  isActive
                    ? 'bg-[#F2F3FF] border-r-4 border-primary text-primary'
                    : 'hover:bg-gray-50'
                }`
              }
              to={link.path}
            >
              {link.icon}
              <span className="hidden md:block">{link.label}</span>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;