import { Fragment } from "react";
import { useHits } from "react-instantsearch";
import { useRating } from "../Hooks/useRating";
import { truncateTitle } from "../lib/utils";
import type { ComicHit, UserPreference } from "../types";
import ComicCardOverlay from "./ComicCardOverlay";
import Image from "./Image";
import { Card, CardContent } from "./ui/card";
import { StarRating } from "./ui/star-rating";

interface ComicCardProps {
  setPrefs: React.Dispatch<React.SetStateAction<UserPreference[]>>;
  prefs: UserPreference[];
}

const ComicCard: React.FC<ComicCardProps> = ({ setPrefs, prefs }) => {
  const { hits } = useHits<ComicHit>();
  const { handleRatingChange, getRating } = useRating({ prefs, setPrefs });

  return (
    <Fragment>
      {hits.map((hit) => (
        <Card key={hit.id} className="hover:border-kappa-green/50 transition-colors">
          <ComicCardOverlay id={hit.id}>
            <CardContent className="p-2">
              <Image
                className="object-cover object-top w-full rounded-xl sm:h-96"
                src={hit.imageUrl}
                alt={hit.title}
                loading="lazy"
              />
            </CardContent>
          </ComicCardOverlay>
          <div className="flex flex-col items-center">
            <div className="flex items-center h-16">
              <h2 className="p-2 text-lg font-bold text-center text-kappa-green line-clamp-2">
                {truncateTitle(hit.title)}
              </h2>
            </div>
            <div className="pb-3">
              <StarRating
                rating={getRating(hit.id)}
                size="lg"
                onRatingChange={(newRating) => handleRatingChange(hit.id, hit.title, newRating)}
              />
            </div>
          </div>
        </Card>
      ))}
    </Fragment>
  );
};

export default ComicCard;
