<template>
    <div class="row">
        <div class="col-12"><h3 style="text-align:center;">---------天然事件---------</h3></div>
        <div class="col-1">
        </div>
        <div class="col-11">
            <div class="row">
                <div class="col-12" style="padding-bottom: 10px;"><button @click="addMoneyEvent()" type="button" class="btn btn-outline-warning">增加金錢事件</button></div>
                <div class="col-12" style="padding-bottom: 10px;"><button @click="subtractMoneyEvent()" type="button" class="btn btn-outline-warning">減少金錢事件</button></div>
                <div class="col-12" style="padding-bottom: 10px;"><button @click="bossRandom()" type="button" class="btn btn-outline-warning">BOSS Random</button></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isPercent: {
            type: Boolean
        },
        valuePayload: {
            type: Object,
            default: () => {
                return {
                    number: 0,
                    percent: 0
                }
            }
        }
    },

    methods: {
         getAllTeamMoney() {
            var outResult = [];
            for (let i = 1; i <= 8; i++) {
                outResult.push(this.$store.state[`team${i}`]['money']);
            }
            return outResult;
        },
        addMoneyEvent() {
            // Update Message.
            database.ref("announcement").update({
                type: "Natural-event",
                message: `發生天然事件 全部小隊增加金錢`
            });
            if (this.isPercent) {
                addMoneyToAllTeamByPercent(this.valuePayload.percent, this.getAllTeamMoney());
            } else {
                addMoneyToAllTeamByNumber(this.valuePayload.number, this.getAllTeamMoney());
            }
            this.$store.commit('updateRank');
            console.log("Natural Add Event completed.");
        },
        subtractMoneyEvent() {
            // Update Message.
            database.ref("announcement").update({
                type: "Natural-event",
                message: `發生天然事件 全部小隊減少金錢`
            });
            if (this.isPercent) {
                substractMoneyToAllTeamByPercent(this.valuePayload.percent, this.getAllTeamMoney());
            } else {
                substractMoneyToAllTeamByNumber(this.valuePayload.number, this.getAllTeamMoney());
            }
            this.$store.commit('updateRank');
            console.log('Natural Subtract Event completed.');
        },
        bossRandom() {
            // Update Message.
            database.ref("announcement").update({
                type: "Natural-event",
                message: `發生天然事件 全部小隊RandomBoss`
            });
            if (this.isPercent) {
                RamdomMoneyToAllTeamByPercent(this.getAllTeamMoney());
            } else {
                RandomMoneyToAllTeamByNumber(this.getAllTeamMoney());
            }
            this.$store.commit('updateRank');
            console.log('Boss Rnadom Completed.');
        }
    }
}
</script>
