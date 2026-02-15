import { Fragment } from "react";
import { useRating } from "../Hooks/useRating";
import { truncateTitle } from "../lib/utils";
import type { PredictionResponse, UserPreference } from "../types";
import ComicCardOverlay from "./ComicCardOverlay";
import Image from "./Image";
import { Card, CardContent } from "./ui/card";
import { StarRating } from "./ui/star-rating";

interface PredictionCardProps {
  hits: PredictionResponse[];
  prefs: UserPreference[];
  setPrefs: React.Dispatch<React.SetStateAction<UserPreference[]>>;
}

const PredictionCard: React.FC<PredictionCardProps> = ({ hits, prefs, setPrefs }) => {
  const { handleRatingChange, getRating } = useRating({ prefs, setPrefs });

  return (
    <Fragment>
      {hits.map((hit) => (
        <Card key={hit.id} className="hover:border-kappa-green/50 transition-colors">
          <ComicCardOverlay id={hit.id}>
            <CardContent className="p-2">
              <Image
                className="object-cover object-top w-full rounded-xl sm:h-96"
                src={hit.image_url}
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
                rating={getRating(hit.id) || hit.rating}
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

export default PredictionCard;
