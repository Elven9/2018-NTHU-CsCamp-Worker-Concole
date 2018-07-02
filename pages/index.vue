<template>
    <div>
        <button @click="click()" type="button" class="btn btn-outline-warning">Warning</button>
    </div>
</template>

<script>
export default {
     methods: {
         click() {
             console.log(this.$store.state);
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
</style>
