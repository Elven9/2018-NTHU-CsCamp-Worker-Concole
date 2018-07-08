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
        event: {
            team1: {},
            team2: {},
            team3: {},
            team4: {},
            team5: {},
            team6: {},
            team7: {},
            team8: {},
        },
        isProcess: false,
        isBattling: true
    }
}

export const mutations = {
    setData(state, payload) {
        state[`team${payload.team}`] = payload.data;
    },
    setEvent(state, payload) {
        state[`event`][`team${payload.team}`] = payload.data;
    },
    setIsProcess(state, payload) {
        state['isProcess'] = payload;
    },
    setIsBattling(state, payload) {
        state['isBattling'] = payload;
    }
}