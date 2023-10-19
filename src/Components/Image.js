import { useState } from "react";
import fallbackImage from "../Assets/fallback-image.png";

function Image({ src, ...props }) {
  const [isError, setIsError] = useState(false);

  if (isError) {
    return <img src={fallbackImage} {...props} />;
  }

  return <img src={src} onError={() => setIsError(true)} {...props} />;
}

export default Image;
