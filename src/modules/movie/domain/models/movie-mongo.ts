import { Movie } from "./mdl-movie";
import { ObjectId } from "mongodb";

export interface MovieMongo extends Omit<Movie, "_id"> {
  _id?: ObjectId;
}
