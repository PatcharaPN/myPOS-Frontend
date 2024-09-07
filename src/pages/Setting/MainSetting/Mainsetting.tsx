import BoxContainer from "../../../components/BoxContainer/BoxContainer";

import "./MainSetting.scss";
const MainSetting = () => {
  return (
    <>
      <div className="setting-content-layout">
        <BoxContainer height="100%">
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <section>
              <div className="profile-setting">
                <div className="profile-picture">
                  <div className="profile-pic"></div>
                  <div className="profile-information">
                    <p>Username</p>
                    <p>Location</p>
                    <p>Role</p>
                  </div>
                </div>
                <form className="profile-setting-input">
                  <div className="profile-form">
                    <p>Username</p>
                    <input className="profile-input" placeholder="Username" />
                  </div>
                  <div className="profile-form">
                    <p>Name</p>
                    <input className="profile-input" placeholder="Username" />
                  </div>
                  <div className="profile-form">
                    <p>Full name</p>
                    <input className="profile-input" placeholder="Username" />
                  </div>
                  <div className="profile-form">
                    <p>Email</p>
                    <input className="profile-input" placeholder="Username" />
                  </div>
                  <div className="profile-form">
                    <p>Birth date</p>
                    <input className="profile-input" placeholder="Username" />
                  </div>
                  <div className="profile-form">
                    <p>Location</p>
                    <input className="profile-input" placeholder="Username" />
                  </div>
                </form>
                <button className="profile-submit-btn">Submit</button>
              </div>
            </section>
          </div>
        </BoxContainer>
      </div>
    </>
  );
};

export default MainSetting;
