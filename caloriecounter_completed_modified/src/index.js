import { h, diff, patch } from 'virtual-dom'
import createElement from 'virtual-dom/create-element'
import { initCoreModel, initPresentationModel } from './Model'
import { view } from './View'
import { updatePresentationModel } from './Update'
import { app } from './App'

const node = document.getElementById('app');

app(initCoreModel, initPresentationModel, updatePresentationModel, view, node);