import classNames from 'classnames';
import React from 'react';
import {DeviceService} from '../../utils/DeviceService';

export default ({title}) => {
    return (
        <span className={classNames(
            {
                'HomeHeader-mobile': DeviceService.isMobileDevice(),
            })}>
        {title}
      </span>
    );
};
