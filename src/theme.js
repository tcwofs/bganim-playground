import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

const darkTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'dark',
      background: {
        default: '#121212',
        fiveperc: '#1D1D1D',
        sevenperc: '#212121',
        eightperc: '#242424',
        nineperc: '#272727',
        elevenperc: '#2A2A2A',
        tvelveperc: '#2C2C2C',
        fourteentperc: '#323232',
        fifteenperc: '#333333',
        sixteenperc: '#363636',
      },
      primary: {
        main: '#BB86FC',
        dark: '#3700B3',
      },
      secondary: {
        main: '#03DAC6',
      },
      error: {
        main: '#CF6679',
      },
      text: {
        primary: '#f1f1f1',
        secondary: '#121212',
        error: '#CF6679',
      },
    },
  })
);

export default darkTheme;
