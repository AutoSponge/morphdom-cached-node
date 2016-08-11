var CachedNodeProto = Object.create(HTMLElement.prototype);
Object.defineProperty(CachedNodeProto, 'node', {
  enumerable: false,
  configurable: false,
  writable: true,
  value: null
});
CachedNodeProto.saveNode = function(el) {
  this.node = el
};
CachedNodeProto.getSavedNode = function() {
  return this.node
};
CachedNodeProto.isSameNode = function(el) {
  return this.node.isSameNode(el)
};
var CachedNode = document.registerElement('x-ref', {prototype: CachedNodeProto});
var saved
function child () {
  if (!saved) {
    saved = bel`<x-ref />`
    saved.saveNode(bel`<h1 onload=${() => console.log('child on')} onunload=${() => console.log('child off')}>child</h1>`)
    return saved.getSavedNode()
  }
  return saved
}

function parent () {
  return bel`<div>${child()}</div>`
}

var root = parent()
document.body.appendChild(root)
setTimeout(() => {
  console.log('updating')
root = morphdom(root, parent())
}, 1000)