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
            placeholder={placeHolder}
            id="medalSearchId"
            type="text"
            onChange={onLabelChange}
            onKeyDown={handleKeyDown}/>;
    }

    const getSearchTitle = () => {
        if (personTotalCount !== null && personTotalCount!== undefined && personTotalCount !== '0') {
            return <span>В базу внесены данные на {personTotalCount} гражданских лиц</span>;
        } else {
            return <span>В базу внесены данные по гражданским лицам</span>;
        }
    }

    return (
        <Div>
            <Div>
                {getSearchTitle()}
            </Div>
            {getSearchField()}
            <Div>
                <Button size="l" className="SearchButton"
                        mode="outline"
                        title="Искать на сайте: Медаль «За оборону Ленинграда»"
                        onClick={searchButton}>
                    Найти награжденных
                </Button>
            </Div>
        </Div>
    )
};

export default SearchBlock;
