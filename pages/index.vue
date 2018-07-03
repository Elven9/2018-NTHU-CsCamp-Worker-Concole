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
        </div>
            <!-- Card utility  -->
            <!-- Card Target Select List -->
        <div id="selector">
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
        <div class="row">
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
            <!-- Add Card -->
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

            <!-- Header -->
            <div class="col-12">
                <h3>天然事件</h3>
            </div>

            <div class="col-12">
                <ul id="buttonUiStyle">
                    <li id="buttonLiStyle">
                         <div class="row align-items-center">
                            <div class="col-3">
                                 <h4>天然增加數字金錢事件</h4>
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn btn-outline-danger" @click="eventAddN()">執行</button>
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
                                 <h4>天然增加趴數金錢事件</h4>
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn btn-outline-danger" @click="eventAddP()">執行</button>
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
                                 <h4>天然減少數字金錢事件</h4>
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn btn-outline-danger" @click="eventSubN()">執行</button>
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
                                 <h4>天然減少趴數金錢事件</h4>
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn btn-outline-danger" @click="eventSubP()">執行</button>
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
                                 <h4>天然亂數加數字金錢事件</h4>
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn btn-outline-danger" @click="eventAddRN()">執行</button>
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
                                 <h4>天然亂數加趴數金錢事件</h4>
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn btn-outline-danger" @click="eventAddRP()">執行</button>
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
                                 <h4>天然亂數減數字金錢事件</h4>
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn btn-outline-danger" @click="eventSubRN()">執行</button>
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
                                 <h4>天然亂數減趴數金錢事件</h4>
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn btn-outline-danger" @click="eventSubRP()">執行</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            
             <!-- Header -->
            <div class="col-12">
                <h3>天然事件 Boss</h3>
            </div>

            <div class="col-12">
                <ul id="buttonUiStyle">
                    <li id="buttonLiStyle">
                         <div class="row align-items-center">
                            <div class="col-3">
                                 <h4>天然亂數數字金錢事件</h4>
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn btn-outline-danger" @click="eventRN()">執行</button>
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
                                 <h4>天然亂數趴數金錢事件</h4>
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn btn-outline-danger" @click="eventRP()">執行</button>
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
  data() {
    return {
      currentSelectedTeam: 0,
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
      ],
      targetTeam: -1,
      sourceTeam: -1,
      inputMoney: 0
    };
  },
  computed: {
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
    getAllTeamData(key) {
      var data = [];
      for (let i = 0; i < 8; i++) {
        data.push(this.getSpecificTeamData(i, key));
      }
      return data;
    },
    updateAttackCard(team) {
      var payload = {
        atk: this.getSpecificTeamData(team, "atk") - 1,
        atkTimes: this.getSpecificTeamData(team, "atkTimes") + 1
      };
      updateData(team, payload);
    },
    updateAddCard(team) {
      var payload = {
        sp: this.getSpecificTeamData(team, "sp") - 1,
        spTimes: this.getSpecificTeamData(team, "spTimes") + 1
      };
      updateData(team, payload);
    },
    updateDefCard(team) {
      var payload = {
        def: this.getSpecificTeamData(team, "def") - 1,
        defTimes: this.getSpecificTeamData(team, "defTimes") + 1
      };
      updateData(team, payload);
    },
    updateUsedCardNum(team) {
      var payload = {
        usedCardNum: this.getSpecificTeamData(team, "usedCardNum") + 1
      };
      updateData(team, payload);
    },
    // Logic From firebase.js
    // Attack Card.
    attackCardSN() {
      if (this.getSpecificTeamData(this.targetTeam, "def") <= 0) {
        attackCardNumber(
          this.targetTeam,
          this.getSpecificTeamData(this.targetTeam, "money"),
          Number(this.inputMoney)
        );
      } else {
        this.updateDefCard(this.targetTeam);
      }
      this.updateAttackCard(this.sourceTeam);
      this.updateUsedCardNum(this.sourceTeam);
      this.clearTeamSelection();
      this.updateRank();
    },
    attackCardP() {
      if (this.getSpecificTeamData(this.targetTeam, "def") <= 0) {
        attackCardPercent(
          this.targetTeam,
          this.getSpecificTeamData(this.targetTeam, "money"),
          Number(this.inputMoney)
        );
      } else {
        this.updateDefCard(this.targetTeam);
      }
      this.updateAttackCard(this.sourceTeam);
      this.updateUsedCardNum(this.sourceTeam);
      this.clearTeamSelection();
      this.updateRank();
    },
    attackCardRN() {
      if (this.getSpecificTeamData(this.targetTeam, "def") <= 0) {
        attackCardRandomNumber(
          this.targetTeam,
          this.getSpecificTeamData(this.targetTeam, "money")
        );
      } else {
        this.updateDefCard(this.targetTeam);
      }
      this.updateAttackCard(this.sourceTeam);
      this.updateUsedCardNum(this.sourceTeam);
      this.clearTeamSelection();
      this.updateRank();
    },
    attackCardRP() {
      if (this.getSpecificTeamData(this.targetTeam, "def") <= 0) {
        attackCardRandomPercent(
          this.targetTeam,
          this.getSpecificTeamData(this.targetTeam, "money")
        );
      } else {
        this.updateDefCard(this.targetTeam);
      }
      this.updateAttackCard(this.sourceTeam);
      this.updateUsedCardNum(this.sourceTeam);
      this.clearTeamSelection();
      this.updateRank();
    },
    // Add Card.
    addCardSN() {
      addCardNumber(
        this.sourceTeam,
        this.getSpecificTeamData(this.sourceTeam, "money"),
        Number(this.inputMoney)
      );
      this.updateAddCard(this.sourceTeam);
      this.updateUsedCardNum(this.sourceTeam);
      this.clearTeamSelection();
      this.updateRank();
    },
    addCardP() {
      addCardPercent(
        this.sourceTeam,
        this.getSpecificTeamData(this.sourceTeam, "money"),
        Number(this.inputMoney)
      );
      this.updateAddCard(this.sourceTeam);
      this.updateUsedCardNum(this.sourceTeam);
      this.clearTeamSelection();
      this.updateRank();
    },
    addCardRN() {
      addCardRandomNumber(
        this.sourceTeam,
        this.getSpecificTeamData(this.sourceTeam, "money")
      );
      this.updateAddCard(this.sourceTeam);
      this.updateUsedCardNum(this.sourceTeam);
      this.clearTeamSelection();
      this.updateRank();
    },
    addCardRP() {
      addCardRandomPercent(
        this.sourceTeam,
        this.getSpecificTeamData(this.sourceTeam, "money")
      );
      this.updateAddCard(this.sourceTeam);
      this.updateUsedCardNum(this.sourceTeam);
      this.clearTeamSelection();
      this.updateRank();
    },
    // NaturalEvent.
    eventAddN() {
      addMoneyToAllTeamByNumber(
        Number(this.inputMoney),
        this.getAllTeamData("money")
      );
      this.clearTeamSelection();
      this.updateRank();
    },
    eventAddP() {
      addMoneyToAllTeamByPercent(
        Number(this.inputMoney),
        this.getAllTeamData("money")
      );
      this.clearTeamSelection();
      this.updateRank();
    },
    eventSubN() {
      substractMoneyToAllTeamByNumber(
        Number(this.inputMoney),
        this.getAllTeamData("money")
      );
      this.clearTeamSelection();
      this.updateRank();
    },
    eventSubP() {
      substractMoneyToAllTeamByPercent(
        Number(this.inputMoney),
        this.getAllTeamData("money")
      );
      this.clearTeamSelection();
      this.updateRank();
    },
    eventAddRN() {
      addRandomMoneyToAllTeamByNumber(this.getAllTeamData("money"));
      this.clearTeamSelection();
      this.updateRank();
    },
    eventAddRP() {
      addRandomMoneyToAllTeamByPercent(this.getAllTeamData("money"));
      this.clearTeamSelection();
      this.updateRank();
    },
    eventSubRN() {
      substractRandomMoneyToAllTeamByNumber(this.getAllTeamData("money"));
      this.clearTeamSelection();
      this.updateRank();
    },
    eventSubRP() {
      substractRandomMoneyToAllTeamByPercent(this.getAllTeamData("money"));
      this.clearTeamSelection();
      this.updateRank();
    },
    // Boss Natural Event.
    eventRN() {
      RandomMoneyToAllTeamByNumber(this.getAllTeamData("money"));
      this.clearTeamSelection();
      this.updateRank();
    },
    eventRP() {
      RamdomMoneyToAllTeamByPercent(this.getAllTeamData("money"));
      this.clearTeamSelection();
      this.updateRank();
    },
    updateRank() {
        // last rank.
        var lastRank = [];
        for(let i = 0;i < 8;i++) {
            lastRank.push(this.$store.state[`team${i + 1}`]["curRank"]);
        }

      var data = [];
      for (let i = 0; i < 8; i++) {
        var payload = {
          money: this.getSpecificTeamData(i, "money"),
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
          } else if (e["money" === lastNum]) {
              updateData(e["team"], {
                  "lastRank": lastRank[e["team"]],
                  "curRank": curRank
              });
              count += 1;
              lastNum =  e["money"];
          }
      }
    }
  },
  mounted() {
    // update vuex store function.
    for (let i = 0; i < 8; i++) {
      registerValueEvent(i, snap => {
        this.$store.commit("setData", { team: i + 1, data: snap.val() });
      });
    }
  }
};
</script>

<style slotscoped>
body {
  margin: 0px;
  background-color: rgb(34, 34, 34);
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
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
h4 {
  margin: 15px;
  color: bisque;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
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
#selector {
  position: sticky;
  top: 0px;
  background-color: rgb(114, 16, 16);
  z-index: 1;
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
