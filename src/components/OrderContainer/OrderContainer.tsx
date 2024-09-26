import React from "react";
import BoxContainer from "../BoxContainer/BoxContainer";

type Props = {};

const OrderContainer = (props: Props) => {
  return (
    <section className="order-section" style={{ marginTop: "1rem" }}>
      <BoxContainer>
        <div className="order-wrapper">
          <h1>Incoming Order</h1>
          <div className="order-list"></div>
        </div>
      </BoxContainer>
    </section>
  );
};

export default OrderContainer;
