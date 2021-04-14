import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
export default function Banner() {
    return (
        <div>
            <Carousel
            autoPlay={true}
            showThumbs={false}
            infiniteLoop
            autoFocus
            swipeable={true}
            useKeyboardArrows
            interval={2000}
            >
                <div>
                    <img src="https://images.vexels.com/media/users/3/126443/preview2/ff9af1e1edfa2c4a46c43b0c2040ce52-macbook-pro-touch-bar-banner.jpg" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="https://pbs.twimg.com/media/D7P_yLdX4AAvJWO.jpg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="https://www.yardproduct.com/blog/wp-content/uploads/2016/01/gardening-banner.jpg" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
        </div>
    )
}
