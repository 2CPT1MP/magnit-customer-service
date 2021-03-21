import React, {useContext} from 'react';
import AuthContext from "../contexts/auth.context";

const Header = ({title="Без названия", createNew=false, canLogOut=true}) => {
    const {logout} = useContext(AuthContext);

    return (
        <div className={"row mt-5 mb-5 header align-items-center"}>
            <div className={"col my-2"}>
                <a href={"/"}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Magnit_logo.svg/1200px-Magnit_logo.svg.png" alt="" width={"250px"}/>
                </a>
            </div>
            <div className={"col my-2 text-center"}>
                <h1>{title}</h1>
            </div>
            <div className={"col my-2"} style={{display: 'flex', justifyContent: 'flex-end'}}>
                <button className={"btn btn-outline-primary"} onClick={logout} hidden={!canLogOut}>Выйти</button>
            </div>
        </div>
    );
}

export default Header;