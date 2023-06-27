export interface IRacerResultProps {
  name: string;
  result: number;
}

const RacerResult = ({
  name,
  result,
}: IRacerResultProps) => {
  return (
    <div className="flex w-full justify-between">
      <span>{name}</span>
      
      <span>{result}</span>
    </div>
  )
}

export default RacerResult;