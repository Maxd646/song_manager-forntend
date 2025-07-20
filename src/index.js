import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './components/App';
import { ThemeProvider } from '@emotion/react';
import { lightTheme, darkTheme } from './theme';
import { BrowserRouter } from 'react-router-dom';
import { Global, css } from '@emotion/react';

const root = ReactDOM.createRoot(document.getElementById('root'));

function Root() {
  const [themeMode, setThemeMode] = React.useState('light');
  const theme = themeMode === 'light' ? lightTheme : darkTheme;
  const toggleTheme = () => setThemeMode((m) => (m === 'light' ? 'dark' : 'light'));
  return (
    <>
      <Global
        styles={css`
          html, body, #root {
            margin: 0;
            padding: 0;
            width: 100vw;
            min-height: 100vh;
            box-sizing: border-box;
            overflow-x: hidden;
          }
          *, *::before, *::after {
            box-sizing: inherit;
          }
        `}
      />
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App themeMode={themeMode} toggleTheme={toggleTheme} />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </>
  );
}

root.render(<Root />);