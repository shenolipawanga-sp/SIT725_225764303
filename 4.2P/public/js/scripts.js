let carsData = [];

const openCarModal = (car) => {
  $('#modalTitle').text(car.title);
  $('#modalImage').attr('src', car.image);
  $('#modalDescription').text(car.description);
};

const addCards = (items) => {
  items.forEach(item => {
    let itemToAppend = '<div class="col s4 center-align">' +
      '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + item.imageUrl + '">' +
      '</div><div class="card-content">' +
      '<span class="card-title activator grey-text text-darken-4">' + item.make + ' ' + item.model + '<i class="material-icons right">more_vert</i></span><p>$' + item.price.toLocaleString() + '</p></div>' +
      '<div class="card-reveal">' +
      '<span class="card-title grey-text text-darken-4">' + item.make + ' ' + item.model + '<i class="material-icons right">close</i></span>' +
      '<p class="card-text">' + item.description + ' (' + item.year + ', ' + item.fuelType + ')</p>' +
      '</div></div></div>';
    $("#card-section").append(itemToAppend);
  });
};

const loadCars = () => {
  fetch('/api/cars')
    .then(response => response.json())
    .then(result => addCards(result.data)) 
    .catch(error => console.error('Error fetching cars:', error));
};

$(document).ready(function () {
  $('.materialboxed').materialbox();
  loadCars();
});

$(document).ready(function () {
  $('.materialboxed').materialbox();
  $('.modal').modal();
  loadCars();
});