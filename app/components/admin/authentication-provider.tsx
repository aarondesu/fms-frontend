import { createContext, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { useLogoutMutation } from "~/redux/api/adminAuthApi";

const session_token_key = import.meta.env.VITE_SESSION_TOKEN_KEY;

type AdminAuthenticationState = {
  logout: () => void;
};

const initialState: AdminAuthenticationState = {
  logout: () => null,
};

const AdminAuthenticationContext =
  createContext<AdminAuthenticationState>(initialState);

interface AdminAuthenticationProviderProps {
  children: React.ReactNode;
}

export function AdminAuthenticationrProvider({
  children,
  ...props
}: AdminAuthenticationProviderProps) {
  const [logout] = useLogoutMutation();

  const location = useLocation();
  const navigate = useNavigate();

  const value = {
    logout: () => {
      if (
        sessionStorage.getItem(session_token_key) &&
        sessionStorage.getItem(session_token_key) !== ""
      ) {
        toast.promise(logout().unwrap(), {
          loading: "Logging out...",
          success: () => {
            sessionStorage.clear();
            navigate("/admin/login");
            return "Successfully logged out!";
          },
        });
      }
    },
  } as AdminAuthenticationState;

  useEffect(() => {
    if (
      !sessionStorage.getItem(session_token_key) ||
      (sessionStorage.getItem(session_token_key) === "" &&
        location.pathname !== "/admin/login")
    ) {
      toast.error("Login to proceed");
      navigate("/admin/login");
    }

    console.log("Hello World");
  }, [navigate]);

  return (
    <AdminAuthenticationContext.Provider {...props} value={value}>
      {children}
    </AdminAuthenticationContext.Provider>
  );
}

export const useAdminAuthentication = () => {
  const context = useContext(AdminAuthenticationContext);

  if (context === undefined) {
    throw new Error(
      "useAuthentication must be used within a AdminAuthenticationProvider"
    );
  }

  return context;
};
