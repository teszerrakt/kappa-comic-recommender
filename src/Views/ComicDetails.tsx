import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  BookOpen,
  Star,
  Users,
  Trophy,
  Heart,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";
import { Button } from "../Components/ui/button";
import { Badge } from "../Components/ui/badge";
import Image from "../Components/Image";
import Loading from "../Components/Loading";
import NavBar from "../Components/NavBar";
import { useMangaDetails } from "../Hooks/useMangaDetails";
import { MangaData } from "../types";

const ComicDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: mangaResponse,
    isLoading,
    isError,
    error,
  } = useMangaDetails(id);

  const manga: MangaData | undefined = mangaResponse?.data;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "finished":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "publishing":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "on hiatus":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "discontinued":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-kappa-black flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError || !manga) {
    return (
      <div className="min-h-screen bg-kappa-black flex items-center justify-center">
        <Card className="bg-kappa-dark-gray border-kappa-gray/20 max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold text-red-400 mb-2">
              Error Loading Manga
            </h2>
            <p className="text-kappa-gray mb-4">
              {error?.message ||
                "Unable to load manga details. Please try again later."}
            </p>
            <Button
              onClick={() => navigate(-1)}
              className="bg-kappa-green hover:bg-kappa-green/80"
            >
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-kappa-black text-white">
      <NavBar showSearch={false} />
      <div className="mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Image and basic info */}
          <div className="lg:col-span-1">
            <Card className="bg-kappa-dark-gray border-kappa-gray/20 sticky top-8">
              <CardContent className="p-4">
                {/* Back button, main title, and alternative titles */}
                <div className="flex items-start gap-2 mb-2">
                  <Button
                    onClick={() => navigate(-1)}
                    variant="ghost"
                    size="sm"
                    className="text-kappa-green hover:text-kappa-green/80 hover:bg-kappa-green/10 p-1 w-8 h-8"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <h1 className="text-xl lg:text-2xl font-bold text-kappa-green ">
                    {manga.title}
                  </h1>
                </div>
                <div className="flex-1 mb-4">
                  <div className="flex flex-wrap gap-2">
                    {manga.title_english &&
                      manga.title_english !== manga.title && (
                        <Badge
                          variant="secondary"
                          className="bg-kappa-gray/20 text-kappa-gray border-kappa-gray/30 text-xs rounded-md"
                        >
                          EN: {manga.title_english}
                        </Badge>
                      )}
                    {manga.title_japanese && (
                      <Badge
                        variant="secondary"
                        className="bg-kappa-gray/20 text-kappa-gray border-kappa-gray/30 text-xs rounded-md"
                      >
                        JP: {manga.title_japanese}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="aspect-[3/4] mb-4">
                  <Image
                    src={
                      manga.images?.jpg?.large_image_url ||
                      manga.images?.jpg?.image_url ||
                      ""
                    }
                    alt={manga.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="space-y-3">
                  <Badge className={`w-fit ${getStatusColor(manga.status)}`}>
                    {manga.status || "Unknown"}
                  </Badge>

                  <div className="flex items-center gap-2 text-sm text-kappa-gray">
                    <BookOpen className="w-4 h-4" />
                    <span>{manga.type || "Unknown Type"}</span>
                  </div>

                  {manga.chapters && (
                    <div className="flex items-center gap-2 text-sm text-kappa-gray">
                      <span>Chapters: {manga.chapters}</span>
                    </div>
                  )}

                  {manga.volumes && (
                    <div className="flex items-center gap-2 text-sm text-kappa-gray">
                      <span>Volumes: {manga.volumes}</span>
                    </div>
                  )}

                  {manga.published?.from && (
                    <div className="flex items-center gap-2 text-sm text-kappa-gray">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {formatDate(manga.published.from)}
                        {manga.published.to &&
                          ` - ${formatDate(manga.published.to)}`}
                      </span>
                    </div>
                  )}

                  {manga.url && (
                    <Button
                      asChild
                      className="w-full bg-kappa-green hover:bg-kappa-green/80"
                    >
                      <a
                        href={manga.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View on MyAnimeList
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Detailed information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {manga.score && (
                <Card className="bg-kappa-dark-gray border-kappa-gray/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Star className="w-6 h-6 text-yellow-400" />
                      <div>
                        <p className="text-lg font-semibold text-kappa-green">
                          {manga.score.toFixed(1)}
                        </p>
                        <p className="text-sm text-kappa-gray">Score</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {manga.rank && (
                <Card className="bg-kappa-dark-gray border-kappa-gray/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Trophy className="w-6 h-6 text-orange-400" />
                      <div>
                        <p className="text-lg font-semibold text-kappa-green">
                          #{manga.rank}
                        </p>
                        <p className="text-sm text-kappa-gray">Rank</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {manga.members && (
                <Card className="bg-kappa-dark-gray border-kappa-gray/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Users className="w-6 h-6 text-blue-400" />
                      <div>
                        <p className="text-lg font-semibold text-kappa-green">
                          {manga.members.toLocaleString()}
                        </p>
                        <p className="text-sm text-kappa-gray">Members</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {manga.favorites && (
                <Card className="bg-kappa-dark-gray border-kappa-gray/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Heart className="w-6 h-6 text-red-400" />
                      <div>
                        <p className="text-lg font-semibold text-kappa-green">
                          {manga.favorites.toLocaleString()}
                        </p>
                        <p className="text-sm text-kappa-gray">Favorites</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Synopsis */}
            {manga.synopsis && (
              <Card className="bg-kappa-dark-gray border-kappa-gray/20">
                <CardHeader>
                  <CardTitle className="text-xl text-kappa-green">
                    Synopsis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-kappa-gray leading-relaxed whitespace-pre-line">
                    {manga.synopsis}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Background */}
            {manga.background && (
              <Card className="bg-kappa-dark-gray border-kappa-gray/20">
                <CardHeader>
                  <CardTitle className="text-xl text-kappa-green">
                    Background
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-kappa-gray leading-relaxed whitespace-pre-line">
                    {manga.background}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Authors */}
            {manga.authors && manga.authors.length > 0 && (
              <Card className="bg-kappa-dark-gray border-kappa-gray/20">
                <CardHeader>
                  <CardTitle className="text-xl text-kappa-green">
                    Authors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {manga.authors.map((author) => (
                      <Badge
                        key={author.mal_id}
                        variant="secondary"
                        className="bg-kappa-gray/20 text-kappa-gray hover:bg-kappa-gray/30"
                      >
                        {author.name} ({author.type})
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Genres and Themes */}
            {((manga.genres && manga.genres.length > 0) ||
              (manga.themes && manga.themes.length > 0) ||
              (manga.demographics && manga.demographics.length > 0)) && (
              <Card className="bg-kappa-dark-gray border-kappa-gray/20">
                <CardHeader>
                  <CardTitle className="text-xl text-kappa-green">
                    Categories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {manga.genres && manga.genres.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-kappa-gray mb-2">
                        Genres
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {manga.genres.map((genre) => (
                          <Badge
                            key={genre.mal_id}
                            className="bg-kappa-green/20 text-kappa-green border-kappa-green/30"
                          >
                            {genre.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {manga.themes && manga.themes.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-kappa-gray mb-2">
                        Themes
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {manga.themes.map((theme) => (
                          <Badge
                            key={theme.mal_id}
                            variant="outline"
                            className="border-kappa-gray/30 text-kappa-gray"
                          >
                            {theme.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {manga.demographics && manga.demographics.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-kappa-gray mb-2">
                        Demographics
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {manga.demographics.map((demo) => (
                          <Badge
                            key={demo.mal_id}
                            variant="outline"
                            className="border-blue-500/30 text-blue-400"
                          >
                            {demo.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Serializations */}
            {manga.serializations && manga.serializations.length > 0 && (
              <Card className="bg-kappa-dark-gray border-kappa-gray/20">
                <CardHeader>
                  <CardTitle className="text-xl text-kappa-green">
                    Serializations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {manga.serializations.map((serialization) => (
                      <Badge
                        key={serialization.mal_id}
                        variant="secondary"
                        className="bg-purple-500/20 text-purple-400 border-purple-500/30"
                      >
                        {serialization.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicDetails;
