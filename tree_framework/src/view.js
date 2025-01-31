import { EXECUTE_NEXT_MSG } from './constants';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { renderAnotherCounterForm, renderCounterForm, renderIndependentCounterForm } from './counter/renderCounter';

const { div, h1, h2, p, table, tr, td, th, button, input, pre, hr, label, br, ul, li } = hh(h);


// TODO: Mode renderDebug to its own file.
export function renderDebug(dispatch, appState) {
    return div({}, [
        h2('Debug'),
        h2('Model'),
        pre(JSON.stringify(appState, null, 2)),
        pre(JSON.stringify(appState.nextMsg, null, 2)),
        button({ onclick: () => dispatch({ type: EXECUTE_NEXT_MSG }) }, 'Execute Next Msg'),
        h2('Message Dispatcher'),
        p('To be implemented'),
        ul(
            [
                li('Independent Counter'),
                li('Profile'),
                li('Duplicated Profile'),
                li('Independent Profile'),
                li('Toggle Automatic Execution'),
                li('Pause/Play'),
                li('Send Message'),
                li('Rewind / Forward'),
                li('Send Message from outside the app'),
                li('Implement Time from outside the app'),
                li('Implement Validation of Inputs and Outputs with JSON Schema or other'),
                li('Display TODOs and Documentation from a Markdown file'),
            ]
        )
    ]);
}// Renders
export function view(dispatch, appState) {
    return div({}, [
        renderCounterForm(dispatch, appState),
        renderAnotherCounterForm(dispatch, appState),
        renderIndependentCounterForm(dispatch, appState),

        renderDebug(dispatch, appState),
    ]);
}

