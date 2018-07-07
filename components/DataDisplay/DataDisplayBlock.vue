<template>
     <!-- Data displaying -->
    <div id="displayer" class="row">
        <div class="col-12">
            <h3>{{ teaminCN[currentSelectedTeam] }}</h3>
        </div>
        <div class="col-9">
            <ul id="teamData">
                <li id="teamDataList" v-for="name of dataNameinCN" :key="name.id"><p>{{ `${name}：` }}</p></li>
            </ul>
        </div>
        <div class="col-3">
            <ul id="teamData">
                <li id="noneList" v-for="dataName of dataNameList" :key="dataName.id"><p>{{ getTeamData[dataName] }}</p></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        currentSelectedTeam: Number
    },
    data() {
        return {
            dataNameinCN: [
                "現在總金錢數目",
                "團隊名稱",
                "攻擊卡張數",
                "已發動過攻擊次數",
                "防禦卡張數",
                "以抵擋過攻擊次數",
                "加錢卡張數",
                "已使用過加錢卡次數",
                "總使用過卡牌總數",
                "當前名次",
                "上回合名次"
            ],
            dataNameList: [
                "money",
                "team",
                "atk",
                "atkTimes",
                "def",
                "defTimes",
                "sp",
                "spTimes",
                "usedCardNum",
                "curRank",
                "lastRank"
            ],
            teaminCN: [
                "一小",
                "二小",
                "三小",
                "四小",
                "五小",
                "六小",
                "七小",
                "八小"
            ]
        }
    },
    computed: {
        getTeamData() {
            return this.$store.state[`team${this.currentSelectedTeam + 1}`];
        }
    }
}
</script>

<style scoped>
#displayer {
  border-style: solid;
  border-color: bisque;
  border-width: 3px;
  border-radius: 2px;
  margin: 15px;
  margin-left: 30px;
  padding: 10px;
}
#teamDataList {
  list-style-type: circle;
  color: bisque;
}
#teamData {
  padding-left: 20px;
}
#noneList {
  list-style-type: none;
}
</style>
