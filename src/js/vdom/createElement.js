/* 教材：2. 仮想DOM */
export default (tagName, { attrs = {}, children = [] } ) => {
    const vElement = Object.create(null)

    Object.assign(vElement, {
        tagName,
        attrs,
        children,
    })

    return vElement
}
