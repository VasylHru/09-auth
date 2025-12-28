"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/api/clientApi";
import css from "./SignInPage.module.css";
import { useAuthStore } from "@/lib/store/authStore";


const SignInPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const mutation = useMutation({
  mutationFn: login,
  onSuccess: (user) => {
    setUser(user);       
    router.push("/profile");
  },
});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setError("");
    mutation.mutate({ email, password });
  };

  const setUser = useAuthStore((state) => state.setUser);



  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button
            type="submit"
            className={css.submitButton}
            disabled={mutation.isPending}
          >
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignInPage;


