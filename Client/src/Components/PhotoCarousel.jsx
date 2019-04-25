import React from 'react';
import PicturesColumn from './PicturesColumn.jsx';
import Slider from 'react-slick';

class PhotoCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id, // || 1,
      images: [],
      productTitle: ''
    };

    this.getProductDetails = this.getProductDetails.bind(this);
    this.getProductPhotos = this.getProductPhotos.bind(this);
  }

  componentDidMount() {
    this.getProductDetails();
    this.getProductPhotos();
  }

  getProductDetails() {
    var itemId;
    var id = window.location.pathname.slice(1, window.location.pathname.length - 1);
    // console.log(window.location.pathname.slice(1, window.location.pathname.length - 1), 'WHATS WINDOW?!');

    if (id) {
      itemId = Number(id);
      // console.log(typeof id);
      // console.log(itemId, 'did we reset???')
    } else {
      itemId = this.state.id;
    }
    fetch(`/api/item/${itemId}`)
      .then(response => {
        // console.log(response, 'CLIENT SIDE RES!!??')
        if (response.status !== 200) {
          console.log('error with client side Get Product details!');
          return;
        }

        response.json().then(data => {
          // console.log(data, 'DATA!!!');
          // console.log(data[0].productName, 'what is product response data??');
          this.setState({
            productTitle: data[0].productName
          });
        });
      })
      .catch(error => {
        console.log(
          error,
          'error with component did Mount Product Info Func!!'
        );
      });



  }

  getProductPhotos() {
    var itemId;
    var id = window.location.pathname.slice(1, window.location.pathname.length - 1);
    if (id) {
      itemId = Number(id);
      // console.log(typeof id);
      // console.log(itemId, 'did we reset???')
    } else {
      itemId = this.state.id;
    }
    fetch(`/api/itemImages/${itemId}`)
      .then(response => {
        if (response.status !== 200) {
          console.log('Error with Client SIDE GET Pictures!');
          return;
        }

        response.json().then(data => {
          this.setState({
            images: data.images
          });
        });
      })
      .catch(error => {
        console.log(error, 'Error CLIENT Get Picture Func!!!');
      });
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      arrows: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className="outerDiv">
        <h2> {this.state.productTitle}</h2>

        <div className="testing123">
          <div className="picColumn">
            <PicturesColumn
              images={this.state.images}
              imageId={this.state.id}
            />
          </div>
          <div className="mainPictureContainer">
            <div className="flex-column">
              {this.state.images.length ? (
                <Slider {...settings}>
                  {this.state.images.map((image, index) => (
                    <div key={index} className="row">
                      <img
                        src={image.urlLink}
                        className="picture"
                        style={{ width: 350, height: 300 }}
                      />
                    </div>
                  ))}
                </Slider>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PhotoCarousel;
