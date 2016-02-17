class MapFactory {
  constructor(mapId = 'map') {
    Session.set('markerPosition', null);
    this.mapId = mapId;
    this.map = null;
    this.marker = null;

    // Represent London Center
    this.defaultView = [51.505, -0.09];
    // Pretty zooming layer
    this.defaultZoomLvl = 5;

    this._attachMapToDom();
  }
  /**
   * Fonction qui va afficher la carte dans le HTML
   * @private
   */
  _attachMapToDom() {
    L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';

    this.map = L.map(this.mapId).setView(this.defaultView, this.defaultZoomLvl);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map)
  }
  /**
   * Ajout un marker sur la carte en fonction d'une position.
   * @param position
   */
  addMarker(position) {
    // On supprime le marker de toute façon
    if(this.marker) {
      this.map.removeLayer(this.marker);
    }

    const marker = L.marker(position).addTo(this.map);
    const map = this.map;

    $.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat},${position.lng}&sensor=false`)
    .then(function(res) {
      Session.set('markerPosition', res);
    });
    //Session.set('markerPosition', )
    marker.on('click', function() {
      map.removeLayer(this);
    });

    this.marker = marker;
  }
  /**
   * Permet de gérer les évenements sur la map.
   * @param eventName
   * @param callback
   */
  on(eventName, callback) {
    this.map.on(eventName, callback);
  }
}

Template.mapTpl.rendered = function() {
  const map = new MapFactory();

  map.on('click', function(e) {
    map.addMarker(e.latlng);
  });
};