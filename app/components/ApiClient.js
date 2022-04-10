import React, { useEffect, useState, useContext } from "react";
import { SERVER_HOST } from "../commons/constants";

const request = (options) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });
  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);
  return fetch(options.url, options)
    .then((response) =>
      response.json().then((json) => {
        console.log("ApiClinet-> API response :" + JSON.stringify(response));
        if (!response.ok) {
          console.log("error ...." + json);
          return Promise.reject(json);
        }
        return json;
      })
    )
    .catch((error) => {
      return Promise.reject(json);
    });
};

export function getResources(path) {
  return request({
    url: `${SERVER_HOST}/api/${path}`,
    method: "GET",
  });
}
