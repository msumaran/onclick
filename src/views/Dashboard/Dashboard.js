/*eslint no-unused-vars: "off" */

import React, {useState} from 'react'
// import { useSelector } from 'react-redux'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Button
} from 'reactstrap';
// import PermissionHelper from '../../helpers/PermissionHelper'

import slide1 from 'assets/img/slider/slide1.png';
import slide2 from 'assets/img/slider/slide2.png';
import slide3 from 'assets/img/slider/slide3.png';
import slide4 from 'assets/img/slider/slide4.png';
import slide5 from 'assets/img/slider/slide5.png';

const items = [
  {
    id: 1,
    src: slide1,
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    id: 2,
    src: slide2,
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    id: 3,
    src: slide3,
    altText: 'Slide 3',
    caption: 'Slide 3'
  },
  {
    id: 4,
    src: slide4,
    altText: 'Slide 4',
    caption: 'Slide 4'
  },
  {
    id: 5,
    src: slide5,
    altText: 'Slide 5',
    caption: 'Slide 5'
  }
];

const Dashboard = (props) => {

  const session = JSON.parse(localStorage.getItem('session'))
  let tutorialShow = session.tutorial || false;
  // const my_permissions = useSelector((state) => state.accountReducer.permissions)

  // const permission_helper = new PermissionHelper(my_permissions)
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? activeIndex : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? 0 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const [modal, setModal] = useState(session.tutorial);

  const toggle = () => {

    setModal(!modal)

    setActiveIndex(0)
  }

  const closeModal = () => {
    session.tutorial = false;
    localStorage.setItem('session', JSON.stringify(session))
    setModal(!modal);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.id}
      >
        <img src={item.src} alt={item.altText} className="img-fluid" />
        {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
        <div className="text-center">
        {
          item.id == 5 ? <Button onClick={closeModal} outline color="secondary" >Aceptar</Button> : <Button onClick={closeModal} outline color="secondary" >Saltar tutorial</Button>
        }
        </div>
      </CarouselItem>
    );
  })

  return (
    <div className="animated fadeIn">
      <h1>Bienvenido a OnClick.la</h1>
      <p>
        ¿Deseas ver el uso de la plataforma nuevamente?&nbsp;
        <a className="pointer-link" type="button" onClick={toggle} >Mira el minitutorial.</a>
      </p>


      <Modal isOpen={modal} toggle={toggle} size="lg" backdrop='static' keyboard={false} >
        <ModalBody>
          <Carousel activeIndex={activeIndex} next={next} previous={previous} className="sliderTutorial"  autoPlay={false} interval={false}  >
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
          </Carousel>
        </ModalBody>
      </Modal>



    </div>
  )
}

export default Dashboard
