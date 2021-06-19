import React, { Component } from 'react';
import { BoardType, Coordinate } from '../../types';
import { InputNumber, List, Input, Typography, Row, Col } from 'antd';

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
        return (
            <div>
                <Row gutter={[8, 8]} justify="center">
                    <Col>
                        <Typography.Text>Наименование</Typography.Text>
                        {this.state.names.map(name => (
                            <Row>
                                <Col>
                                    <Input value={name} disabled />
                                </Col>
                            </Row>
                        ))}
                    </Col>
                    <Col>
                        <Typography.Text>Вектор предпочтений</Typography.Text>
                        {this.state.board.map((row, i) =>
                            <Row>
                                <Col key={i}>{row.map((preference, j) =>
                                    <InputNumber key={j} value={preference} disabled />
                                )}
                                </Col>
                            </Row>)}
                    </Col>
                    <Col>
                        <Typography.Text>Сумма компонент</Typography.Text>
                        {this.state.componentSum.map(name => (
                            <Row>
                                <Col>
                                    <Input value={name} disabled />
                                </Col>
                            </Row>
                        ))}
                    </Col>
                    <Col>
                        <Typography.Text>Ранг</Typography.Text>
                        {this.state.ranks.map(rank => (
                            <Row>
                                <Col>
                                    <Input value={rank} disabled />
                                </Col>
                            </Row>
                        ))}
                    </Col>
                </Row>
            </div>
        );
    };
}

export const createBoard = (board: BoardType, componentsCount: number): BoardType => {
    return board.map((row, i) => row.map(el => {
        return (el - 1)
    }));
};
