import { 
    COUNTER_CTRL_SET_INCREMENT_BY, 
    COUNTER_CTRL_INCREMENT, 
    ANOTHER_COUNTER_CTRL_INCREMENT, 
    ANOTHER_COUNTER_CTRL_SET_INCREMENT_BY, 
    INDEPENDENT_COUNTER_CTRL_SET_INCREMENT_BY, 
    INDEPENDENT_COUNTER_CTRL_INCREMENT,
    APP_OUTPUT_PATH_SEGMENTS_COUNTER,
    APP_OUTPUT_PATH_SEGMENTS_INCREMENT_BY,
    APP_OUTPUT_PATH_SEGMENTS_ANOTHER_INCREMENT_BY,
    APP_OUTPUT_PATH_SEGMENTS_INDEPENDENT_COUNTER,
    APP_OUTPUT_PATH_SEGMENTS_INDEPENDENT_INCREMENT_BY
} from './constantsCounter';

import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import * as R from 'ramda';

const { div, label, br, input, button } = hh(h);

export function renderCounterForm(dispatch, appState) {
    const counter = R.path(APP_OUTPUT_PATH_SEGMENTS_COUNTER, appState);
    const incrementBy = R.path(APP_OUTPUT_PATH_SEGMENTS_INCREMENT_BY, appState);

    return div({}, [
        label({}, 'Counter: '),
        label({}, counter),
        br(),
        label({}, 'Increment By: '),
        label({}, incrementBy),
        input({
            type: 'number',
            value: incrementBy,
            oninput: (e) => dispatch({ type: COUNTER_CTRL_SET_INCREMENT_BY, payload: e.target.value })
        }, 'Increment By: '),
        button({ onclick: () => dispatch({ type: COUNTER_CTRL_INCREMENT }) }, 'Increment'),
    ]);
}

export function renderAnotherCounterForm(dispatch, appState) {
    const counter = R.path(APP_OUTPUT_PATH_SEGMENTS_COUNTER, appState);
    const incrementBy = R.path(APP_OUTPUT_PATH_SEGMENTS_ANOTHER_INCREMENT_BY, appState);

    return div({}, [
        label({}, 'Counter: '),
        label({}, counter),
        br(),
        label({}, 'Increment By: '),
        label({}, incrementBy),
        input({
            type: 'number',
            value: incrementBy,
            oninput: (e) => dispatch({ type: ANOTHER_COUNTER_CTRL_SET_INCREMENT_BY, payload: e.target.value })
        }, 'Increment By: '),
        button({ onclick: () => dispatch({ type: ANOTHER_COUNTER_CTRL_INCREMENT }) }, 'Increment'),
    ]);
}

export function renderIndependentCounterForm(dispatch, appState) {
    const counter = R.path(APP_OUTPUT_PATH_SEGMENTS_INDEPENDENT_COUNTER, appState);
    const incrementBy = R.path(APP_OUTPUT_PATH_SEGMENTS_INDEPENDENT_INCREMENT_BY, appState);

    return div({}, [
        label({}, 'Independent Counter: '),
        label({}, counter),
        br(),
        label({}, 'Increment By: '),
        label({}, incrementBy),
        input({
            type: 'number',
            value: incrementBy,
            oninput: (e) => dispatch({ type: INDEPENDENT_COUNTER_CTRL_SET_INCREMENT_BY, payload: e.target.value })
        }, 'Increment By: '),
        button({ onclick: () => dispatch({ type: INDEPENDENT_COUNTER_CTRL_INCREMENT }) }, 'Increment'),
    ]);
}
