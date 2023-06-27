import { api } from "~/api";

export enum IRacerColor {
  Black = "BLACK",
  Red = "RED",
  Silver = "SILVER",
  Green = "GREEN",
  Blue = "BLUE"
}

export interface IRacerProps {
  name: string;
  length: number;
  color: IRacerColor;
  weight: number;
}

interface IGetRacersResponse {
  racers: Array<IRacerProps>
}

const getRacers = async(): Promise<IRacerProps[]> => {
  const { data } = await api.get<IGetRacersResponse>('racers');

  return data.racers;
}

export default getRacers;