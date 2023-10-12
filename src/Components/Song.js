import React, { Component } from "react";
import { ArrayList } from "./FullList";
import CSS from "../Assets/CSS/Song.module.css";

export default class Song extends Component {
  constructor() {
    super();

    this.state = {
      seekBarValue: 0,
      currentTimeToBeDisplay: "0:00",
    };
    this.musicDuration = "-:--";
    this.intervalId = null;
  }

  componentDidMount() {
    this.updateSongState(this.props.currentSong);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentSongIndex !== this.props.currentSongIndex) {
      const { currentSong } = this.props;
      this.updateSongState(currentSong);
    }
  }

  // Update the song state and handle the time intervals
  updateSongState = (currentSong) => {
    const { btnFunction, currentSongIndex } = this.props;

    // Format the music duration and set the initial state
    this.musicDuration = this.formatTime(ArrayList.Songs[currentSongIndex].duration);

    this.setState({
      seekBarValue: currentSong.currentTime,
      currentTimeToBeDisplay: this.formatTime(currentSong.currentTime),
    });

    // Clear the previous interval, if any
    this.intervalId && clearInterval(this.intervalId);

    // Set up a new interval to update the seek bar and time display
    this.intervalId = setInterval(() => {
      if (Math.round(currentSong.currentTime) >= Math.round(currentSong.duration)) {
        clearInterval(this.intervalId);
        btnFunction.forwardBtn(); // Move to the next song
        return;
      }
      this.setState({
        seekBarValue: currentSong.currentTime,
        currentTimeToBeDisplay: this.formatTime(currentSong.currentTime),
      });
    }, 1000);
  };

  // Format time in minutes and seconds
  formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
      min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if (sec < 10) {
      sec = `0${sec}`;
    }
    return `${min}:${sec}`;
  };

  // Handle seek bar change
  seekBarChange = (value) => {
    const { currentSong } = this.props;
    currentSong.currentTime = value;
    this.updateSongState(currentSong);
  };

  render() {
    const { currentSongIndex } = this.props;
    const song = ArrayList.Songs[currentSongIndex];

    return (
      <>
        <div className={CSS.musicPlayer}>
          <div className={CSS.backgroundImage} style={{ backgroundImage: `url(${song.icon})` }}></div>
          <div className={CSS.songDetails}>
            <div className={CSS.songImage}>
              <img src={song.icon} alt="" />
            </div>
            <div className={CSS.songName}>
              <h3>{song.name}</h3>
            </div>
          </div>
          <div className={CSS.seekBarAndTime}>
            <div className={CSS.seekBarBox}>
              <input
                type="range"
                max={song.duration}
                value={this.state.seekBarValue}
                onChange={(event) => this.seekBarChange(event.target.value)}
                className={CSS.seekBar}
              />
            </div>
            <div className={CSS.seekTime}>
              <div className={CSS.currentTime}>
                {this.state.currentTimeToBeDisplay}
              </div>
              <div className={CSS.totalTime}>{this.musicDuration}</div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
