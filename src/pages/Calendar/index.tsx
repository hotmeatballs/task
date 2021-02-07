import React, {useState, useContext} from 'react';
import {Layout, Row, Col, Menu, Calendar, Badge, Button, Modal, DatePicker, Select} from 'antd';
import {AppContext} from '../../utils/context';
import moment from 'moment';

const {Header, Content} = Layout;


export default function LoginPage() {

    const {profile, logout, users, setEvents, events} = useContext(AppContext);
    const [open, setOpen] = useState(false);
    const dateFormat = 'DD/MM/YYYY';

    const [dateValue, setDateValue] = useState(moment().format(dateFormat));
    const [userValue, setUserValue] = useState('');

    const handleDateChange = (value: moment.Moment | null, dateStr: string): void => setDateValue(dateStr);
    const handleUserChange = (value: string) => setUserValue(value);

    const handleOk = () => {
        setOpen(false);

        if (dateValue && userValue)
            setEvents([...events, {date: dateValue, username: userValue}]);

    };

    const handleCancel = () => {
        setOpen(false);
    };

    const getListData = (value: moment.Moment) => {
        return events.filter(x => x.username === profile?.username && x.date === value.format(dateFormat)) || [];
    }


    const dateCellRender = (value: moment.Moment) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map(item => (
                    <li key={item.date}>
                        <Badge status={'success'} text={'Событие'}/>
                    </li>
                ))}
            </ul>
        );
    }


    return (
        <>
            <Layout className="layout">
                <Header>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="2" style={{float: "right"}} onClick={() => logout()}>Выйти</Menu.Item>
                        <Menu.Item key="1" style={{float: "right"}}>{profile?.username}</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{padding: '0 50px'}}>
                    <div className="site-layout-content">
                        <Calendar dateCellRender={dateCellRender}/>
                        <Row>
                            <Col md={{span: 12, offset: 6}} style={{margin: '20px auto'}}>
                                <Button type="primary" block onClick={() => setOpen(s => !s)}>
                                    Добавить событие
                                </Button>
                            </Col>
                        </Row>


                    </div>
                </Content>
            </Layout>

            <Modal
                visible={open}
                title="Добавление события"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Отменить
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Добавить
                    </Button>
                ]}
            >
                <p>Дата события:</p>
                <DatePicker onChange={handleDateChange} defaultValue={moment()} format={dateFormat}/>
                <p>Гости</p>
                <Select style={{width: 120}} onChange={handleUserChange} options={users.map(item =>
                    ({label: item.username, value: item.username})
                )}>
                </Select>

            </Modal>
        </>
    );
}

