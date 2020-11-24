import React from 'react';
import './Header.css';

export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo.png" alt="Movies logo"></img>
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/1bdc9a33850498.56ba69ac2ba5b.png" alt="user logo" target="blank"></img>
                </a>
            </div>
        </header>
    );
}