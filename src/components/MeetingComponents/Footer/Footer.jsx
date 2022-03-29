import { useFooterStyles } from './Footer.styles';

export const Footer = ({ meetingCode }) => {
  const classes = useFooterStyles();

  return (
    <div className={classes.footer}>
      <p>{`03:00 PM${meetingCode}`}</p>
    </div>
  );
};
