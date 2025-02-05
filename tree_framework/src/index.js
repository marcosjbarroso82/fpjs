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

const schema = {
    'type': 'object',
    'properties': {
        'name': {
            'type': 'string',
            'default': 'John Doe'
        },
        'age': {
            'type': 'number',
            'default': 30
        },
        'bestFriend': {
            'type': 'object',
            'properties': {
                'name': {
                    'type': 'string',
                    'default': 'Jane Doe'
                },
                'age': {
                    'type': 'number',
                    'default': 25
                },
                'pet': {
                    'type': 'object',
                    'properties': {
                        'name': {
                            'type': 'string',
                            'default': 'Rex'
                        },
                        'age': {
                            'type': 'number',
                            'default': 3
                        }
                    }
                }
            }
        },
        'worstEnemy': {
            'type': 'object',
            'properties': {
                'name': {
                    'type': 'string',
                    'default': 'John Doe'
                },
                'age': {
                    'type': 'number',
                    'default': 30
                },
                'pet': {
                    'type': 'object',
                    'properties': {
                        'name': {
                            'type': 'string',
                            'default': 'Rex'
                        },
                        'age': {
                            'type': 'number',
                            'default': 3
                        }
                    }
                }   
            }
        }
    }
}

function initData(data, schema) {
    // If schema is not an object or has no properties, return data as is
    if (!schema || schema.type !== 'object' || !schema.properties) {
        return data;
    }

    // Initialize result object
    const result = { ...data };

    // For each property in the schema
    for (const [key, propSchema] of Object.entries(schema.properties)) {
        // If property doesn't exist in data, initialize it
        if (!(key in result)) {
            if (propSchema.type === 'object' && propSchema.properties) {
                // Recursively handle nested objects
                result[key] = initData({}, propSchema);
            } else if ('default' in propSchema) {
                // Use default value if available
                result[key] = propSchema.default;
            }
        } else if (propSchema.type === 'object' && propSchema.properties) {
            // If property exists and is an object, recursively merge
            result[key] = initData(result[key], propSchema);
        }
    }

    return result;
}


function appRunner(node, initialState, msg) {

    let data = initData(initialState['data'] || {}, schema);

    let state = {
        data: data
    };

    // Initial render
    let rootNode = createElement(appRender(node, state, msg));
    node.appendChild(rootNode);


    function dispatch(msg) {
        console.log('dispatch', msg);
    }
    
}


const node = document.getElementById('app');
const initialState = {
    data: {
        'bestFriend': {
            'pet': {
                'name': 'Rex',
                'age': 3
            }
        }
    }
}
const msg = {}

appRunner(node, initialState, msg);