export default class Helper {
    public static picsum = "https://picsum.photos/list";
    public static GoogleGeocodeApi(api, place) {
        return `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(place)}&key=${api}`;
    };
    public static apiPath3 = "https://api.darksky.net/forecast/{0}/";
    public static apiPath4 = "https://darksky.net/images/weather-icons/.png";
}