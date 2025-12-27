import type { Metadata } from "next";
import css from "./ProfilePage.module.css";

export const metadata: Metadata = {
  title: "Profile | Auth App",
  description: "User profile page",
  openGraph: {
    title: "Profile",
    description: "User profile page",
    url: "https://your-vercel-domain.vercel.app/profile",
  },
};

const ProfilePage = () => {
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <a href="" className={css.editProfileButton}>
            Edit Profile
          </a>
        </div>

        <div className={css.avatarWrapper}>
          <img
            src="https://ac.goit.global/fullstack/react/avatar.png"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: your_username</p>
          <p>Email: your_email@example.com</p>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
