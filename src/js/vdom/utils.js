export const isEventAttr = (attr) => {
    // 先頭に 'on' がつくか
    return /^on/.test(attr)
}

/**
 * 文字列でなければ仮想DOMオブジェクトと判定
 * @param {*} node
 * @returns
 */
export const isVNode = node => {
    return typeof node !== 'string'
}

export const isTextChild = node => {
    return (
        node &&
        node.children &&
        node.children.length > 0 &&
        typeof node.children[0] === 'string'
    )
}
