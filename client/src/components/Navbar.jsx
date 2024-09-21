export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top bg-body-secondary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            FTS
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {localStorage.getItem("token") ? (
                <>
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="/home"
                    >
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/feelings">
                      Feelings
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/thoughts">
                      Thoughts
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/secrets">
                      Secrets
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/logout">
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/login">
                      Login
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/register">
                      Register
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
