import { api } from "./api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";





export const fetchNotes = async () => {
  const { data } = await api.get<Note[]>("/notes");
  return data;
};

export const fetchNoteById = async (id: string) => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (payload: Partial<Note>) => {
  const { data } = await api.post<Note>("/notes", payload);
  return data;
};

export const deleteNote = async (id: string) => {
  await api.delete(`/notes/${id}`);
};



export const register = async (credentials: {
  email: string;
  password: string;
}) => {
  const { data } = await api.post<User>("/auth/register", credentials);
  return data;
};

export const login = async (payload: {
  email: string;
  password: string;
}) => {
  const { data } = await api.post<User>("/auth/login", payload);
  return data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const checkSession = async () => {
  const { data } = await api.get<{ isAuth: boolean }>("/auth/session");
  return data;
};

export const getMe = async () => {
  const { data } = await api.get<User>("/users/me");
  return data;
};

export const updateMe = async (payload: Partial<User>) => {
  const { data } = await api.patch<User>("/users/me", payload);
  return data;
};
