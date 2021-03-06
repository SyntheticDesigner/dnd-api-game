import { createSlice, nanoid, createEntityAdapter } from "@reduxjs/toolkit";
import { resetAction } from "../action/actionSlice";
import { addMember, addFavorite } from "../teams/makeTeamSlice";

const _monsterObject = {
  index: "", // Resource index for shorthand searching.
  Object: "", //Name of the referenced resource.
  url: "", //URL of the referenced resource.
  desc: [""], //Description of the resource.
  charisma: 0, //A monster's ability to charm or intimidate a player.
  constitution: 0, //How sturdy a monster is."
  dexterity: 0, //The monster's ability for swift movement or stealth
  intelligence: 0, //The monster's ability to outsmart a player.
  strength: 0, //How hard a monster can hit a player.
  wisdom: 0, //A monster's ability to ascertain the player's plan.
  size: "", //The size of the monster ranging from Tiny to Gargantuan.
  //Allowed: Tiny┃Small┃Medium┃Large┃Huge┃Gargantuan
  type: "", //The type of monster.
  subtype: "", //The sub-category of a monster used for classification of monsters."
  alignments: "", //A creature's general moral and personal attitudes.
  //Allowed: chaotic neutral┃chaotic evil┃chaotic good┃lawful neutral┃lawful evil┃lawful good┃neutral┃neutral evil┃neutral good┃any alignment┃unaligned
  armor_class: 0, //The difficulty for a player to successfully deal damage to a monster.
  hit_points: 0, //The hit points of a monster determine how much damage it is able to take before it can be defeated.
  hit_dice: "", //The hit die of a monster can be used to make a version of the same monster whose hit points are determined by the roll of the die. For example: A monster with 2d6 would have its hit points determine by rolling a 6 sided die twice.
  actions: [
    {
      //A list of actions that are available to the monster to take during combat. ⮕ [ Action available to a Monster in addition to the standard creature actions. ]
      name: "",
      desc: "",
      options: {
        //Choice
        choose: 0, //Number of items to pick from the list.
        type: "", //Type of the resources to choose from.
        from: [
          {
            //List of resources to choose from. ⮕ [ APIReference ]
            index: "", //Resource index for shorthand searching.
            name: "", //Name of the referenced resource.
            url: "", //URL of the referenced resource.
          },
        ],
      },
      attack_bonus: 0,
      dc: {
        //Ability Check associated with a particular action.
        dc_type: {
          //Reference to the AbilityScore used for this DC.
          index: "", // Resource index for shorthand searching.
          name: "", //Name of the referenced resource.
          url: "", //URL of the referenced resource.
        },
        dc_value: 0, //Check must equal or exceed this value for success.
        success_type: "", //How to modify damage on a successful check.
      },
      attacks: [
        {
          name: "",
          dc: {
            //Ability Check associated with a particular action.
            dc_type: {
              //Reference to the AbilityScore used for this DC.
              index: "", //Resource index for shorthand searching.
              name: "", //Name of the referenced resource.
              url: "", //URL of the referenced resource.
            },
            dc_value: 0, //Check must equal or exceed this value for success.
            success_type: "", //How to modify damage on a successful check.
          },
          damage: {
            //Damage type and dice associated with a particular attack.
            damage_type: {
              //APIReference
              index: "", //Resource index for shorthand searching.
              name: "", //Name of the referenced resource.
              url: "", //URL of the referenced resource.
            },
            damage_dice: "", //Pattern: ^\d+d\d+(\+\d+)?$
          },
        },
      ],
      damage: [
        {
          // ⮕ [ Damage type and dice associated with a particular attack. ]
          damage_type: {
            //APIReference
            index: "", //Resource index for shorthand searching.
            name: "", //Name of the referenced resource.
            url: "", //URL of the referenced resource.
          },
          damage_dice: "", //Pattern: ^\d+d\d+(\+\d+)?$
        },
      ],
    },
  ],
  legendary_actions: [
    {
      //A list of legendary actions that are available to the monster to take during combat. ⮕ [ Action available to a Monster in addition to the standard creature actions. ]
      name: "",
      desc: "",
      options: {
        //Choice
        choose: 0, //Number of items to pick from the list.
        type: "", //Type of the resources to choose from.
        from: [
          {
            //List of resources to choose from. ⮕ [ APIReference ]
            index: "", //Resource index for shorthand searching.
            name: "", //Name of the referenced resource.
            url: "", //URL of the referenced resource.
          },
        ],
      },
      attack_bonus: 0,
      dc: {
        //Ability Check associated with a particular action.
        dc_type: {
          //Reference to the AbilityScore used for this DC.
          index: "", //Resource index for shorthand searching.
          name: "", //Name of the referenced resource.
          url: "", //URL of the referenced resource.
        },
        dc_value: 0, //Check must equal or exceed this value for success.
        success_type: "", //How to modify damage on a successful check.
      },
      attacks: [
        {
          name: "",
          dc: {
            //Ability Check associated with a particular action.
            dc_type: {
              //Reference to the AbilityScore used for this DC.
              index: "", //Resource index for shorthand searching.
              name: "", //Name of the referenced resource.
              url: "", //URL of the referenced resource.
            },
            dc_value: 0, //Check must equal or exceed this value for success.
            success_type: "", //How to modify damage on a successful check.
          },
          damage: {
            //Damage type and dice associated with a particular attack.
            damage_type: {
              //APIReference
              index: "", //Resource index for shorthand searching.
              name: "", //Name of the referenced resource.
              url: "", //URL of the referenced resource.
            },
            damage_dice: "", //Pattern: ^\d+d\d+(\+\d+)?$
          },
        },
      ],
      damage: [
        {
          // ⮕ [ Damage type and dice associated with a particular attack. ]
          damage_type: {
            //APIReference
            index: "", //Resource index for shorthand searching.
            name: "", //Name of the referenced resource.
            url: "", //URL of the referenced resource.
          },
          damage_dice: "", //Pattern: ^\d+d\d+(\+\d+)?$
        },
      ],
    },
  ],
  challenge_rating: 0, //A monster's challenge rating is a guideline number that says when a monster becomes an appropriate challenge against the party's average level. For example. A group of 4 players with an average level of 4 would have an appropriate combat challenge against a monster with a challenge rating of 4 but a monster with a challenge rating of 8 against the same group of players would pose a significant threat.
  //Constraints: Min 0┃Max 21
  condition_immunities: [
    {
      //A list of conditions that a monster is immune to. ⮕ [ APIReference ]
      index: "", //Resource index for shorthand searching.
      name: "", //Name of the referenced resource.
      url: "", //URL of the referenced resource.
    },
  ],
  damage_immunities: [""], // A list of damage types that a monster will take double damage from.
  damage_resistances: [""], //A list of damage types that a monster will take half damage from.
  damage_vulnerabilities: [""], //A list of damage types that a monster will take double damage from.
  forms: [
    {
      //List of other related monster entries that are of the same form. Only applicable to Lycanthropes that have multiple forms. ⮕ [ APIReference ]
      index: "", //Resource index for shorthand searching.
      name: "", //Name of the referenced resource.
      url: "", //URL of the referenced resource.
    },
  ],
  languages: "", //The languages a monster is able to speak.
  proficiencies: [
    {
      //A list of proficiencies of a monster.
      value: 0,
      proficiency: {
        //APIReference
        index: "", //Resource index for shorthand searching.
        name: "", //Name of the referenced resource.
        url: "", //URL of the referenced resource.
      },
    },
  ],
  reactions: [
    {
      //A list of reactions that is available to the monster to take during combat. ⮕ [ Action available to a Monster in addition to the standard creature actions. ]
      name: "",
      desc: "",
      options: {
        //Choice
        choose: 0, //Number of items to pick from the list.
        type: "", //Type of the resources to choose from.
        from: [
          {
            //List of resources to choose from. ⮕ [ APIReference ]
            index: "", //Resource index for shorthand searching.
            name: "", //Name of the referenced resource.
            url: "", //URL of the referenced resource.
          },
        ],
      },
      attack_bonus: 0,
      dc: {
        //Ability Check associated with a particular action.
        dc_type: {
          // Reference to the AbilityScore used for this DC.
          index: "", //Resource index for shorthand searching.
          name: "", //Name of the referenced resource.
          url: "", //URL of the referenced resource.
        },
        dc_value: 0, //Check must equal or exceed this value for success.
        success_type: "", //How to modify damage on a successful check.
      },
      attacks: [
        {
          name: "",
          dc: {
            //Ability Check associated with a particular action.
            dc_type: {
              // Reference to the AbilityScore used for this DC.
              index: "", //Resource index for shorthand searching.
              name: "", //Name of the referenced resource.
              url: "", //URL of the referenced resource.
            },
            dc_value: 0, //Check must equal or exceed this value for success.
            success_type: "", //How to modify damage on a successful check.
          },
          damage: {
            //Damage type and dice associated with a particular attack.
            damage_type: {
              //APIReference
              index: "", //Resource index for shorthand searching.
              name: "", //Name of the referenced resource.
              url: "", //URL of the referenced resource.
            },
            damage_dice: "", //Pattern: ^\d+d\d+(\+\d+)?$
          },
        },
      ],
      damage: [
        {
          //⮕ [ Damage type and dice associated with a particular attack. ]
          damage_type: {
            //APIReference
            index: "", //Resource index for shorthand searching.
            name: "", //Name of the referenced resource.
            url: "", //URL of the referenced resource.
          },
          damage_dice: "", //Pattern: ^\d+d\d+(\+\d+)?$
        },
      ],
    },
  ],
  senses: {
    //Monsters typically have a passive perception but they might also have other senses to detect players.
    passive_perception: 0, //The monster's passive perception (wisdom) score.
    blindsight: "", //A monster with blindsight can perceive its surroundings without relying on sight, within a specific radius.
    darkvision: "", //A monster with darkvision can see in the dark within a specific radius.
    tremorsense: "", //A monster with tremorsense can detect and pinpoint the origin of vibrations within a specific radius, provided that the monster and the source of the vibrations are in contact with the same ground or substance.
    truesight: "", //A monster with truesight can, out to a specific range, see in normal and magical darkness, see invisible creatures and objects, automatically detect visual illusions and succeed on saving throws against them, and perceive the original form of a shapechanger or a creature that is transformed by magic. Furthermore, the monster can see into the Ethereal Plane within the same range.
  },
  special_abilities: [
    {
      //A list of the monster's special abilities.
      name: "",
      desc: "",
      attack_bonus: 0,
      damage: [
        {
          //⮕ [ Damage type and dice associated with a particular attack. ]
          damage_type: {
            //APIReference
            index: "", //Resource index for shorthand searching.
            name: "", //Name of the referenced resource.
            url: "", //URL of the referenced resource.
          },
          damage_dice: "", // Pattern: ^\d+d\d+(\+\d+)?$
        },
      ],
      dc: {
        //Ability Check associated with a particular action.
        dc_type: {
          //Reference to the AbilityScore used for this DC.
          index: "", //Resource index for shorthand searching.
          name: "", //Name of the referenced resource.
          url: "", //URL of the referenced resource.
        },
        dc_value: 0, //Check must equal or exceed this value for success.
        success_type: "", //How to modify damage on a successful check.
      },
      spellcasting: {
        ability: {
          //APIReference
          index: "", //Resource index for shorthand searching.
          name: "", //Name of the referenced resource.
          url: "", //URL of the referenced resource.
        },
        dc: 0,
        modifier: 0,
        components_required: [""],
        school: "",
        slots: {},
        spells: [
          {
            name: "",
            level: 0,
            url: "",
            usage: {
              type: "", //Allowed: at will┃per day┃recharge after rest┃recharge on roll
              rest_types: [""],
              times: 0,
            },
          },
        ],
      },
      usage: {
        type: "", //Allowed: at will┃per day┃recharge after rest┃recharge on roll
        rest_types: [""],
        times: 0,
      },
    },
  ],
  speed: {
    //Speed for a monster determines how fast it can move per turn.
    walk: "", //All creatures have a walking speed, simply called the monster’s speed. Creatures that have no form of ground-based locomotion have a walking speed of 0 feet.
    burrow: "", //A monster that has a burrowing speed can use that speed to move through sand, earth, mud, or ice. A monster can’t burrow through solid rock unless it has a special trait that allows it to do so.
    climb: "", //A monster that has a climbing speed can use all or part of its movement to move on vertical surfaces. The monster doesn’t need to spend extra movement to climb.
    fly: "", //A monster that has a flying speed can use all or part of its movement to fly.
    swim: "", //A monster that has a swimming speed doesn’t need to spend extra movement to swim.
  },
  xp: 0, //The number of experience points (XP) a monster is worth is based on its challenge rating.
};

