import { Pozice, Pobocka } from "./interfaces";

export async function getPobocky(): Promise<Pobocka[]> {
  let response = await fetch(`http://www.mocky.io/v2/5eb3dac00e000053000816cd`);
  let data = await response.json();
  return data;
};

export async function getPozice(pobocka: Pobocka): Promise<Pozice[]> {
  let response = await fetch(`http://www.mocky.io/v2/5eb3dac00e000053000816cd?pobocka=${pobocka.id}`);
  let data = await response.json();
  return data;
}
