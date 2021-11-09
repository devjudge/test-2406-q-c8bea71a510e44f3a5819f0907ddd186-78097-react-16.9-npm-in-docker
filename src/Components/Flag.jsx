import React, { useEffect, useState } from "react";
import axios from "axios";

export const Flag = () => {
  const [text, setText] = useState("");
  const [search, setSearch] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios(
      "https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1709/data.json"
    ).then((res) => {
      setData(res.data);
    });
  }, []);

  const handleSubmit = () => {
    axios(
      "https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1709/data.json"
    ).then((res) => {
      let ans = "";
      res.data.forEach((element) => {
        if (text === element.name) {
          ans = element;
        }
      });
      if (ans != "") setData([ans]);
      else setData("not")
    });
  };
    return (
      <>
        <div>
          <input
            type="text"
            onChange={(e) => setText(e.target.value)}
            className="search-input"
            placeholder="Search for a country"
          />
          <button className="search-button" onClick={handleSubmit}>
            Search
          </button>
        </div>
        {data !== "not" ? <div className="country">
          {data.length>0 && data.map((ele) => {
            return (
              <div className={`country-list-${ele.id}`}>
                <img src={ele.flag} alt="" />
                <div>{ele.name}</div>
                <p>Population: {ele.population}</p>
              </div>
            );
          })}
        </div> : <div>No country found!</div>}
      </>
    );

};
