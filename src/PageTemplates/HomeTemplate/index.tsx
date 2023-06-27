import { useCallback, useEffect, useState } from 'react';
import useHomeTemplate from './hooks/useHomeTemplate';
import { Button, Spinner } from '~/components';
import { Racer, IRaceFinished, RacerResult } from './components';

const HomeTemplate = () => {
  const { isLoading, requestFailed, racers, fetchRacers } = useHomeTemplate();
  const [raceStarted, setRaceStarted] = useState(false);
  const [_, setHasRaceFinished] = useState(false);
  const [numberOfRacerFinished, setNumberOfRacerFinished] = useState(0);
  const [racersOrdered, setRacersOrdered] = useState<IRaceFinished[]>([]);

  useEffect(() => {
    if (racers.length === numberOfRacerFinished) {
      setHasRaceFinished(true);
      setRaceStarted(false);
      setNumberOfRacerFinished(0);
    }
  }, [numberOfRacerFinished, racers])

  const handleStartRace = () => {
    setRaceStarted(true);
    setRacersOrdered([]);
  }

  const handleNumberOfRacerFinished = useCallback((racer: IRaceFinished) => {
    setNumberOfRacerFinished(state => state + 1);
    setRacersOrdered(state => [...state, racer]);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      {!isLoading && !raceStarted &&(
        <Button
          label={
            requestFailed
              ? 'Something went wrong. Try again'
              : racers.length ? 'Start race' : "Let's get started"
          }
          onClick={racers.length ? handleStartRace : fetchRacers}
        />
      )}
      {isLoading && <Spinner />}

      {!!racers.length && (
        <div className="mt-10 flex items-center flex-col p-4 overflow-auto w-[400px] rounded-lg shadow-xl">
          {racers.filter(racer => !racersOrdered.some(racerOrdered => racerOrdered.name === racer.name)).map((racer, idx) => (
            <Racer
              key={`key-racer-${idx}`}
              hasRaceStarted={raceStarted}
              onRaceFinished={handleNumberOfRacerFinished}
              {...racer}
            />
          ))}
        </div>
      )}

      {!!racersOrdered.length && (
        <div className="mt-10 flex items-center flex-col p-4 overflow-auto w-[400px] rounded-lg shadow-xl">
          {racersOrdered.sort((racerA, racerB) => racerB.result - racerA.result).map((racer, idx) => (
            <RacerResult
              key={`key-racer-${idx}`}
              {...racer}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeTemplate;
