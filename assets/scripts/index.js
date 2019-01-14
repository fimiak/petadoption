/* Primary Javascript file for Asana Pet Adoption service */

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
          li.className = 'grid-item';
          anchor.href = '#'; // Set href to enable anchor click
          img.className = 'grid-image';
          img.src = `.${dog.image}`; // Added the . to point to correct path
          this.append(anchor, img);
          this.append(div, anchor);
          this.append(li, div);
          this.append(this.ul, li); // Builds each mapped grid-item component and appends it to the end of the grid list
          return overlayControls(); // run overlayControls() to then map event listeners over each fetched grid item
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
}
const gridItemList = new gridItemFetch('https://api.myjson.com/bins/d75zc', document.getElementsByClassName('grid')[0]); // JSON is being temporarily hosted via myjson.com to bypass backend
/* Change https://api.myjson.com/bins/d75zc to http://localhost:3000/data and run npm start in /server directory to run localserver */
gridItemList.fetchData(); // Runs fetch on initial page load, would be replaced by something like a componentDidMount in React

/* Overlay Controls & Event listeners */
function overlayControls() {
  /* Declaring variables for each UI item to be manipulated */
  const overlay = document.getElementsByClassName('site-overlay')[0],
    overlayContainer = document.getElementsByClassName('site-overlay__container')[0],
    closeOverlay = document.getElementsByClassName('site-overlay__close')[0];
  let overlayImg = document.getElementsByClassName('site-overlay__image')[0],
    gridItems = [...document.querySelectorAll('.grid-item div a')],
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

/* Grid resize controls */
function gridResize() {
  const grid = document.getElementsByClassName('grid')[0];
  let gridSelectors = document.querySelectorAll('.grid-selector a');
  gridSelectors = [...gridSelectors]; // HTML collection to array
  gridSelectors.map((selector, index) => {
    selector.addEventListener('click', item => {
      index === 0 ? grid.classList.add('small') : grid.classList.remove('small'); // Index 0 indicates the small grid has been clicked
      gridSelectors.forEach(selector => selector.classList.remove('active'));
      selector.classList.add('active');
    }); // Toggles class on grid depending on which grid selector clicked
  });
}
gridResize();
