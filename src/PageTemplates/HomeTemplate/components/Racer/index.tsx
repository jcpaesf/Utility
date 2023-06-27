import { useEffect, useState } from 'react';
import { IRacerProps, IRacerColor } from "~/Pages/HomePage/api";
import { RacerWinLikelihoodCallback, generateRacerWinLikelihoodCalculator } from '~/utils';

export interface IRaceFinished {
  name: string;
  result: number;
}

interface IRacerCmpProps extends Partial<IRacerProps> {
  result?: number;
  hasRaceStarted?: boolean;
  onRaceFinished?: (racer: IRaceFinished) => void;
}

enum ERaceStatus {
  NotStarted = 'Not started',
  InProgress = 'In progress',
  Calculated = 'Calculated'
}

const Racer = ({
  name,
  color,
  hasRaceStarted,
  onRaceFinished
}: IRacerCmpProps) => {
  const [raceStatus, setRaceStatus] = useState<ERaceStatus>(ERaceStatus.NotStarted);

  useEffect(() => {
    if (hasRaceStarted && raceStatus === ERaceStatus.NotStarted) {
      setRaceStatus(ERaceStatus.InProgress);
      const racerWinLikelihoodCalculator = generateRacerWinLikelihoodCalculator();

      const callback: RacerWinLikelihoodCallback = (likelihood: number) => {
        onRaceFinished && onRaceFinished({
          name: name || '',
          result: likelihood
        });
      };

      racerWinLikelihoodCalculator(callback);
    }
  }, [hasRaceStarted, onRaceFinished, raceStatus, name])

  const nameColor = {
    [IRacerColor.Black]: 'text-black-500',
    [IRacerColor.Blue]: 'text-blue-500',
    [IRacerColor.Green]: 'text-green-500',
    [IRacerColor.Red]: 'text-red-500',
    [IRacerColor.Silver]: 'text-gray-500',
  }

  return (
    <div className="flex w-full justify-between">
      <span className={`${nameColor[color || IRacerColor.Black]}`}>{name}</span>
      
      <span>{raceStatus}</span>
    </div>
  )
}

export default Racer;