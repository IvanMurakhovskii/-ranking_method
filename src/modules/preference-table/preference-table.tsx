import React, { Component } from 'react';
import { BoardType, Coordinate } from '../../types';
import { InputNumber, Row, Col, Typography, Input, Button, Card } from 'antd';
import { withRouter, Link } from 'react-router-dom';

type State = {
  board: BoardType;
  expertsCount: number;
  names: string[];
}

class PreferenceTable extends Component<any, State> {

  constructor(props: any) {
    super(props);

    this.state = {
      board: [],
      expertsCount: 0,
      names: [],
    }
  }

  componentDidMount() {
    const expertsCountValue = localStorage.getItem("expertsCount");
    const expertsCount: number = expertsCountValue === null ? 0 : JSON.parse(expertsCountValue);

    const namesValue = localStorage.getItem("names");
    const names = namesValue === null ? [] : JSON.parse(namesValue);

    console.log(names.length);

    const board = makeGrid(names.length || 0, expertsCount);

    console.log(board);

    this.setState({
      board,
      expertsCount,
      names
    });
  }

  updateBoard(coordinate: Coordinate, value: number) {
    let board = Object.assign(this.state.board);

    board[coordinate.x][coordinate.y] = value;

    this.setState(board);
  }

  onButtonClick = () => {
    localStorage.setItem("board", JSON.stringify(this.state.board));
    this.props.history.push("/ranking");
  }

  render() {

    const extras = <div>
      <Link to="/">Ввод данных</Link>
    </div>

    return (
      <Row justify="center" >
        <Col span={15}>
          <Card title="Рейтинг" bordered={true} extra={extras}>
            <Row gutter={[8, 8]} justify="center">
              <Col span={6}>
                <Row justify="center">
                  <Col>
                    <Typography.Text strong>Наименование</Typography.Text>
                  </Col>
                </Row>
                {this.state.names.map((name, i) => (
                  <Row justify='center' className="custom-block">
                    <Col>
                      <Typography.Text strong key={i}>{name}</Typography.Text>
                      {/* <Input key={i} value={name} disabled /> */}
                    </Col>
                  </Row>
                ))}
              </Col>
              <Col>
                <Row justify="center">
                  <Col>
                    <Typography.Text strong>Предпочтения</Typography.Text>
                  </Col>
                </Row>
                {this.state.board.map((row, i) =>
                  <Row>
                    <Col key={i}>{row.map((preference, j) =>
                      <InputNumber key={j} value={preference}
                        onChange={(value: number) => { this.updateBoard({ x: i, y: j }, value); }} />
                    )}
                    </Col>
                  </Row>)}
              </Col>
            </Row>
            <Row justify="center" gutter={[8, 8]} style={{ marginTop: "1rem" }}>
              <Col>
                <Button onClick={this.onButtonClick} type="primary">Рассчитать ранг</Button>
              </Col>
            </Row>
          </Card>
        </Col>

      </Row >
    );
  };
}

export const makeGrid = (components: number, experts: number): BoardType => {
  let grid = [];
  for (var i = 0; i < components; i++) {
    var row = [];
    for (var j = 0; j < experts; j++) {
      row.push(0);
    }
    grid.push(row);
  }
  return grid;
};

export default withRouter(PreferenceTable);