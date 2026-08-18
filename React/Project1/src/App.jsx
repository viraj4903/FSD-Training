import Series from "./Series";

const netflixSeries = [
  {
    id: 1,
    title: "Wednesday",
    genre: "Comedy, Mystery",
    year: 2022,
    rating: "8.1",
    image: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
  },
  {
    id: 2,
    title: "Stranger Things",
    genre: "Sci-Fi, Horror",
    year: 2016,
    rating: "8.7",
    image: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
  },
  {
    id: 3,
    title: "Squid Game",
    genre: "Thriller, Drama",
    year: 2021,
    rating: "8.0",
    image: "https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
  }
];

const App = () => {
  return (
    <div>
      <h1>Top Netflix Series</h1>
      <Series data={netflixSeries} />
    </div>
  );
};

export default App;