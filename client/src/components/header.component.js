import React from 'react';

const Header = ({title="Без названия", createNew=false}) => {
    return (
        <div className={"row mt-5 mb-5 header align-items-center"}>
            <div className={"col-sm-3 my-2"}>
                <a href={"/"}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Magnit_logo.svg/1200px-Magnit_logo.svg.png" alt="" width={"250px"}/>
                </a>
            </div>
            <div className={"col my-2 text-center"}>
                <h1>{title}</h1>
            </div>
        </div>
    );
}

export default Header;