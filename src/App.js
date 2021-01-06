import React from "react";
import "./App.css";
import axios from "axios";
// ADD APIKEY
const API_KEY = "AOBx2aNAIeVcTyEg6I6UIc209MaxA5H6";
const trendingUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`;
const searchUrl = (q) =>
  `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${q}`;

class App extends React.Component {
  state = {
    gifs: [],
    loading: true,
  };
  // set up axios and console.log test
  componentDidMount() {
    axios
      .get(trendingUrl)
      .then((res) => {
        console.log(res);
        this.setState({
          gifs: res.data.data,
          loading: false,
          // explain loading (turn + ury)
        });
      })
      .catch((err) => console.log(err));
  }

  searchGifs = (event) => {
    event.preventDefault();
    const q = event.target.q.value;
    console.log(q);
    axios
      .get(searchUrl(q))
      .then((res) => {
        this.setState({
          gifs: res.data.data,
          loading: false,
        });
      })
      .catch((err) => console.log(err));

    event.target.q.value = "";
  };

  render() {
    const { loading, gifs } = this.state;

    const gifsList = gifs.map((gif) => {
      return (
        <div key={gif.id}>
          <img
            src={gif.images.downsized_still.url}
            alt=""
            style={{ margin: "10px", width: "200px" }}
          />
        </div>
      );
    });

    return (
      <>
        <h1 style={{ textAlign: "center" }}>Gifs</h1>
        <form onSubmit={this.searchGifs} style={{ textAlign: "center" }}>
          <input type="text" name="q" />
          <button>Search</button>
        </form>
        {loading ? (
          <div
            style={{
              textAlign: "center",
            }}
          >
            <h1>Loading Gifs...</h1>
          </div>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap" }}>{gifsList}</div>
        )}
      </>
    );
  }
}

export default App;
