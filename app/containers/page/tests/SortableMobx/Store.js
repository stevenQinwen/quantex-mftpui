import { observable } from "mobx";

class Store {
  @observable cards = [
    {
      id: 1,
      text: 'Write a cool JS library',
    },
    {
      id: 2,
      text: 'Make it generic enough',
    },
    {
      id: 3,
      text: 'Write README',
    },
    {
      id: 4,
      text: 'Create some examples',
    },
    {
      id: 5,
      text: 'Spam in Twitter and IRC to promote it',
    },
    {
      id: 6,
      text: 'Sharon test sortable',
    },
    {
      id: 7,
      text: 'PROFIT',
    },
  ];
}

export default Store;
