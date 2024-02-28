// import { Redirect, Route } from 'react-router-dom';

// // Define a higher-order component for route guarding
// const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       isAuthenticated ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to="/login" />
//       )
//     }
//   />
// );

// // Define your authentication logic (e.g., checking if the user is logged in)
// const isAuthenticated = () => {
//   // Implement your authentication logic here
//   // For example, check if the user is logged in
//   // Return true if authenticated, false otherwise
//   return true; // For demonstration purposes, always return true
// };

// // Usage:
// // Wrap your protected routes with the ProtectedRoute component
// <ProtectedRoute
//   path="/protected"
//   component={ProtectedComponent}
//   isAuthenticated={isAuthenticated()}
// />

// // Define a regular Route for public routes
// <Route path="/login" component={Login} />
