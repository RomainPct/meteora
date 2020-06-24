class API {

    static HOST = 'https://meteora-api.louplemaire.fr'

    fetchOurAPI(endpoint, handler) {
        fetch(`${API.HOST}/${endpoint}`)
            .then(response => response.json())
            .then(json => handler(json))
            .catch(function() {
                console.log('fetch error')
            })
    }

    /**
     * 
     * @param {Number} year 
     * @param {(response) => {}} handler Callback function called when response is returned
     */
    fetchYear(year, handler = (result) => {}) {
        this.fetchOurAPI(`getMeteors.php?year=${encodeURIComponent(year)}`, handler)
    }

    /**
     * 
     * @param {Number} year 
     * @param {(response) => {}} handler Callback function called when response is returned
     */
    fetchAverageMass(year, handler = (result) => {}) {
        this.fetchOurAPI(`getAverageMass.php?year=${encodeURIComponent(year)}`, handler)
    }

    /**
     * 
     * @param {Number} id 
     * @param {(response) => {}} handler Callback function called when response is returned
     */
    fetchMeteor(id, handler = (result) => {}) {
        this.fetchOurAPI(`getDetailedMeteor.php?id=${encodeURIComponent(id)}`, handler)
    }

    /**
     * 
     * @param {Number} year 
     * @param {(response) => {}} handler Callback function called when response is returned
     */
    fetchBiggestMeteor(year, handler = (result) => {}) {
        this.fetchOurAPI(`getBiggestMeteor.php?year=${encodeURIComponent(year)}`, handler)
    }

    /**
     * 
     * @param {(response) => {}} handler Callback function called when response is returned
     */
    fetchAvailableYears(handler = (result) => {}) {
        this.fetchOurAPI(`getAvailableYears.php`, handler)
    }

    /**
     * 
     * @param {Number} year 
     * @param {(response) => {}} handler Callback function called when response is returned
     */
    fetchMedianWeight(year, handler = (result) => {}) {
        this.fetchOurAPI(`getMedianWeight.php?year=${encodeURIComponent(year)}`, handler)
    }

    /**
     * 
     * @param {Number} year 
     * @param {(response) => {}} handler Callback function called when response is returned
     */
    countFallenMeteors(year, handler = (result) => {}) {
        this.fetchOurAPI(`countFallenMeteors.php?year=${encodeURIComponent(year)}`, handler)
    }

    /**
     * 
     * @param {Number} year 
     * @param {(response) => {}} handler Callback function called when response is returned
     */
    fetchSmallestMeteor(year, handler = (result) => {}) {
        this.fetchOurAPI(`getSmallestMeteor.php?year=${encodeURIComponent(year)}`, handler)
    }

}

export default new API()