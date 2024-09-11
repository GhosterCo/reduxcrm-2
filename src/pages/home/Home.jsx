import s from "./Home.module.scss";
import TableSection from "../../components/table/Table";

const Home = () => {
  return (
    <div className={s.app}>
      <h1>Start time: 11:50, Finished: ???</h1>
      <TableSection />
    </div>
  );
};

export default Home;
