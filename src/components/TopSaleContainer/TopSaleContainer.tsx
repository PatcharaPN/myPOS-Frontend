import React from "react";
import BoxContainer from "../BoxContainer/BoxContainer";

type Props = {};

const TopSaleContainer = (props: Props) => {
  return (
    <section className="topsell-container">
      <BoxContainer>
        <div className="topsell-wrapper">
          <div className="top-sell-products">
            <h1>Top Selling Products</h1>
            <table>
              <thead>
                <tr>
                  <td></td>
                  <td>Product</td>
                  <td>Date/Time</td>
                  <td>Saled Amount</td>
                  <td>Price</td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </BoxContainer>
    </section>
  );
};

export default TopSaleContainer;
