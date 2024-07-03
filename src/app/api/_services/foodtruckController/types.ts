export interface PromptInputFoodtruck {
  Applicant: string;
  FoodType: string;
}

export interface PromptResponseFoodtruck {
  applicant: string;
  reason: string;
  foods: string[];
}

export interface PublicFoodtruck {
  applicant: string;
  reason: string;
  foods: string[];
  addresses: string[];
}
