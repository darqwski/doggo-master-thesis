import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './css/materialize.css'
import './css/global.css'
import './css/variables.less'
import LandingPage from './application/landing-page/LandingPage'
import ApplicationContextManager from './context/application-context/ApplicationContextManager'
import LoginPage from './application/login-page/LoginPage'
import SnackbarManager from './components/snackbar/SnackbarContextManager'
import RegisterPage from "./application/register-page/RegisterPage";
import DashboardPage from "./application/dashboard-page/DashboardPage";
import CreateOfferPage from "./application/create-offer/CreateOfferPage";
import ActiveOffers from "./application/active-offers/ActiveOffers";
import MyOffersPage from "./application/my-offers/MyOffersPage";
import OfferPage from "./application/offer-page/OfferPage";
import EditOfferPage from "./application/edit-offer-page/EditOfferPage";
import MyDogsPage from "./application/my-dogs-page/MyDogsPage";
import PaymentPage from "./application/payment-page/PaymentPage";
import DogEditGallery from "./application/dog-edit-gallery/DogEditGallery";
import DogGalleryPage from "./application/dog-gallery/DogGalleryPage";
import BreederProfilePage from "./application/profile/breeder/BreederProfilePage";

const routing = [
    { path: '/', component: LandingPage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/dashboard', component: DashboardPage },
    { path: '/dogs/create-offer', component: CreateOfferPage },
    { path: '/dogs/for-sale', component: ActiveOffers },
    { path: '/my-offers', component: MyOffersPage },
    { path: '/offer/:offerId', component: OfferPage },
    { path: '/offer/edit/:offerId', component: EditOfferPage },
    { path: '/my-dogs', component: MyDogsPage },
    { path: '/offer/:offerId/payment', component: PaymentPage },
    { path: '/dog/:dogId/edit', component: DogEditGallery },
    { path: '/dog/:dogId', component: DogGalleryPage },
    { path: '/profile/breeder/:breederId', component: BreederProfilePage },
]

const App = () => {
    return (
        <Router forceRefresh>
            {routing.map(({ path, component }, index) => (
                <Route
                    exact
                    path={path}
                    component={component}
                    key={`routing-${index}`}
                />
            ))}
        </Router>
    )
}

const AppWithContext = () => (
    <ApplicationContextManager>
        <SnackbarManager>
            <App />
        </SnackbarManager>
    </ApplicationContextManager>
)

export default AppWithContext
