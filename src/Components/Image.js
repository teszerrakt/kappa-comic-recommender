import { useState } from "react";
import fallbackImage from "../Assets/fallback-image.png";

function Image({ src, alt, ...props }) {
  const [isError, setIsError] = useState(false);

  if (isError) {
    return <img src={fallbackImage} alt={alt} {...props} />;
  }

  return (
    <img src={src} alt={alt} onError={() => setIsError(true)} {...props} />
  );
}

export default Image;
