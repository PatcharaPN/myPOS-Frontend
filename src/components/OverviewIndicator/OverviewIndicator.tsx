import React from "react";

type Props = {};

const OverviewIndicator = (props: Props) => {
  return (
    <div className="indicator-wrapper">
      <div>
        <div className="indicator-bar">
          <p>All products</p>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <p>0</p>
          </div>
        </div>
        <div className="indicator-bar">
          <p>Total payment</p>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <p>0</p>
          </div>
        </div>
        <div className="indicator-bar">
          <p>Monthly Income</p>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <p>0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewIndicator;
