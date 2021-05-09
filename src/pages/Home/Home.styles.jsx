import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  homeArea: {
    width: '25rem',
    height: '16rem',
    borderRadius: '7px',
    backgroundColor: theme.palette.background.fiveperc,
    position: 'absolute',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    margin: 'auto',
    overflow: 'auto',
  },
  homeText: {
    textAlign: 'center',
    paddingTop: '1rem',
  },
  mainText: {
    paddingTop: '2rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
}));
