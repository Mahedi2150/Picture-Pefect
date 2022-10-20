import React from 'react';
import './footer.css'
const Footer = () => {
    return (
        <div className='footer'>
            <p><small><i>&copy; Picture Perfect {(new Date().getFullYear())}</i></small></p>
        </div>
    );
};

export default Footer;