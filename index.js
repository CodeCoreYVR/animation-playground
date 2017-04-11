/* node query helpers */
function Q (query) { return document.querySelector(query) }
function Qs (query) { return document.querySelectorAll(query) }

Element.prototype.q = function (query) {
  return this.querySelector(query)
}

Element.prototype.qs = function (query) {
  return this.querySelectorAll(query)
}

/* text manipulation helper */
function initials (str) { return str.split(/\W+/).map(v => v[0]).join('') }

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
      })
    })
  })

  Q('form').addEventListener('submit', function (event) {
    event.preventDefault();
  })

  Q('#play').addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();
    // put code to make play button functional here
  })

  Q('#play').addEventListener('click', function (event) {
    event.preventDefault();
    /* in the css file, there's animation that is triggered when
    a node is given the class `skew`. we use javascript to add this
    class to a node we want to animate */
    Q('#a0c3').classList.toggle('skew');
    Q('#a0c4').classList.toggle('border-dance');
  })

  Q('#pause').addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();
    // put code to make pause button functional here
  })
})
