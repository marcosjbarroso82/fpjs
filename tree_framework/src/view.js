import { COUNTER_CTRL_INCREMENT, COUNTER_CTRL_SET_INCREMENT_BY, EXECUTE_NEXT_MSG, ANOTHER_COUNTER_CTRL_INCREMENT, ANOTHER_COUNTER_CTRL_SET_INCREMENT_BY } from './constants';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

const { div, h1, h2, p, table, tr, td, th, button, input, pre, hr, label, br } = hh(h);
export function renderDebug(dispatch, appState) {
    return div({}, [
        h2('Debug'),
        h2('Model'),
        pre(JSON.stringify(appState, null, 2)),
        pre(JSON.stringify(appState.nextMsg, null, 2)),
        button({ onclick: () => dispatch({ type: EXECUTE_NEXT_MSG }) }, 'Execute Next Msg'),
        h2('Message Dispatcher'),
        p('To be implemented')
    ]);
}// Renders
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
export function view(dispatch, appState) {
    return div({}, [
        renderCounterForm(dispatch, appState),
        renderAnotherCounterForm(dispatch, appState),

        renderDebug(dispatch, appState),
    ]);
}

