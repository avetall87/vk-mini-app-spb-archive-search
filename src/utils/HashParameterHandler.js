export class HashParameterHandler {
    static getLocationHash() {
        return window.location.hash.replace('#/','');
    }

    static getParametersFromHash(string) {
        let search = string
        return search === "" ? null : search.split("&").reduce((prev, curr) => {
            const [key, value] = curr.split("=");
            prev[decodeURIComponent(key)] = decodeURIComponent(value);
            return prev;
        }, {})
    }
}
