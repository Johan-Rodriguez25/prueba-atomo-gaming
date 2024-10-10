import { InsertOneResult, ModifyResult, UpdateResult } from "mongodb";
import { Movie } from "../../domain/models/mdl-movie";
import Server from "../../../main/app/server";
import { DataBaseName } from "../../../../common/utils/database_enum";
import { DbCollections } from "../../../../common/utils/database_collections";

export class DaoMovieRepository {
  private mongoReadConnection = Server.getInstance().MongoReadConnection;
  private mongoWriteConnection = Server.getInstance().MongoWriteConnection;
  private collectionName = DbCollections.movies;

  public async getAllMovies(
    sort = {},
    skip = 0,
    limit = 25
  ): Promise<
    {
      count: number;
      movies: Movie[];
    }[]
  > {
    try {
      const aggregate: any[] = [
        {
          $facet: {
            count: [{ $count: "count" }],
            movies: [{ $skip: skip }, { $limit: limit }],
          },
        },
        {
          $unwind: {
            path: "$count",
            preserveNullAndEmptyArrays: true,
          },
        },
        { $addFields: { count: "$count.count" } },
      ];

      if (Object.keys(sort).length > 0) {
        aggregate.unshift({
          $sort: sort,
        });
      }

      return this.mongoReadConnection.client
        .db(DataBaseName.core)
        .collection(this.collectionName)
        .aggregate(aggregate)
        .toArray()
        .then();
    } catch (error) {
      const _error = error as Error;

      throw new Error(
        `${_error.message} in ${DaoMovieRepository.name} of ${this.getAllMovies.name} method`
      );
    }
  }

  public async createMovie(movie: Movie): Promise<InsertOneResult<Movie>> {
    try {
      return this.mongoWriteConnection.client
        .db(DataBaseName.core)
        .collection(this.collectionName)
        .insertOne({
          ...movie,
          _id: undefined,
        })
        .then();
    } catch (error) {
      const _error = error as Error;
      throw new Error(
        `${_error.message} in DaoMovieRepository of createMovie() method`
      );
    }
  }

  public async getMovieById(id: string): Promise<Movie> {
    try {
      return this.mongoReadConnection.client
        .db(DataBaseName.core)
        .collection(this.collectionName)
        .findOne({ _id: this.mongoWriteConnection.convertObjectId(id) })
        .then();
    } catch (error) {
      const _error = error as Error;
      throw new Error(
        `${_error.message} in DaoMovieRepository of getMovieById() method`
      );
    }
  }

  public async updateMovie(
    id: string,
    data: Partial<Movie>
  ): Promise<ModifyResult<Movie>> {
    try {
      return this.mongoWriteConnection.client
        .db(DataBaseName.core)
        .collection(this.collectionName)
        .findOneAndUpdate(
          {
            _id: this.mongoWriteConnection.convertObjectId(id),
          },
          { $set: data },
          { returnDocument: "after" }
        )
        .then();
    } catch (error) {
      const _error = error as Error;
      throw new Error(
        `${_error.message} in DaoMovieRepository of updateMovie() method`
      );
    }
  }

  public async deleteMovie(id: string): Promise<UpdateResult> {
    try {
      const _id = this.mongoWriteConnection.convertObjectId(id);

      return this.mongoWriteConnection.client
        .db(DataBaseName.core)
        .collection(this.collectionName)
        .updateOne(
          {
            _id,
          },
          {
            $set: {
              isDeleted: true,
            },
          }
        );
    } catch (error) {
      const _error = error as Error;
      throw new Error(
        `${_error.message} in DaoMovieRepository of deleteMovie() method`
      );
    }
  }
}
