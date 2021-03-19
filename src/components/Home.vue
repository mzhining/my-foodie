<template>
  <div>
        <div id = "rectangle"> 
            <p id = "slogan"> One Stop Place for Your Stomach! </p>
        </div>
        <img id = "pic" src = "@/assets/breakfast.jpg" alt = "Breakfast">
        <hr id = "line">

        <p id = "new"> What's new? </p>

        <div id = "content"> 
            <img id = "pic_content" src = "@/assets/collins.jpeg" alt = "Collins">
            <p id = "text_content"> GREAT DEAL : 1-FOR-1 Mains in Collins </p>

            <img id = "pic_content2" src = "@/assets/coffeebean.jpeg" alt = "Coffee Bean">
            <p id = "text_content2"> Check out The Coffee Bean with Home Special </p>
        </div>
  </div>
</template>

<script>
export default {
  
  data(){
    return{ 
        
        }
  }
}
</script>

<style scoped>
#rectangle{
    position: absolute;
    height: 320px;
    left: 0px;
    top: 105px;
    background: rgba(224, 116, 114, 0.64);
    width:100%;
}

#slogan{
    position: absolute;
    height: 75px;
    top : 70px;
    left: 0%;
    right: 4.8%;

    font-family: Carosello;
    font-style: normal;
    font-weight: normal;
    font-size: 40px;
    line-height: 74px;
    transform: rotate(-4.5deg);

    color: #FFFFFF;

}

#pic {
    position: absolute;
    width: 507px;
    height: 338px;
    right: 50px;
    top: 170px;
    bottom: 0;
}

#content {
    text-align : center;
    top: 700px;
}

#text_content {
    position: absolute;
    left: 1070px;
    top: 800px;

    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 50px;

    text-align: center;
    letter-spacing: 0.005em;

    color: #000000;
}

#pic_content {
    position: absolute;
    top: 600px;
    width: 350px;
    height: 200px;
}

#pic_content2 {
    position: absolute;
    top: 900px;
    width: 350px;
    height: 250px;
}

#text_content2 {
    position: absolute;
    left: 1050px;
    top: 1150px;

    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 50px;

    text-align: center;
    letter-spacing: 0.005em;

    color: #000000;
}

#line {
    position: absolute;
    width: 100%;
    height: 0px;
    left: 0px;
    top: 540px;

    border: 3px dashed #90141C;
}

#new {
    position: absolute;
    width: 1062px;
    height: 124px;
    left: 83px;
    top: 550px;

    font-family: Nunito;
    font-style: normal;
    font-weight: bold;
    font-size: 30px;
    line-height: 65px;

    color: #000000;
}

</style>