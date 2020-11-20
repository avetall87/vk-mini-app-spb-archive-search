import React from "react";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Search from "@vkontakte/vkui/dist/components/Search/Search";

import './SearchBlock.css';

const SearchBlock = ({isMobileDevice, onLabelChange, handleKeyDown, searchButton}) => {

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

    return (
        <Div>
            <Div>
                <span>В базу внесены данные на 168 923 гражданских лиц</span>
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
