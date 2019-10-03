import React from 'react'

const Show = props => (
    <div
        style={
            props.show ? {
                display: 'flex',
            } : {
                display: 'none',
            }
        }
    >
        {props.children}
    </div>
)

export default Show;