/* Primary Javascript file for Pet Adoption service */

/* Create element from params */
function createNode(element) {
  return document.createElement(element);
}

/* Append sub elements to parent */
function append(parent, el) {
  return parent.appendChild(el);
}

/* Fetch data and append li for each JSON item */
const url = 'http://localhost:3000/data';
const ul = document.getElementsByClassName('grid')[0];

function fetchData() {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      let dogsList = data.dogs;
      return dogsList.map(dog => {
        let li = createNode('li');
        li.className = 'grid__item';
        let div = createNode('div');
        let anchor = createNode('a');
        anchor.href = '#';
        let img = createNode('img');
        img.className = 'grid__image';
        img.src = `.${dog.image}`;
        append(anchor, img);
        append(div, anchor);
        append(li, div);
        append(ul, li);
        overlayControls();
      });
    })
    .catch(error => {
      console.error(error);
    });
}

fetchData();

/* Event listeners to open/close overlay */
function overlayControls() {
  const overlay = document.getElementsByClassName('site-overlay')[0];
  const overlayContainer = document.getElementsByClassName('site-overlay__container')[0];
  const closeOverlay = document.getElementsByClassName('site-overlay__close')[0];
  let overlayImg = document.getElementsByClassName('site-overlay__image')[0];
  let gridItems = [...document.querySelectorAll('.grid__item div a')];
  let overlayTitle = document.getElementsByClassName('site-overlay__info-header')[0];

  gridItems.map(el => {
    // Map event listener to grid items
    el.addEventListener('click', () => {
      const randomDescriptionIndex = Math.floor(Math.random() * Object.keys(descriptions.dogs).length);
      overlayImg.src = el.firstChild.src;
      overlayTitle.firstChild.textContent = descriptions.dogs[randomDescriptionIndex].name; // Will put random dog name into the overlay when clicked */
      // TODO: Site overlay button name
      // TODO: Site overlay description
      let containerWidth = overlayImg.width;
      overlayContainer.setAttribute('style', `width: ${containerWidth}`);
      overlay.classList.add('active');
    });
  });

  closeOverlay.addEventListener('click', () => {
    overlay.classList.remove('active');
  });
}

/* Load more data points through additional fetch requests */
const loadBtn = document.getElementsByClassName('grid-load')[0];
loadBtn.addEventListener('click', () => {
  fetchData();
});
