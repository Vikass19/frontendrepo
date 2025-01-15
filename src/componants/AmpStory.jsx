import React from "react";

const AmpStory = () => {
  return (
    <html
      amp=""
      lang="en"
      style={{ fontFamily: "Arial, sans-serif", height: "100%" }}
    >
      <head>
        <meta charSet="utf-8" />
        <title>AMP Story in React</title>
        <link
          rel="canonical"
          href="https://yourwebsite.com/story"
        />
        <meta
          name="viewport"
          content="width=device-width,minimum-scale=1,initial-scale=1"
        />
        <script
          async
          src="https://cdn.ampproject.org/v0.js"
        ></script>
        <script
          async
          custom-element="amp-story"
          src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
        ></script>
        <style
          amp-custom
        >{`
          amp-story { font-family: sans-serif; }
          amp-story-page { background: #fafafa; color: #333; }
          h1 { color: #0073e6; }
        `}</style>
      </head>
      <body>
        <amp-story
          standalone=""
          title="My AMP Story"
          publisher="Your Website"
          publisher-logo-src="https://yourwebsite.com/logo.png"
          poster-portrait-src="https://yourwebsite.com/poster.jpg"
        >
          <amp-story-page id="page1">
            <amp-story-grid-layer template="vertical">
              <h1>Welcome to My Story</h1>
              <p>This is the first page of your story.</p>
            </amp-story-grid-layer>
          </amp-story-page>

          <amp-story-page id="page2">
            <amp-story-grid-layer template="vertical">
              <h2>Swipe to Discover</h2>
              <p>React-based AMP stories are awesome!</p>
            </amp-story-grid-layer>
          </amp-story-page>

          <amp-story-page id="page3">
            <amp-story-grid-layer template="vertical">
              <h2>Thank You!</h2>
              <p>Stay tuned for more stories.</p>
            </amp-story-grid-layer>
          </amp-story-page>
        </amp-story>
      </body>
    </html>
  );
};

export default AmpStory;
