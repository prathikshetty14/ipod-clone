import css from "../Assets/CSS/SinglePage.module.css";
import { ArrayList } from "./FullList";


export default function SinglePage(props) {
    const { selectedMenu, selectedOption } = props;
    const page = Object.values(ArrayList)[selectedMenu][selectedOption];

return (<>
        <div className={css.container}>
            <img className={css.image} src={page.icon} alt="" />
            <h2 className={css.heading}>{page.name}</h2>
        </div>
    </>)
}
 