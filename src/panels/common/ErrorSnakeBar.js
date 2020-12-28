import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import {Icon16ErrorCircleFill} from "@vkontakte/icons";
import Snackbar from "@vkontakte/vkui/dist/components/Snackbar/Snackbar";
import React from "react";

const ErrorSnakeBar = ({error, setError}) => {

    return (
        <Snackbar
            layout='vertical'
            onClose={() => setError(null)}
            before={<Avatar size={16} style={{backgroundColor: 'var(--accent)'}}><Icon16ErrorCircleFill fill='#fff' width={16} height={16}/></Avatar>}
            duration={10000}>
            {error}
        </Snackbar>
    )

}

export default ErrorSnakeBar;
