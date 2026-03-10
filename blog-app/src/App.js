import { useState } from "react";

const POSTS = [
  {
    id: 1,
    title: "The Quiet Revolution in How We Read",
    excerpt: "Long-form journalism was supposed to die. Instead, it’s evolving.",
    author: "E. Whitmore",
    date: "March 10, 2026",
    category: "Culture",
    content:
      "Every few years someone says serious reading is dying. Yet readers continue to discover thoughtful essays and long-form journalism online."
  },
  {
    id: 2,
    title: "Against the Algorithm",
    excerpt: "Algorithms decide what we watch and read.",
    author: "T. Nakamura",
    date: "March 8, 2026",
    category: "Technology",
    content:
      "Recommendation systems influence culture today. But real discovery often comes from curiosity rather than machine predictions."
  },
  {
    id: 3,
    title: "The Typography of Thinking",
    excerpt: "Typography shapes how ideas are perceived.",
    author: "C. Bellerose",
    date: "March 6, 2026",
    category: "Design",
    content:
      "Fonts are not just design elements. They influence how readers interpret information and meaning."
  }
];

const CATEGORIES = ["Culture", "Technology", "Design"];


function Nav({ setPage }) {
  return (
    <header style={styles.header}>
      <div style={styles.headerContainer}>
        <div style={styles.logo} onClick={() => setPage("home")}>
          THE MARGIN
        </div>

        <nav style={styles.navMenu}>
          <button style={styles.navButton} onClick={() => setPage("home")}>Home</button>
          <button style={styles.navButton} onClick={() => setPage("categories")}>Categories</button>
          <button style={styles.navButton} onClick={() => setPage("search")}>Search</button>
          <button style={styles.navButton} onClick={() => setPage("about")}>About</button>
        </nav>
      </div>
    </header>
  );
}

function Home({ openPost }) {
  return (
    <>
      <section style={styles.hero}>
        <h1>Ideas Worth Reading</h1>
        <p>Thoughtful essays on culture, technology and design</p>
      </section>

      <div style={styles.container}>
        <div style={styles.grid}>
          {POSTS.map((post) => (
            <div
              key={post.id}
              style={styles.card}
              onClick={() => openPost(post)}
            >
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <span style={styles.meta}>
                {post.author} • {post.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}


function Article({ post, setPage }) {
  return (
    <div style={styles.container}>
      <button style={styles.back} onClick={() => setPage("home")}>
        ← Back
      </button>

      <h1>{post.title}</h1>

      <p style={styles.meta}>
        {post.author} • {post.date}
      </p>

      <p style={styles.articleText}>{post.content}</p>
    </div>
  );
}


function Categories({ openPost }) {
  return (
    <div style={styles.container}>
      <h1>Categories</h1>

      {CATEGORIES.map((cat) => (
        <div key={cat} style={{ marginBottom: "30px" }}>
          <h2>{cat}</h2>

          {POSTS.filter((p) => p.category === cat).map((post) => (
            <p
              key={post.id}
              style={styles.link}
              onClick={() => openPost(post)}
            >
              {post.title}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

function Search({ openPost }) {
  const [query, setQuery] = useState("");

  const results = POSTS.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1>Search</h1>

      <input
        style={styles.input}
        placeholder="Search articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {results.map((post) => (
        <p key={post.id} style={styles.link} onClick={() => openPost(post)}>
          {post.title}
        </p>
      ))}
    </div>
  );
}


function About() {
  return (
    <div style={styles.container}>
      <h1>About</h1>

      <p>
        The Margin is a modern digital magazine publishing thoughtful essays
        on culture, technology and design.
      </p>
    </div>
  );
}


function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContainer}>
        <div>
          <h3 style={styles.footerLogo}>THE MARGIN</h3>
          <p style={styles.footerText}>
            A modern magazine covering culture, technology and design.
          </p>
        </div>

        <div>
          <h4>Navigation</h4>
          <p>Home</p>
          <p>Categories</p>
          <p>Search</p>
          <p>About</p>
        </div>

        <div>
          <h4>Connect</h4>
          <p>Email</p>
          <p>Twitter</p>
          <p>LinkedIn</p>
        </div>
      </div>

      <div style={styles.copy}>
        © 2026 The Margin — All Rights Reserved
      </div>
    </footer>
  );
}


export default function App() {
  const [page, setPage] = useState("home");
  const [currentPost, setCurrentPost] = useState(null);

  const openPost = (post) => {
    setCurrentPost(post);
    setPage("article");
  };

  return (
    <div style={styles.app}>
      <Nav setPage={setPage} />

      {page === "home" && <Home openPost={openPost} />}
      {page === "article" && <Article post={currentPost} setPage={setPage} />}
      {page === "categories" && <Categories openPost={openPost} />}
      {page === "search" && <Search openPost={openPost} />}
      {page === "about" && <About />}

      <Footer />
    </div>
  );
}


const styles = {

  app: {
    fontFamily: "Georgia, serif",
    background: "#f5f5f4",
    minHeight: "100vh",
    color: "#242424"
  },

  header: {
    background: "#ffffff",
    borderBottom: "1px solid #e4e4e4"
  },

  headerContainer: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "18px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  logo: {
    fontWeight: "700",
    fontSize: "20px",
    letterSpacing: "2px",
    cursor: "pointer"
  },

  navMenu: {
    display: "flex",
    gap: "15px"
  },

  navButton: {
    background: "#f1f1ef",
    border: "1px solid #ddd",
    padding: "6px 14px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "14px"
  },

  hero: {
    textAlign: "center",
    padding: "60px 20px",
    background: "#f1f1ef",
    borderBottom: "1px solid #e4e4e4"
  },

  container: {
    maxWidth: "1000px",
    margin: "40px auto",
    padding: "0 20px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: "30px"
  },

  card: {
    background: "#ffffff",
    padding: "24px",
    borderRadius: "8px",
    border: "1px solid #e8e8e8",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    cursor: "pointer"
  },

  meta: {
    color: "#777",
    fontSize: "14px"
  },

  articleText: {
    fontSize: "18px",
    lineHeight: "1.8"
  },

  link: {
    cursor: "pointer",
    color: "#1a8917",
    fontWeight: "500"
  },

  input: {
    padding: "10px",
    width: "260px",
    marginBottom: "20px",
    border: "1px solid #ddd",
    borderRadius: "6px"
  },

  back: {
    marginBottom: "20px",
    background: "#1a8917",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "20px",
    cursor: "pointer"
  },

  footer: {
    background: "#f1f1ef",
    borderTop: "1px solid #e4e4e4",
    marginTop: "80px",
    paddingTop: "40px"
  },

  footerContainer: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 20px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "40px"
  },

  footerLogo: {
    letterSpacing: "2px"
  },

  footerText: {
    color: "#777",
    fontSize: "14px"
  },

  copy: {
    textAlign: "center",
    marginTop: "30px",
    padding: "20px",
    borderTop: "1px solid #e4e4e4",
    fontSize: "13px",
    color: "#777"
  }

};