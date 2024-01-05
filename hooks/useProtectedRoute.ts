import { useSegments, router, useRootNavigationState } from "expo-router";
import { useEffect, useLayoutEffect, useMemo } from "react";
import { useAuthActions, useAuthStore, useToken } from "../store/AuthStore";

export function useProtectedRoute() {
  const segments = useSegments();
  const token = useToken();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    console.log(`Token: ${token}`);
  }, []);
  const navigationKey = useMemo(() => {
    return rootNavigationState?.key;
  }, [rootNavigationState]);

  useLayoutEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!navigationKey) {
      return;
    }

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !token &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/login");
    } else if (token && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/");
    }
  }, [token, segments, navigationKey]);
}
