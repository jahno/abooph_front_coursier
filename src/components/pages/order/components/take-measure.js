import React, { useState, useEffect } from 'react'

import { Modal, Form, Input, Button, Space, Spin } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { addMeasure, gakeMeasuresBySex } from 'services/api'

export default function TakeMeasure(props) {
    const { visible, handleCancel, order } = props

    console.log(order);
    const [ state, setState ] = useState({
        isLoading: true,
        visible: false,
        confirmLoading: false,
        measures: []
    })

    const [form] = Form.useForm();

    useEffect(() => {
        gakeMeasuresBySex(order.user.sexe, (res) => {
            setState(state => ({
                ...state,
                isLoading: false,
                measures: res
            }));
        })
    },[])

    const onFinish = values => {
        const newValues = [...values.description]

        for (const property in values) {
            if(property != 'description')(
                newValues.push({label: property, value: values[property]})
            )
        }


        setState(state => ({
            ...state,
            confirmLoading: true,
        }));

        addMeasure(order.id, {description: newValues}, (response) => {
            handleCancel(null, true)
            },
            () => {setState(state => ({...state, confirmLoading: false}))}
        )
    };
    
    const {  confirmLoading, isLoading } = state;

    if(isLoading){
        return (
            <Modal
                title="Récuperation des mesures"
                centered
                visible={true}
                closable={false}
                footer={null}
            >
                <><Spin/> Veuillez patienter, récuperation des mesures en cours ...</>
            </Modal>
        )
    }

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
            <Form form={form} {...formItemLayout} name="take_measure_form" onFinish={onFinish} autoComplete="off">
            {/* <Form.Item name="test1" label="Test 1" rules={[{ required: true, message: 'Missing area' }]}>
                <Select options={areas} onChange={handleChange} />
            </Form.Item>
            */}

            {state.measures.map(item => (
                <Form.Item labelAlign='left' name={item.Libelle} label={item.Libelle} rules={[{ required: true, message: 'Valeur obligatoire' }]}>
                    <Input />
                </Form.Item>
            ))}

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

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 24},
        md: {span: 6},
        lg: {span: 6},
        xl: {span: 6},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 24},
        md: {span: 24},
        lg: {span: 24},
        xl: {span: 24},
    },
    style: {
        width: "100%"
    }
};