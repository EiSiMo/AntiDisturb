// Returns true if it is a DOM element
// credit https://stackoverflow.com/a/384380
function isElement(o){
  return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
    o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
);
}

function checkMutations(mutations) {
    for (mutation of mutations) {
        for (node of mutation.addedNodes) {
            if (isElement(node) == true) {
                let images = node.getElementsByTagName("img");
                for (elt of images) {
                    elt.style["filter"] = "blur(8px)";
                }
            }
        }
    }
}

var observer = new MutationObserver(checkMutations);

observer.observe(document, {attributes: false, childList: true, characterData: false, subtree:true});
