<template>
    <div>
        <h1>Hello World</h1>
        <button type="button" class="btn btn-primary" @click="click()">Primary</button>
    </div>
</template>

<script>
export default {
     methods: {
         click() {
             console.log(apple);
         }
     }
}
</script>