export interface RequestPayload {
  user: User;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  birth_date: string;
  contacts: Contacts;
  experience: Experience[];
}

export interface Contacts {
  place: string;
  phone: string;
  email: string;
}

export interface Experience {
  title: string;
  company: string;
  start_date: string;
  end_date: string;
}
