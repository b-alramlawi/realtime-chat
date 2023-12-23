// import React from 'react';
// import Colors from "./Colors";
//
//
// const Theme = {
//     lightTheme: {
//         primaryColor: Colors.maroon,
//         hintColor: Colors.crimson,
//         unselectedWidgetColor: Colors.lightGray,
//         splashColor: Colors.almostWhite,
//         appBarTheme: {
//             systemOverlayStyle: {
//                 statusBarColor: Colors.maroon,
//             },
//         },
//         textTheme: {
//             fontFamily: 'Poppins, sans-serif', // Set the font family
//             // Define other text styles as needed
//         },
//     },
//     darkTheme: {
//         primaryColor: Colors.maroon,
//         hintColor: Colors.crimson,
//         splashColor: Colors.almostWhite,
//         appBarTheme: {
//             systemOverlayStyle: {
//                 statusBarColor: Colors.maroon,
//             },
//         },
//         textTheme: {
//             fontFamily: 'Poppins, sans-serif', // Set the font family
//             // Define other text styles as needed
//         },
//     },
// };
//
// const ThemeContext = React.createContext(Theme.lightTheme); // Set the initial theme
//
// export {ThemeContext, Theme};
// /src/components/Theme.js

import Colors from './Colors';

const Theme = {
    lightTheme: {
        primaryColor: Colors.maroon,
        hintColor: Colors.crimson,
        unselectedWidgetColor: Colors.lightGray,
        splashColor: Colors.almostWhite,
        appBarTheme: {
            systemOverlayStyle: {
                statusBarColor: Colors.maroon,
            },
        },
        textTheme: {
            fontFamily: 'Poppins, sans-serif', // Set the font family
            // Define other text styles as needed
        },
    },
    darkTheme: {
        primaryColor: Colors.maroon,
        hintColor: Colors.crimson,
        splashColor: Colors.almostWhite,
        appBarTheme: {
            systemOverlayStyle: {
                statusBarColor: Colors.maroon,
            },
        },
        textTheme: {
            fontFamily: 'Poppins, sans-serif', // Set the font family
            // Define other text styles as needed
        },
    },
};

export default Theme;
