import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
const { div, h1, h2, p, table, tr, td, th, button, input, pre, hr, label, br } = hh(h);

import { ACCUMULATOR_CONTROLLER_SET_INCREMENT_BY, ACCUMULATOR_CONTROLLER_INCREMENT, ACCUMULATOR_CONTROLLER_DUMP } from './constantsAccumulator';


export function renderAccumulatorForm(dispatch, appState) {
    return div({}, [
        hr(),
        label({}, 'Global Accumulator: '),
        label({}, appState.model.output.globalAccumulator),
        br(),
        label({}, 'Accumulator: '),
        label({}, appState.model.output.accumulator),
        button({ onclick: () => dispatch({ type: ACCUMULATOR_CONTROLLER_DUMP }) }, 'Dump'),
        br(),
        label({}, 'Accumulator Increment By: '),

        input({

            type: 'number',
            value: appState.model.output.accumulatorIncrementBy,
            oninput: (e) => dispatch({ type: ACCUMULATOR_CONTROLLER_SET_INCREMENT_BY, payload: e.target.value })
        }),
        button({ onclick: () => dispatch({ type: ACCUMULATOR_CONTROLLER_INCREMENT }) }, 'Increment'),
        hr(),
    ]);
}