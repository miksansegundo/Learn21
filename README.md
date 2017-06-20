The Letters Game
================

This repo holds **The Letters Game** for Learn21. It's coded on **TypeScript** with **[JavaScript Standard Style](https://standardjs.com/)** and it's built with **Webpack**. 

The stack is:
  - **React**
  - **Redux**
  - **CSS Modules**
  - **postCSS**

### Requirements
1. The Game component accepts one parameter `word`
2. The Word is scrambled and broken down into letters inside cards: family becomes -> [ y ] [ l ] [ m ] [ f ] [ a ] [ l ] [ i ] 
3. You can type letter after letter and the cards will start lining up. If you type: f, a, the cards will look like: [ f ], [ a ], ...
4. Pressing Backspace undoes the last step
5. Cards can also be dragged in order using mouse
6. When you press Enter the correctness of each card is checked out, correctly positioned ones are highlighted in green, incorrect ones are in red

## NPM Scripts

### Run

Runs a webpack-dev-server at http://localhost:8080

    npm start

### Build

Builds a distribution version in the *public* directory

    npm run build

### Deploy

Deploy a distribution version in the http://learn21.surge.sh domain

    npm run deploy