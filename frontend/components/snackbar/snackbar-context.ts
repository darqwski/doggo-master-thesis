import { createContext } from 'react'
import { ISnackbar } from './snackbar-types'

export const SnackbarContext = createContext({
    addSnackBar: (props: ISnackbar) => {},
    removeSnackbar: (snackBarId: string) => {},
})
