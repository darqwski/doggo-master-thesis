export interface ISnackbar  { text:  JSX.Element | string, timeout?: number, }
export interface ISnackbarProps extends ISnackbar{
    id: string
}