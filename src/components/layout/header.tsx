import { AuthService } from "@/services/auth-service";
import { Link } from "wouter";

function Header() {
  const isAuthenticated = AuthService.isAuthenticated();

  const handleLogout = () => {
    AuthService.logout();
  };

  return (
    <>
      <div className="pt-6 text-2xl font-semibold">
        <Link href="/">NoteGuard</Link>
      </div>

      <nav className="flex flex-row gap-x-3 py-4">
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
        {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </>
  );
}

export default Header;
