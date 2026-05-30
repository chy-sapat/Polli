import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/stores/auth-store";
import { validateToken } from "@/utils/auth";

export default function Index() {
  const isSignedIn = useAuthStore((state) => state.isSignedIn);
  const signIn = useAuthStore((state) => state.signIn);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      const token = await validateToken();
      if (token) {
        signIn();
      }
      if (isMounted) {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [signIn]);

  if (isCheckingAuth) {
    return null;
  }

  return <Redirect href={isSignedIn ? "/(tabs)" : "/login"} />;
}
