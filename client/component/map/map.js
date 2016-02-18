CurrentMap = {};

class MapFactory {
  /**
   * Constructor de l'objet crée la map sur une div
   * @param mapId
   */
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
  addMarkerWithLoc(position) {
    // On supprime le marker de toute façon, puisqu'il ne peut en y avoir qu'un seul sur la map
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    const marker = L.marker(position).addTo(this.map);
    const map = this.map;

    // Geocoding reverse
    $.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat},${position.lng}&sensor=false`)
    .then(function(res) {
      if(res.results) {
        Session.set('markerPosition', {
          position: position,
          address: res.results[0].formatted_address
        });
      }
    });

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

  addSimpleMarker(position) {
    L.marker(position).addTo(this.map);
  }
}

Template.mapTpl.rendered = function() {
  const map = new MapFactory();
  const markersTabs = Session.get('markersForFeed') || [];

  if(markersTabs) {
    map.on('click', function(e) {
      map.addMarkerWithLoc(e.latlng);
    });
  }

  markersTabs.map((position) => map.addSimpleMarker(position));
};