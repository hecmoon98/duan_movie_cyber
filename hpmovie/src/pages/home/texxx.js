import React from 'react';
import OwlCarousel from 'react-owl-carousel2';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";


export default class Texxx extends React.Component {
    
    render() {
        const options = {
            items: 1,
            nav: true,
            rewind: true,
            autoplay: true
        };
         
     
        return (
            <div>
                Texxx

                <OwlCarousel ref="car" options={options}  >
    <div><img src="/img/fullimage1.jpg" alt="The Last of us"/></div>
    <div><img src="/img/fullimage2.jpg" alt="GTA V"/></div>
    <div><img src="/img/fullimage3.jpg" alt="Mirror Edge"/></div>
</OwlCarousel>
            </div>
        )
    }
}
