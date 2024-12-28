import React from 'react';
import {
  Form,
} from "antd"

import { dataKanban } from '../dataKanban';

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [form] = Form.useForm();
  const [open, setOpen] = React.useState(false);
  const [kanban, setKanban] = React.useState(dataKanban);

  const toggleModal = () => {
    setOpen(prevState => !prevState);
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;

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
    setKanban(prevState => {
      const sourceCards = prevState.lists[sourceDroppabledId].cards;
      const destinationCards = prevState.lists[destinationDroppabledId].cards;
      sourceCards.splice(sourceIndex, 1); // remove card from list source
      destinationCards.splice(destinationIndex, 0, draggableId); // add card in list destination.
      return {
        ...prevState,
        lists: {
          ...prevState.lists,
          [sourceDroppabledId]: {
            ...prevState.lists[sourceDroppabledId],
            cards: sourceCards
          },
          [destinationDroppabledId]: {
            ...prevState.lists[destinationDroppabledId],
            cards: destinationCards
          },
        }
      }
    })
  }

  return (
    <AppContext.Provider
      value={{ 
        form,
        open,
        kanban,
        onDragEnd,
        toggleModal
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => React.useContext(AppContext);