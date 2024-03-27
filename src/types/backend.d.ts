interface LoginData {
  username: string;
  password: string;
}

interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  username: string;
}
interface LoginResponse {
  token: string;
}
interface User {
  answers_count: number;
  avatar: string;
  bio: string;
  created_at: string;
  email: string;
  first_name: string;
  full_name: string;
  id: number;
  job: string;
  last_name: string;
  phone: string;
  questions_count: number;
  username: string;
}
