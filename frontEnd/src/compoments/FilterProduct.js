import React from 'react';
import { FcSportsMode } from "react-icons/fc";

const muscleNames = ["bras", "trapeze", "biceps", "triceps", "jambes", "lombaires"];

const FilterProduct = ({ onClick, isActive }) => {
  return (
    <div onClick={onClick} className='flex m-2'>
      {muscleNames.map((muscle, index) => (
        <div
          key={index}
          className={`flex flex-col items-center justify-center text-5xl p-2 m-2 rounded-full cursor-pointer 	 ${isActive ? "bg-yellow-600" : "bg-blue-300"}`}
        >
          <FcSportsMode />
          <p className="text-center font-bold my-2 capitalize">
            {muscle}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FilterProduct;