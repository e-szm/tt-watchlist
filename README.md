# Eddie's tastytrade Watchlist Application

Welcome! This watchlist application was built using SvelteKit and TypeScript, with no additional open source libraries. I had a great time building it and hope you enjoy looking through the code and playing around with the functionality.

## A Quick Note on the Features

My goal going into this coding challenge was to learn SvelteKit, apply best practices, and create an enjoyable, seamless user experience that meets (at minimum) all base requirements.

With that being said, you may notice some common UI features are not present, such as disabling form inputs & buttons while an async request is processing or media queries for full responsiveness. Features like these that are not exclusive to Svelte development nor explicitly stated in the requirements were not forgotten, but put in the "backlog" and tackled as time permitted.

Unit tests also fall into the same vein. A real-world application would ideally have thorough unit tests to accompany components and functionality. As I was using Svelte for the first time, much of my development process was experimentation and getting comfortable with its features, leaving unit test development as a low-priority item for this challenge.

I hope you do find, however, that the prioritized features that made it to development were well-thought out, implemented with care, and tested thoroughly.

## Now Let's Set it Up

Since this is just a SvelteKit project, the setup is pretty straight forward:

```
gh repo clone https://github.com/e-szm/tt-watchlist.git

cd tt-watchlist

npm i
npm run dev
```

The application should now be running on http://localhost:5173/.

If you'd prefer, you can also preview a production build:

```
npm run build
npm run preview
```

Enjoy!
