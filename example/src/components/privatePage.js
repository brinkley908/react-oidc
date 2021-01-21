import React from 'react';


export const PrivatePage = (props) => {

    return (
        <div id="profile-partial-service">
            <div>Private page</div>
            <div>{props.accessToken}</div>
        </div>
    );
};