import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import validator from 'validator';
import Calendar from './Calendar';

  var styles = {
    bmBurgerButton: {
      position: 'rigth',
      width: '36px',
      height: '30px',
      left: '36px',
      top: '36px'
    },
    bmBurgerBars: {
      background: '#373a47'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenu: {
      background: '#373a47',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }

//  var Menu = require('react-burger-menu').push;
//   var createReactClass = require('create-react-class');
 
//   var BM = createReactClass({
//     showSettings: function(event) {
//       event.preventDefault();
//     },
//     render: function() {
//       return (
//         <Menu styles={ styles } position='right' >
//           <a id="home" className="menu-item" href="/">Home</a>
//           <a id="about" className="menu-item" href="/">About</a>
//           <a id="contact" className="menu-item" href="/">Contact</a>
//           <a className="menu-item--small" href="/">Settings</a>
//         </Menu>
//       );
//     }
//   });

// export default BM;