import React, { useContext, useEffect } from 'react'
import './snackbar.less'
import { SnackbarContext } from './snackbar-context'
import {ISnackbar, ISnackbarProps} from './snackbar-types'

const Snackbar: React.FC<ISnackbarProps> = ({ text, id, timeout = 5000 }) => {
    const { removeSnackbar } = useContext(SnackbarContext)

    useEffect(() => {
        const timer = setTimeout(() => {
            removeSnackbar(id)
            clearTimeout(timer)
        }, timeout)
    })

    return (
        <div className="snackbar" onClick={() => removeSnackbar(id)}>
            <div>{text}</div>
        </div>
    )
}

export default Snackbar
