import React from 'react';
import { Form, Input, Button, InputNumber, Card, Row, Col } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

type FormReturnValue = {
    expertsCount: number
    names: string[]
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 6 },
    },
};


const FillTableSizeForm = () => {

    const history = useHistory();


    const onFinish = ({ expertsCount, names }: FormReturnValue) => {

        localStorage.setItem("expertsCount", JSON.stringify(expertsCount));
        localStorage.setItem("names", JSON.stringify(names));

        history.push("/preference");
    };

    return (
        <Row style={{ display: "flex" }} justify="center">
            <Col flex={2} span={18}>
                <Card title="Начальные данные" style={{ width: '100%' }}>
                    <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>
                        <Form.Item
                            {...formItemLayout}
                            label="Количество экспертов"
                            required={true}
                            name={"expertsCount"} rules={[{ type: 'number', min: 0, message: "Количество экспертов не может быть меньше 0" }]}
                        >
                            <InputNumber style={{ width: '80%' }} />
                        </Form.Item>
                        <Form.List
                            name="names"
                            rules={[
                                {
                                    validator: async (_, names) => {
                                        if (!names || names.length < 2) {
                                            return Promise.reject(new Error('Как минимум нужно ввести 2 компоненты!'));
                                        }
                                    },
                                },
                            ]}
                        >
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    {fields.map((field, index) => (
                                        <Form.Item
                                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                            label={index === 0 ? 'Объекты исследования' : ''}
                                            required={false}
                                            key={field.key}
                                        >
                                            <Form.Item
                                                {...field}
                                                validateTrigger={['onChange', 'onBlur']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        whitespace: true,
                                                        message: "Пожалуйста введите название объекта или удалить это поле!.",
                                                    },
                                                ]}
                                                noStyle
                                            >
                                                <Input placeholder="Название объекта исследования" style={{ width: '80%' }} />
                                            </Form.Item>
                                            {fields.length > 1 ? (
                                                <MinusCircleOutlined
                                                    className="dynamic-delete-button"
                                                    onClick={() => remove(field.name)}
                                                />
                                            ) : null}
                                        </Form.Item>
                                    ))}
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            style={{ width: '60%' }}
                                            icon={<PlusOutlined />}
                                        >
                                            Добавить обект исследования
                                        </Button>
                                        <Form.ErrorList errors={errors} />
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Заполнить
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row >

    );
};


export default FillTableSizeForm;

