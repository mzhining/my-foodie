<template>
    <div>
        <p> Your reservation and order for {{this.$route.params.id}} at {{this.$route.params.postal}} is complete. </p>
        <br>
        <br>
        <p> Your food will be ready at {{this.$route.params.time}} on {{this.$route.params.date}} </p>
        <br>
        <br>
        <p> Thank you for making a reservation for {{this.$route.params.id}} with MyFoodie! </p>
        <br>
        <br>
        <button @click="home"> Back to Homepage </button>
    </div>
</template>

<script>

export default {
    data() {
        return {
        }
    },
    methods: {
        home: function() {
            this.$router.push('/');
        }
    }
}

</script>

<style>
</style>