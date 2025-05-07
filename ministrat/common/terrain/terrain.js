ministrat.config.terrain = {
  forest: {
    name: "Forest",
    colour: [0, 255, 33],

    modifiers: {
      armour: {
        defence: -0.35,
        movement: -0.40
      },
      artillery: {
        attack: -0.20,
        defence: -0.50,
        movement: -0.40
      },
      infantry: {
        attack: 0.15,
        defence: 0.50,
        movement: -0.10
      }
    }
  },
  hills: {
    name: "Hills",
    colour: [127, 51, 0],

    modifiers: {
      armour: {
        attack: -0.25,
        defence: -0.50,
        movement: -0.20
      },
      artillery: {
        attack: -0.25,
        defence: 0.80,
        movement: -0.25
      },
      infantry: {
        attack: 0.35,
        defence: 0.75,
        movement: -0.15
      }
    }
  },
  mountains: {
    name: "Mountains",
    colour: [150, 150, 150],

    modifiers: {
      armour: {
        attack: -0.50,
        defence: -0.75,
        movement: -0.50
      },
      artillery: {
        attack: -0.50,
        defence: 0.75,
        movement: -0.50
      },
      infantry: {
        attack: 0.50,
        defence: 1.50,
        movement: -0.40
      }
    }
  },
  plains: {
    name: "Plains",
    colour: [255, 255, 255],

    modifiers: {
      armour: {
        attack: -0.50,
        defence: -0.75,
        movement: 0.35
      },
      artillery: {
        attack: -0.50,
        defence: 0.75,
        movement: 0.20
      },
      infantry: {
        attack: 0.50,
        defence: 1.50,
        movement: 0.20
      }
    }
  }
};