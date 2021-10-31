export type Pokemon = {
  name: string;
  url: string;
};
export interface PokemonList {
  results: Array<Pokemon>;
}
