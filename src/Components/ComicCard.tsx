import { Star } from "lucide-react";
import { Fragment } from "react";
import { useHits } from "react-instantsearch";
import ReactStars from "react-rating-stars-component";
import { Card, CardContent } from "./ui/card";
import Image from "./Image";
import { UserPreference, ComicHit } from "../types";

interface ComicCardProps {
  setPrefs: React.Dispatch<React.SetStateAction<UserPreference[]>>;
  prefs: UserPreference[];
}

const ComicCard: React.FC<ComicCardProps> = ({ setPrefs, prefs }) => {
  const { hits } = useHits<ComicHit>();
  
  const addItem = (id: string, title: string, newRating: number): void => {
    const newItem = {
      id: id,
      title: title,
      rating: newRating,
    };
    setPrefs((prevItems) => [...prevItems, newItem]);
  };

  const handleUpdate = (id: string, newRating: number): void => {
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

  const handleRatingChange = (id: string, title: string, newRating: number): void => {
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

  const handleTitle = (title: string): string => {
    let splitArr = title.split(" ");
    if (splitArr.length > 5) {
      let newTitle = "";
      for (let i = 0; i < 5; i++) {
        newTitle += splitArr[i] + " ";
      }
      newTitle = newTitle + " ...";
      return newTitle;
    } else {
      return title;
    }
  };

  return (
    <Fragment>
      {hits.map((hit) => (
        <Card key={hit.id} className="bg-kappa-dark-gray border-kappa-gray/20 hover:border-kappa-green/50 transition-colors">
          <CardContent className="p-2">
            <a
              href={`https://myanimelist.net/manga/${hit.id}`}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                className="object-cover object-top w-full duration-500 rounded-xl sm:h-96 hover:opacity-50"
                src={hit.imageUrl}
                alt={hit.title}
              />
            </a>
          </CardContent>
          <div className="flex flex-col items-center">
            <div className="flex items-center h-16">
              <h1 className="p-2 text-lg font-bold text-center text-kappa-green">
                {handleTitle(hit.title)}
              </h1>
            </div>
            <div className="pb-2">
              <ReactStars
                count={5}
                size={36}
                emptyIcon={
                  <Star className="mx-0.5 text-2xl fill-transparent stroke-kappa-gray" />
                }
                filledIcon={
                  <Star className="mx-0.5 text-2xl fill-kappa-green stroke-kappa-green" />
                }
                onChange={(newRating) =>
                  handleRatingChange(hit.id, hit.title, newRating)
                }
              />
            </div>
          </div>
        </Card>
      ))}
    </Fragment>
  );
};

export default ComicCard;
