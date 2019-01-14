/* Primary Javascript file for Pet Adoption service */

class gridItemFetch {
  /* url is pointed to local server, which must be running. In console try npm start for local server */
  constructor(url, ul) {
    this.url = url;
    this.ul = ul;
  }

  /* Create element from params */
  createNode(element) {
    return document.createElement(element);
  }

  /* Append sub elements to parent */
  append(parent, el) {
    return parent.appendChild(el);
  }

  fetchData() {
    fetch(this.url)
      .then(response => response.json())
      .then(data => {
        let dogsList = data.dogs;
        dogsList.map(dog => {
          let div = this.createNode('div'),
            li = this.createNode('li'),
            anchor = this.createNode('a'),
            img = this.createNode('img');
          li.className = 'grid__item';
          anchor.href = '#'; // Set href to enable anchor click
          img.className = 'grid__image';
          img.src = `.${dog.image}`; // Added the . to point to correct path
          this.append(anchor, img);
          this.append(div, anchor);
          this.append(li, div);
          this.append(this.ul, li); // Builds each mapped grid__item component and appends it to the end of the grid list
          return overlayControls(); // run overlayControls() to then map event listeners over each fetched grid item
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
}
const gridItemList = new gridItemFetch('http://localhost:3000/data', document.getElementsByClassName('grid')[0]); // Declare gridItemList
gridItemList.fetchData(); // Runs fetch on initial page load, would be replaced by something like a componentDidMount in React

/* Overlay Controls & Event listeners */
function overlayControls() {
  /* Declaring variables for each UI item to be manipulated */
  const overlay = document.getElementsByClassName('site-overlay')[0],
    overlayContainer = document.getElementsByClassName('site-overlay__container')[0],
    closeOverlay = document.getElementsByClassName('site-overlay__close')[0];
  let overlayImg = document.getElementsByClassName('site-overlay__image')[0],
    gridItems = [...document.querySelectorAll('.grid__item div a')],
    overlayTitle = document.getElementsByClassName('site-overlay__info-header')[0],
    overlayDescription = document.getElementsByClassName('site-overlay__info-description')[0],
    overlayBtn = document.getElementsByClassName('site-overlay__button')[0];

  gridItems.map(el => {
    // Map event listeners to each fetched grid items
    el.addEventListener('click', () => {
      const dataIndex = Math.floor(Math.random() * Object.keys(descriptions.dogs).length),
        name = descriptions.dogs[dataIndex].name,
        description = descriptions.dogs[dataIndex].description;
      let containerWidth = overlayImg.width;

      overlayImg.src = el.firstChild.src;
      overlayTitle.firstChild.textContent = name; // Will put random dog name into the overlay when clicked
      overlayDescription.firstChild.textContent = description; // Will use the description of each dog accordingly
      overlayBtn.textContent = `Apply to adopt ${name}`;
      overlayContainer.setAttribute('style', `width: ${containerWidth}`); // Sets overlay to be the width of the image, implemented to make sure text wraps to the appropriate width
      overlay.classList.add('active'); // Display overlay
    });
  });

  closeOverlay.addEventListener('click', () => {
    // remove active class, closing overlay
    overlay.classList.remove('active');
  });
}

/* Load more data points through additional fetch requests */
const loadBtn = document.getElementsByClassName('grid-load')[0];
loadBtn.addEventListener('click', () => {
  gridItemList.fetchData();
});
