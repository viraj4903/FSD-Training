const Series = ({ data }) => {
  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.genre}</p>
          <p>{item.year}</p>
          <p>⭐ {item.rating}</p>
          <img src={item.image} alt={item.title} width="200" />
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Series;