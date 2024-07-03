const buttonCallsToAction = [
  "Eat Your Favorite Food!",
  "I'm Hungry",
  "Let's Eat!",
  "Everyday is a good day to eat",
  "Time to Eat!",
];

export interface CtasList {
  buttonCta: string;
}
const generateCtas = () => {
  const randomIndex = Math.floor(Math.random() * buttonCallsToAction.length);

  const buttonCta = buttonCallsToAction[randomIndex];
  return { buttonCta };
};

export default generateCtas;
