import FoodTruckCard from "@/app/_components/FoodTruckCard/FoodTruckCard";
import { PublicFoodtruck } from "@/app/api/_services/foodtruckController/types";

interface FoodTruckCandidatesProps {
  candidates: PublicFoodtruck[];
  isLoading: boolean;
}
const FoodTruckCandidates: React.FC<FoodTruckCandidatesProps> = ({
  candidates,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="text-center">
        <span className="loading loading-ball loading-lg text-center"></span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4 ">
      {candidates.map((candidate) => {
        return (
          <FoodTruckCard
            className="w-full flex justify-center mb-8"
            key={candidate.applicant}
            applicant={candidate.applicant}
            foods={candidate.foods}
            reason={candidate.reason}
          ></FoodTruckCard>
        );
      })}
    </div>
  );
};

export default FoodTruckCandidates;
