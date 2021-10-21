import { Fragment } from "react";
import { connectHits } from "react-instantsearch-dom";
import ReactStars from "react-rating-stars-component";

const ComicCard = ({ hits, setPrefs, prefs }) => {
  const addItem = (id, title, newRating) => {
    const newItem = {
      id: id,
      title: title,
      rating: newRating,
    };
    setPrefs((prevItems) => [...prevItems, newItem]);
  };

  const handleUpdate = (id, newRating) => {
    const newList = prefs.map((pref) => {
      if (pref.id === id) {
        const updatedItem = {
          ...pref,
          rating: newRating,
        };

        return updatedItem;
      }

      return pref;
    });

    setPrefs(newList);
  };

  const handleRatingChange = (id, title, newRating) => {
    let isExists = false;
    prefs.map((pref) => {
      if (pref.id === id) {
        isExists = true;
      }

      return isExists;
    });

    if (isExists) {
      handleUpdate(id, newRating);
    } else {
      addItem(id, title, newRating);
    }
  };

  return (
    <Fragment>
      {hits.map((hit) => (
        <div key={hit.id} className="bg-kappa-dark-gray rounded-xl">
          <div className="p-2">
            <a
              href={`https://myanimelist.net/manga/${hit.id}`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="object-cover object-top w-full duration-500 rounded-xl max-h-96 hover:opacity-50"
                src={hit.imageUrl}
                alt={hit.title}
              />
            </a>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center h-16 ">
              <h1 className="p-2 text-lg font-bold text-center text-kappa-green">
                {hit.title}
              </h1>
            </div>
            <ReactStars
              activeColor="#57946c"
              count={5}
              size={36}
              onChange={(newRating) =>
                handleRatingChange(hit.id, hit.title, newRating)
              }
            />
          </div>
        </div>
      ))}
    </Fragment>
  );
};

const CustomHits = connectHits(ComicCard);

export default CustomHits;
