import axios from "axios";
import { cookies } from "next/headers";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;




export const checkServerSession = async () => {
  const cookieStore = await cookies();

  return axios.get(`${baseURL}/auth/session`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    withCredentials: true,
  });
};



const createServerApi = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  return axios.create({
    baseURL,
    headers: {
      Cookie: cookieHeader,
    },
  });
};



export const fetchNotes = async () => {
  const api = await createServerApi();
  const { data } = await api.get<Note[]>("/notes");
  return data;
};

export const fetchNoteById = async (id: string) => {
  const api = await createServerApi();
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};



export const getMe = async () => {
  const api = await createServerApi();
  const { data } = await api.get<User>("/user/me");
  return data;
};

export const checkSession = async () => {
  const api = await createServerApi();
  const { data } = await api.get<{ isAuth: boolean }>("/auth/session");
  return data;
};
