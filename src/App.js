import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import custom CSS

const apikey = "7b7b8551";
const App = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const changeHandler = (e) => {
    setSearch(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    fetch(`http://www.omdbapi.com/?s=${search}&apiKey=${apikey}`)
      .then(response => response.json())
      .then(value => setData(value.Search))
      .catch(error => console.log('Error Fetching Data', error));
  }

  const download = url => {
    fetch(url).then(response => {
      response.arrayBuffer().then(function(buffer) {
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "image.png");
        document.body.appendChild(link);
        link.click();
      });
    }).catch(err => {
      console.log(err);
    });
  };

  return (
    <div className="container">
      <center>
        <h1>Search Your Favourite Movie/Web series</h1>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter movie name"
            value={search}
            onChange={changeHandler}
          />
          <br />
          <input type="submit" value="Search" className="btn btn-primary" />
        </form>
        <br />
        <div className="card-deck">
          {data.map(movie =>
            <div className="col-md-4" key={movie.imdbID}>
              <div className="card">
                <img className="card-img-top" src={movie.Poster} alt={movie.Title} />
                <div className="card-body">
                  <h4 className="card-title">{movie.Title}</h4>
                  <button className="btn btn-primary" onClick={() => download(movie.Poster)}>Download Poster</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </center>
    </div>
  );
}

export default App;
