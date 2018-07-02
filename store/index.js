export const state = () => {
    return {
        team1: {},
        team2: {},
        team3: {},
        team4: {},
        team5: {},
        team6: {},
        team7: {},
        team8: {},
    }
}

export const mutations = {
    setData(state, payload) {
        state[`team${payload.team}`] = payload.data;
    }
}