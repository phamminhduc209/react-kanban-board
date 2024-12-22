import React, { useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// ant core
import {
  Avatar,
  Button,
  Modal,
  Input,
  Form,
  Select,
} from "antd";

// ant icons
import { PlusOutlined } from "@ant-design/icons";
import KanbanList from './components/KanbanList';
import { dataKanban } from './dataKanban';

const { TextArea } = Input;
const { Option } = Select;

const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

function App() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [kanban, setKanban] = React.useState(dataKanban);

  const handleSubmit = (values) => {
    console.log("values: ", values);

    setConfirmLoading(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;
    console.log('onDragEnd', result)

    if(!destination) return;
    const { droppableId: sourceDroppabledId, index: sourceIndex } = source;
    const { droppableId: destinationDroppabledId, index: destinationIndex } = destination;

    // TODO: drag drop list
    if(type === 'LIST') {
      setKanban((prevState) => {
        const newColumns = [...prevState.columns];
        newColumns.splice(sourceIndex, 1); // delete item
        newColumns.splice(destinationIndex, 0, draggableId);
        
        return {
          ...prevState,
          columns: newColumns
        }
      })
      return
    }

    // TODO: drag drop card same list
    if(sourceDroppabledId === destinationDroppabledId) {
      setKanban((prevState) => {
        const listItem = prevState.lists[sourceDroppabledId];
        const newCards = [...listItem.cards];
        newCards.splice(sourceIndex, 1); // delete item
        newCards.splice(destinationIndex, 0, draggableId);
        
        return {
          ...prevState,
          lists: {
            ...prevState.lists,
            [sourceDroppabledId]: {
              ...prevState.lists[sourceDroppabledId],
              cards: newCards
            }
          }
        }
      });
      return;
    }

    // TODO: drag drop card different list

  }

  console.log('kanban: ', kanban)

  return (
    <>
      <header>
        <div className="header__container">
          <div className="header__logo" />
          <div className="header__right">
            <div className="header__avatar">
              <img src="/assets/images/avatar.png" alt="Avatar" />
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container flex mt-2 px-2">
          <DragDropContext
            onDragEnd={onDragEnd}
          >
            <Droppable droppableId="all-lists" type="LIST" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  // style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                  className="listContainer"
                  {...provided.droppableProps}
                >
                  <>
                    {kanban.columns.map((listId, listIndex) => {
                      const listItem = kanban.lists[listId];
                      const cards = listItem.cards.map(cardId => kanban.cards[cardId]);
                      return (
                        <KanbanList 
                          key={listItem.id}
                          index={listIndex}
                          listItem={listItem}
                          cards={cards}
                        />
                      )
                    })}
                  </>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {/* <KabanList /> */}

          <Button type="text">
            <PlusOutlined /> Add another list
          </Button>
        </div>
      </main>

      <Modal
        title="Add Card"
        open={open}
        onOk={form.submit}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
      >
        <br />
        <Form
          name="basic"
          form={form}
          initialValues={{ status: "new" }}
          onFinish={handleSubmit}
          autoComplete="off"
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          wrapperCol={{ flex: 1 }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input your title!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Member"
            name="member"
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              optionLabelProp="label"
              onChange={handleChange}
            >
              <Option value="tony123" label="tony 123">
                <div className="selectField">
                  <Avatar src="https://picsum.photos/id/237/200/300" />
                  <span>Tony Nguyen</span>
                </div>
              </Option>
              <Option value="phuong123" label="phuong 123">
                <div className="selectField">
                  <Avatar src="https://picsum.photos/id/237/200/300" />
                  <span>Phuong Nguyen</span>
                </div>
              </Option>
            </Select>
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Select
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                {
                  value: "new",
                  label: "New",
                },
                {
                  value: "inprocess",
                  label: "In process",
                },
                {
                  value: "done",
                  label: "Done",
                },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default App;
