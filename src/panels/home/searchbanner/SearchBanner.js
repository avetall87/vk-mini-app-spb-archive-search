import React from "react";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import classNames from 'classnames';
import Link from "@vkontakte/vkui/dist/components/Link/Link";

const SearchBanner = ({isMobileDevice, firstName, personCount, searchUrl}) => {

    const declOfNum = (n, text_forms) => {
        n = Math.abs(n) % 100;
        let n1 = n % 10;
        if (n > 10 && n < 20) {
            return text_forms[2];
        }
        if (n1 > 1 && n1 < 5) {
            return text_forms[1];
        }
        if (n1 === 1) {
            return text_forms[0];
        }
        return text_forms[2];
    }

    return (
        <Div className={classNames("mt-0 pt-0 pl-sm-0", {"pb-40": !isMobileDevice()})}>
            <Div className={classNames("pl-0 mt-0 pt-0", {"pb-20": !isMobileDevice()})}>
                <span>
                    <span className="semibold">{firstName}</span>, в базе награжденных гражданских лиц найдено {personCount} Ваших {declOfNum(personCount, ['однофамильца', 'однофамильца', 'однофамильцев'])}.
                </span>
            </Div>
            <Div className="pl-0 pt-sm-0 pb-sm-0">
                <Link href={searchUrl} target="_blank">
                    <Button size="l"
                            className="SearchButton"
                            mode="outline"
                            title="Посмотреть однофамильцев">
                        Посмотреть однофамильцев
                    </Button>
                </Link>

            </Div>
        </Div>

    )
};

export default SearchBanner;
