import './style.css';

import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';

const { div, h1, h2, p, table, tr, td, th, button, input, pre, hr, label, br, ul, li } = hh(h);

function appRender(node, dispatch, state, msg) {
    return div({}, [
        h1({}, "App"),
        div({}, [
            h2({}, "Actions"),
            button({
                'onclick': () => dispatch({
                    'type': 'incrementAgeByOne',
                    'path': [],
                    'payload': {}
                })
            }, "Increment Age by One"),


            button({
                'onclick': () => dispatch({
                    'type': 'incrementAgeByOne',
                    'path': ['bestFriend'],
                    'payload': {}
                })

            }, "Increment Best Friend Age by One"),

            button({
                'onclick': () => dispatch({
                    'type': 'incrementAgeByOne',
                    'path': ['bestFriend', 'pet'],
                    'payload': {}
                })

            }, "Increment Best Friend Pet Age by One"),


        ]),


        hr(),
        div({}, [
            h2({}, "Msg"),
            pre({}, JSON.stringify(msg, null, 2)),
            h2({}, "State"),
            pre({}, JSON.stringify(state, null, 2)),
        ])
    ]); 
}


const schema = {
    'type': 'object',
    'actions': {
        'incrementAgeByOne': (self, payload = {}) => {
            self.state.age += 1;
        },
        'decrementAgeByOne': (self, payload = {}) => {
            self.state.age -= 1;
        },
    },
    'properties': {
        'name': {
            'type': 'string',
            'default': 'Marcos'
        },
        'age': {
            'type': 'number',
            'default': 42
        },
        'bestFriend': {
            'type': 'object',
            'actions': {
        'incrementAgeByOne': (self, payload = {}) => {
            self.state.age += 1;
        },
        'decrementAgeByOne': (self, payload = {}) => {
            self.state.age -= 1;
        },
    },
            'properties': {
                'name': {
                    'type': 'string',
                    'default': 'Matias'
                },
                'age': {
                    'type': 'number',
                    'default': 30
                },
                'pet': {
                    'type': 'object',
                    'actions': {
        'incrementAgeByOne': (self, payload = {}) => {
            self.state.age += 1;
        },
        'decrementAgeByOne': (self, payload = {}) => {
            self.state.age -= 1;
        },
    },
                    
                    'properties': {
                        'name': {
                            'type': 'string',
                            'default': 'Firulais'
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
            'actions': {
        'incrementAgeByOne': (self, payload = {}) => {
            self.state.age += 1;
        },
        'decrementAgeByOne': (self, payload = {}) => {
            self.state.age -= 1;
        },
    },
            'properties': {
                'name': {
                    'type': 'string',
                    'default': 'Sebastian'
                },
                'age': {
                    'type': 'number',
                    'default': 50
                },
                'pet': {
                    'type': 'object',
                    'actions': {
        'incrementAgeByOne': (self, payload = {}) => {
            self.state.age += 1;
        },
        'decrementAgeByOne': (self, payload = {}) => {
            self.state.age -= 1;
        },
    },
                    'properties': {
                        'name': {
                            'type': 'string',
                            'default': 'Neron'
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
    let currentView = appRender(node, dispatch, state, msg);
    let rootNode = createElement(currentView);
    node.appendChild(rootNode);

    function dispatch(msg) {
        console.log('dispatch', msg);
        
        // Get the action and context based on the path
        let currentSchema = schema;
        let currentState = state.data;
        let parentStates = [];
        
        // Traverse the path to find the correct schema and build up parent state references
        for (const pathSegment of msg.path) {
            if (currentSchema.properties && currentSchema.properties[pathSegment]) {
                currentSchema = currentSchema.properties[pathSegment];
                parentStates.push(currentState);
                currentState = currentState[pathSegment];
            }
        }

        // Execute the action if it exists in the current schema
        if (currentSchema.actions && currentSchema.actions[msg.type]) {
            currentSchema.actions[msg.type]({ state: currentState }, msg.payload);
        }

        state.msg = msg;

        const updatedView = appRender(node, dispatch, state, msg);
        const patches = diff(currentView, updatedView);
        rootNode = patch(rootNode, patches);
        currentView = updatedView;
    }
}


const node = document.getElementById('app');

const initialState = {
    data: {
        'bestFriend': {
            'pet': {
                'name': 'Firulais',
                'age': 3
            }

        }
    }
}
const msg = {}

appRunner(node, initialState, msg);