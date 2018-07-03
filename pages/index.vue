<template>
    <div>
        <div class="row">
            <!-- Header -->
            <div class="col-5">
                <h3>Team Information:</h3>
            </div>
            <div class="col-7"></div>
            
            <!-- Data display -->
            <div class="col-5">
                <!-- Data displaying -->
                <div id="displayer" class="row">
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
             </div>
            <div class="col-7">
                <div id="buttonList">
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ `目前小隊：${teaminCN[currentSelectedTeam]}` }}</button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a v-for="i in 10" class="dropdown-item" :key="i" @click="changeTeam(i - 1)">{{ teaminCN[i - 1] }}</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
     data(){
         return {
             currentSelectedTeam: 0,
             dataNameinCN: ["現在總金錢數目", "團隊名稱", "攻擊卡張數", "已發動過攻擊次數", "防禦卡張數", "以抵擋過攻擊次數", "加錢卡張數", "已使用過加錢卡次數", "總使用過卡牌總數",  "當前名次", "上回合名次"],
             dataNameList: ["money", "team", "atk", "atkTimes", "def", "defTimes", "sp", "spTimes", "usedCardNum", "curRank", "lastRank"],
             teaminCN: ["一小", "二小", "三小", "四小", "五小", "六小", "七小", "八小"],
         }
     },
     computed:{
         getTeamData() {
             return this.$store.state[`team${this.currentSelectedTeam + 1}`];
         }
     },
     methods: {
         changeTeam(targetTeam) {
             this.currentSelectedTeam = targetTeam;
         }
     },
     mounted() {
        // update vuex store function.
        for (let i = 0; i < 8; i++) {
            registerValueEvent(i, snap => {
                this.$store.commit("setData", {team: i+1, data: snap.val()});
            })
        }
    }
}
</script>

<style slotscoped>
body {
    margin: 0px;
    background-color: rgb(34,34,34);
}
p {
    color: bisque;
    /* text-align: center; */
    margin: 5px;
}
h3 {
    margin: 15px;
    color: bisque;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
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
#buttonList {
    margin: 50px;
}
</style>
