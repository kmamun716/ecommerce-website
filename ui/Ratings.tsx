import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number; // example: 4.3, 3.5
}

export default function StarRating({ rating }: StarRatingProps) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    // Full Star
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    }
    // Half Star
    else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
    }
    // Empty Star
    else {
      stars.push(<FaRegStar key={i} className="text-yellow-500" />);
    }
  }

  return <div className="flex items-center gap-1">{stars}</div>;
}
