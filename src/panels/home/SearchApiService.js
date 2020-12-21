class SearchApiService {

    constructor() {

    }

    openSearchWindow (searchToken) {
        window.open(`https://medal.spbarchives.ru/search?query=${searchToken}&advancedSearch=false&from=vk`);
    }

}
