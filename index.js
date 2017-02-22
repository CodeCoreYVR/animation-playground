/* node query helpers */
function Q (query) { return document.querySelector(query) }
function Qs (query) { return document.querySelectorAll(query) }

/* monkey patch Element prototype to easily search children nodes */
/* generally regarded as bad practice 😱 */
Element.prototype.q = function (query) { return this.querySelector(query) }
Element.prototype.qs = function (query) { return this.querySelectorAll(query) }

/* text manipulation helper */
function initials (str) { return str.split(/\W+/).map(v => v[0]).join('') }

function clearAnimateClass (event) {
  const {currentTarget} = event;
  currentTarget.classList.remove('animate');
  currentTarget.removeEventListener('animationend', clearAnimateClass);
}

document.addEventListener('DOMContentLoaded', function () {
  /* programmaticaly generates uniquer ids for call card imgs */
  Qs('.holder').forEach(function (holder) {
    holder.qs('.cards').forEach(function (cards, cardsIndex) {
      cards.qs('.card').forEach(function (card, i) {
        const imgNode = card.q('img');
        const h1Node = card.q('h1');

        const doggoId = `${initials(holder.id)}${cardsIndex}c${i}`;
        imgNode.id = doggoId;
        h1Node.innerHTML = `#${doggoId}`;

        // because the ids are assigned programmaticaly after the document is loaded
        // if we try to search for the id #a0c5, it might not exists yet
        // we'll define the event listener on it when the node is assigned the id
        if (doggoId === 'a0c5') {
            imgNode.addEventListener('animationiteration', function (event) {
              console.log('Animation Iterated!')
              Q('.fuchsia.light').classList.toggle('on');
            })
        }
      })
    })
  })

  Q('form').addEventListener('submit', function (event) {
    event.preventDefault();
  })

  Q('#play').addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();

    const nodeId = Q('#node-id').value;
    const toPlayNode = Q(`${nodeId}`);

    if (toPlayNode) {
      toPlayNode.classList.toggle('animate');

      // in case button is pressed quickly, just always clear the listener
      // before adding it
      toPlayNode.removeEventListener('animationend', clearAnimateClass);

      // node need to clear the animate class after the animation is finished
      // if it doesn't exists in the first place
      if (toPlayNode.classList.contains('animate')) {
        toPlayNode.addEventListener('animationend', clearAnimateClass)
      }
    }
  })

  Q('#pause').addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();
    // put code to make pause button functional here
  })
})













/* */
