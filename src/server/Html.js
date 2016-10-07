import React from "react";
import ReactDOMServer from "react-dom/server";
import IsomorphicRouter from "isomorphic-relay-router";

const Html = ({data, markupProps, assets}) => {
  const PROD = process.env.NODE_ENV === 'production';
  const {manifest, app, vendor} = assets || {};

  const root = ReactDOMServer.renderToString(
    <div>
      {IsomorphicRouter.render(markupProps)}
    </div>
  );

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8"/>
        <title>Isomorphic Relay • TodoMVC</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="stylesheet" href="/css/base.css"/>
        <link rel="stylesheet" href="/css/index.css"/>
      </head>
      <body>
        {PROD ? <div id="root" dangerouslySetInnerHTML={{__html: root}}/> : <div id="root"/>}
        <script
          id="preloadedData"
          type="application/json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(data).replace(/\//g, '\\/')}}
        />
        {PROD && <script dangerouslySetInnerHTML={{__html: manifest.text}}/>}
        {PROD && <script src={vendor.js}/>}
        <script src={PROD ? app.js : '/static/app.js'}/>
      </body>
    </html>
  );
};

export default Html;
