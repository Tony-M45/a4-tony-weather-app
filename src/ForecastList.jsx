function ForecastList({ forecast }) {
  if (!forecast || forecast.length === 0) {
    return null;
  }

  return (
    <div>
      <h2>5-Day Forecast</h2>

      {forecast.map((item) => (
        <div key={item.dt}>
          <p>{item.dt_txt}</p>
          <p>Temperature: {item.main.temp} °C</p>
        </div>
      ))}
    </div>
  );
}

export default ForecastList;