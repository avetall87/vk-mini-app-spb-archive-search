import React from "react";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Search from "@vkontakte/vkui/dist/components/Search/Search";

import './SearchBlock.css';
import useSearchResults from "../../searchresults/useSearchResults";

const SearchBlock = ({go, isMobileDevice, onLabelChange, handleKeyDown, personTotalCount}) => {

    const {searchQuery} = useSearchResults();

    const getSearchField = () => {
        let placeHolder = "ФИО, год рождения";

        if (!isMobileDevice()) {
            placeHolder += ", место работы";
        }

        return <Search className="pt-sm-0"
            placeholder={placeHolder}
            id="medalSearchId"
            type="text"
            defaultValue={searchQuery}
            onChange={onLabelChange}
            onKeyDown={handleKeyDown}
            data-to="searchResults"/>;
    }

    const getSearchTitle = () => {
        if (personTotalCount !== null && personTotalCount !== undefined && personTotalCount !== '0') {
            return <span className="description-search">В базу внесены данные на <span className="semibold">{personTotalCount}</span> из более 600 тысяч награжденных медалью <span className="semibold">гражданских лиц</span> </span>;
        } else {
            return <span className="description-search">В базу внесены данные по гражданским лицам</span>;
        }
    }

    return (
        <Div className="shadow d-flex flex-column align-items-center m-0 p-0" style={{borderRadius: "4px"}}>
            <Div className="pt-3 pb-2 pt-sm-4 pb-sm-3">
                {getSearchTitle()}
            </Div>
            <Div className="w-100 row m-0 pt-0 pl-0 pr-0 pb-3 pb-sm-4 d-flex justify-content-xl-between">
                <Div className="col-12 col-md-10 m-0 p-0">
                    {getSearchField()}
                </Div>
                <Div className="col-12 col-md-2 m-0 pt-0 pb-0 pl-sm-0">
                    <Button className="SearchButton main-search-button mt-1 mt-sm-0"
                            title="Искать на сайте: Медаль «За оборону Ленинграда»"
                            onClick={go}
                            data-to="searchResults">
                        Искать
                    </Button>
                </Div>
            </Div>
        </Div>
    )
};

export default SearchBlock;
