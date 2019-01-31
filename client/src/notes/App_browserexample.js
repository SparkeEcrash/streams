import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

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
        <BrowserRouter>
        <div>
            <Route path="/" exact component={PageOne} />
            <Route path="/pagetwo" exact component={PageTwo} />
        </div>
        </BrowserRouter>
    </div>
    )
};

export default App;

// import React from 'react';
// import { BrowserRouter, Route } from 'react-router-dom';

// const PageOne = () => {
//     return (
//     <div>PageOne
//         {/* //BAD DONT DO THIS */}
//         <a href="/pagetwo">Navigate to Page Two</a>
//     </div>
//     )
// };

// const PageTwo = () => {
//     return (
//     <div>
//         PageTwo
//         <button>Click Me!</button>
//         {/* //BAD DONT DO THIS */}
//         <a href="/">Navigate to Page One</a>
//     </div>
//     )
// };

// const App = () => {
//     return (
//     <div>
//         <BrowserRouter>
//         <div>
//             <Route path="/" exact component={PageOne} />
//             <Route path="/pagetwo" exact component={PageTwo} />
//         </div>
//         </BrowserRouter>
//     </div>
//     )
// };

// export default App;