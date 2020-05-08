import { Pozice, Pobocka, Uchazec } from "./interfaces";

const API_URL = "http://localhost:5000/api";

export async function getPobocky(): Promise<Pobocka[]> {
  let response = await fetch(`${API_URL}/Workplaces`);
  return await response.json();
};

export async function getPozice(pobocka: Pobocka): Promise<Pozice[]> {
  let response = await fetch(`${API_URL}/Positions?workplaceID=${pobocka.id}`);
  return await response.json();
}

export async function upload(pozice: Pozice, data: Uchazec) {
  let body = new FormData();
  body.append("text", data.text);
  body.append("email", data.email);
  body.append("phone", data.phone);
  body.append("cv", data.cv);

  return await fetch(`http://www.mocky.io/v2/5eb53b4d31000057006993f1?pozice=${pozice.id}`, {
    method: 'POST',
    body,
  });
}
