import { Fragment } from "react";
import { useHits } from "react-instantsearch";
import { Card, CardContent } from "./ui/card";
import { StarRating } from "./ui/star-rating";
import Image from "./Image";
import ComicCardOverlay from "./ComicCardOverlay";
import { useRating } from "../Hooks/useRating";
import type { UserPreference, ComicHit } from "../types";

interface ComicCardProps {
  setPrefs: React.Dispatch<React.SetStateAction<UserPreference[]>>;
  prefs: UserPreference[];
}

function truncateTitle(title: string): string {
  const words = title.split(" ");
  if (words.length > 5) {
    return `${words.slice(0, 5).join(" ")} ...`;
  }
  return title;
}

const ComicCard: React.FC<ComicCardProps> = ({ setPrefs, prefs }) => {
  const { hits } = useHits<ComicHit>();
  const { handleRatingChange, getRating } = useRating({ prefs, setPrefs });

  return (
    <Fragment>
      {hits.map((hit) => (
        <Card
          key={hit.id}
          className="bg-kappa-dark-gray border-kappa-gray/20 hover:border-kappa-green/50 transition-colors"
        >
          <ComicCardOverlay id={hit.id} title={hit.title}>
            <CardContent className="p-2">
              <Image
                className="object-cover object-top w-full duration-500 rounded-xl sm:h-96"
                src={hit.imageUrl}
                alt={hit.title}
              />
            </CardContent>
          </ComicCardOverlay>
          <div className="flex flex-col items-center">
            <div className="flex items-center h-16">
              <h1 className="p-2 text-lg font-bold text-center text-kappa-green">
                {truncateTitle(hit.title)}
              </h1>
            </div>
            <div className="pb-4">
              <StarRating
                rating={getRating(hit.id)}
                size="lg"
                onRatingChange={(newRating) =>
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
