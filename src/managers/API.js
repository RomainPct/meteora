class API {

    static HOST = 'http://meteora-api.louplemaire.fr'

    fetchYear(year, handler) {
        fetch(`${API.HOST}/getMeteors.php?year=${year}`)
            .then(response => response.text())
            .then( json => {
                return handler(json)
            })
    }

}

export default new API()