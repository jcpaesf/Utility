export type RacerWinLikelihoodCallback = (likelihood: number) => void;

export default function generateRacerWinLikelihoodCalculator(): (callback: RacerWinLikelihoodCallback) => void {
  const delay: number = 7000 + Math.random() * 7000;
  const likelihoodOfRacerWinning: number = Math.random();

  return (callback: RacerWinLikelihoodCallback): void => {
    setTimeout(() => {
      callback(likelihoodOfRacerWinning);
    }, delay);
  };
}
