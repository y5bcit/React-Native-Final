export default class Helper {
    public static picsum = "https://picsum.photos/list";
    public static async GoogleGeocodeApi(api, place) {
        let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(place)}&key=${api}`)
            .then((response) => response.json());
        response = response["results"];
        return response;
    };
    public static apiPath3 = "https://api.darksky.net/forecast/{0}/";
    public static apiPath4 = "https://darksky.net/images/weather-icons/.png";
}