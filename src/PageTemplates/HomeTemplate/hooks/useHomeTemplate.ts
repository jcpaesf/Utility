import { useCallback, useState } from 'react';
import { getRacers, IRacerProps } from "~/Pages/HomePage/api";

interface IRacerCmpProps extends IRacerProps {
  result: number;
}

const useHomeTemplate = () => {
  const [racers, setRacers] = useState<IRacerCmpProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [requestFailed, setRequestFailed] = useState(false);

  const fetchRacers = useCallback(async () => {
    setIsLoading(true);
    setRequestFailed(false);

    try {
      const racers = await getRacers();

      setRacers(racers as IRacerCmpProps[]);
    } catch (e) {
      setRequestFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    requestFailed,
    racers,
    setRacers,
    fetchRacers
  };
}

export default useHomeTemplate;