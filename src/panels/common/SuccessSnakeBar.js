import Snackbar from "@vkontakte/vkui/dist/components/Snackbar/Snackbar";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import {Icon16Done} from "@vkontakte/icons";
import React from "react";

const SuccessSnakeBar = ({success, setSuccess}) => {

    return (
        <Snackbar
            layout='vertical'
            onClose={() => setSuccess(null)}
            before={<Avatar size={16} style={{backgroundColor: 'var(--accent)'}}><Icon16Done fill='#fff' width={16} height={16}/></Avatar>}
            duration={10000}>
            {success}
        </Snackbar>
    )

}

export default SuccessSnakeBar;
