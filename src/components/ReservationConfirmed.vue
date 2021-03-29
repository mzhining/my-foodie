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
        <button> Order in advance </button>
        <br>
        <br>
        <button> Back to Homepage </button>
    </div>
</template>

<script>

</script>

<style>
</style>