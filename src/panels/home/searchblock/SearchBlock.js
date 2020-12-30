import React from "react";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Search from "@vkontakte/vkui/dist/components/Search/Search";

import './SearchBlock.css';

const SearchBlock = ({isMobileDevice, onLabelChange, handleKeyDown, searchButton, personTotalCount}) => {

    const getSearchField = () => {
        let placeHolder = "ФИО, год рождения";

        if (!isMobileDevice()) {
            placeHolder += ", место работы";
        }

        return <Search
            className="pl-4 pr-3"
            placeholder={placeHolder}
            id="medalSearchId"
            type="text"
            onChange={onLabelChange}
            onKeyDown={handleKeyDown}/>;
    }

    const getSearchTitle = () => {
        if (personTotalCount !== null && personTotalCount !== undefined && personTotalCount !== '0') {
            return <span className="description-search">В базу внесены данные на <span className="semibold">{personTotalCount}</span> из 600 тысяч награжденных медалью <span className="semibold">гражданских лиц</span> </span>;
        } else {
            return <span className="description-search">В базу внесены данные по гражданским лицам</span>;
        }
    }

    return (
        <Div className="shadow d-flex flex-column align-items-center m-0 p-0">
            <Div className="pt-3 pb-2">
                {getSearchTitle()}
            </Div>
            <Div className="w-100 row m-0 pt-0 pl-0 pr-0 pb-3 d-flex justify-content-xl-between">
                <Div className="col-10 m-0 p-0">
                    {getSearchField()}
                </Div>
                <Div className="col-2 m-0 pl-0 pt-0 pb-0 pr-4">
                    <Button className="SearchButton main-search-button mt-1"
                            title="Искать на сайте: Медаль «За оборону Ленинграда»"
                            onClick={searchButton}>
                        Искать
                    </Button>
                </Div>
            </Div>
        </Div>
    )
};

export default SearchBlock;
