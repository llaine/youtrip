class MapUtil {
  constructor(mapId = 'map') {
    this.mapId = mapId;
    this.map = null;
    this.markers = [];

    // Represent London Center
    this.defaultView = [51.505, -0.09];
    // Pretty zooming layer
    this.defaultZoomLvl = 13;

    this._attachMapToDom();
  }
  /**
   * Fonction qui va afficher la carte dans le HTML
   * @private
   */
  _attachMapToDom() {
    L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';

    this.map = L.map(this.mapId).setView(this.defaultView, this.defaultZoomLvl);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }
  /**
   * Affiche un spinner sur la carte
   * @param state
   */
  loading(state) {
    this.map.spin(state)
  }
  /**
   * Ajout un marker sur la carte en fonction d'une position.
   * @param position
   */
  addMarker(position) {
    L.marker(position).addTo(this.map);
    this.markers.push({ position });
    console.log(this.markers.length);
  }
  /**
   *
   * @param eventName
   * @param callback
   */
  on(eventName, callback) {
    this.map.on(eventName, callback);
  }
}

Template.mapTpl.rendered = function() {
  const map = new MapUtil();

  map.on('click', function(e) {
    map.addMarker(e.latlng);
  });
};