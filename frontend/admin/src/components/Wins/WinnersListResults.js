import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

const WinnersListResults = () => {
  const { bidwinners } = useSelector((state) => state.app.bids);
  const winners = useMemo(() => bidwinners, [bidwinners]);
  console.log(winners);
  return <div>winners</div>;
};

export default WinnersListResults;
