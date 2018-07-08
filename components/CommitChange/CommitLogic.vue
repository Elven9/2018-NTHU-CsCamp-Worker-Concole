<template>
    <div class="row">
        <div class="col-12">
            <update-data />
        </div>
        <div class="col-6">
            <h3>---------控制按鈕---------</h3>
            <div class="row align-items-center">
                <div class="col-8"><h4>更改小隊出牌</h4></div>
                <div class="col-4"><button type="button" class="btn btn-outline-warning" @click="commit()">開始執行</button></div>
                <div class="col-8">
                    <h4>現在使否可以選卡：{{ getIsProcess?"不行":"可以" }}</h4>
                </div>
                <div class="col-4"><button type="button" class="btn btn-outline-warning" @click="toggleCardSelection()">可否選卡</button></div>
                <div class="col-8">
                    <h4>是否大亂鬥中：{{ getIsBattling?"進行中":"尚未開始" }}</h4>
                </div>
                <div class="col-4"><button type="button" class="btn btn-outline-warning" @click="toggleIsBattling()">是否進行</button></div>
            </div>
        </div>
        <div class="col-6">
            <h3>---------指令更改---------</h3>
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

            <div id="changeInput" class="row align-items-center">
                <div class="col-5">
                    <h4>攻擊數字</h4>
                </div>
                <div class="col-7">
                     <input v-model="katkAmountInNum" type="email" class="form-control" aria-describedby="emailHelp">
                </div>
            </div>

             <div id="changeInput" class="row align-items-center">
                <div class="col-5">
                    <h4>攻擊趴數</h4>
                </div>
                <div class="col-7">
                     <input v-model="katkAmountInPercent" type="email" class="form-control" aria-describedby="emailHelp">
                </div>
            </div>

             <div id="changeInput" class="row align-items-center">
                <div class="col-5">
                    <h4>加錢數字</h4>
                </div>
                <div class="col-7">
                     <input v-model="kaddAmountInNum" type="email" class="form-control" aria-describedby="emailHelp">
                </div>
            </div>

             <div id="changeInput" class="row align-items-center">
                <div class="col-5">
                    <h4>加錢趴數</h4>
                </div>
                <div class="col-7">
                     <input v-model="kaddAmountInPercent" type="email" class="form-control" aria-describedby="emailHelp">
                </div>
            </div>

            <div id="changeInput" class="row align-items-center">
                <div class="col-5">
                    <h4>延遲時間</h4>
                </div>
                <div class="col-7">
                     <input v-model="kdelayInterval" type="email" class="form-control" aria-describedby="emailHelp">
                </div>
            </div>

            <div id="changeInput" class="row align-items-center">
                <div class="col-5">
                    <h4>亂數倍率</h4>
                </div>
                <div class="col-7">
                     <input v-model="ktime" type="email" class="form-control" aria-describedby="emailHelp">
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <p id="information">{{ `目前範圍： ${100 * ktime} ～ ${300 * ktime}（實際數字）` }}</p>
                    <p id="information">{{ `目前範圍： ${0.1 * ktime} ～ ${0.15 * ktime} （實際數字）` }}</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { teaminCN } from '~/assets/js/globalData.js';
import UpdateData from '~/components/UpdateData/UpdateData';

export default {
    components: {
        UpdateData
    },
    data(){
        return {
            isByPercent: false,
            isRamdom: false,
            katkAmountInNum: 300,
            katkAmountInPercent: 0.02,
            kaddAmountInNum: 300,
            kaddAmountInPercent: 0.2,
            kdelayInterval: 5000,
            ktime: 1
        }
    },
    watch: {
        ktime() {
            time = Number(this.ktime);
        }
    },
    computed: {
        getIsProcess() {
            return this.$store.state.isProcess;
        },
        getIsBattling() {
            return this.$store.state.isBattling;
        },
        atkAmountInNum() {
            return Number(this.katkAmountInNum);
        },
        atkAmountInPercent() {
            return Number(this.katkAmountInPercent);
        },
        addAmountInNum() {
            return Number(this.kaddAmountInNum);
        },
        addAmountInPercent() {
            return Number(this.kaddAmountInPercent);
        },
        delayInterval() {
            return Number(this.kdelayInterval);
        }
    },
    methods: {
        toggleCardSelection() {
            database.ref().update({
                "isProcess": !this.$store.state.isProcess
            })
        },
        toggleIsBattling() {
            database.ref().update({
                "isBattling": !!this.$store.state.isBattling
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
                    events.push({
                        "sourceTeam": i + 1,
                        "targetTeam": eventData[`team${i+1}`]['target'],
                        "action": eventData[`team${i+1}`]['kindofCard'],
                        "rank": originalData[`team${i+1}`]['curRank']
                    })
                }
            }

            resetEvent();
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
                     event["originalTargetValue"] = eventData[`team${event["sourceTeam"]}`]['target'] === -1?-1:originalData[`team${eventData[`team${event["sourceTeam"]}`]['target']}`]['money'];
                     event["originalSourceValue"] = originalData[`team${eventData[`team${event["sourceTeam"]}`]["team"]}`]['money'];
                     event["targetDef"] = eventData[`team${event["sourceTeam"]}`]['target'] === -1?-1:originalData[`team${eventData[`team${event["sourceTeam"]}`]['target']}`]['def'];
                     event["rank"] = originalData[`team${event["sourceTeam"]}`]['curRank'];

                    if (event['action'] === "Atk") {
                        // OutMessage To Attack Message.
                        await new Promise(function(resolve, reject) {
                            setTimeout(() =>{
                                database.ref("announcement").update({
                                    type: "Atk-inform",
                                    message: `第${teaminCN[event['sourceTeam'] - 1]}隊 攻擊 第${teaminCN[event['targetTeam'] - 1]}隊`
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
                                        message: `第${teaminCN[event['targetTeam'] - 1]}隊 成功防禦 第${teaminCN[event['sourceTeam'] - 1]}隊！！！`
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
                                        message: `第${teaminCN[event['sourceTeam'] - 1]}隊攻擊第${teaminCN[event['targetTeam'] - 1]}隊成功了！！`
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
                                // Update message.
                                database.ref("announcement").update({
                                    type: "Sp-success",
                                    message: `第${teaminCN[event['sourceTeam'] - 1]}隊加松果成功！！`
                                });
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
                                updateData(event['sourceTeam']-1, {
                                    "spTimes": originalData[`team${event['sourceTeam']}`]['spTimes'] + 1,
                                    "sp": originalData[`team${event['sourceTeam']}`]['sp'] - 1,
                                    "usedCardNum": originalData[`team${event['sourceTeam']}`]['usedCardNum'] + 1
                                })
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

<style scoped>
#changeInput {
    margin-right: 20px;
}
#information {
    padding-left: 50px;
}
</style>

