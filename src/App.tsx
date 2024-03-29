import { useState } from "react";
import useFetch from "./hooks/useFetch";

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const SOURCE = "http://universities.hipolabs.com/search?";

export default function Universities() {

  const [typeOfSearch, setTypeOfSearch] = useState("country");
  const [text, setText] = useState("");
  const [size, setSize] = useState(15);

  const {data : universities, isLoading, error} = useFetch(SOURCE + typeOfSearch + "=" + text);

  if (error) return <h1 className="text-center bg-dark my-1 text-white">Error in loading universities</h1>;

  function handleChangeText(event: any) { setText(event.target.value); }

  function handleChangeType(event: any) { setTypeOfSearch(event.target.value); }

  function handleSize(event: any) { setSize(event.target.value); }

  function getFlagEmoji(countryCode : string) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }

  return (
    <div className="container">
      <h1 className="text-center my-1 text-white">Universities</h1>
      <div id="menu">
        <div className="d-flex align-items-center">
          <div className="col-sm-2">
            <label className="text-white">Search by</label>
          </div>
          <div className="col-sm-2">
            <select className="form-control" value={typeOfSearch} onChange={handleChangeType}>
              <option value="country">country</option>
              <option value="name">name</option>
            </select>
          </div>
        </div>
        <form onSubmitCapture={e => e.preventDefault()}>
          <div className="col-sm-4">
            <input type="text" className="form-control mt-3" placeholder={"Insert a "+typeOfSearch} value={text} onChange={handleChangeText} />
          </div>
          <div className="d-flex align-items-center">
            <div className="col-sm-2">
              <label className="text-white">N. results</label>
            </div>
            <div className="col-sm-2">
              <input type="number" className="mb-3 form-control my-3" placeholder={"Insert a number"} value={size} onChange={handleSize} />
            </div>
            <label className="text-white mx-2"> / {universities.length}</label>
          </div>
        </form>
      </div>

      {isLoading && <div className="spinner-border text-light shadow"><span className="visually-hidden">Loading</span></div>}

      {!isLoading && (
        <div className="card-deck justify-content-center">
          {universities.slice(0,size).map((university) => {
            return <div className="card mb-3 rounded-pill shadow" key={university.name}>
              <div className="card-body mx-5">
                <div className="row justify-content-center">
                  <div className="col d-flex flex-row">
                    <p className="mr-3 mx-2">{getFlagEmoji(university.alpha_two_code)}</p>
                    <h5 className="card-title">{university.name}</h5>
                  </div>
                </div>
                <p className="card-text">🌐 <a href={university.domains}>{university.domains}</a></p>
              </div>
            </div>
          })}
        </div>
      )}
    </div>
  );
}