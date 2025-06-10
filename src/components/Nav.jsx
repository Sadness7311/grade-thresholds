import { Code, Home } from "lucide-react";
import { Link } from "react-router";

function Nav() {
  return (
    <div className="flex items-center justify-end gap-8 px-4 w-full py-7 border-b-1 border-accent sm:px-10">
      <Link to="/">
        Home <Home />
      </Link>
      <Link to="/api">
        API <Code />
      </Link>
    </div>
  );
}

export default Nav;
