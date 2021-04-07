<template>
<div>
    <DashboardC v-if="show=='customer'"></DashboardC>
    <DashboardR v-if="show=='restaurant'"></DashboardR>
</div>
</template>


<script>
import DashboardR from './DashboardR.vue'
import DashboardC from './DashboardC.vue'
export default ({
    data() {
        return {
            show:this.$userProfile
        }
    },
    components: {
        DashboardC,
        DashboardR
    }
})
</script>

<style scoped>
</style>


