import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { GiWeightLiftingUp } from "react-icons/gi";
import { Link } from 'react-router-dom';

function Navbar({homepage}) {

  const navigationLinks = [
    {
      name: 'Home',
      routerLink: '/' 
    },
    {
      name: 'Plan',
      routerLink: '/plan' 
    },
    {
      name: 'Stats',
      routerLink: '' 
    },
    {
      name: 'Exercises',
      routerLink: '/exercise' 
    }, !homepage ?
    {
      name: 'Login',
      routerLink: '/login'
    } : null
    
  ].filter(Boolean);
  const AddWorkoutLink = homepage ? { 
    name: 'Login',
    routerLink: '/login'
  } : { 
    name: 'Add Workout',
    routerLink: '/add-workout'
  }
  return (
    <div className="sticky top-0 bg-white">
      <div className="flex items-center justify-around max-w-7xl py-4 m-auto">
        <GiWeightLiftingUp className="w-12 h-12" />
        <ul className="flex gap-10">
          {navigationLinks.map((link) => (
            <Link to={link.routerLink}>
              <li className="px-6 py-2 hover:cursor-pointer font-semibold"
                  key={link.name}>
                  {link.name}
              </li>
            </Link>))}
        </ul>
        <Link to={AddWorkoutLink.routerLink}>

        <div className="flex items-center gap-3 hover:cursor-pointer bg-neutral-800 text-white p-2 pr-4 rounded-lg">
          <CiCirclePlus className="w-8 h-8" color="white"/>
          {homepage ? "Login" : "Add Workout"}
        </div>
        </Link>

      </div>
    </div>
  );
}

export default Navbar;