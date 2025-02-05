
import {
    update,
    $set,
} from "immhelper";
import { path } from 'ramda';
export const createController = (handler, statePathSegments, { inMapping, outMapping }) => {
    return (appState) => {
        if (!appState.msg || appState.executed) return appState;


        const internalState = path(statePathSegments, appState);
        const statePath = statePathSegments.join('.');

        // Map incoming action to BASE action
        const mappedAction = {
            ...appState.msg,
            type: inMapping[appState.msg.type]
        };

        // Get new state and next msg
        const result = handler(internalState, mappedAction);

        if (!result) return appState;

        // Map outgoing action if it exists
        const nextMsg = result.nextMsg ? {
            ...result.nextMsg,
            type: outMapping[result.nextMsg.type]
        } : null;

        // Update app state
        const updates = {
            executed: [$set, true],
            nextMsg: [$set, nextMsg]
        };

        updates[statePath] = [$set, result.internalStateUpdated];

        return update(appState, updates);
    };
};