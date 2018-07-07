<template>
    <div class="row">
        <div class="col-12">
            <h3>小隊資料</h3>
        </div>
        <data-display></data-display>
        <commit-logic />
    </div>
</template>

<script>
import DataDisplay from '~/components/DataDisplay/DataDisplay';
import CommitLogic from '~/components/CommitChange/CommitControl';

export default {
    components: {
        DataDisplay,
        CommitLogic
    },
    mounted() {
        for (let i = 0; i < 8; i++) {
            registerValueEvent(i, snap => {
                this.$store.commit("setData", { team: i + 1, data: snap.val()});
            });
            registerEventsValue(i, snap => {
                this.$store.commit("setEvent", { team: i + 1, data: snap.val()});
            })
        }
        database.ref().on('value', (snap) => {
            this.$store.commit('setIsProcess', snap.val().isProcess);
        })
    }
}
</script>
