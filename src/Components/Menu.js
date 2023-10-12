import React from "react";
import { ArrayList } from "./FullList.js"
import CSS from "../Assets/CSS/Menu.module.css"

export default function Menu(props) {

    const { selectedMenu, selectedOption } = props;
    const arrayMenu = Object.values(ArrayList)[selectedMenu];

    console.log("selectedMenu Menu:", selectedMenu);
    console.log("arrayMenu:", arrayMenu);
    
    return (<>
        <div className={CSS.body}>
            <div className={CSS.heading}>
                <h1>{Object.keys(ArrayList)[selectedMenu]}</h1>
            </div>
            <div className={CSS.options}>
                {arrayMenu.map((option, index) => (
                    <div key={index}
                        className={`${CSS.item} ${index === selectedOption ? CSS.selectedOption : ''}`}>
                        <div className={CSS.optionName}>
                             <h4>{option.name}</h4>
                        </div>
                        <div className={CSS.optionIcon}>
                            <img src={option.icon} alt="" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>)
}
