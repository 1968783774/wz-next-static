"use client";
import React, {useState} from "react";
import {Card, Flex, Form, Input, Button} from "antd";
import useDeviceType from "@/app/useDeviceType";

// 在函数组件内部正确调用useDeviceType这个自定义Hook
const LoginForm = () => {
    // 获取设备类型状态，用于后续样式等逻辑判断
    const isMobile = useDeviceType();
    const fullScreenStyle: React.CSSProperties = {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgb(243, 244, 246)',
    };
    // 根据设备类型动态设置Card的宽度样式
    const cardStyle: React.CSSProperties = {
        width: isMobile ? '100vw' : '40vw',
        height: isMobile ? '100vh' : '40vh',
    };

    // 用于存储邮箱输入框的值
    const [email, setEmail] = useState("");
    // 用于存储密码输入框的值
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password}),
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
                <Form onSubmit={handleSubmit}>
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