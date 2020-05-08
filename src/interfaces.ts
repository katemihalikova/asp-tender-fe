export interface Entita {
  id: number;
  name: string;
}

export interface Pobocka extends Entita {}
export interface Pozice extends Entita {}

export interface Uchazec {
  text: string;
  email: string;
  phone: string;
  cv: File;
}
