
/*eslint no-unused-vars: "off" */

import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'

import ReactKanban from 'react-kanban-dnd'

import {
    RowWrapper,
    InfoWrapper,
    Label,
    Value,
    Wrapper,
    Title
} from "./StyledComponents"

import { styles } from "./styles";

const MyKanban = () => {

    const [ columns, setColumns ] = useState([
        {
            id: "column1",
            title: "Column 1",
            rows: [
                {
                    id: "children1",
                    name: "John",
                    age: "21"
                },
                {
                    id: "children2",
                    name: "Alex",
                    age: "33"
                }
            ]
        },
        {
            id: "column2",
            title: "Column 2",
            rows: [
                {
                    id: "children3",
                    name: "Michael",
                    age: "29"
                },
                {
                    id: "children4",
                    name: "Carl",
                    age: "26"
                }
            ]
        }
    ])

    const renderCard = (row) => {

        console.log({ row })

        return (
            <RowWrapper>
                <InfoWrapper>
                    <Label>Name:</Label>
                    <Value>{row.name}</Value>
                </InfoWrapper>
                <InfoWrapper>
                    <Label>Age:</Label>
                    <Value>{row.age}</Value>
                </InfoWrapper>
            </RowWrapper>
        )
    }

    return (
        <div className="animated fadeIn">
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader>
                            <strong>Mi Kanban</strong>
                        </CardHeader>
                        <CardBody>
                            <div className="rt-wrapper">
                            <Wrapper>
                                <Title>React Kanban live demo</Title>
                                <ReactKanban
                                    columns={columns}
                                    renderCard={renderCard}
                                    onDragEnd={() => {}}
                                    cardWrapperStyle={styles.cardWrapper}
                                    columnStyle={styles.columnStyle}
                                    columnHeaderStyle={styles.columnHeaderStyle}
                                />
                            </Wrapper>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default MyKanban
