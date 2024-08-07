import {createTask, loadData} from './task';
import './style.css';

window.onload = loadData;
document.querySelector('#addTask').onclick = createTask;

console.log("Executed till the end");