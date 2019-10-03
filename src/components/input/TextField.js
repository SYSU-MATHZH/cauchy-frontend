import React, {useState} from 'react'
import InputBase from '@material-ui/core/InputBase';

const TextField = ({defaultValue, inputProps, onTextChange, onChange, value, ...other}) => {

    const [isOnComposition, setIsOnComposition] = useState(false)

    const isChrome = !!window.chrome && !!window.chrome.webstore

    const handleCompostion = e => {
        // console.log(e.type, isChrome)
        if (e.type === 'compositionend') {
            setIsOnComposition(false)
            if (true) {
                handleTextChange(e)
            }
        } else {
            setIsOnComposition(true)
        }
    }

    const handleTextChange = e => {
        if (onTextChange) {
            onTextChange(e)
        }
    }

    const handleChange = e => {

        console.log("Ping")

        if (onChange) {
            onChange(e)
        }

        if (!isOnComposition) {
            handleTextChange(e)
        }
    }

    return (
        <InputBase
            defaultValue={defaultValue}
            inputProps={inputProps}
            onChange={handleChange}
            onCompositionStart={handleCompostion}
            onCompositionUpdate={handleCompostion}
            onCompositionEnd={handleCompostion}
            value={value}
            { ...other }
        />
    )
}

export default TextField