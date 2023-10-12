import React, { Component } from "react";
import { ArrayList } from "./FullList.js";
import IPod from "./IPodMain.js";
import ZingTouch from "zingtouch";
import "../Assets/CSS/App.css";

export default class App extends Component {
  constructor() {
    super();

    // Ref to the wheel element for ZingTouch
    this.wheelRef = React.createRef();
    this.zingtouch = null;
    this.distance = 0;
    this.sensitivity = 25;

    // Array of songs and current song index
    this.songsArray = ArrayList.Songs;
    this.currentSongIndex = 0;

    // Functions to handle button actions
    this.btnFunction = {
      menuOrBack: this.menuOrBack,
      okButtonHandle: this.okButtonHandle,
      playBtn: this.playBtn,
      forwardBtn: this.forwardBtn,
      backwardBtn: this.backwardBtn,
      seekBarChange: this.seekBarChange,
    };

    // Initial state
    this.state = {
      menuQueue: [0], // Used to navigate back to previous menus
      selectedMenu: 0, // Currently selected menu index
      selectedOption: 0, // Currently selected option index in the menu
      menuArray: Object.values(ArrayList)[0], // Current menu array
      singlePage: false, // Flag to determine if it's a single page or menu
      currentSong: new Audio(this.songsArray[0].source), // Current selected song
    };
  }

  componentDidMount() {
    // Initialize ZingTouch region and bind rotation gesture
    const wheel = this.wheelRef.current;
    this.zingtouch = new ZingTouch.Region(wheel);
    this.bindRotationGesture();
  }

  // Function to bind the rotation gesture using ZingTouch
  bindRotationGesture = () => {
    const wheel = this.wheelRef.current;
    const myGesture = new ZingTouch.Rotate();
    const menuArray = Object.values(ArrayList)[this.state.selectedMenu];

    this.zingtouch.bind(wheel, myGesture, (event) => {
      if (!this.state.currentSong.paused) return; // Do not perform rotation gesture when the song is playing

      if (Math.floor(event.detail.distanceFromOrigin) === 0) {
        this.distance = 0; // Reset distance to 0
      }

      if (Math.abs(this.distance - event.detail.distanceFromOrigin) > this.sensitivity) {
        const menuName = Object.keys(ArrayList)[this.state.selectedMenu];
        let newState;
        if (this.distance - event.detail.distanceFromOrigin < 0) {
          newState = (this.state.selectedOption + 1) % menuArray.length;
        } else {
          newState = (this.state.selectedOption - 1 + menuArray.length) % menuArray.length;
        }
        this.setState((prevState) => {
          if (menuName === "Songs") {
            // Select song by gesture only when not playing
            this.currentSongIndex = newState;
            return {
              currentSong: new Audio(this.songsArray[newState].source),
              selectedOption: newState,
            };
          } else {
            // If not the song menu, just change the selectedOption
            return { selectedOption: newState };
          }
        });
        this.distance = event.detail.distanceFromOrigin;
      }
    });
  };

  // Function to navigate to the previous menu or go back
  menuOrBack = () => {
    let newMenuQueue = this.state.menuQueue;

    if (newMenuQueue.length === 1 || !this.state.currentSong.paused) {
      // You are on the top or the song is playing
      console.log(`Sorry, selected Option has no effect, ${
        !this.state.currentSong.paused ? "Song is playing" : "You are on top"
      }`);
      return;
    }

    newMenuQueue.pop();
    const newSelectedMenu = newMenuQueue[newMenuQueue.length - 1];
    this.setState({
      menuQueue: newMenuQueue,
      selectedMenu: newSelectedMenu,
      selectedOption: 0,
      menuArray: Object.values(ArrayList)[newSelectedMenu],
      singlePage: false, // Render menu, not single page
    });
  };

  // Function to handle the OK button
  okButtonHandle = (option) => {
    let newMenuQueue = this.state.menuQueue;
    const length = newMenuQueue.length;

    if (newMenuQueue[length - 1] === newMenuQueue[length - 2]) {
      // You are at the root of the app
      console.log(`Sorry, selected Option has no effect, ${
        !this.state.currentSong.paused ? "Song is playing" : "You are on the root of App"
      }`);
      return;
    }

    const newSelectedMenu = Object.values(ArrayList)[this.state.selectedMenu][option].parentIndex;
    newMenuQueue.push(newSelectedMenu);

    if (newSelectedMenu === this.state.selectedMenu) {
      this.setState({
        singlePage: true,
        menuQueue: newMenuQueue,
        selectedMenu: newSelectedMenu,
        selectedOption: 0,
        menuArray: Object.values(ArrayList)[option],
      });
      return;
    }

    this.setState({
      singlePage: false,
      menuQueue: newMenuQueue,
      selectedMenu: newSelectedMenu,
      selectedOption: 0,
      menuArray: Object.values(ArrayList)[option],
    });
  };

  // Function to play or pause the song
  playBtn = () => {
    if (this.state.currentSong.paused) {
      this.state.currentSong.play();
    } else {
      this.state.currentSong.pause();
    }
  };

  // Function to skip to the next song
  forwardBtn = () => {
    this.state.currentSong.pause();
    this.currentSongIndex = (++this.currentSongIndex % this.songsArray.length);
    const newCurrentSong = new Audio(this.songsArray[this.currentSongIndex].source);
    newCurrentSong.play();
    this.setState({
      currentSong: newCurrentSong,
    });
  };

  // Function to go back to the previous song
  backwardBtn = () => {
    this.state.currentSong.pause();
    this.currentSongIndex = this.currentSongIndex === 0 ? this.songsArray.length - 1 : --this.currentSongIndex;
    const newCurrentSong = new Audio(this.songsArray[this.currentSongIndex].source);
    newCurrentSong.play();
    this.setState({
      currentSong: newCurrentSong,
    });
  };

  render() {
    return (
      <>
        <IPod
          selectedMenu={this.state.selectedMenu}
          selectedOption={this.state.selectedOption}
          singlePage={this.state.singlePage}
          currentSong={this.state.currentSong}
          currentSongIndex={this.currentSongIndex}
          btnFunction={this.btnFunction}
          wheelRef={this.wheelRef}
        />
      </>
    );
  }
}
