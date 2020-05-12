import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: theme.palette.background.default,
    zIndex: '-1',
    position: 'absolute',
    display: 'block',
    width: '100%',
    height: '100%',
  },
}));
