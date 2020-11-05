<template>
<footer class="footer">
  <div class="grid">
    <div class="logo">
        <img src="../assets/surface746.png">
    </div>
    <div class="content has-text-centered">
        <p>
        <strong>SigmaVision website</strong> created with 🖤 by <a href="https://github.com/LilMarc0/ScoalaOnline">
        Victor Dumitru</a>
        </p>
        <div class="grid2"> 
            <div>
                <h1>Despre noi</h1>
                <article>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam aperiam dolorem aliquam maxime natus explicabo omnis veritatis sapiente vel amet!
                </article>
            </div>
            <div>
                <h1>Contact</h1>
                <div class="flex">
                <a href="">Instagram</a>   
                <a href="">Facebook</a>   
                </div>

            </div>
            <div>
                <h1>Link-uri rapide</h1>    
            </div>
        </div>
    </div>
  </div>
</footer>
</template>

<style scoped>
    .footer {
        background-color: #332c23;
        color: rgb(243, 232, 224);
    }

    strong {
        color: white;
    }

    .grid {
        display: grid;
        grid-template-columns: 20% 80%;
    }

    .logo > img {
        width: 200px;
        margin: 3rem auto;
    }

    .grid2{
        margin-top: 2rem;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }

    h1, article {
        color: rgb(243, 232, 224);
    }

    .flex{
        display: flex;
        flex-direction: column;
    }
</style>