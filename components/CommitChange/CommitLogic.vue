<template>
    <div class="row">
        <div class="col-4">
            <h3>更改小隊出牌</h3>
            <div class="row">
                <div class="col-12 align-self-center"><button type="button" class="btn btn-outline-warning" @click="toggleCardSelection()">Toggle IsProcess</button></div>
                <div>
                    <h4>現在使否可以選卡：{{ getIsProcess  }}</h4>
                </div>
                <div class="col-12 align-self-center"><button type="button" class="btn btn-outline-warning" @click="commit()">Commit Changes</button></div>
            </div>
        </div>
        <div class="col-8">
            <h3>指令更改</h3>
            <div class="row align-items-center">
                <div class="col-5">
                    <h4>是否使用趴數</h4>
                </div>
                <div class="col-7">
                     <input v-model="isByPercent" type="checkbox" class="form-check-input">
                </div>
            </div>

             <div class="row align-items-center">
                <div class="col-5">
                    <h4>是否亂數</h4>
                </div>
                <div class="col-7">
                     <input v-model="isRamdom" type="checkbox" class="form-check-input">
                </div>
            </div>

            <div class="row align-items-center">
                <div class="col-5">
                    <h4>攻擊趴數</h4>
                </div>
                <div class="col-7">
                     <input v-model="atkAmountInNum" type="email" class="form-control" aria-describedby="emailHelp">
                </div>
            </div>

             <div class="row align-items-center">
                <div class="col-5">
                    <h4>攻擊數字</h4>
                </div>
                <div class="col-7">
                     <input v-model="atkAmountInPercent" type="email" class="form-control" aria-describedby="emailHelp">
                </div>
            </div>

             <div class="row align-items-center">
                <div class="col-5">
                    <h4>加錢趴數</h4>
                </div>
                <div class="col-7">
                     <input v-model="addAmountInNum" type="email" class="form-control" aria-describedby="emailHelp">
                </div>
            </div>

             <div class="row align-items-center">
                <div class="col-5">
                    <h4>加錢數字</h4>
                </div>
                <div class="col-7">
                     <input v-model="addAmountInPercent" type="email" class="form-control" aria-describedby="emailHelp">
                </div>
            </div>

            <div class="row align-items-center">
                <div class="col-5">
                    <h4>延遲時間</h4>
                </div>
                <div class="col-7">
                     <input v-model="delayInterval" type="email" class="form-control" aria-describedby="emailHelp">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { teaminCN } from '~/assets/js/globalData.js';

