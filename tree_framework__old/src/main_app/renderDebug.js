import { EXECUTE_NEXT_MSG } from '../framework/constants';

import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

const { div, h1, h2, p, table, tr, td, th, button, input, pre, hr, label, br, ul, li } = hh(h);


export function renderDebug(dispatch, appState) {
    return div({}, [
        h2('Debug'),
        appState.nextMsg && button({ onclick: () => dispatch({ type: EXECUTE_NEXT_MSG }) }, 'Execute Next Msg'),
        h2('Model'),
        pre(JSON.stringify(appState, null, 2)),
        pre(JSON.stringify(appState.nextMsg, null, 2)),
        h2('Message Dispatcher'),
        p('To be implemented'),
        ul(
            [
                li('Crea un acumulador. Este acumulador solo recibe un estado y devuelve un estado con un mensaje. la HOF sabe traducir ese mensaje a un siguiente mensaje en el estado global. Tambien es la que sabe guardar el estado parcial en el esado global. deberia guarda el estado la HOF o deberia enviar un mensaje para que lo haga un modelo? Crear dentro de la vista controladores que permitan enviar mensajes a voluntad para crear una HOF generica y debugear. El acumulador cuando envia el valor que estuvo acumuladondo, tambien lo reinicia. Deberia reiniciarlo la vista, la HOC o el controlador? '),
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
} // Renders

