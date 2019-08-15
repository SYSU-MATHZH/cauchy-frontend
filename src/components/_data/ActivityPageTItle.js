import React from 'react';

import useGlobal from '../../store';

const ActivityPageTitle = () => {
    const [globalState, globalActions] = useGlobal();
    const { user } = globalState;
    return (
        <text>
            { user.username } 的活动
        </text>
    );
}

export default ActivityPageTitle;