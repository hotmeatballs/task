import React, {useState, useContext} from 'react';
import 'antd/dist/antd.css';
import {Form, Input, Button, Row, Col,} from 'antd';
import {useHistory} from 'react-router';
import {AppContext} from '../../utils/context';
import {authenticate} from '../../api/auth';
import {IUserIdentity} from '../../models/user';
export default function LoginPage() {
    const history = useHistory();
    const {setAuthenticated} = useContext(AppContext);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = async (values: IUserIdentity) => {
        const { data, errorText } = await authenticate(values);

        if (errorText)
            setError(true);
        else {
            setError(false);
                setAuthenticated(data);
            history.push('/calendar');
        }
    };

    const onFinishFailed = (errorInfo: object) => {
        console.log('Failed:', errorInfo);
    };
    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 5},
    };
    const tailLayout = {
        wrapperCol: {offset: 8, span: 5},
    };
    return (
        <Row justify="space-around" align="middle" style={{minHeight: '100%'}}>
            <Col span={4}>
                <Form
                    className={`login-form`}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}

                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

