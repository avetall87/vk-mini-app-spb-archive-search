import React from "react";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Banner from "@vkontakte/vkui/dist/components/Banner/Banner";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import FixedLayout from "@vkontakte/vkui/dist/components/FixedLayout/FixedLayout";
import PromoBanner from "@vkontakte/vkui/dist/components/PromoBanner/PromoBanner";

const SearchBanner = ({firstName, lastName, personCount, searchButton}) => {

    const declOfNum = (n, text_forms) => {
        n = Math.abs(n) % 100;
        var n1 = n % 10;
        if (n > 10 && n < 20) {
            return text_forms[2];
        }
        if (n1 > 1 && n1 < 5) {
            return text_forms[1];
        }
        if (n1 == 1) {
            return text_forms[0];
        }
        return text_forms[2];
    }

    return (
        <Div>
            <Div>
                <span>{firstName}, в базе награжденных гражданских лиц найдено {personCount} Ваших {declOfNum(personCount, ['однофамильца', 'однофамильца', 'однофамильцев'])}</span>
            </Div>
            <Div>
                <Button size="l"
                        className="SearchButton"
                        title="Посмотреть однофамильцев"
                        onClick={searchButton}>
                    Посмотреть однофамильцев
                </Button>
            </Div>
        </Div>

    )
};

export default SearchBanner;
