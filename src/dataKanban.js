// update, access data -> hash object {}


/* array 
drag drop list1: source: 1, destination: 0
- find index list1?
- delete list 1?
- insert list 1 in destination?

drap drop card different list
- find index  list source?
- find index list destination?
- loop cards source (delete)
- loop cards destination (insert)

get item in array -> loop index of array -> get item
*/
export const duc = [
  {
    id: 'list1',
    title: 'list1',
    cards: [
      {
        id: 'card1',
        title: 'card1'
      },
      {
        id: 'card2',
        title: 'card2'
      }
    ]
  },
  {
    id: 'list2',
    title: 'list2',
    cards: [
      {
        id: 'card1',
        title: 'card1'
      }
    ]
  },
  {
    id: 'list3',
    title: 'list3',
    cards: [
      {
        id: 'card1',
        title: 'card1'
      }
    ]
  }
]

/* hashobject */
export const dataKanban = {
  columns: ['list1', 'list2', 'list3'],
  lists: {
    list1: {
      id: 'list1',
      title: 'list1',
      cards: ['card1', 'card2']
    },
    list2: {
      id: 'list2',
      title: 'list2',
      cards: ['card3']
    },
    list3: {
      id: 'list3',
      title: 'list3',
      cards: []
    }
  },
  cards: {
    card1: {
      id: 'card1',
      title: 'card1',
      description: 'card1'
    },
    card2: {
      id: 'card2',
      title: 'card2',
      description: 'card2'
    },
    card3: {
      id: 'card3',
      title: 'card3',
      description: 'card3'
    }
  }
}

/*
drap drop list
-> loop columns

drap drop card in list1
access item: lists['list1']
change card: loop  lists['list1'].cards
*/