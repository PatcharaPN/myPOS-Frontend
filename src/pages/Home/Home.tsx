import "./Home.scss";
import "../../i18n";

import BoxContainer from "../../components/BoxContainer/BoxContainer";
import PieChart from "../../components/Graph/Pie/PieChart";
import ActivityMenu from "../../components/ActivityMenu/ActivityMenu";
import OverviewIndicator from "../../components/OverviewIndicator/OverviewIndicator";
import TopSaleContainer from "../../components/TopSaleContainer/TopSaleContainer";
import OrderContainer from "../../components/OrderContainer/OrderContainer";

const Home = () => {
  return (
    <div className="menu-container">
      <ActivityMenu />
      <section className="graph-section">
        <BoxContainer>
          <div className="indicator-container">
            <div className="status-indicator">
              {/** Indicator **/}
              <OverviewIndicator />
              <div className="pie-wrapper">
                <PieChart />
              </div>
            </div>
          </div>
        </BoxContainer>
        {/*TopSale*/}
        <TopSaleContainer />
      </section>
      {/*Order Container*/}
      <OrderContainer />
    </div>
  );
};

export default Home;
