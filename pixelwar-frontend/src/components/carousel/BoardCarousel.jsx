import { useState, useEffect } from "react";
import { Carousel, CarouselItem, CarouselControl } from "reactstrap";
import BoardCarouselPage from "./BoardCarouselPage";

function BoardCarousel({ data, itemsPerPage, loading }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setActiveIndex(
      (prevIndex) =>
        (prevIndex + 1) % Math.ceil(data.boards.length / itemsPerPage)
    );
  };

  const previous = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0
        ? Math.ceil(data.boards.length / itemsPerPage) - 1
        : prevIndex - 1
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      interval={false}
      className='my-5'
    >
      {Array.from({ length: Math.ceil(data.boards.length / itemsPerPage) }).map(
        (_, index) => (
          <CarouselItem key={index}>
            <BoardCarouselPage
              items={data.boards.slice(
                index * itemsPerPage,
                index * itemsPerPage + itemsPerPage
              )}
              loading={loading}
            />
          </CarouselItem>
        )
      )}
      <CarouselControl
        direction='prev'
        directionText='Previous'
        onClickHandler={previous}
      />
      <CarouselControl
        direction='next'
        directionText='Next'
        onClickHandler={next}
      />
    </Carousel>
  );
}

export default BoardCarousel;
