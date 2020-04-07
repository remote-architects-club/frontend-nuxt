<template>
  <div id="map"></div>
</template>

<script>
export default {
  name: 'CompanyMap',
  props: {
    companiesMachine: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      map: null,
      maxZoom: 5.5
    }
  },
  computed: {
    state() {
      return this.companiesMachine.current
    },
    context() {
      return this.companiesMachine.context
    },
    companies() {
      return this.context.companies
    },
    allOfficesCities() {
      return this.context.allOfficesCities
    }
  },
  // watch: {
  //   allOfficesCities(newVal) {
  //     if (newVal && newVal.length > 0) {
  //       //load map markers!
  //       this.loadMarkers(newVal)
  //     }
  //   }
  // },
  mounted() {
    this.createMap()
  },
  methods: {
    loadMarkers(companies) {
      const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')
      console.log('loadMarkers')
      const cities = companies.map((c) => {
        if (c.cityByCityId) return c.cityByCityId
      })
      console.log(cities)

      for (const city of cities) {
        const lngLat = { lng: city.lng, lat: city.lat }
        new mapboxgl.Marker().setLngLat(lngLat).addTo(this.map)
      }
    },
    loadSource(companies) {
      const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')
      const features = companies.map((c) => {
        return {
          type: 'Feature',
          properties: {
            name: c.name,
            id: c.id,
            city: c.cityByCityId.name,
            country_iso: c.cityByCityId.country_iso
          },
          geometry: {
            type: 'Point',
            coordinates: [c.cityByCityId.lng, c.cityByCityId.lat]
          }
        }
      })
      const data = {
        type: 'FeatureCollection',
        features
      }
      this.map.addSource('contributions', {
        type: 'geojson',
        data,
        cluster: true,
        clusterMaxZoom: 5, // Max zoom to cluster points on
        clusterRadius: 50
      })
      this.map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'contributions',
        filter: ['has', 'point_count'],
        paint: {
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#ECC94B',
            100,
            '#ECC94B',
            750,
            '#ECC94B'
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40
          ],
          'circle-stroke-width': 1,
          'circle-stroke-color': '#000'
        }
      })
      this.map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'contributions',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['Inter Bold'],
          'text-size': 12
        },
        paint: {
          'text-color': '#000'
        }
      })

      this.map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'contributions',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#ECC94B',
          'circle-radius': 4,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#000'
        }
      })
      // inspect a cluster on click
      // zoom in if max zoom still not accessed,
      // or show office list otherwise
      this.map.on('click', 'clusters', (e) => {
        let features = this.map.queryRenderedFeatures(e.point, {
          layers: ['clusters']
        })
        let zoom = this.map.getZoom()

        let clusterId = features[0].properties.cluster_id
        if (zoom === this.maxZoom) {
          // display features
          console.log(features)
          const point_count = features[0].properties.point_count
          const clusterSource = this.map.getSource(
            /* cluster layer data source id */ 'contributions'
          )

          // Get Next level cluster Children
          //

          clusterSource.getClusterChildren(clusterId, (err, aFeatures) => {
            console.log('getClusterChildren', err, aFeatures)

            // Get all points under a cluster
            clusterSource.getClusterLeaves(
              clusterId,
              point_count,
              0,
              (err, aFeatures) => {
                console.log('getClusterLeaves', err, aFeatures)
                const { city, country_iso } = aFeatures[0].properties
                let html = `<p class="mb-2 font-bold ">${city}, ${country_iso}</p>`

                for (const feat of aFeatures) {
                  console.log(feat)
                  const { name, id } = feat.properties
                  html += `<p><a href="/company?id=${id}" class="link">${name}</a> <span class="text-sm font-bold">&rarr;</span></p>`
                }
                new mapboxgl.Popup({
                  closeButton: false,
                  offset: 10
                })
                  .setLngLat(features[0].geometry.coordinates)
                  .setHTML(html)
                  .addTo(this.map)
              }
            )
          })

          // console.log(points)
        }
        this.map
          .getSource('contributions')
          .getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return

            this.map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom
            })
          })
      })

      this.map.on('click', 'unclustered-point', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice()
        const { id, name, city, country_iso } = e.features[0].properties

        // Ensure that if the this.map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }
        // TODO: add remote or not
        const html = `
          <p class="font-bold">${city}, ${country_iso}</p>
          <p><a href="/company?id=${id}" class="link">${name}</a> <span class="text-sm font-bold">&rarr;</span></p>
        `
        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(html)
          .addTo(this.map)
      })

      this.map.on('mouseenter', 'clusters', () => {
        this.map.getCanvas().style.cursor = 'pointer'
      })
      this.map.on('mouseleave', 'clusters', () => {
        this.map.getCanvas().style.cursor = ''
      })
    },

    createMap() {
      const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')
      // const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder')
      //TODO: move to env
      mapboxgl.accessToken = process.env.MAPBOX_API_ACCESS_TOKEN
      // init the map
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/danroc/ck8px6kcy0mdy1inv72eg0ydp',
        center: [0, 34.566667],
        zoom: 1,
        pitch: 0,
        minZoom: 1,
        maxZoom: 5.5,
        attributionControl: false
      })
      this.map.on('load', () => {
        if (this.allOfficesCities && this.allOfficesCities.length > 0) {
          // this.loadMarkers(this.allOfficesCities)
          this.loadSource(this.allOfficesCities)
        }
      })
    }
  }
}
</script>

<style lang="scss">
#map {
  @apply w-full shadow-lg;
  height: 500px;
}
.mapboxgl-popup-content {
  @apply border-t-2 border-black rounded-none;
}
</style>
