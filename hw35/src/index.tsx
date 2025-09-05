import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.scss';
// import bike from './image/bmw_s1000rr.jpeg';
// import HTMLImageElement from './image/bmw_s1000rr.jpeg';
// import document from './image/bmw_s1000rr.jpeg'
// 
// 
// 
// let img: HTMLImageElement = document.createElement('img');
// img.src = bike;
// document.body.appendChild(img);
// 
// console.log('im entry point12');

const container = document.getElementById('root');
createRoot(container!).render(<App />);
