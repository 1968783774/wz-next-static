"use client";
import React, {useState} from "react";
import {Card, Flex, Form, Input, Button, FormInstance} from "antd";
import useDeviceType from "@/app/useDeviceType";

const LoginForm = () => {
    const isMobile = useDeviceType();
    const fullScreenStyle: React.CSSProperties = {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgb(243, 244, 246)',
    };
    const cardStyle: React.CSSProperties = {
        width: isMobile ? '100vw' : '40vw',
        height: isMobile ? '100vh' : '50vh',
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // 创建form实例的引用
    const [form] = Form.useForm();

    const handleSubmit = async (values: any) => {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email: values.email, password: values.password}),
            });

            if (res.ok) {
                const data = await res.json();
                alert(`欢迎回来，${data.user.name}!`);
            } else {
                const errorData = await res.json();
                alert(`登录失败，请检查您的凭据。错误信息：${errorData.message || '未知错误'}`);
            }
        } catch (error) {
            console.error('登录请求发生错误:', error);
            alert('登录过程出现异常，请稍后再试。');
        }
    };

    return (
        <Flex style={fullScreenStyle} justify="center" align="center">
            <Card style={cardStyle}>
                <Form
                    form={form} // 将创建的form实例绑定到Form组件
                    onFinish={handleSubmit} // 使用onFinish属性来处理表单提交
                >
                    <Form.Item
                        label="邮箱"
                        name="email"
                        rules={[{type: 'email', required: true}]}
                    >
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{required: true}]}
                    >
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Flex>
    );
};

export default LoginForm;