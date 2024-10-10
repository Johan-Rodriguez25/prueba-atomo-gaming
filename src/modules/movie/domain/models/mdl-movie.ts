export interface Movie {
  _id: string;
  nombre: string;
  resumen: string;
  rating: number;
  categorias: string[];
  imagen: string;
  isDeleted: boolean;
  created_time: string;
  updated_time: string;
}
