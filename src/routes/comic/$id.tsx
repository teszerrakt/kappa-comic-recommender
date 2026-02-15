import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  ExternalLink,
  Heart,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import ComicDetailSkeleton from "../../Components/ComicDetailSkeleton";
import Image from "../../Components/Image";
import NavBar from "../../Components/NavBar";
import { Badge } from "../../Components/ui/badge";
import { Button } from "../../Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../Components/ui/card";
import { useMangaDetails } from "../../Hooks/useMangaDetails";
import type { MangaData } from "../../types";

export const Route = createFileRoute("/comic/$id")({
  component: ComicDetailsPage,
});

function ComicDetailsPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { data: mangaResponse, isLoading, isError, error } = useMangaDetails(id);

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
        return "info";
      case "publishing":
        return "kappa";
      case "on hiatus":
        return "warning";
      case "discontinued":
        return "danger";
      default:
        return "muted";
    }
  };

  if (isLoading) {
    return <ComicDetailSkeleton />;
  }

  if (isError || !manga) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold text-destructive mb-2">Error Loading Manga</h2>
            <p className="text-muted-foreground mb-4">
              {error?.message || "Unable to load manga details. Please try again later."}
            </p>
            <Button onClick={() => navigate({ to: "/" })} variant="kappa">
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <NavBar showSearch={false} />
      <main className="mx-auto w-full max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Image and basic info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-4">
                {/* Back button, main title, and alternative titles */}
                <div className="flex items-start gap-2 mb-2">
                  <Button
                    onClick={() => window.history.back()}
                    variant="kappaGhost"
                    size="sm"
                    className="p-1 w-8 h-8"
                    aria-label="Go back"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <h1 className="text-xl lg:text-2xl font-bold text-kappa-green">{manga.title}</h1>
                </div>
                <div className="flex-1 mb-4">
                  <div className="flex flex-wrap gap-2">
                    {manga.title_english && manga.title_english !== manga.title && (
                      <Badge variant="muted" className="text-xs">
                        EN: {manga.title_english}
                      </Badge>
                    )}
                    {manga.title_japanese && (
                      <Badge variant="muted" className="text-xs">
                        JP: {manga.title_japanese}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="aspect-3/4 mb-4">
                  <Image
                    src={manga.images?.jpg?.large_image_url || manga.images?.jpg?.image_url || ""}
                    alt={manga.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="space-y-3">
                  <Badge variant={getStatusColor(manga.status)} className="w-fit">
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
                        {manga.published.to && ` - ${formatDate(manga.published.to)}`}
                      </span>
                    </div>
                  )}

                  {manga.url && (
                    <Button asChild variant="kappa" className="w-full">
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
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Star className="w-6 h-6 text-kappa-gold" />
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
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Trophy className="w-6 h-6 text-kappa-orange" />
                      <div>
                        <p className="text-lg font-semibold text-kappa-green">#{manga.rank}</p>
                        <p className="text-sm text-kappa-gray">Rank</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {manga.members && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Users className="w-6 h-6 text-kappa-blue" />
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
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Heart className="w-6 h-6 text-kappa-red" />
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
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-kappa-green">Synopsis</CardTitle>
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
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-kappa-green">Background</CardTitle>
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
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-kappa-green">Authors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {manga.authors.map((author) => (
                      <Badge key={author.mal_id} variant="muted">
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
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-kappa-green">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {manga.genres && manga.genres.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-kappa-gray mb-2">Genres</h4>
                      <div className="flex flex-wrap gap-2">
                        {manga.genres.map((genre) => (
                          <Badge key={genre.mal_id} variant="kappa">
                            {genre.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {manga.themes && manga.themes.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-kappa-gray mb-2">Themes</h4>
                      <div className="flex flex-wrap gap-2">
                        {manga.themes.map((theme) => (
                          <Badge key={theme.mal_id} variant="muted">
                            {theme.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {manga.demographics && manga.demographics.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-kappa-gray mb-2">Demographics</h4>
                      <div className="flex flex-wrap gap-2">
                        {manga.demographics.map((demo) => (
                          <Badge key={demo.mal_id} variant="info">
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
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-kappa-green">Serializations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {manga.serializations.map((serialization) => (
                      <Badge key={serialization.mal_id} variant="purple">
                        {serialization.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
