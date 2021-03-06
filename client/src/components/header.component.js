import React from 'react';

const Header = ({title}) => {
    return (
        <div className={"row mt-5 mb-5"}>
            <div className={"col-sm-4 my-2"}>
                <a href={"/"}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Magnit_logo.svg/1200px-Magnit_logo.svg.png" alt="" width={"250px"}/>
                </a>
            </div>
            <div className={"col-lg text-center my-2"}>
                <h1>{title}</h1>
            </div>
            <div className={"col-sm-1"}>
                <h1></h1>
            </div>
        </div>
    );
}

export default Header;