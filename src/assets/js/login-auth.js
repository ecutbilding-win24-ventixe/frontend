export const getUserInfo = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      email: payload.email,
      profilePicture: "/images/avatar-default.svg"
    };
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
};