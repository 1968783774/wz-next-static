"use client"
import React, {useState} from "react";
import {Card, Flex, Form} from "antd";


const fullScreenStyle: React.CSSProperties = {
    height: '100vh', // 使 Flex 容器占满视口高度
    width: '100vw',  // 使 Flex 容器占满视口宽度
    display: 'flex', // 允许子元素使用 flex 布局
    flexDirection: 'column', // 垂直方向排列子元素
    backgroundColor: 'rgb(243, 244, 246)', // 设置背景色
};

const cardStyle: React.CSSProperties = {
    width: '300px',
    height: 'auto',
}

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password}),
        });

        if (res.ok) {
            const data = await res.json();
            alert(`欢迎回来，${data.user.name}!`);
        } else {
            alert("登录失败，请检查您的凭据。");
        }
    };

    return (
        <Flex style={fullScreenStyle} justify="center" align="center">
            <Card style={cardStyle}>
                <Form>
                    <Form.Item>
                        <h1>登录</h1>
                    </Form.Item>
                </Form>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">邮箱：</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password">密码：</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">登录</button>
                </form>
            </Card>
        </Flex>

    );
}