import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { renderAnotherCounterForm, renderCounterForm, renderIndependentCounterForm } from './counter/renderCounter';
import { renderAccumulatorForm } from './accumulator/renderAccumulator';
import { renderDebug } from './renderDebug';

const { div, h1, h2, p, table, tr, td, th, button, input, pre, hr, label, br, ul, li } = hh(h);


export function mainAppView(dispatch, appState) {
    return div({}, [
        renderAccumulatorForm(dispatch, appState),
        renderCounterForm(dispatch, appState),
        renderAnotherCounterForm(dispatch, appState),
        renderIndependentCounterForm(dispatch, appState),

        renderDebug(dispatch, appState),
    ]);
}

