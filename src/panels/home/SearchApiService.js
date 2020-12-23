export class SearchApiService {

    constructor() {

    }

    openSearchWindow (searchToken) {
        window.open(`https://special.spbarchives.ru/search?query=${searchToken}&advancedSearch=false&from=vk`);
    }

}
