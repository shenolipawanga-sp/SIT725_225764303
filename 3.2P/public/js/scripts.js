let carsData = [];

const openCarModal = (car) => {
  $('#modalTitle').text(car.title);
  $('#modalImage').attr('src', car.image);
  $('#modalDescription').text(car.description);
};

const addCards = (items) => {
  carsData = items;

  items.forEach((item, index) => {
    let itemToAppend = '<div class="col s4 center-align">' +
      '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + item.image + '">' +
      '</div><div class="card-content">' +
      '<span class="card-title activator grey-text text-darken-4">' + item.title + '<i class="material-icons right">more_vert</i></span>' +
      '<p><a href="#carModal" class="modal-trigger view-details-' + index + '">' + item.link + '</a></p></div>' +
      '<div class="card-reveal">' +
      '<span class="card-title grey-text text-darken-4">' + item.title + '<i class="material-icons right">close</i></span>' +
      '<p class="card-text">' + item.description + '</p>' +
      '</div></div></div>';
    $("#card-section").append(itemToAppend);
    $('.view-details-' + index).click(() => {
      openCarModal(item);
    });
  });
};

const loadCars = () => {
  fetch('/api/cars')
    .then(response => response.json())
    .then(data => addCards(data))
    .catch(error => console.error('Error fetching cars:', error));
};

$(document).ready(function () {
  $('.materialboxed').materialbox();
  $('.modal').modal();
  loadCars();
});