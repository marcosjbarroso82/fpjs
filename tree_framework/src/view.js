import { EXECUTE_NEXT_MSG } from './constants';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { renderAnotherCounterForm, renderCounterForm } from './counter/renderCounter';

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
export function view(dispatch, appState) {
    return div({}, [
        renderCounterForm(dispatch, appState),
        renderAnotherCounterForm(dispatch, appState),

        renderDebug(dispatch, appState),
    ]);
}

