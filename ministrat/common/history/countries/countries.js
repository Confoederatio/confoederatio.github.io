ministrat.config.history.countries = {
  brd: {
    id: "brd",
    name: "Bundesrepublik Deutschland",
    colour: [114, 178, 140],
    team: "nato",
    money: 100,

    modifiers: {
      attack_modifier: 1.25,
      defence_modifier: 1.25,
      movement_modifier: 1.25
    },

    is_default_player: true
  },
  ddr: {
    id: "ddr",
    name: "Deutsche Demokratische Republik",
    colour: [240, 60, 60],
    team: "wto",
    money: 100
  },
  nato: {
    id: "nato",
    name: "NATO",
    colour: [60, 60, 240],
    team: "nato",
    money: 100,

    modifiers: {
      can_recruit_new_units_in_germany: false,

      attack_modifier: 1.35,
      defence_modifier: 1.35,
      movement_modifier: 1.35
    }
  },
  wto: {
    id: "wto",
    name: "WTO",
    colour: [114, 40, 40],
    team: "wto",
    money: 100,

    modifiers: {
      can_recruit_new_units_in_germany: false
    }
  }
};