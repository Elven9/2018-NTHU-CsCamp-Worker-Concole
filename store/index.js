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
    },
    updateRank(state) {
        // Get last rank list.
        var lastRanks = [];
        var processDatas = [];
        for(let i = 0;i < 8;i++) {
            lastRanks.push(state[`team${i + 1}`]["curRank"]);
            processDatas.push( {
                money: state[`team${i + 1}`]['money'],
                team: i
            })
        }

        // Sort out to team rank.
        processDatas.sort((obj1, obj2) => {
            if (obj1["money"] < obj2["money"]) { return 1; }
            else if (obj1["money"] > obj2["money"]) { return -1; }
            else { return 0; }
        });

        // Update Rank based on sorting result above.
        var toRank = 1;
        var count = 1;
        var lastNum = -1;
        for (let e of processDatas) {
            if (e["money"] !== lastNum) { toRank = count; }
            updateData(e["team"], {
                "lastRank": lastRanks[e["team"]],
                "curRank": toRank
            });
            count += 1;
            lastNum =  e["money"];
        }
    }
}