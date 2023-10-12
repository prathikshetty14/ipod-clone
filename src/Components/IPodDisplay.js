import React, { Component } from "react";
import Menu from "./Menu";
import Song from "./Song";
import SinglePage from "./Singlepage";
import { ArrayList } from "./FullList";
import WiFi from "../Assets/Images/wifi.png"
import BatteryPercent from "../Assets/Images/full-battery.png"
import CSS from "../Assets/CSS/IPodDisplay.module.css";

export default class IPodDisplay extends Component {
  constructor() {
    super();
    this.state = {
      time: this.getCurrentTimeIn12HrFormat(),
    };
  }

  componentDidMount() {
    // Update the time every second
    setInterval(() => this.setState({ time: this.getCurrentTimeIn12HrFormat() }), 1000);
  }

  // Function to get the current time in 12-hour format with AM and PM
  getCurrentTimeIn12HrFormat() {
    const currentTime = new Date();
    let hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12 || 12;

    // Format minutes and seconds to have leading zeros
    const formattedMinutes = this.formatTimeSegment(minutes);
    const formattedSeconds = this.formatTimeSegment(currentTime.getSeconds());

    return `${hours}:${formattedMinutes}:${formattedSeconds} ${amPm}`;
  }

  // Helper function to format time segments with leading zeros
  formatTimeSegment(segment) {
    return segment < 10 ? `0${segment}` : segment;
  }

  render() {
    const { currentSong, singlePage, selectedMenu } = this.props;
    const menuName = Object.keys(ArrayList)[selectedMenu];
    const isSongMenu = menuName === "Songs" && singlePage;

    return (
      <>
        <div className={CSS.displaySide}>
          <div className={CSS.navBar}>
            <div className={CSS.left}>
                iPod
            </div>
            <div className={CSS.center}>
                <h3>{this.state.time}</h3>
            </div>
            <div className={CSS.right}>
              <img
                src={WiFi}
                alt="Wifi-pic"
              />
              <div>
                <img
                  src={BatteryPercent}
                  alt="full-battery"
                />
              </div>
            </div>
          </div>

          {!currentSong.paused || isSongMenu ? (
            <Song {...this.props} />
          ) : !singlePage ? (
            <Menu {...this.props} />
          ) : (
            <SinglePage {...this.props} />
          )}
        </div>
      </>
    );
  }
}
