import React from 'react';
import BasicPage from "../../components/basic-page/BasicPage";
import { Card } from "react-materialize";

const getImgLink = (imgSrc: string) => {
    return `${window.location.href}${imgSrc}`
}

const LandingPage: React.FC = () => {
    return <BasicPage>
        <Card>
            <p className="flex"><h2> Aplikacja dla hodowców i właścicieli psów</h2><img style={{maxHeight: '12rem'}} src={getImgLink("img/doggo-smile-1.png")} /> </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce metus orci, accumsan a placerat non, sollicitudin ut purus.
                Duis pharetra vitae velit nec porttitor. Nam eros ante, faucibus ut justo consectetur, porttitor tristique turpis.
                Fusce id efficitur eros. Morbi nibh justo, bibendum in purus eget, venenatis aliquet ipsum. Phasellus gravida eu felis ut placerat.
                Duis lobortis mollis euismod. Nullam lacus nibh, consequat a pellentesque eu, viverra nec metus. Phasellus eget enim augue.
                Donec nec ipsum eu orci efficitur interdum. Nam nec euismod velit. Vivamus vestibulum urna eu malesuada dictum.
                Proin interdum turpis eu risus ultricies cursus. Integer sollicitudin, massa convallis volutpat scelerisque,
                tortor mi tincidunt enim, et dapibus quam nibh sit amet magna. Vivamus sit amet tempus turpis. In hac habitasse platea dictumst.
            </p>
            <h2> Wszystko w jednym miejscu</h2>
            <p>
                Maecenas congue elit a enim pellentesque, tempor tincidunt lacus porttitor. Nullam purus odio, consequat vel sapien vestibulum, aliquet ultrices ligula.
                Nulla tempor massa ac cursus vehicula. Etiam ex sapien, placerat vitae velit vel, tristique mollis libero.
                Nam aliquet ipsum sed ante laoreet, in dictum orci maximus. Proin condimentum arcu at urna eleifend faucibus.
                Sed sit amet volutpat sem, sit amet maximus velit. Integer laoreet ornare nisl et vehicula. Nulla posuere leo erat, fermentum pulvinar mauris interdum id.
                Phasellus eu elit sit amet sem fermentum vulputate. Suspendisse eget commodo mi, et tempus ex. Mauris non velit a ante faucibus rutrum. Proin sed auctor mauris.
            </p>
            <h2> Sprawdzona hodowla to sprawdzony pies</h2>
            <p>
                Vivamus et finibus lorem. Morbi in metus ac nisi ultrices ultrices. Phasellus condimentum ac leo vitae fringilla.
                Cras ut lorem quis justo pharetra malesuada. Suspendisse potenti. Vivamus nec diam odio. In semper tortor eu arcu semper bibendum.
                Nam molestie dolor non pulvinar pretium. Mauris metus orci, imperdiet ut gravida vitae, facilisis sit amet lorem.
                Suspendisse ac augue varius, ultricies elit ut, pharetra elit.
                Vivamus vel enim ut turpis consectetur volutpat. Aenean finibus tortor ipsum.
            </p>
        </Card>
    </BasicPage>;
};

export default LandingPage;