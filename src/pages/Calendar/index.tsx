import React, { useState, useContext, useEffect } from "react";
import {
  Layout,
  Row,
  Col,
  Menu,
  Button,
  Modal,
  DatePicker,
  Select,
} from "antd";
import { AppContext } from "../../utils/context";
import moment from "moment";
import Calendar from "../../components/Calendar";
import { updateEvents } from "../../api/events";
const { Header, Content } = Layout;

export default function CalendarPage() {
  const { profile, logout, users, setEvents, events } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const dateFormat = "DD/MM/YYYY";

  const [dateValue, setDateValue] = useState(moment().format(dateFormat));
  const [userValue, setUserValue] = useState("");
  useEffect(() => {
    updateEvents(events);
  }, [events]);
  const handleDateChange = (
    value: moment.Moment | null,
    dateStr: string
  ): void => setDateValue(dateStr);
  const handleUserChange = (value: string) => setUserValue(value);

  const handleOk = () => {
    setOpen(false);

    if (dateValue && userValue) {
      setEvents([...events, { date: dateValue, username: userValue }]);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Layout className="layout">
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item
              key="2"
              style={{ float: "right" }}
              onClick={() => logout()}
            >
              Выйти
            </Menu.Item>
            <Menu.Item key="1" style={{ float: "right" }}>
              {profile?.username}
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div className="site-layout-content">
            <Calendar events={events} profile={profile} />
            <Row>
              <Col md={{ span: 12, offset: 6 }} style={{ margin: "20px auto" }}>
                <Button type="primary" block onClick={() => setOpen((s) => !s)}>
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
          </Button>,
        ]}
      >
        <p>Дата события:</p>
        <DatePicker
          onChange={handleDateChange}
          defaultValue={moment()}
          format={dateFormat}
        />
        <p>Гости</p>
        <Select
          style={{ width: 120 }}
          onChange={handleUserChange}
          options={users.map((item) => ({
            label: item.username,
            value: item.username,
          }))}
        ></Select>
      </Modal>
    </>
  );
}
