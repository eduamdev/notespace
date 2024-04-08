import { Link } from "wouter";

function Header() {
  return (
    <>
      <div className="pt-6 text-2xl font-semibold">NoteGuard</div>
      <nav className="flex flex-row gap-x-3 py-4">
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
        <Link href="/notes/all">All notes</Link>
        <Link href="/notes/new">New note</Link>
      </nav>
    </>
  );
}

export default Header;
