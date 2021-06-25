import React, { Component } from 'react';
import { BoardType } from '../../types';
import { Card, Typography, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { Button } from 'antd/lib/radio';

type Props = {
    board: BoardType,
}

type State = {
    board: BoardType,
    names: string[],
    componentSum: Array<number>
    ranks: Array<number>
}

export default class Ranking extends Component<{}, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            board: [],
            names: [],
            componentSum: [],
            ranks: [],
        }
    }

    createCompomentsSum(board: BoardType): number[] {
        return board.map(r => r.reduce((a, b) => a + b));
    }

    createRank(componentSum: number[], componentsNumber: number) {

        const sorted = Object.assign(componentSum.slice().sort(function (a, b) { return b - a }))
        const ranks: Array<number> = componentSum.slice().map(function (v) {
            return componentsNumber - sorted.indexOf(v)
        });

        return ranks;
    }

    componentDidMount() {
        const boardValue = localStorage.getItem("board");
        const board: BoardType = boardValue === null ? 0 : JSON.parse(boardValue);

        const namesValue = localStorage.getItem("names");
        const names: string[] = namesValue === null ? 0 : JSON.parse(namesValue);

        const componentsCount: number = board.length;

        const newBoard = createBoard(board, componentsCount);
        const componentSum = this.createCompomentsSum(newBoard);
        const newRanks = this.createRank(componentSum, names.length);

        this.setState({ board: newBoard, names: names, componentSum: componentSum, ranks: newRanks });
    }

    render() {

        const extras = <div>
            <Link to="/preference" style={{ margin: "1rem" }}>Рейтинг</Link>
            <Link to="/">Ввод данных</Link>
        </div>
        return (
            <Row justify="center" >
                <Col span={14}>
                    <Card title="Ранг" bordered={true} extra={extras}>
                        <Row gutter={[10, 8]} justify="center">
                            <Col>
                                <Row justify="center">
                                    <Col>
                                        <Typography.Text strong>Наименование</Typography.Text>
                                    </Col>
                                </Row>
                                {this.state.names.map((name, i) => (
                                    <Row justify='center' className="custom-block">
                                        <Col>
                                            <Typography.Text strong key={i}>{name}</Typography.Text>
                                        </Col>
                                    </Row>
                                ))}
                            </Col>
                            <Col>
                                <Row justify='center'>
                                    <Col>
                                        <Typography.Text strong >Вектор предпочтений</Typography.Text>
                                    </Col>
                                </Row>
                                {this.state.board.map((row, i) =>
                                    <Row justify="center">
                                        {row.map((preference, j) =>
                                            <Col key={i}>
                                                <Typography.Text className="custom-block" strong key={j}>{preference}</Typography.Text>
                                            </Col>
                                        )}

                                    </Row>)}
                            </Col>
                            <Col>
                                <Row justify='center'>
                                    <Col>
                                        <Typography.Text strong >Сумма компонент</Typography.Text>
                                    </Col>
                                </Row>
                                {this.state.componentSum.map((name, i) => (
                                    <Row className="custom-block" justify="center">
                                        <Col>
                                            <Typography.Text strong key={i}>{name}</Typography.Text>
                                        </Col>
                                    </Row>
                                ))}
                            </Col>
                            <Col>
                                <Row justify='center'>
                                    <Col>
                                        <Typography.Text strong >Ранг</Typography.Text>
                                    </Col>
                                </Row>
                                {this.state.ranks.map((rank, i) => (
                                    <Row className="custom-block" justify="center">
                                        <Col>
                                            <Typography.Text strong key={i}>{rank}</Typography.Text>
                                        </Col>
                                    </Row>
                                ))}
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        );
    };
}

export const createBoard = (board: BoardType, componentsCount: number): BoardType => {
    return board.map((row, i) => row.map(el => {
        return (el - 1)
    }));
};
