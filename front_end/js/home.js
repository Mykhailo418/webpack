'use strict';

import welcome from './welcome';
import Menu from './menu';

// Auth

document.getElementById('login').onclick = function(){
	// dynamical import js files
	require.ensure(['./auth/login'], function(require){
		let login = require('./auth/login');
		login();
	}, 'auth');
};

document.getElementById('logout').onclick = function(){
	require.ensure(['./auth/logout'], function(require){
		let login = require('./auth/logout');
		login();
	}, 'auth');	
};

// Wellcome

welcome('home');

// Menu

let pandaMenu = new Menu({
  title: "Меню панды",
  items: [{
    text: 'Яйца',
    href: '#eggs'
  }, {
    text: 'Мясо',
    href: '#meat'
  }, {
    text: '99% еды - бамбук!',
    href: '#bamboo'
  }]
});

document.body.appendChild(pandaMenu.elem);