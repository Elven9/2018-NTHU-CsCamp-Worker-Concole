<template>
    <div id="mainDisplay">
        <div v-for="i in 8" :key="i">
            <display-block :currentSelectedTeam="i-1"></display-block>
        </div>
    </div>
</template>

<script>
import DisplayBlock from '~/components/DataDisplay/DataDisplayBlock';

export default {
    components: {
        DisplayBlock
    },
    methods: {
        getTeamData(team) {
            return this.$store.state[`team${team}`];
        }
    }
}
</script>


<style scoped>

#mainDisplay {
    width: 100%;
    padding-left: 30px;
    padding-right: 30px;
    overflow-x: hidden;
    overflow-y: scroll;
    height: 454px;
}

</style>

