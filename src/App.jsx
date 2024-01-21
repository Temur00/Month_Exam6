// import React, { Suspense, lazy, useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.scss";

// const Sidebar = lazy(() => import("./components/Sidebar"));
// const Header = lazy(() => import("./components/Header"));
// const Loader = lazy(() => import("./components/Loader"));

// const AddProducts = lazy(() => import("./pages/Add/AddProducts"));
// const Login = lazy(() => import("./pages/Login/Login"));
// const Products = lazy(() => import("./pages/Products/Products"));
// const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
// const Profile = lazy(() => import("./pages/Profile/Profile"));

// const [editing, setEditing] = useState;

// const App = () => {
//   const userData = JSON.parse(localStorage.getItem("user"));
//   const [user, setUser] = useState("userData");

//   useEffect;

//   return (
//     <div className=" d-flex w-100">
//       <Router>
//         {user ? <Sidebar /> : null}

//         <div>
//           {user ? <Header user={user} /> : null}
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <Suspense fallback={<Loader />}>
//                   <Products
//                     user={user}
//                     editing={editing}
//                     setEditing={setEditing}
//                   />
//                 </Suspense>
//               }
//             />
//             <Route
//               path="/login" // LOGIN
//               element={
//                 <Suspense fallback={<Loader />}>
//                   <Login setUser={setUser} />
//                 </Suspense>
//               }
//             />
//             <Route
//               path="/addProducts"
//               element={
//                 <Suspense fallback={<Loader />}>
//                   <AddProducts user={user} editing={editing} />
//                 </Suspense>
//               }
//             />
//             <Route
//               path="*"
//               element={
//                 <Suspense fallback={<Loader />}>
//                   <NotFound />
//                 </Suspense>
//               }
//             />
//             <Route
//               path="/profile"
//               element={
//                 <Suspense fallback={<Loader />}>
//                   <Profile setUser={setUser} user={user} />
//                 </Suspense>
//               }
//             />
//           </Routes>
//         </div>
//       </Router>
//     </div>
//   );
// };

// export default App;

import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";

const Sidebar = lazy(() => import("./components/Sidebar"));
const Header = lazy(() => import("./components/Header"));
const Loader = lazy(() => import("./components/Loader"));

const AddProducts = lazy(() => import("./pages/Add/AddProducts"));
const Login = lazy(() => import("./pages/Login/Login"));
const Products = lazy(() => import("./pages/Products/Products"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const Profile = lazy(() => import("./pages/Profile/Profile"));

const App = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(userData || {}); // Provide the initial value for useState

  const [editing, setEditing] = useState(false); // Provide the initial value for useState

  useEffect(() => {
    // Your useEffect logic goes here
  }, []); // Add dependencies if needed

  return (
    <div className="d-flex w-100">
      <Router>
        {user ? <Sidebar /> : null}

        <div>
          {user ? <Header user={user} /> : null}
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<Loader />}>
                  <Products
                    user={user}
                    editing={editing}
                    setEditing={setEditing}
                  />
                </Suspense>
              }
            />
            <Route
              path="/login"
              element={
                <Suspense fallback={<Loader />}>
                  <Login setUser={setUser} />
                </Suspense>
              }
            />
            <Route
              path="/addProducts"
              element={
                <Suspense fallback={<Loader />}>
                  <AddProducts user={user} editing={editing} />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<Loader />}>
                  <NotFound />
                </Suspense>
              }
            />
            <Route
              path="/profile"
              element={
                <Suspense fallback={<Loader />}>
                  <Profile setUser={setUser} user={user} />
                </Suspense>
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
