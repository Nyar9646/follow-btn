import { render } from "./render";
import { isEventAttr, isTextChild, isVNode } from "./utils";

/* 仮想DOM object 形式 */
const exObj = {
    'tagName': 'p',
    'attrs': {
        'class': 'hoge',
    },
    'children': [
        '仮想DOMの学習スタート'
    ]
}

/**
 * old と new でどの部分に差があるか
 * @param {*} oldNode
 * @param {*} newNode
 * @returns
 */
const hasChanged = (oldNode, newNode) => {
    if (typeof oldNode !== typeof newNode) {
        return 'TYPE'
    }

    if (isTextChild(oldNode) && isTextChild(newNode)) {
        if (oldNode.children[0] !== newNode.children[0]) {
            return 'TEXT'
        }
    }

    if (isVNode(oldNode) && isVNode(newNode)) {
        if (oldNode.tagName !== newNode.tagName) {
            return 'NODE'
        }

        if (JSON.stringify(oldNode.attrs) !== JSON.stringify(newNode.attrs)) {
            return 'ATTR'
        }
    }

    return 'NONE'
}

const updateAttrs = (target, oldAttrs, newAttrs) => {
    for (const attr in oldAttrs) {
        if(!isEventAttr(attr)) {
            target.removeAttribute(attr)
        }
    }

    for (const attr in newAttrs) {
        if (!isEventAttr(attr)) {
            target.setAttribute(attr, newAttrs[attr])
        }
    }
}

/**
 *
 * @param {基本となる要素} parent
 * @param {新しい仮想DOMのオブジェクト} newNode
 * @param {以前の仮想DOMのオブジェクト} oldNode
 * @param {配列であるchildrenの何番めか} index
 * @returns
 */
export const patch = (parent, newNode, oldNode, index = 0) => {
    // 初回描画時
    if (!oldNode) {
        parent.appendChild(render(newNode))
    }

    const childNode = parent.childNodes[index]

    // nowNode object がない ⇨ 削除されている ⇨⇨ remove
    if (!newNode) {
        parent.removeChild(childNode)
    }

    // old と new でどの部分に差があるか
    const type = hasChanged(oldNode, newNode)

    switch (type) {
        case 'TYPE':
        case 'TEXT':
        case 'NODE':
            parent.replaceChild(render(newNode), childNode)
            return
        case 'ATTR':
            updateAttrs(childNode, oldNode.attrs, newNode.attrs)
            return
    }

    // 再起処理へ
    if (newNode.tagName) {
        const newLength = newNode.children.length
        const oldLength = oldNode.children.length

        for (let i = 0; i < newLength || i < oldLength; i++) {
            patch(childNode, newNode.children[i], oldNode.children[i], i)
        }
    }
}
