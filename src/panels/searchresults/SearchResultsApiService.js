import {RemoteAPI} from "../../utils/RemoteAPI";
import _ from "lodash";

class SearchResultsApiService {

    static async getPersonsFromServer (query, pageNumber, size) {
        let searchQueryParameter = (_.isNil(query) || query === '') ? '' : 'query=' + query;

        return await RemoteAPI.get('/api/v1/person/search?' + searchQueryParameter + '&page=' + pageNumber + '&size=' + size);
    }
}

export default SearchResultsApiService;
