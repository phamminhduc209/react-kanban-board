import React from "react";
import { Draggable } from 'react-beautiful-dnd';

import {
  Card,
  Avatar,
  Tooltip,
  Popconfirm,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  AntDesignOutlined,
  UserOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

function SimpleCard({ card, index }) {
  return (
    <Draggable draggableId={card.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='card'
        >
          <Card
            className="cardItem"
            cover={<img alt="example" src="https://picsum.photos/265/160" />}
            actions={[
              <Tooltip title="View">
                <FileTextOutlined key="view" />
              </Tooltip>,
              <Tooltip title="Edit">
                <EditOutlined key="edit" />
              </Tooltip>,
              <Popconfirm
                title="Delete the card"
                description="Are you sure to delete this card?"
                onConfirm={() => {}}
                onCancel={() => {}}
                okText="Yes"
                cancelText="No"
                className="ml-10"
              >
                <Tooltip title="Delete">
                  <DeleteOutlined key="ellipsis" />
                </Tooltip>
              </Popconfirm>,
            ]}
          >
            <Meta
              title={card.title}
              description={
                <>
                  <div>{card.description}</div>
                  <Avatar.Group
                    maxCount={2}
                    maxPopoverTrigger="click"
                    size="large"
                    maxStyle={{
                      color: "#f56a00",
                      backgroundColor: "#fde3cf",
                      cursor: "pointer",
                    }}
                    className="avatarGroup"
                  >
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
                    <Tooltip title="Ant User" placement="top">
                      <Avatar
                        style={{ backgroundColor: "#87d068" }}
                        icon={<UserOutlined />}
                      />
                    </Tooltip>
                    <Avatar
                      style={{ backgroundColor: "#1890ff" }}
                      icon={<AntDesignOutlined />}
                    />
                  </Avatar.Group>
                </>
              }
            />
          </Card>
        </div>
      )}
    </Draggable>
    
  );
}

export default SimpleCard;
