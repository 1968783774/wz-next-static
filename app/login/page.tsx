import React from 'react';
import {Layout,Flex} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";

const fullScreenStyle: React.CSSProperties = {
    height: '100vh', // 使 Flex 容器占满视口高度
    width: '100vw',  // 使 Flex 容器占满视口宽度
    display: 'flex', // 允许子元素使用 flex 布局
    flexDirection: 'column', // 垂直方向排列子元素
};


function LoginPage(){
    return(
        <Flex style={fullScreenStyle}>
            <Layout>
               <Header>header</Header>
                <Content>wegfw</Content>
                <Footer>fewfw</Footer>
            </Layout>
        </Flex>
    )
}
export default LoginPage;