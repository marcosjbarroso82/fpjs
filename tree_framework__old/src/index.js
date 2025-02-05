import './style.css';
import { h } from 'virtual-dom';
import { mainAppView } from './main_app/render';
import { appState } from './main_app/appState';
import { MAIN_PIPE } from './main_app/pipes';
import { appRunner } from './framework/appRunner';

// App


const node = document.getElementById('app');


appRunner(node, MAIN_PIPE, mainAppView, appState);