import { BookCard } from '../../books/bookCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Book } from '../../books/types';

type BookCollectionProps = {
  bookArray: Book[];
};

export const BookCollection = ({ bookArray }: BookCollectionProps) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1400 },
      items: 4,
    },
    smallDesktop: {
      breakpoint: { max: 1399, min: 1025 },
      items: 3,
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 766,
      },
      items: 2,
    },
    mobile: {
      breakpoint: {
        max: 765,
        min: 0,
      },
      items: 1,
    },
  };

  return (
    <>
      <Carousel
        responsive={responsive}
        additionalTransfrom={0}
        arrows
        dotListClass=""
        draggable={true}
        focusOnSelect={false}
        infinite={false}
        itemClass=""
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        swipeable
      >
        {bookArray?.map(book => (
          <div key={book.id}>
            <BookCard book={book} />
          </div>
        ))}
      </Carousel>
    </>
  );
};
