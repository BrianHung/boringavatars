import type { IncomingMessage } from 'http';
import { parse } from 'url';

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Avatar from "boring-avatars";

export default async function handler(req: IncomingMessage, res) {
  try {

    const { pathname, query } = parse(req.url || '/', true);
    const { size, variant, name, colors } = {  
      size: 40,
      name: "Maria Mitchell",
      variant: "marble",
      colors: "A3A948,EDB92E,F85931,CE1836,009989",
      ...query
    };
    
    console.log("pathname, query", pathname, query, size, variant, name, colors);
  
    const avatarSVG = ReactDOMServer.renderToStaticMarkup(
      <Avatar
        size={size}
        name={name}
        variant={variant}
        colors={colors.split(',').map(hex => "#" + hex)}
      />
    );
  
    res.statusCode = 200;
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
    res.end(avatarSVG);

  } catch (e) {
    
    // Use a default profile picture when error is encountered.
    const avatarSVG = ReactDOMServer.renderToStaticMarkup(
      <Avatar
        size={40}
        name={"Maria Mitchell"}
        variant={"marble"}
        colors={["#A3A948","#EDB92E","#F85931","#CE1836","#009989"]}
      />
    );
  
    res.statusCode = 200;
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
    res.end(avatarSVG);
  }
}