import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';

const PageOne = () => {
    return (
    <div>PageOne
        <Link to="/pagetwo">Navigate to Page Two</Link>
    </div>
    )
};

const PageTwo = () => {
    return (
    <div>
        PageTwo
        <button>Click Me!</button>
        <Link to="/">Navigate to Page One</Link>
    </div>
    )
};

const App = () => {
    return (
    <div>
        <HashRouter>
        <div>
            <Route path="/" exact component={PageOne} />
            <Route path="/pagetwo" exact component={PageTwo} />
        </div>
        </HashRouter>
    </div>
    )
};

export default App;