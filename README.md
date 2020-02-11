I wanted to get more into Hooks, so I'm following [this](https://www.youtube.com/watch?v=hT3j87FMR6M&list=WL&index=8&t=402s) tutorial on [FreeCodeCamp](https://freecodecamp.org)

It's interesting that this probably looks more or less like every other todo project in the world, maybe a bit sharper. There's actually a lot of interesting things lurking under the surface.

**Hooks and Context:** The frontend is completely functional (no class components), so it uses Custom Hooks and Context to pass around state.

**Accessibility:** The project tries to allow use of onKeyDown in addition to onClick, in addition to using aria-labels and tabIndex in order to improve accessibility.

**100% Code Coverage:** Using React's testing library, there is 100% code coverage. If you'd like to test this for yourself, you can check the `/coverage` directory, and run the index.html. Alternatively, clone and run `yarn test --coverage --watchAll=false`, though make sure you're running a version of node low enough so that Firebase doesn't complain. (I run 8.17.0 for the tests.) This brings up:

**Firebase Integration:** Firebase is leveraged as the database.

**Sass (SCSS):** The CSS here isn't plain-old-run-of-the-mill CSS, but rather super-cool-hipster SCSS.

You can access a live version I deployed with Netlify [here](https://elegant-morse-2d26dd.netlify.com/) , though I cannot guarantee that I'll always leave Firebase open, meaning that you may not be able to change data on the site.
