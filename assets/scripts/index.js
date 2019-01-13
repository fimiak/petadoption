console.log('loaded');

/* Create element from params */
function createNode(element) {
  return document.createElement(element);
}

/* Append sub elements to parent */
function append(parent, el) {
  return parent.appendChild(el);
}

fetch('http://localhost:3000/data', { mode: 'no-cors' }).then(response => {
  const dogs = response.json();
  console.log(dogs);
  return dogs.map(dog => {
    let li = createNode('li'),
      img = createNode('img');
    img.src = dog.image;
    append(li, img);
    append(ul, li);
  });
});

/* add event listener on click to open overlay */

let gridItems = [...document.querySelectorAll('.grid__item div a')];
gridItems.map(el => {
  el.addEventListener('click', () => {
    document.getElementsByClassName('site-overlay')[0].classList.add('active');
  });
});

document.getElementsByClassName('site-overlay__close')[0].addEventListener('click', () => {
  document.getElementsByClassName('site-overlay')[0].classList.remove('active');
  console.log(document.getElementsByClassName('site-overlay')[0].classList);
});
