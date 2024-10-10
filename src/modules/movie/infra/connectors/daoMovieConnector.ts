import { InsertOneResult, UpdateResult } from "mongodb";
import { Movie } from "../../domain/models/mdl-movie";
import { DaoMovieRepository } from "../repositories/daoMovieRepository";

export class DaoMovieConnector {
  constructor(private daoMovieRepository = new DaoMovieRepository()) {}

  public async getAllMovies(sort: {}, skip = 0, limit = 25) {
    return this.daoMovieRepository.getAllMovies(sort, skip, limit);
  }

  public async createMovie(movie: Movie): Promise<InsertOneResult<Movie>> {
    return this.daoMovieRepository.createMovie(movie);
  }

  public async getMovieById(id: string): Promise<Movie> {
    return this.daoMovieRepository.getMovieById(id);
  }

  public async updateMovie(id: string, data: Partial<Movie>) {
    return this.daoMovieRepository.updateMovie(id, data);
  }

  public async deleteMovie(id: string): Promise<UpdateResult> {
    return this.daoMovieRepository.deleteMovie(id);
  }
}
