import { COUNTER_CTRL_SET_INCREMENT_BY, COUNTER_CTRL_INCREMENT, ANOTHER_COUNTER_CTRL_INCREMENT, ANOTHER_COUNTER_CTRL_SET_INCREMENT_BY } from './constantsCounter';

import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
const { div, h1, h2, p, table, tr, td, th, button, input, pre, hr, label, br } = hh(h);

export function renderCounterForm(dispatch, appState) {
    return div({}, [
        label({}, 'Counter: '),
        label({}, appState.model.output.counter),
        br(),
        label({}, 'Increment By: '),
        label({}, appState.model.output.incrementBy),
        input({
            type: 'number',
            value: appState.model.output.incrementBy,
            oninput: (e) => dispatch({ type: COUNTER_CTRL_SET_INCREMENT_BY, payload: e.target.value })
        }, 'Increment By: '),
        button({ onclick: () => dispatch({ type: COUNTER_CTRL_INCREMENT }) }, 'Increment'),
    ]);
}

export function renderAnotherCounterForm(dispatch, appState) {
    return div({}, [
        label({}, 'Counter: '),
        label({}, appState.model.output.counter),
        br(),
        label({}, 'Increment By: '),
        label({}, appState.model.output.anotherIncrementBy),
        input({
            type: 'number',
            value: appState.model.output.anotherIncrementBy,
            oninput: (e) => dispatch({ type: ANOTHER_COUNTER_CTRL_SET_INCREMENT_BY, payload: e.target.value })
        }, 'Increment By: '),
        button({ onclick: () => dispatch({ type: ANOTHER_COUNTER_CTRL_INCREMENT }) }, 'Increment'),
    ]);
}

