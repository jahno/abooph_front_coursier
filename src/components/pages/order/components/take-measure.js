import React, { useState } from 'react'

import { Modal, Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { addMeasure } from 'services/api'

export default function TakeMeasure(props) {
    const { visible, handleCancel, order } = props

    const [ state, setState ] = useState({
        visible: false,
        confirmLoading: false,
    })

    const [form] = Form.useForm();

    const onFinish = values => {
        setState(state => ({
            ...state,
            confirmLoading: true,
        }));

        addMeasure(order.id, values, (response) => {
            handleCancel(null, true)
            },
            () => {setState(state => ({...state, confirmLoading: false}))}
        )
    };
    
    const {  confirmLoading } = state;

    return (
      <>
        <Modal
            title="Prise de mesure"
            visible={visible}
            onOk={form.submit}
            okText="Valider"
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            cancelText="Annuler"
        >
            <Form form={form} name="take_measure_form" onFinish={onFinish} autoComplete="off">
            {/* <Form.Item name="test1" label="Test 1" rules={[{ required: true, message: 'Missing area' }]}>
                <Select options={areas} onChange={handleChange} />
            </Form.Item>

            <Form.Item name="test2" label="Test 2" rules={[{ required: true, message: 'Missing area' }]}>
                <Input />
            </Form.Item> */}

            <Form.List name="description">
                {(fields, { add, remove }) => {
                    return (
                        <>
                        {fields.map(field => (
                            <Space key={field.key} align="start">
                            <Form.Item
                                {...field}
                                label="Libellé"
                                name={[field.name, 'label']}
                                fieldKey={[field.fieldKey, 'label']}
                                rules={[{ required: true, message: 'Libellé obligatoire' }]}
                            >
                                <Input />
                            </Form.Item>
                            
                            <Form.Item
                                {...field}
                                label="Valeur"
                                name={[field.name, 'value']}
                                fieldKey={[field.fieldKey, 'value']}
                                rules={[{ required: true, message: 'Valeur obligatoire' }]}
                            >
                                <Input />
                            </Form.Item>

                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                            </Space>
                        ))}

                        <Form.Item>
                            <Button
                            type="dashed"
                            onClick={() => {
                                add();
                            }}
                            block
                            >
                            <PlusOutlined /> Ajouter
                            </Button>
                        </Form.Item>
                        </>
                    );
                }}
            </Form.List>
            </Form>
        </Modal>
      </>
    );
}
