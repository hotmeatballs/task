import React from "react";
import { Calendar as CalendarBlock } from "antd";
import moment from "moment";
import { Badge } from "antd";
import { IEvent } from "../../models/event";
import { IProfile } from "../../models/profile";
type CalendarProps = {
  profile: IProfile | null;
  events: IEvent[];
};
const Calendar: React.FC<CalendarProps> = ({ events, profile }) => {
  const dateFormat = "DD/MM/YYYY";
  const dateCellRender = (value: moment.Moment) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, key) => (
          <li key={key}>
            <Badge status="success" text="Событие" />
          </li>
        ))}
      </ul>
    );
  };
  const getListData = (value: moment.Moment) => {
    return (
      events.filter(
        (x) =>
          x.username === profile?.username &&
          x.date === value.format(dateFormat)
      ) || []
    );
  };
  return <CalendarBlock dateCellRender={dateCellRender} />;
};

export default React.memo(Calendar);
