# Guide (Local React App)

Github repository for this Walkthrough Guide: [https://github.com/zesty-io/zesty-local-react-example](https://github.com/zesty-io/zesty-local-react-example)

## Getting Started with the Example App

First, we'll need to install the `pull-zesty` package. (For more detail,[ see the docs page ](https://github.com/zesty-io/zesty-org/tree/2c2b2cdfbf60f7308aedeb999c44eb98b7dbd490/pullzesty.md)on `pullzesty`)

```bash
git clone https://github.com/zesty-io/pullzesty
cd pullzesty
npm link
```

Next, lets clone [the example app](https://github.com/zesty-io/zesty-local-react-example)

```
cd path/to/your/projects/folder
git clone https://github.com/zesty-io/Zesty-Local-React-Example
cd Zesty-Local-React-Example
```

Now, all we need to do to run is install the required dependencies

```bash
npm install
npm start
```

> Note how calling `npm start` also calls `pullzesty`

### Understanding the Example Project

The `zesty.yaml` file defines what endpoints we rely on. In this case, we are using two custom endpoints, [`/-/basic-api/homepage.json`](https://6c706l48-dev.preview.zestyio.com/-/basic-api/homepage.json) and [`/-/custom/menulist.json`](https://6c706l48-dev.preview.zestyio.com/-/custom/menulist.json)\`\`

We save the `.json` from these endpoints into `src/data` and use the data in our React code. This can be seen in [`src/Home.js`](https://github.com/zesty-io/Zesty-Local-React-Example/blob/master/src/Home.js) and [`src/Menu.js`.](https://github.com/zesty-io/Zesty-Local-React-Example/blob/master/src/Menu.js)


```jsx
import React, { Component } from "react";
let homepageJSON = require("./data/homepage.json");

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeData: {}
    };
  }
  componentDidMount() {
    const loadData = () => {
      let data = JSON.parse(JSON.stringify(homepageJSON));
      this.setState({ homeData: data });
    };
    loadData();
  }
  render() { // greatly simplified for explanation, see the full file on Github
    return (
      <div data-spy="scroll" data-target="#site-navbar" data-offset="200">
        <h1 className="site-heading no- mb-3">
          {this.state.homeData.data &&
            this.state.homeData.data.splash_title}
        </h1>
        <h2 className="h5 site-subheading mb-5 no-">
          {this.state.homeData.data &&
            this.state.homeData.data.splash_description}
        </h2>
      </div>
    );
  }
}
```


> Note how the only difference between the [local](https://github.com/zesty-io/zesty-org/tree/2c2b2cdfbf60f7308aedeb999c44eb98b7dbd490/headless/react/local-guide.md#understanding-the-example-project) and [remote](https://github.com/zesty-io/zesty-org/tree/2c2b2cdfbf60f7308aedeb999c44eb98b7dbd490/headless/react/remote-guide.md#understanding-the-example-project) examples is `componentDidMount`

Using `componentDidMount`, we're able to load in our JSON and render it accordingly. After we load it in, it's just a matter of parsing a JS Object.

Additionally, it's not too much different to change this to work remotely instead of locally, as the next guide will show.
