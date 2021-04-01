<template>
    <div>
        <p> Reservation Confirmed! </p>
        <br>
        <br>
        <p> Your reservation is confirmed for {{this.$route.params.pax}} pax at {{this.$route.params.time}} on {{this.$route.params.date}} at {{this.$route.params.id}} at {{this.$route.params.postal}}. </p>
        <br>
        <br>
        <p> Thank you for making a reservation for {{this.$route.params.id}} with MyFoodie! </p>
        <br>
        <br>
        <button @click="goToOrder"> Order in advance </button>
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
        goToOrder: function() {
            this.$router.push({ name: 'reservationOrder', params: {id: this.$route.params.id, pax: this.$route.params.pax, date: this.$route.params.date, time: this.$route.params.time, postal: this.$route.params.postal, data: this.$route.params.data}});
        },
        home: function() {
            this.$router.push('/');
        }
    }
}

</script>

<style>
</style>