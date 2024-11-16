import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logos} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos repellendus dolores voluptate atque voluptates dolore corrupti harum sunt dicta at.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                </div>

            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>

            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-212-476-9876</li>
                    <li>contact@delivery.com</li>
                </ul>

            </div>

        </div>
        <hr />
        <p className='footer-copyright'>
            Copyright 2024 @ Delivery.com - All Right Reserved.
        </p>

    </div>
  )
}

export default Footer