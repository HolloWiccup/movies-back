import { movieRouter } from "./movie/movie-routes.js";
import { categoryRouter } from "./category/category-routes.js";
import { directorRouter } from "./director/director-routes.js";
import { commentRouter } from "./comment/comment-routes.js";

const appRoutes = [movieRouter, categoryRouter, directorRouter, commentRouter];

export { appRoutes };
