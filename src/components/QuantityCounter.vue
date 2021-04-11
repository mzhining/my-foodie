<template>
    <div id="app">
        <button @click="decrement" class = "buttoncount"> - </button>
        <label for="count"> {{counter}} </label>
        <button @click="increment" class = "buttoncount"> + </button>
    </div>
</template>


<script>
    export default {
        props: {
            item: {
                type: Object
            }
        },
        data() {
            return {
                counter: 0,
            };
        },
        methods: {
            increment() {
                if (this.counter < 10) {
                    this.counter++;
                } else {
                    alert("You cannot buy more than 10 items.");
                }
                this.$emit('counter', this.item, this.counter);
            },
            decrement() {
                if (this.counter > 0) {
                    this.counter--;
                } 
                this.$emit('counter', this.item, this.counter);
            }
        }
    }
</script>

<style>

  .buttoncount {
    background-color: pink; 
    border: 10px;
    color: black;
    border-radius: 10px;
    text-align: center;
    font-size: 20px;
    display:inline-block;
    width: 25px;
    margin-left:5px;
    margin-right:5px;
  }

  .buttoncount:hover {
      background-color: #90141C;
      color: white;
  }

</style>