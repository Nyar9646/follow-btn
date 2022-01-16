import { isEventAttr } from './utils'

const setAttrs = (target, attrs) => {
    for (const attr in attrs) {
        if (isEventAttr(attr)) {
            /*
            arg1 : 'on~' の属性名の内、'~' 部分での名前でイベントを登録。
            arg2 : イベント時に処理される内容
            */
            target.addEventListener(attr.slice(2), attrs[attr])
        } else {
            /* タグの属性をセット */
            target.setAttribute(attr, attrs[attr])
        }
    }
}

function renderElement({ tagName, attrs, children }) {
    const el = document.createElement(tagName);

    // for (const [k, v] of Object.entries(attrs)) {
    //     el.setAttribute(k, v);
    // }
    setAttrs(el, attrs)

    for (const child in children) {
        el.appendChild(render(children[child]))
    }

    return el;
}

export function render(vNode) {
    if (typeof vNode === "string") {
        return document.createTextNode(vNode);
    }

    return renderElement(vNode);
}