<template>
    <section>
        <div class="kotak-mereng">
            <div class="penyot">
                <div class="rectangle" />
                <div class="segitiga" />
            </div>
            
            <div class="kotak-mereng-content">
                <img id="pic" src="@/assets/breakfast.jpg" alt="Breakfast">
                <p id="slogan">One Stop Place for Your Stomach!</p>
            </div>
        </div>
        
        <hr id="line">

        <div class="content">
            <p id="new"> What's new? </p>

            <div id="content">
                <div class="card">
                    <div>
                    <img src="@/assets/collins.jpeg" alt="Collins" height=15rem>
                    </div>
                    <p>GREAT DEAL : 1-FOR-1 Mains in Collins</p>
                </div>

                <div class="card">
                    <div>
                    <img src="@/assets/coffeebean.png" alt="Coffeebean" height=15rem>
                    </div>
                    <p>Check out The Coffee Bean with Home Special</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "Home"
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap');

.home {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.kotak-mereng {
    position: relative;
    height: 20rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
}

.kotak-mereng-content {
    max-width: 1300px;
    position: relative;
    width: 100%;
}

.rectangle{
    height: 5rem;
    background-color: rgba(224, 116, 114, 0.64);
}

.segitiga {
    overflow: hidden;
    height: 0;
    border-width: 10rem 100vw 0 0;
    border-style: solid;
    border-color: rgba(224, 116, 114, 0.64) transparent transparent rgba(224, 116, 114, 0.64);
}

.penyot {
    position: absolute;
    overflow: hidden;
    top: 0;
    width: 100%;
    z-index: 0;
}

#slogan {
    font-family: Carosello;
    font-size: 40px;
    color: white;
    margin: 0;
    position: absolute;
    z-index: 69;
    left: 10%;
    top: 30%;
}

img {
    height: 15rem;
}

#pic {
    height: 17rem;
    position: absolute;
    z-index: 69;
    right: 8%;
    top: 8%;
}

#line {
    border: 3px dashed #90141C;
}

#new {
    font-family: Nunito;
    font-weight: bold;
    font-size: 30px;
    margin: 0;
    text-align: left;
    width: 100%;
}

.content {
    width: calc(100% - 8rem);
    max-width: 1000px;
    margin: auto;
    padding: 2rem 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.card {
    padding: 1rem;
}

.card div {
    height: 15rem;
    width: 40rem;
    border-radius: 1rem;
}

.card p {
    font-family: Inter, sans-serif;
    font-size: 14pt;
    margin: 1rem 0 0 0;
}
</style>