export const targetingAdapter = createEntityAdapter();
export const targetingSelectors = targetingAdapter.getSelectors(
  (state) => state.makeActor.targeting
);

const initialState = {
  id: nanoid(),
  teamId: "",
  actorImage: "",
  actorPos: { x: 0, y: 0 },
  openInfo: false,
  actorObject: _monsterObject,
  ac: 0,
  hp: 0,
  targetedBy: "",
  targeting: targetingAdapter.getInitialState(),
  targetMode: false,
};

export const makeActorSlice = createSlice({
  name: "makeActor",
  initialState,
  reducers: {
    setActorObject: (state, action) => {
      if (action.payload !== "undefined") {
        state.actorObject = action.payload;
        state.ac = action.payload.armor_class;
        state.hp = action.payload.hit_points;
        state.targetMode = false;
        state.targeting = targetingAdapter.getInitialState();
        state.actorPos = { x: 0, y: 0 };
        state.targetedBy = "";
        state.openInfo = false;
        state.actorImage =
          action.payload.name &&
          `https://5e.tools/img/MM/${action.payload.name
            .split(",")[0]
            .split("/")[0]
            .split("(")[0]
            .trim()}.png`;
        //create a string that can be used with the 5e tools image database
        //this is inefficient for load times but no api for images
      }
    },
    loadActor: (
      state,
      {
        payload: {
          id,
          teamId,
          actorObject,
          actorImage,
          actorPos,
          openInfo,
          targeting,
          targetedBy,
          targetMode,
          ac,
          hp,
        },
      }
    ) => {
      //we dereferenced the actors state and overwrite each object individually
      //should get an error if something is missing
      state.id = id;
      state.teamId = teamId;
      state.actorObject = actorObject;
      state.actorImage = actorImage;
      state.actorPos = actorPos;
      state.openInfo = openInfo;
      if (targeting.ids !== undefined) {
        state.targeting = targeting;
      } else {
        state.targeting = targetingAdapter.getInitialState();
      }
      state.targetedBy = targetedBy;
      state.targetMode = targetMode;
      state.ac = ac;
      state.hp = hp;
    },
    toggleTarget: (state, { payload: actor }) => {
      //make deep copy of the targeting array
      let targetIds = targetingAdapter
        .getSelectors()
        .selectIds(state.targeting);
      //check if target is already targeted
      //we will use this to toggle the target state
      let isTargeted = 0;
      for (let i in targetIds) {
        if (targetIds[i] === actor.id) {
          isTargeted++;
        }
      }
      if (isTargeted) {
        //if target is in array we remove the target from the array
        // let newArray = arrayCopy.filter((target) => target.id !== actor.id);
        targetingAdapter.removeOne(state.targeting, actor.id);
        // state.targeting = newArray;
      } else {
        //push target to array
        //set targeting array to new array
        targetingAdapter.addOne(state.targeting, actor);
        // arrayCopy.push(actor);
        // state.targeting = arrayCopy;
      }
    },
    setTargetMode: (state, { payload }) => {
      state.targetMode = payload;
    },
    toggleTargetMode: (state, action) => {
      state.targetMode = !state.targetMode;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addMember, (state, action) => {
      state.id = nanoid();
      //generate a new unique id each time the actor is added to a team
    });
    builder.addCase(addFavorite, (state, action) => {
      state.id = nanoid();
      //generate a new unique id each time the actor is added to favorites
    });
    builder.addCase(resetAction, (state, { payload: actionState }) => {
      const targetEntities = actionState.targets.entities;
      const targetIds = actionState.targets.ids;
      // console.log(targetIds);

      targetIds.forEach((id) => {
        console.log(targetEntities[id]);
        targetingAdapter.updateOne(state.targeting, {
          id: id,
          changes: targetEntities[id],
        });
      });
    });
  },
});

export const {
  setActorObject,
  loadActor,
  toggleTarget,
  setTargetMode,
  toggleTargetMode,
} = makeActorSlice.actions;

export const actorObject = (state) => state.makeActor.actorObject;
export const actorState = (state) => state.makeActor;
export const actorId = (state) => state.makeActor.id;
export const actorImage = (state) => state.makeActor.actorImage;
export const targetModeState = (state) => state.makeActor.targetMode;

export default makeActorSlice.reducer;
