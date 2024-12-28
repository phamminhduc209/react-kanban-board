import { Draggable, Droppable } from 'react-beautiful-dnd';

// ant core
import {
  Card,
  Tooltip,
  Button,
  Popconfirm,
} from "antd";

// ant icons
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

// components
import SimpleCard from "./SimpleCard";
import { useAppContext } from '../contexts/AppContext';

function KanbanList({ listItem, index, cards }) {
  const { toggleModal } = useAppContext();

  return (
    <Draggable draggableId={listItem.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='todoList'
        >
          <Droppable droppableId={listItem.id.toString()} type="CARD">
            {(provided) => (
              <Card
                title={listItem.title}
                className="cardList"
                extra={
                  <>
                    <Tooltip title="Add a card">
                      <Button
                        shape="circle"
                        icon={<PlusOutlined />}
                        onClick={toggleModal}
                      />
                    </Tooltip>

                    <Popconfirm
                      title="Delete the list"
                      description="Are you sure to delete this list?"
                      onConfirm={() => {}}
                      onCancel={() => {}}
                      okText="Yes"
                      cancelText="No"
                      className="ml-10"
                    >
                      <Tooltip title="Delete this list">
                        <Button
                          shape="circle"
                          icon={<DeleteOutlined />}
                        />
                      </Tooltip>
                    </Popconfirm>
                  </>
                }
              >
                <div
                  ref={provided.innerRef}
                  // style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                  {...provided.droppableProps}
                  className='trelloList_content'
                >
                  {cards.map((card, cardIndex) => {
                    return (
                      <SimpleCard 
                        key={card.id}
                        card={card}
                        index={cardIndex}
                      />
                    )
                  })}
                </div>
                {provided.placeholder}
              </Card>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
    
  )
}

export default KanbanList