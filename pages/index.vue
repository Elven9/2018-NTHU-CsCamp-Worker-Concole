<template>
    <div>
        <div class="row">
            <!-- Header -->
            <div class="col-12">
                <h3>小隊資料</h3>
            </div>
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
                            <a v-for="i in 8" class="dropdown-item" :key="i" @click="changeTeam(i - 1)">{{ teaminCN[i - 1] }}</a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Card utility  -->
            <!-- Card Target Select List -->
            <div class="col-12">
                <div class="row align-items-center">
                    <div class="col-5">
                         <div id="selectButton" class="row justify-content-center">
                            <div class="col-6">
                                <div class="dropdown">
                                    <button class="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ `出卡小隊：${sourceTeam === -1?"請選擇":teaminCN[sourceTeam]}` }}</button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a v-for="i in 8" class="dropdown-item" :key="i" @click="changeSourceTeam(i - 1)">{{ teaminCN[i - 1] }}</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="dropdown">
                                    <button class="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ `目標小隊：${targetTeam === -1?"請選擇":teaminCN[targetTeam]}` }}</button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a v-for="i in 8" class="dropdown-item" :key="i" @click="changeTargetTeam(i - 1)">{{ teaminCN[i - 1] }}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-7">
                          <div id="buttonList">
                            <button @click="clearTeamSelection()" type="button" class="btn btn-outline-warning">清除目前所選資料</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Header -->
            <div class="col-12">
                <h3>攻擊卡</h3>
            </div>
            <!-- Attack Card -->
            <div class="col-12">
                <ul id="buttonUiStyle">
                    <li id="buttonLiStyle">
                         <div class="row align-items-center">
                            <div class="col-3">
                                 <h4>指定數字攻擊卡</h4>
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn btn-outline-danger" @click="attackCardSN()">執行</button>
                            </div>
                            <div class="col-2">
                                <input v-model="inputMoney" type="email" class="form-control" aria-describedby="emailHelp" placeholder="輸入金錢">
                            </div>
                            <div class="col-5">
                                <p>{{ `目前輸入金額：${inputMoney}` }}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

             <div class="col-12">
                <ul id="buttonUiStyle">
                    <li id="buttonLiStyle">
                         <div class="row align-items-center">
                            <div class="col-3">
                                 <h4>指定趴數攻擊卡</h4>
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn btn-outline-danger" @click="attackCardP()">執行</button>
                            </div>
                            <div class="col-2">
                                <input v-model="inputMoney" type="email" class="form-control" aria-describedby="emailHelp" placeholder="輸入金錢">
                            </div>
                            <div class="col-5">
                                <p>{{ `目前輸入金額：${inputMoney}` }}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

             <div class="col-12">
                <ul id="buttonUiStyle">
                    <li id="buttonLiStyle">
                         <div class="row align-items-center">
                            <div class="col-3">
                                 <h4>亂數數字攻擊卡</h4>
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn btn-outline-danger" @click="attackCardRN()">執行</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            
            <div class="col-12">
                <ul id="buttonUiStyle">
                    <li id="buttonLiStyle">
                         <div class="row align-items-center">
                            <div class="col-3">
                                 <h4>亂數趴數攻擊卡</h4>
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn btn-outline-danger" @click="attackCardRP()">執行</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- Header -->
            <div class="col-12">
                <h3>加錢卡</h3>
            </div>
            <div class="col-12">
                <ul id="buttonUiStyle">
                    <li id="buttonLiStyle">
                         <div class="row align-items-center">
                            <div class="col-3">
                                 <h4>指定數字加錢卡</h4>
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn btn-outline-danger" @click="addCardSN()">執行</button>
                            </div>
                            <div class="col-2">
                                <input v-model="inputMoney" type="email" class="form-control" aria-describedby="emailHelp" placeholder="輸入金錢">
                            </div>
                            <div class="col-5">
                                <p>{{ `目前輸入金額：${inputMoney}` }}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

             <div class="col-12">
                <ul id="buttonUiStyle">
                    <li id="buttonLiStyle">
                         <div class="row align-items-center">
                            <div class="col-3">
                                 <h4>指定趴數加錢卡</h4>
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn btn-outline-danger" @click="addCardP()">執行</button>
                            </div>
                            <div class="col-2">
                                <input v-model="inputMoney" type="email" class="form-control" aria-describedby="emailHelp" placeholder="輸入金錢">
                            </div>
                            <div class="col-5">
                                <p>{{ `目前輸入金額：${inputMoney}` }}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

             <div class="col-12">
                <ul id="buttonUiStyle">
                    <li id="buttonLiStyle">
                         <div class="row align-items-center">
                            <div class="col-3">
                                 <h4>亂數數字加錢卡</h4>
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn btn-outline-danger" @click="addCardRN()">執行</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="col-12">
                <ul id="buttonUiStyle">
                    <li id="buttonLiStyle">
                         <div class="row align-items-center">
                            <div class="col-3">
                                 <h4>亂數趴數加錢卡</h4>
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn btn-outline-danger" @click="addCardRP()">執行</button>
                            </div>
                        </div>
                    </li>
                </ul>
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
             targetTeam: -1,
             sourceTeam: -1,
             inputMoney: 0
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
         },
         changeSourceTeam(sourceTeam) {
             this.sourceTeam = sourceTeam;
         },
         changeTargetTeam(targetTeam) {
             this.targetTeam = targetTeam;
         },
         clearTeamSelection() {
             this.targetTeam = -1;
             this.sourceTeam = -1;
             this.inputMoney = 0;
         },
         getSpecificTeamData(team, key) {
             return this.$store.state[`team${team + 1}`][key];
         },
         // Logic From firebase.js
         // Attack Card.
         attackCardSN() {
             attackCardNumber(this.targetTeam, this.getSpecificTeamData(this.targetTeam, 'money') , Number(this.inputMoney));
             this.clearTeamSelection();
         },
         attackCardP() {
             attackCardPercent(this.targetTeam, this.getSpecificTeamData(this.targetTeam, 'money') , Number(this.inputMoney));
             this.clearTeamSelection();
         },
         attackCardRN() {
             attackCardRandomNumber(this.targetTeam, this.getSpecificTeamData(this.targetTeam, "money"));
             this.clearTeamSelection();
         },
         attackCardRP() {
             attackCardRandomPercent(this.targetTeam, this.getSpecificTeamData(this.targetTeam, "money"));
             this.clearTeamSelection();
         },
         // Add Card.
         addCardSN() {
             addCardNumber(this.targetTeam, this.getSpecificTeamData(this.targetTeam, "money"), Number(this.inputMoney));
             this.clearTeamSelection();
         },
         addCardP() {
             addCardPercent(this.targetTeam, this.getSpecificTeamData(this.targetTeam, "money"), Number(this.inputMoney));
             this.clearTeamSelection();
         },
         addCardRN() {
             addCardRandomNumber(this.targetTeam, this.getSpecificTeamData(this.targetTeam, "money"));
             this.clearTeamSelection();
         },
         addCardRP() {
             addCardRandomPercent(this.targetTeam, this.getSpecificTeamData(this.targetTeam, "money"));
             this.clearTeamSelection();
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
    font-size: 16px;
}
h3 {
    margin: 15px;
    color: bisque;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
h4 {
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
#selectButton {
    margin: 30px;
    padding: 10px;
    width: 426px;
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
#buttonUiStyle {
    margin-left: 40px;
}
#buttonLiStyle {
    list-style-type: circle;
    color: bisque;
}
</style>
