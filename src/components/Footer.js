import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className='footer-container'>
        <ul className="authors">
        <li className="author-item">
        <div style={{marginBottom:"15px"}}> Kimberly Modeste</div>
         <div class='social-media-wrap'> 
                <a
                rel="noreferrer"
                class='social-icon-link'
                href='https://github.com/KimberlyModeste'
                target='_blank'
                > <i class="github icon"></i>
                </a>
                <a
                rel="noreferrer"
                class='social-icon-link'
                href='www.linkedin.com/in/kimberly-modeste1'
                target='_blank'
                > <i class="linkedin icon"></i>
                </a>
            </div>
        </li> 
      <li className="author-item">
          <div style={{marginBottom:"15px"}}>  Abdelrahman Elsayed</div>
        <div class='social-media-wrap'> 
            <a
            rel="noreferrer"
            class='social-icon-link'
            href='https://github.com/abdel-elsayed'
            target='_blank'
            > <i class="github icon"></i>
            </a>
            <a
            rel="noreferrer"
            class='social-icon-link'
            href='https://www.linkedin.com/in/abdelrahman-elsayed-318539145/'
            target='_blank'
            > <i class="linkedin icon"></i>
            </a>
        </div>
      </li> 
      </ul>
      <small className='website-rights'>Enviromania © 2021</small>
    </div>
  );
}

export default Footer;
