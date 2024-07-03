import Image from "next/image";
import { useEffect, useState } from "react";

interface FoodTruckCardProps {
  className?: string;
  applicant: string;
  reason: string;
  foods: string[];
}

const FoodTruckCard: React.FC<FoodTruckCardProps> = ({
  className,
  applicant,
  reason,
  foods,
}) => {
  return (
    <div className={className}>
      <div className="card bg-base-100 w-96 shadow-xl ">
        <div className="card-body ">
          <h2 className="card-title border-b-2 border-gray-300 pb-2 ${trackColor}">
            {applicant}
          </h2>
          <span className="font-bold">Why? </span>
          <p>{reason}</p>
          <div>
            <div className="flex flex-wrap">
              {foods.map((food) => {
                return (
                  <div
                    key={food}
                    className="bg-slate-600 text-sm font-semibold text-white rounded-xl mr-2 mt-2 px-3 py-1 capitalize"
                  >
                    {food}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodTruckCard;
