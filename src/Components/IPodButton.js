import React from "react";
import CSS from "../Assets/CSS/IPodButton.module.css";
import PlayPauseImage from '../Assets/Images/pause.png'
import ForwardImage from '../Assets/Images/forward-button.png'
import BackwardImage from '../Assets/Images/backward-button.png'

export default function IPodButton(props) {
  const { wheelRef, btnFunction, selectedOption } = props;

  return (
    <>
      <div className={CSS.buttonSide}>
        <div className={CSS.buttonOuter} ref={wheelRef}>
          {/* Menu Button */}
          <button
            className={`${CSS.button} ${CSS.menuButton}`}
            onTouchEnd={() => btnFunction.menuOrBack()}
            onClick={() => btnFunction.menuOrBack()}
          >
            MENU
          </button>
          
          {/* Backward Button */}
          <button
            className={`${CSS.button} ${CSS.back}`}
            onTouchEnd={() => btnFunction.backwardBtn()}
            onClick={() => btnFunction.backwardBtn()}
          >
            <img src={BackwardImage} alt="Backward" />
          </button>

          {/* Forward Button */}
          <button
            className={`${CSS.button} ${CSS.forward}`}
            onTouchEnd={() => btnFunction.forwardBtn()}
            onClick={() => btnFunction.forwardBtn()}
          >
            <img src={ForwardImage} alt="Forward" />
          </button>

          {/* Play/Pause Button */}
          <button
            className={`${CSS.button} ${CSS.playPause}`}
            onTouchEnd={() => btnFunction.playBtn()}
            onClick={() => btnFunction.playBtn()}
          >
            <img src={PlayPauseImage} alt="Play/Pause" />
          </button>
        </div>
        
        {/* Center Button */}
        <div
          className={CSS.buttonInner}
          onTouchEnd={() => btnFunction.okButtonHandle(selectedOption)}
          onClick={() => btnFunction.okButtonHandle(selectedOption)}
        >
          {/* You can add content or icon for the center button */}
        </div>
      </div>
    </>
  );
}
