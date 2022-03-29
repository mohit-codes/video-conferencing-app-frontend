import { createUseStyles } from 'react-jss';
import { Col } from './Col';
import { Container } from './Container';
import { Row } from './Row';

const useStyles = createUseStyles({
  grid: {
    '& [class^=row]': {
      '&>[class^=col]': {
        backgroundColor: '#bbeffd',
        border: '1px solid #61dafb',
        paddingBottom: '0.75rem',
        paddingTop: '0.75rem'
      }
    }
  }
});

export const Example = () => {
  const classes = useStyles();
  return (
    <div className={classes.grid}>
      <div>
        <Container>
          <Row xs={2} md={4} lg={6}>
            <Col>1 of 2</Col>
            <Col>2 of 2</Col>
          </Row>
          <Row xs={1} md={2}>
            <Col>1 of 3</Col>
            <Col>2 of 3</Col>
            <Col>3 of 3</Col>
          </Row>
          <Row xs='auto'>
            <Col>1 of 3</Col>
            <Col>2 of 3</Col>
            <Col>3 of 3</Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
