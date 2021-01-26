import { useContext } from 'react';
import {SearchResultsContext} from "../../context/SearchResultsContext";
import _ from "lodash";

const useSearchResults = () => {
    const [searchResultsState, setSearchResultsState] = useContext(SearchResultsContext);

    function setSearchQuery(searchQuery) {
        setSearchResultsState(state => ({ ...state, query: searchQuery }));
    }

    function setTotalCount(count) {
        if(_.isNil(count) || (count < 0)) {
            setSearchResultsState(state => ({ ...state, totalCount: 0 }));
        } else {
            setSearchResultsState(state => ({ ...state, totalCount: count }));
        }
    }

    function addPersonIndexFieldToNextChunk(personListChunk) {
        let lastPersonIndex = _.get(searchResultsState, 'personInfoList[personInfoList.length-1].personIndex', 0);

        console.log("lastPersonIndex");
        console.log(lastPersonIndex);

        if (!_.isNil(lastPersonIndex)) {
            personListChunk.forEach((element, i) => {
                element.personIndex = lastPersonIndex + i/* + 1*/;
            })
        }
    }

    function initListInfo(data) {
        if (!_.isNil(data)) {
            let chunk = data.content;
            let list = [];
            addPersonIndexFieldToNextChunk(chunk);

            console.log("new chunk");
            console.log(chunk);

            list.push(chunk);

            setSearchResultsState(state => ({ ...state, personInfoList: list, listSize: chunk.length}));

            setTotalCount(data.total);
        }
    }

    function getPersonInfoList() {
        console.log(555);
        console.log(searchResultsState.personInfoList);
        let a = _.flatten(searchResultsState.personInfoList);
        console.log(a);
        console.log(777);
        return a;
    }

    return {
        setSearchQuery,
        initListInfo,
        getPersonInfoList,
        searchQuery: searchResultsState.query,
        currentPageNumber: searchResultsState.currentPageNumber,
        listSize: searchResultsState.listSize
    }
};

export default useSearchResults;