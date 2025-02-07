import './style.css';

import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import Ajv from 'ajv';
import * as R from 'ramda';

const { div, h1, h2, p, table, tr, td, th, button, input, pre, hr, label, br, ul, li } = hh(h);

function appRender(dispatch, state, msg) {
    return div({}, [
        h1({}, "App"),
        div({}, [
            h2({}, "Actions"),
            button({
                'onclick': () => dispatch({
                    'type': 'addItemToShoppingCart',
                    'path': ['shoppingCart'],
                    'payload': {
                        'name': 'Laptop',
                        'price': 1000,
                        'quantity': 1
                    }
                })

            }, "Add Laptop to Shopping Cart"),
            button({
                'onclick': () => dispatch({
                    'type': 'addItemToShoppingCart',
                    'path': ['shoppingCart'],
                    'payload': {
                        'name': 'Laptop',
                        'price': 500,
                        'quantity': 1
                    }
                })
            }, "Add Laptop to Shopping Cart Reduce Price"),
            button({
                'onclick': () => dispatch({
                    'type': 'addItemToShoppingCart',
                    'path': ['shoppingCart'],
                    'payload': {
                        'name': 'Mouse',
                        'price': 50,
                        'quantity': 2
                    }
                })
            }, "Add Two Mouse to Shopping Cart"),

            button({
                'onclick': () => dispatch({
                    'type': 'incrementExistingItemQuantity',
                    'path': ['shoppingCart'],
                    'payload': {
                        'name': 'Mouse',    
                        'quantity': 1
                    }
                })
            }, "Increment Mouse Quantity"),


            hr(),



            button({
                'onclick': () => dispatch({
                    'type': 'incrementAgeByOne',

                    'path': ['profile'],
                    'payload': {}
                })
            }, "Increment Age by One"),


            button({
                'onclick': () => dispatch({
                    'type': 'incrementAgeByOne',
                    'path': ['profile', 'bestFriend'],
                    'payload': {}
                })

            }, "Increment Best Friend Age by One"),

            button({
                'onclick': () => dispatch({
                    'type': 'incrementAgeByOne',
                    'path': ['profile', 'bestFriend', 'pet'],
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

// Configure Ajv to accept custom keywords
const ajv = new Ajv({
    useDefaults: true,
    coerceTypes: true,
    allowUnionTypes: true
});

// Define custom keyword for actions
ajv.addKeyword({
    keyword: '$actions',
    schemaType: 'object',
    validate: () => true, // Always valid since this is just for storing actions
    metaSchema: {
        type: 'object'
    }
});

// Helper function to validate state against schema
const validateState = (schema, state) => {
    const validate = ajv.compile(schema);
    const isValid = validate(state);
    
    if (!isValid) {
        console.error('Validation errors:', validate.errors);
        return false;
    }
    return true;
};

// Modified action functions to be pure and return new state
const incrementAgeByOne = (state, payload = {}) => ({
    ...state,
    age: state.age + 1
});

const decrementAgeByOne = (state, payload = {}) => ({
    ...state,
    age: state.age - 1
});

const addItemToShoppingCart = (state, payload = {}) => {
    const existingItemIndex = state.items.findIndex(item => item.name === payload.name);
    const newState = R.clone(state);
    
    if (existingItemIndex >= 0) {
        const existingItem = newState.items[existingItemIndex];
        const newTotal = newState.total - (existingItem.price * existingItem.quantity) + 
                        (payload.price * (existingItem.quantity + payload.quantity));
        
        // Validate total before proceeding
        if (!validateState(schema.properties.shoppingCart, {
            ...newState,
            total: newTotal,
        })) {
            return state; // Return unchanged state if validation fails
        }
        
        newState.total = newTotal;
        newState.items[existingItemIndex] = {
            ...existingItem,
            quantity: existingItem.quantity + payload.quantity,
            price: payload.price
        };
    } else {
        const newTotal = newState.total + (payload.price * payload.quantity);
        
        // Validate total before proceeding
        if (!validateState(schema.properties.shoppingCart, {
            ...newState,
            total: newTotal,
            items: [...newState.items, payload]
        })) {
            return state; // Return unchanged state if validation fails
        }
        
        newState.items.push(payload);
        newState.total = newTotal;
    }
    
    return newState;
};

const incrementExistingItemQuantity = (state, payload = {}) => {
    const existingItemIndex = state.items.findIndex(item => item.name === payload.name);
    if (existingItemIndex >= 0) {
        const newState = R.clone(state);
        const item = newState.items[existingItemIndex];
        const newTotal = newState.total + (item.price * payload.quantity);
        
        // Validate before proceeding
        if (!validateState(schema.properties.shoppingCart, {
            ...newState,
            total: newTotal
        })) {
            return state; // Return unchanged state if validation fails
        }
        
        item.quantity += payload.quantity;
        newState.total = newTotal;
        return newState;
    }
    return state;
};



const schema = {
    'type': 'object',
    'properties': {
        'shoppingCart': {
            'type': 'object',
            '$actions': {
                'addItemToShoppingCart': addItemToShoppingCart,
                'incrementExistingItemQuantity': incrementExistingItemQuantity,
            },
            'properties': {
                'total': {
                    'type': 'number',
                    'default': 0,
                    'maximum': 3000,
                    'minimum': 0
                },

                'items': {
                    'type': 'array',
                    'default': [],
                    'items': {

                        'type': 'object',
                        'properties': {
                            'name': {
                                'type': 'string',
                            },
                            'price': {
                                'type': 'number',
                            },
                            'quantity': {
                                'type': 'number',
                            }
                        }
                    }
                }
            }
        },
        'profile': {
            'type': 'object',
            '$actions': {
                'incrementAgeByOne': incrementAgeByOne,
                'decrementAgeByOne': decrementAgeByOne,
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
                    '$actions': {
                        'incrementAgeByOne': incrementAgeByOne,
                        'decrementAgeByOne': decrementAgeByOne,
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
                            '$actions': {
                                'incrementAgeByOne': incrementAgeByOne,
                                'decrementAgeByOne': decrementAgeByOne,
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
                    '$actions': {
                        'incrementAgeByOne': incrementAgeByOne,
                        'decrementAgeByOne': decrementAgeByOne,
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
                            '$actions': {
                                'incrementAgeByOne': incrementAgeByOne,
                                'decrementAgeByOne': decrementAgeByOne,
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
    let currentView = appRender(dispatch, state, msg);
    let rootNode = createElement(currentView);
    node.appendChild(rootNode);

    function dispatch(msg) {
        console.log('dispatch', msg);
        
        const stateLens = R.lensPath(['data', ...msg.path]);
        const currentState = R.view(stateLens, state);
        const currentSchema = msg.path.reduce(
            (schema, path) => schema.properties[path],
            schema
        );
        
        if (currentSchema.$actions && currentSchema.$actions[msg.type]) {
            const action = currentSchema.$actions[msg.type];
            const newState = action(currentState, msg.payload);
            
            // Only update if validation passes
            if (validateState(currentSchema, newState)) {
                state = R.set(stateLens, newState, state);
                
                const updatedView = appRender(dispatch, state, msg);
                const patches = diff(currentView, updatedView);
                rootNode = patch(rootNode, patches);
                currentView = updatedView;
            } else {
                console.error('State update failed validation');
            }
        }
    }
}


const node = document.getElementById('app');

const initialState = {
    data: {
        'shoppingCart': {
        },
        'profile': {
            'bestFriend': {
                'pet': {
                    'name': 'Firulais',
                    'age': 3
                }
            }
        }
    }
}
const msg = {}

appRunner(node, initialState, msg);