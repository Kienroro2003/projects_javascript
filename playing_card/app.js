window.addEventListener("load", function () {
  const deck = document.querySelector(".deck");
  const users = document.querySelectorAll(".user");
  const cardYourHand = document.querySelectorAll(".deck_your_hand .card");
  const buttonReturn = document.querySelector(".back");
  const searchCard = document.querySelector(".search_card");
  const rowHearts = document.querySelector(".row_hearts");
  const rowDiamonds = document.querySelector(".row_diamonds");
  const rowClups = document.querySelector(".row_clups");
  const rowHSpade = document.querySelector(".row_spade");

  class Card {
    constructor(point, suit, isSelected) {
      this.point = point;
      this.suit = suit;
      this.isSelected = isSelected;
    }

    get point() {
      return this._point;
    }

    get suit() {
      return this._suit;
    }

    get isSelected() {
      return this._isSelected;
    }

    set point(newPoint) {
      this._point = newPoint;
    }

    set suit(newSuit) {
      this._suit = newSuit;
    }

    set isSelected(newIsSelected) {
      this._isSelected = newIsSelected;
    }

    // toString() {
    //   console.log(this._point + " " + this._suit + " " + this._isSelected);
    // }
  }

  // class Deck{
  //   constructor()
  // }

  const deckCard = [
    new Card("2", 4, false),
    new Card("3", 4, false),
    new Card("4", 4, false),
    new Card("5", 4, false),
    new Card("6", 4, false),
    new Card("7", 4, false),
    new Card("8", 4, false),
    new Card("9", 4, false),
    new Card("10", 4, false),
    new Card("J", 4, false),
    new Card("Q", 4, false),
    new Card("K", 4, false),
    new Card("A", 4, false),
    new Card("2", 3, false),
    new Card("3", 3, false),
    new Card("4", 3, false),
    new Card("5", 3, false),
    new Card("6", 3, false),
    new Card("7", 3, false),
    new Card("8", 3, false),
    new Card("9", 3, false),
    new Card("10", 3, false),
    new Card("J", 3, false),
    new Card("Q", 3, false),
    new Card("K", 3, false),
    new Card("A", 3, false),
    new Card("2", 2, false),
    new Card("3", 2, false),
    new Card("4", 2, false),
    new Card("5", 2, false),
    new Card("6", 2, false),
    new Card("7", 2, false),
    new Card("8", 2, false),
    new Card("9", 2, false),
    new Card("10", 2, false),
    new Card("J", 2, false),
    new Card("Q", 2, false),
    new Card("K", 2, false),
    new Card("A", 2, false),
    new Card("2", 1, false),
    new Card("3", 1, false),
    new Card("4", 1, false),
    new Card("5", 1, false),
    new Card("6", 1, false),
    new Card("7", 1, false),
    new Card("8", 1, false),
    new Card("9", 1, false),
    new Card("10", 1, false),
    new Card("J", 1, false),
    new Card("Q", 1, false),
    new Card("K", 1, false),
    new Card("A", 1, false),
  ];
  let filter = "";

  function display() {
    if (!filter) {
      displayDeckCard(deckCard);
    }
  }
  display();

  function displayDeckCard(cards) {
    return new Promise((resolve) => {
      resolve(displayCardFilter(cards));
    }).then(() => {
      const arr = document.querySelectorAll(".deck .card");
      arr.forEach((card) => {
        card.addEventListener("click", function (event) {
          let cardFinded = findCardInDeck(event.currentTarget);
          cardFinded.isSelected = true;
          steps.push(event.currentTarget);
          addCard(currentUser, event.currentTarget);
        });
      });
    });
  }

  // function convertElementToCard(element) {
  //   deckCard.filter((card) => {
  //     if (
  //       convertStringToSuit(element.classList[1]) == card.suit &&
  //       element.textContent == card.point
  //     ) {
  //       card.isSelected = true;
  //     }
  //   });
  // }

  searchCard.addEventListener("keyup", function (event) {
    if (event.key === "Backspace") {
      filter = filter.slice(0, -1);
    } else if (event.key === "Meta") {
      filter = "";
      display();
    }
  });

  searchCard.addEventListener("keypress", function (event) {
    filter += event.key;
    if (filter) {
      let arrPoint = filter.trim().toLocaleUpperCase().split(" ");
      let filterCards = deckCard.filter((item) => {
        if (!item.isSelected) {
          for (let i = 0; i < arrPoint.length; i++) {
            if (arrPoint[i] === item.point) {
              return item;
            }
          }
        }
      });
      displayDeckCard(filterCards);
    } else {
      displayDeckCard(deckCard);
    }
  });

  function displayCardFilter(cards) {
    rowHearts.innerHTML = "";
    rowDiamonds.innerHTML = "";
    rowClups.innerHTML = "";
    rowHSpade.innerHTML = "";
    for (let index = 0; index < cards.length; index++) {
      const boxCard = document.createElement("div");
      boxCard.classList.add("card");
      switch (cards[index].suit) {
        case 4:
          boxCard.classList.add("hearts");
          rowHearts.insertAdjacentElement("beforeend", boxCard);
          break;
        case 3:
          boxCard.classList.add("diamonds");
          rowDiamonds.insertAdjacentElement("beforeend", boxCard);
          break;
        case 2:
          boxCard.classList.add("clups");
          rowClups.insertAdjacentElement("beforeend", boxCard);
          break;
        case 1:
          boxCard.classList.add("spade");
          rowHSpade.insertAdjacentElement("beforeend", boxCard);
          break;
      }
      if (cards[index].isSelected) {
        boxCard.classList.add("selected");
      }
      boxCard.textContent = cards[index].point;
    }
  }

  let currentUser = "user1";
  const steps = [];
  const cardOfUser1 = [];
  const cardOfUser2 = [];
  const cardOfUser3 = [];
  const cardOfUser4 = [];

  buttonReturn.addEventListener("click", function () {
    let card = steps.pop();
    card.className = "card " + card.classList[1];
  });

  function findCardInDeck(element) {
    for (let i = 0; i < deckCard.length; i++) {
      if (
        element.textContent == deckCard[i].point &&
        convertStringToSuit(element.classList[1]) == deckCard[i].suit
      ) {
        return deckCard[i];
      }
    }
  }

  // function activeUser() {
  //
  // }

  users.forEach((user) =>
    user.addEventListener("click", function (event) {
      users.forEach((user) => user.classList.remove("active"));
      currentUser = event.target.classList[1];
      event.currentTarget.classList.add("active");
      switch (currentUser) {
        case "user1": {
          changeDeckYourHand(cardOfUser1);
          break;
        }
        case "user2": {
          changeDeckYourHand(cardOfUser2);
          break;
        }
        case "user3": {
          changeDeckYourHand(cardOfUser3);
          break;
        }
        case "user4": {
          changeDeckYourHand(cardOfUser4);
          break;
        }
      }
    })
  );

  function changeDeckYourHand(user) {
    cardYourHand.forEach((card) => {
      card.className = "card";
      card.textContent = "";
    });
    user.sort((item1, item2) => {
      const suit1 = convertStringToSuit(item1.classList[1]);
      const suit2 = convertStringToSuit(item2.classList[1]);
      const point1 = convertStringToPoint(item1.textContent);
      const point2 = convertStringToPoint(item2.textContent);
      if (point1 < point2) {
        return -1;
      } else if (point1 == point2) {
        if (suit1 < suit2) {
          return -1;
        } else if (suit1 == suit2) {
          return 0;
        } else {
          return 1;
        }
      } else {
        return 1;
      }
    });
    user.forEach((card, index) => {
      cardYourHand[index].classList.add(card.classList[1]);
      cardYourHand[index].textContent = card.textContent;
    });
  }

  function convertStringToSuit(string) {
    switch (string) {
      case "hearts": {
        return 4;
      }
      case "diamonds": {
        return 3;
      }
      case "clups": {
        return 2;
      }
      case "spade": {
        return 1;
      }
    }
  }

  function convertStringToPoint(string) {
    switch (string) {
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "10": {
        return +string;
      }
      case "J": {
        return 11;
      }
      case "Q": {
        return 12;
      }
      case "K": {
        return 13;
      }
      case "A": {
        return 14;
      }
    }
  }

  function addCard(user, element) {
    switch (user) {
      case "user1": {
        if (cardOfUser1.length < 13) {
          element.classList.add("selected");
          element.classList.add("player1");
          cardOfUser1.push(element);
          changeDeckYourHand(cardOfUser1);
        }
        break;
      }
      case "user2": {
        if (cardOfUser2.length < 13) {
          element.classList.add("selected");
          element.classList.add("player2");
          cardOfUser2.push(element);
          changeDeckYourHand(cardOfUser2);
        }
        break;
      }
      case "user3": {
        if (cardOfUser3.length < 13) {
          element.classList.add("selected");
          element.classList.add("player3");
          cardOfUser3.push(element);
          changeDeckYourHand(cardOfUser3);
        }
        break;
      }
      case "user4": {
        if (cardOfUser4.length < 13) {
          element.classList.add("selected");
          element.classList.add("player4");
          cardOfUser4.push(element);
          changeDeckYourHand(cardOfUser4);
        }
        break;
      }
    }
  }
});
