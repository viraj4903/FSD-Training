const Series = () => {
  const s = {
    id: 1,
    title: "Wednesday",
    genre: "Comedy, Mystery",
    year: 2022,
    rating: "8.1",
    image: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
  };
  return (
    <div>
      <img src={s.image} alt={s.title} />
      <h2>{s.title}</h2>
      <h3>{s.genre}</h3>
      <h3>{s.rating}</h3>
      <h3>{s.year}</h3>
    </div>
  );
};
export default Series;