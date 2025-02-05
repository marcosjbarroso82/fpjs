import './style.css';

import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';

const { div, h1, h2, p, table, tr, td, th, button, input, pre, hr, label, br, ul, li } = hh(h);

function appRender(node, initialState, msg) {
    return div({}, [
        h1({}, "App"),
        hr(),
        div({}, [
            h2({}, "Msg"),
            pre({}, JSON.stringify(msg, null, 2)),
            h2({}, "State"),
            pre({}, JSON.stringify(initialState, null, 2)),
        ])
    ]); 
}

const dataSchema = {
    "type": "object",
    "properties": {
        "counter1": {
            "type": "object",
            "properties": {
                "count": {"type": "number"}
            },
            "actions": {
                "increment": {
                    "type": "function",
                    "callable": (payload, self) => self.count + payload.incrementBy


                },
                "init": {
                    "type": "value",
                    "value": {
                        "count": 0
                    }

                }
            }
        },


        "counter2": {
            "type": "object",

            "properties": {
                "count": {"type": "number"},
                "incrementBy": {"type": "number"}
            },
            "actions": {
                "increment": {
                    "type": "function",
                    "callable": (payload, self) => self.count + payload.incrementBy
                },

                "init": {
                    "type": "value",
                    "value": {
                        "count": 33
                    }
                }
            }
        }
    }

}

function initFromSchema(schema) {
    if (schema.actions && schema.actions.init) {
        return schema.actions.init.value;
    }
    
    if (schema.type === "object" && schema.properties) {
        const result = {};
        for (const [key, value] of Object.entries(schema.properties)) {
            result[key] = initFromSchema(value);
        }
        return result;
    }
    
    // Default values for primitive types
    switch (schema.type) {
        case "number": return 0;
        case "string": return "";
        case "boolean": return false;
        default: return null;
    }
}

function dataUpdate(initialDataState, msg) {
    switch (msg.type) {
        case 'INIT':
            return initFromSchema(dataSchema);
        case 'INCREMENT':
            const { counter, incrementBy } = msg.payload;
            const action = dataSchema.actions[counter].increment;
            const callable = action.callable;
            const args = action.args;
            const result = callable(...args);
            return result;
        default:
            return initialDataState;

    }
}

const controllerSchema = {
    'counter1Ctrl': {
        'ctrlType': 'counter',
        'dataPath': ['counter1'],
        'props': {
            'value': {
                'dataPath': ['count']
            },
            'incrementBy': {
                'defaultValue': 2
            }
        }
    },
    'counter2Ctrl': {
        'ctrlType': 'counter',
        'dataPath': ['counter2'],
        'props': {
            'value': {
                'dataPath': ['count']
            },
            'incrementBy': {
                'defaultValue': 3
            }

        }
    }
}



// controllersDataUpdate
function controllersDataUpdate(data, ctrlData, msg) {
    const result = {};
    
    for (const [ctrlId, ctrlSchema] of Object.entries(controllerSchema)) {
        result[ctrlId] = {};
        
        // Process each prop defined in the controller schema
        for (const [propName, propConfig] of Object.entries(ctrlSchema.props)) {
            if (propConfig.dataPath) {
                // If dataPath is defined, get value from data object
                let value = data;
                for (const pathPart of [...ctrlSchema.dataPath, ...propConfig.dataPath]) {
                    value = value[pathPart];
                }
                result[ctrlId][propName] = value;
            } else if ('defaultValue' in propConfig) {
                // If defaultValue is defined, use it
                result[ctrlId][propName] = propConfig.defaultValue;
            }
        }
    }
    
    return result;
}



function appRunner(node, initialState, msg) {


    let data = dataUpdate(initialState['data'], msg);
    let ctrlData = controllersDataUpdate(data, initialState['ctrlData'], msg);



    let state = {
        data: data,
        ctrlData: ctrlData
    };


    // Initial render
    let rootNode = createElement(appRender(node, state, msg));
    node.appendChild(rootNode);


    function dispatch(msg) {
        console.log('dispatch', msg);
    }
    
}


const node = document.getElementById('app');
const initialState = {}
const msg = {
    type: 'INIT'
}

appRunner(node, initialState, msg);