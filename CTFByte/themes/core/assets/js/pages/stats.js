import "./main";
import $ from "jquery";
import CTFByte from "../CTFByte";
import { createGraph, updateGraph } from "../graphs";

const api_funcs = {
  team: [
    x => CTFByte.api.get_team_solves({ teamId: x }),
    x => CTFByte.api.get_team_fails({ teamId: x }),
    x => CTFByte.api.get_team_awards({ teamId: x })
  ],
  user: [
    x => CTFByte.api.get_user_solves({ userId: x }),
    x => CTFByte.api.get_user_fails({ userId: x }),
    x => CTFByte.api.get_user_awards({ userId: x })
  ]
};

const createGraphs = (type, id, name, account_id) => {
  let [solves_func, fails_func, awards_func] = api_funcs[type];

  Promise.all([
    solves_func(account_id),
    fails_func(account_id),
    awards_func(account_id)
  ]).then(responses => {
    createGraph(
      "score_graph",
      "#score-graph",
      responses,
      type,
      id,
      name,
      account_id
    );
    createGraph(
      "category_breakdown",
      "#categories-pie-graph",
      responses,
      type,
      id,
      name,
      account_id
    );
    createGraph(
      "solve_percentages",
      "#keys-pie-graph",
      responses,
      type,
      id,
      name,
      account_id
    );
  });
};

const updateGraphs = (type, id, name, account_id) => {
  let [solves_func, fails_func, awards_func] = api_funcs[type];

  Promise.all([
    solves_func(account_id),
    fails_func(account_id),
    awards_func(account_id)
  ]).then(responses => {
    updateGraph(
      "score_graph",
      "#score-graph",
      responses,
      type,
      id,
      name,
      account_id
    );
    updateGraph(
      "category_breakdown",
      "#categories-pie-graph",
      responses,
      type,
      id,
      name,
      account_id
    );
    updateGraph(
      "solve_percentages",
      "#keys-pie-graph",
      responses,
      type,
      id,
      name,
      account_id
    );
  });
};

$(() => {
  let type, id, name, account_id;
  ({ type, id, name, account_id } = window.stats_data);

  createGraphs(type, id, name, account_id);
  setInterval(() => {
    updateGraphs(type, id, name, account_id);
  }, 300000);
});
