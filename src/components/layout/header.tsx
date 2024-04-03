import { Link } from "wouter";

function Header() {
  return (
    <>
      <div>Header</div>
      <nav className="flex flex-col py-12">
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
        <Link href="/notes/all">All notes</Link>
        <Link href="/notes/new">New note</Link>
        <Link href="/notes/adasdsafas223qasd">Edit note</Link>
      </nav>
    </>
  );
}

export default Header;
