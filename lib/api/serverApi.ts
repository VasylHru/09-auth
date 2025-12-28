// import axios from "axios";
// import { cookies } from "next/headers";


// const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;




// export const checkServerSession = async () => {
//   const cookieStore = await cookies();

//   return axios.get(`${baseURL}/auth/session`, {
//     headers: {
//       Cookie: cookieStore.toString(),
//     },
//     withCredentials: true,
//   });
// };



// const createServerApi = async () => {
//   const cookieStore = await cookies();
//   const cookieHeader = cookieStore
//     .getAll()
//     .map((c) => `${c.name}=${c.value}`)
//     .join("; ");

//   return axios.create({
//     baseURL,
//     headers: {
//       Cookie: cookieHeader,
//     },
//   });
// };



// export const fetchNotes = async () => {
//   const api = await createServerApi();
//   const { data } = await api.get<Note[]>("/notes");
//   return data;
// };

// export const fetchNoteById = async (id: string) => {
//   const api = await createServerApi();
//   const { data } = await api.get<Note>(`/notes/${id}`);
//   return data;
// };



// export const getMe = async () => {
//   const api = await createServerApi();
//   const { data } = await api.get<User>("/users/me");
//   return data;
// };

// export const checkSession = async () => {
//   const api = await createServerApi();
//   const { data } = await api.get<{ isAuth: boolean }>("/auth/session");
//   return data;
// };
import { api } from "./api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";


export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}


export async function fetchNotes(
  page: number,
  search?: string,
  tag?: string,
  cookies: string = ""
): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = {
    page,
    perPage: 12,
  };

  if (search) {
    params.search = search;
  }

  if (tag && tag !== "all") {
    params.tag = tag;
  }

  const headers = cookies ? { Cookie: cookies } : {};

  const response = await api.get<FetchNotesResponse>("/notes", { params, headers });
  return response.data;
}

export async function fetchNoteById(
  id: string,
  cookies: string = ""
): Promise<Note> {
  const headers = cookies ? { Cookie: cookies } : {};

  const response = await api.get<Note>(`/notes/${id}`, { headers });
  return response.data;
}

export async function getMe(
  cookies: string = ""
): Promise<User> {
  const headers = cookies ? { Cookie: cookies } : {};

  const response = await api.get<User>("/users/me", { headers });
  return response.data;
}

export async function checkSession(
  cookies: string = ""
): Promise<boolean> {
  const headers = cookies ? { Cookie: cookies } : {};

  try {
    await api.get("/auth/check-session", { headers });
    return true;
  } catch {
    return false;
  }
}