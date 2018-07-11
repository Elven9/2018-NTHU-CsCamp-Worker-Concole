<template>
    <div style="padding-bottom:30px;">
        <h3 style="text-align:center;">------------------------更改資料按鈕------------------------</h3>
        <div class="row">
            <div class="col-2">
                <div class="dropdown" style="padding-left:30px">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ teamtoChange === -1?"選擇小隊":`${teamtoChange}小`  }}</button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a v-for="i in 8" :key="i" class="dropdown-item" href="#" @click="setTeamtoChange(i)">{{ i }}</a>
                    </div>
                </div>
            </div>
            <div class="col-8">
                <div class="row">
                   <div class="col-3">
                       <div class="row">
                            <div class="col-12 align-self-center"><p>{{ `O 攻擊圈圈 👉 ${atk}` }}</p></div>
                            <div class="col-2 align-self-center"><button @click="atk += 1" type="button" class="btn btn-outline-info btn-sm">+1</button></div>
                            <div class="col-6 align-self-center"><button @click="atk -= 1" type="button" class="btn btn-outline-info btn-sm">-1</button></div>
                       </div>
                   </div>
                    <div class="col-3">
                       <div class="row">
                            <div class="col-12 align-self-center"><p>{{ `X 加值叉叉 👉 ${sp}` }}</p></div>
                            <div class="col-2 align-self-center"><button @click="sp += 1" type="button" class="btn btn-outline-info btn-sm">+1</button></div>
                            <div class="col-6 align-self-center"><button @click="sp -= 1" type="button" class="btn btn-outline-info btn-sm">-1</button></div>
                       </div>
                   </div>
                    <div class="col-3">
                       <div class="row">
                            <div class="col-12 align-self-center"><p>{{ `T 防禦倒T 👉 ${def}` }}</p></div>
                            <div class="col-2 align-self-center"><button @click="def += 1" type="button" class="btn btn-outline-info btn-sm">+1</button></div>
                            <div class="col-6 align-self-center"><button @click="def -= 1" type="button" class="btn btn-outline-info btn-sm">-1</button></div>
                       </div>
                   </div>
                    <div class="col-3">
                        <div class="col-12"><p>{{ `🎖 增加金錢 👉 ${money}` }}</p></div>
                        <div style="padding-bottom: 5px;" class="col-6"><button @click="money += 500" type="button" class="btn btn-outline-info btn-sm">+500</button></div>
                        <div class="col-6"><button @click="money -= 500" type="button" class="btn btn-outline-info btn-sm">-500</button></div>
                    </div>
                </div>
            </div>
            <div class="col-2">
                <button @click="updateChange()" type="button" class="btn btn-outline-light btn-sm">更新</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            teamtoChange: -1,
            money: 0,
            atk:0,
            def:0,
            sp: 0,
        }
    },

    methods: {
        setTeamtoChange(inTeam) {
            this.teamtoChange = inTeam;
        },
        updateChange() {
            var originalData = this.$store.state;

            updateData(this.teamtoChange - 1, {
                "atk": originalData[`team${this.teamtoChange}`]['atk'] + this.atk,
                "def": originalData[`team${this.teamtoChange}`]['def'] + this.def,
                "sp": originalData[`team${this.teamtoChange}`]['sp'] + this.sp,
                "money": originalData[`team${this.teamtoChange}`]['money'] + this.money
            })

            // Reset Data.
            this.atk = 0;
            this.def = 0;
            this.sp = 0;
            this.money = 0;
            this.teamtoChange = -1;

            // Update Rank.
            setTimeout(() => {
                this.$store.commit('updateRank');
                console.log('updateRank Completed.');
            }, 500);
        }
    }
}
</script>

