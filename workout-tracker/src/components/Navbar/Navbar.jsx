import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { GiWeightLiftingUp } from "react-icons/gi";

function Navbar() {

  const navigationLinks = ['Home', 'Plan', 'Stats', 'Exercises']

  return (
    <div className="flex items-center justify-around py-4 max-w-7xl m-auto">
      <GiWeightLiftingUp className="w-12 h-12" />
      <ul className="flex gap-10">
        <li className="px-6 py-2 hover:cursor-pointer font-semibold"><a href="/">Home</a></li>
        <li className="px-6 py-2 hover:cursor-pointer font-semibold"><a href="/plan">Plan</a></li>
        <li className="px-6 py-2 hover:cursor-pointer font-semibold"><a href="/">Stats</a></li>
        <li className="px-6 py-2 hover:cursor-pointer font-semibold"><a href="/exercises">Exercises</a></li>
      </ul>
      <div className="flex items-center gap-3 hover:cursor-pointer bg-neutral-800 text-white p-2 pr-4 rounded-lg">
        <CiCirclePlus className="w-8 h-8" color="white"/>
        Add Workout
      </div>
    </div>
  );
}

export default Navbar;