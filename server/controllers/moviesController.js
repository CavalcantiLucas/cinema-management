const {
  getMovies,
  createMovie,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require("../repositories/moviesRepositories");

module.exports = {
  list: async (req, res) => {
    try {
      const movies = await getMovies();

      res.status(200).send(movies);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  create: async (req, res) => {
    try {
      const newMovie = await createMovie(req.body);

      res.status(201).send(newMovie);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  detail: async (req, res) => {
    try {
      const movie = await getMovieById(req.params.id);

      if (!movie) return res.status(404).send({ message: "movie not found" });

      res.send(movie);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;

      const movie = await getMovieById(id);

      if (!movie) return res.status(404).send({ message: "movie not found" });

      const updatedmovie = await updateMovie(id, req.body);

      console.log(req.body);

      res.send(updatedmovie);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  delete: async (req, res) => {
    try {
      const movie = await getMovieById(req.params.id);

      if (!movie) return res.status(404).send({ message: "movie not found" });

      await deleteMovie(req.params.id);

      res.send({ message: "Deleted successfully" });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