export default {
    data(){
        return {
            isByPercent: false,
            isRamdom: false,
            atkAmountInNum: 300,
            atkAmountInPercent: 0.02,
            addAmountInNum: 200,
            addAmountInPercent: 0.2,
            delayInterval: 3000,
        }
    },
    computed: {
        getIsProcess() {
            return this.$store.state.isProcess;
        }
    },
    methods: {
        toggleCardSelection() {
            database.ref().update({
                "isProcess": !this.$store.state.isProcess
            })
        },
        commit() {
            console.log(this.isByPercent)
            // create event list.
            var events = [];
            var eventData = this.$store.state.event;
            var originalData = this.$store.state;
            for(let i = 0; i < 8; i++) {
                if (eventData[`team${i+1}`]["kindofCard"] !== "None") {
                    console.log(i)
                    events.push({
                        "sourceTeam": i + 1,
                        "targetTeam": eventData[`team${i+1}`]['target'],
                        "action": eventData[`team${i+1}`]['kindofCard'],
                        "originalTargetValue":  eventData[`team${i+1}`]['target'] === -1?-1:originalData[`team${eventData[`team${i+1}`]['target']}`]['money'],
                        "originalSourceValue": originalData[`team${eventData[`team${i+1}`]["team"]}`]['money'],
                        "targetDef":  eventData[`team${i+1}`]['target'] === -1?-1:originalData[`team${eventData[`team${i+1}`]['target']}`]['def'],
                        "rank": originalData[`team${i+1}`]['curRank']
                    })
                }
            }

            var em = this;
            // Sort.
            events.sort(( firstElement, secondElement) => {
                if (firstElement.rank > secondElement.rank) {
                    return -1;
                } else if (firstElement.rank < secondElement.rank) {
                    return 1;
                } else {
                    return 0;
                }
            })
            function updateRank() {
                // last rank.
                    var lastRank = [];
                    for(let i = 0;i < 8;i++) {
                        lastRank.push(em.$store.state[`team${i + 1}`]["curRank"]);
                    }

                var data = [];
                for (let i = 0; i < 8; i++) {
                    var payload = {
                    money: em.$store.state[`team${i + 1}`]['money'],
                    team: i
                    };
                    data.push(payload);
                }
                data.sort((obj1, obj2) => {
                    if (obj1["money"] < obj2["money"]) {
                    return 1;
                    } else if (obj1["money"] > obj2["money"]) {
                    return -1;
                    } else {
                    return 0;
                    }
                });

                // update count.
                var curRank = 1;
                var count = 1;
                var lastNum = -1;
                for (let e of data) {
                    if (e["money"] !== lastNum) {
                        curRank = count;
                        updateData(e["team"], {
                            "lastRank": lastRank[e["team"]],
                            "curRank": curRank
                        });
                        count += 1;
                        lastNum =  e["money"];
                    } else if (e["money"] === lastNum) {
                        updateData(e["team"], {
                            "lastRank": lastRank[e["team"]],
                            "curRank": curRank
                        });
                        count += 1;
                        lastNum =  e["money"];
                    }
                }
             }
            
            console.log(events);
            // Process Event by promise.
            async function processEvent() {
                for(let event of events) {
                    // Process Event based on their action type and isPercent.
                    if (event['action'] === "Atk") {
                        // OutMessage To Attack Message.
                        await new Promise(function(resolve, reject) {
                            setTimeout(() =>{
                                database.ref("announcement").update({
                                    type: "Atk-inform",
                                    message: `第${teaminCN[event['sourceTeam'] - 1]}隊攻擊第${teaminCN[event['targetTeam'] - 1]}隊`
                                });
                                resolve();
                            }, em.delayInterval);
                        })
                        console.log("Send Atk-inform message completed.");
                        // Commit Atk Change to Display.
                        await new Promise(function(resolve, reject) {
                            // Attack Base on Percent or not.
                            
                            setTimeout(() => {
                                  if (event['targetDef'] > 0) {
                                    // Update message.
                                    database.ref("announcement").update({
                                        type: "Atk-fail",
                                        message: `第${teaminCN[event['targetTeam'] - 1]}隊擁有防禦卡，第${teaminCN[event['sourceTeam'] - 1]}隊攻擊第${teaminCN[event['targetTeam'] - 1]}隊失敗了QQ`
                                    });
                                    // Update both Team's Card status.
                                    // Source status
                                    updateData(event['sourceTeam']-1, {
                                        "atkTimes": originalData[`team${event['sourceTeam']}`]['atkTimes'] + 1,
                                        "atk": originalData[`team${event['sourceTeam']}`]['atk'] - 1,
                                        "usedCardNum": originalData[`team${event['sourceTeam']}`]['usedCardNum'] + 1
                                    })
                                    // Target status.
                                    updateData(event['targetTeam']-1, {
                                        "defTimes": originalData[`team${event['targetTeam']}`]['defTimes'] + 1,
                                        "def": originalData[`team${event['targetTeam']}`]['def'] - 1,
                                        "usedCardNum": originalData[`team${event['targetTeam']}`]['usedCardNum'] + 1
                                    })
                                } else {
                                    database.ref("announcement").update({
                                        type: "Atk-success",
                                        message: `第${teaminCN[event['targetTeam'] - 1]}隊沒有防禦卡，第${teaminCN[event['sourceTeam'] - 1]}隊攻擊第${teaminCN[event['targetTeam'] - 1]}隊成功了！！`
                                    });
                                    if (em.isByPercent) {
                                        if (em.isRandom) {
                                            attackCardRandomPercent(event['targetTeam']-1, event['originalTargetValue']);
                                        } else {
                                            attackCardPercent(event['targetTeam']-1, event['originalTargetValue'], em.atkAmountInPercent);
                                        }
                                    } else {
                                        if (em.isRandom) {
                                            attackCardRandomNumber(event['targetTeam']-1, event['originalTargetValue']);
                                        } else {
                                            attackCardNumber(event['targetTeam']-1, event['originalTargetValue'], em.atkAmountInNum);
                                        }
                                    }
                                    // Update both Team's Card status.
                                    // Source status
                                    updateData(event['sourceTeam']-1, {
                                        "atkTimes": originalData[`team${event['sourceTeam']}`]['atkTimes'] + 1,
                                        "atk": originalData[`team${event['sourceTeam']}`]['atk'] - 1,
                                        "usedCardNum": originalData[`team${event['sourceTeam']}`]['usedCardNum'] + 1
                                    })
                                    updateRank();
                                }
                                resolve();
                            }, em.delayInterval);
                        })
                        console.log("Send Atk-* message completed.");
                    } else if (event['action'] === "Sp") {
                        await new Promise(function (resolve, reject) {
                            setTimeout(() => {
                                if (em.isByPercent) {
                                    if (em.isRandom) {
                                        addCardRandomNumber(event['sourceTeam']-1, event['originalSourceValue']);
                                    } else {
                                        addCardRandomPercent(event['sourceTeam']-1, event['originalSourceValue']);
                                    }
                                } else {
                                    if (em.isRamdom) {
                                        addCardPercent(event['sourceTeam']-1, event['originalSourceValue'], em.addAmountInPercent);
                                    } else {
                                        addCardNumber(event['sourceTeam']-1, event['originalSourceValue'], em.addAmountInNum);
                                    }
                                }
                                updateRank();
                                resolve();
                            }, em.delayInterval);
                        })
                        console.log("Add card Completed.");
                    } else if (event['action'] === "NA") {

                    }
                }
            }
            processEvent();
        }
    }
}
</script>

