const fullBlur = 10;
const unblurStep = 7;

// Returns true if it is a DOM element
// credit https://stackoverflow.com/a/384380
function isElement(o){
  return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
    o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
);
}

function mediaClicked() {
    blur = getElementBlur(this.style["filter"]);
    if (blur == 0) {
        this.style["filter"] = `blur(${fullBlur}px)`;
    } else if (blur - unblurStep >= 0) {
        this.style["filter"] = `blur(${blur - unblurStep}px)`;
    } else {
        this.style["filter"] = `blur(${0}px)`;
    }
}

function getElementBlur(filter) {
    // regex to find the blur amount in px from the css filter argument
    const regexBlur = /.*blur\((\d+)px\).*/;
    const match = filter.match(regexBlur);
    if (match) {
        return parseInt(match[1]);
    } else {
        return 0;
    }
    
}

function checkMutations(mutations) {
    for (mutation of mutations) {
        for (node of mutation.addedNodes) {
            if (isElement(node) == true) {
                // images
                let images = node.getElementsByTagName("img");
                for (elt of images) {
                    elt.style["filter"] = `blur(${fullBlur}px)`;
                    elt.onclick = mediaClicked;
                }

                // divs
                let videos = document.getElementsByTagName("video");
                for (elt of videos) {
                    elt.style["filter"] = `blur(${fullBlur}px)`;
                    elt.onclick = mediaClicked;
                }

                // divs with a background image in css
                let divs = document.getElementsByTagName("div");
                for (elt of divs) {
                    if (elt.style.backgroundImage) {
                        elt.style["filter"] = `blur(${fullBlur}px)`;
                        elt.onclick = mediaClicked;
                    }
                }
            }
        }
    }
}

var observer = new MutationObserver(checkMutations);

observer.observe(document, {attributes: false, childList: true, characterData: false, subtree:true});