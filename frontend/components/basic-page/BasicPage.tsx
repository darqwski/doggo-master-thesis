import React, { FC } from 'react'
import './basic-page.less'
import { Icon, SideNav } from 'react-materialize'
import BasicNavUserInfo from './BasicNavUserInfo'

export interface IBasicPage {}

const BasicPage: FC<IBasicPage> = ({ children }) => {
    return (
        <div className="basic-page">
            <nav className="basic-page__nav">
                <SideNav trigger={<Icon>menu</Icon>}>
                    <span> Some menu </span>
                </SideNav>
                <div>Doggo</div>

                <BasicNavUserInfo />
            </nav>
            <div className="basic-page__content">{children}</div>
            <footer className="basic-page__footer">
                <div className="basic-page__footer-column">
                    <div className="basic-page__footer-column-title">Doggo</div>
                    <p>
                        <a>Psy</a>
                    </p>
                    <p>
                        <a>Hodowle</a>
                    </p>
                    <p>
                        <a>Weterynarze</a>
                    </p>
                    <p>
                        <a>Psy na sprzedaż</a>
                    </p>
                </div>
                <div className="basic-page__footer-column">
                    <div className="basic-page__footer-column-title">FAQ</div>
                    <p>
                        <a>Mam psa, co dalej?</a>
                    </p>
                    <p>
                        <a>Mam hodowlę, co dalej?</a>
                    </p>
                    <p>
                        <a>Jestem weterynarzem, co dalej?</a>
                    </p>
                    <p>
                        <a>Chcę psa, co dalej?</a>
                    </p>
                    <p>
                        <a>Lubię psy, co dalej?</a>
                    </p>
                </div>
                <div className="basic-page__footer-column">
                    <div className="basic-page__footer-column-title">
                        Kontakt
                    </div>
                    <p>
                        <a>Formularz kontaktowy</a>
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default BasicPage
