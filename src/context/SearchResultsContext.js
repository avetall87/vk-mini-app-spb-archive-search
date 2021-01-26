import React, {useState} from 'react';

const SearchResultsContext = React.createContext([{}, () => {}]);

const SearchResultsProvider = (props) => {
    const [searchResultsState, setSearchResultsState] = useState({
        query: '',
        currentPageNumber: 1,
        personInfoList: [],
        currentPerson: {},
        totalCount: 0,
        listSize: 0
    });

    return (
        <SearchResultsContext.Provider value={[searchResultsState, setSearchResultsState]}>
            {props.children}
        </SearchResultsContext.Provider>
    );
}

export {SearchResultsContext, SearchResultsProvider};