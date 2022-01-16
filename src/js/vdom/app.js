// import { render } from "./render";
import { patch } from "./patch";

export const app = ({ root, initialState, view, actions }) => {
    const el = document.querySelector(root)

    // let newNode = view(initialState)
    let newNode, oldNode

    console.log('initialState', initialState)
    let state = initialState;

    const dispatcher = function (actions) {
        const dispatchedActions = {};

        for (const key in actions) {
            const action = actions[key];

            dispatchedActions[key] = option => {
                setState(action(state, option));
                renderDOM();
            };
        }

        return dispatchedActions;
    };

    const setState = function (newState) {
        if (state !== newState) {
            state = newState;
        }
    };

    const updateNode = () => {
        console.log(state)
        newNode = view(state, dispatcher(actions))
    }

    const renderDOM = () => {
        updateNode()

        // el.appendChild(render(newNode))
        patch(el, newNode, oldNode)
        oldNode = newNode
    }

    renderDOM()
}
