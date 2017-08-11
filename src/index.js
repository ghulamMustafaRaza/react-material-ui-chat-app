import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { initializeApp } from 'firebase'

injectTapEventPlugin();

const config = {
    apiKey: "AIzaSyDb2fSkHDyZJDtOl2yJdU-tIi3COoVpjX8",
    authDomain: "collage-sytem.firebaseapp.com",
    databaseURL: "https://collage-sytem.firebaseio.com",
    projectId: "collage-sytem",
    storageBucket: "collage-sytem.appspot.com",
    messagingSenderId: "1081246764069"
};
initializeApp(config);

ReactDOM.render(
<MuiThemeProvider>
    <App />
</MuiThemeProvider>,
document.getElementById('root'));
registerServiceWorker();
