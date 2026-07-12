/* =====================================
        DEVOPS DASHBOARD V3
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    animatePipeline();

    animateCards();

    startClock();

    revealSections();

    setupButtons();

    randomGlow();

});

/* =====================================
        LIVE EGYPT TIME
===================================== */

function startClock(){

    const clock=document.getElementById("egypt-time");

    if(!clock) return;

    function update(){

        const now=new Date();

        const egypt=now.toLocaleString("en-US",{

            timeZone:"Africa/Cairo",

            weekday:"short",

            year:"numeric",

            month:"short",

            day:"numeric",

            hour:"2-digit",

            minute:"2-digit",

            second:"2-digit"

        });

        clock.innerHTML=egypt;

    }

    update();

    setInterval(update,1000);

}

/* =====================================
        PIPELINE ANIMATION
===================================== */

function animatePipeline(){

    const steps=document.querySelectorAll(".pipeline-step");

    if(!steps.length) return;

    let current=0;

    function run(){

        steps.forEach(step=>step.classList.remove("active"));

        for(let i=0;i<=current;i++){

            steps[i].classList.add("active");

        }

        current++;

        if(current>=steps.length){

            setTimeout(()=>{

                current=0;

            },1500);

        }

    }

    run();

    setInterval(run,700);

}

/* =====================================
        CARD HOVER EFFECT
===================================== */

function animateCards(){

    const cards=document.querySelectorAll(

        ".service-card,.info-card,.status-card"

    );

    cards.forEach(card=>{

        card.addEventListener("mousemove",e=>{

            const rect=card.getBoundingClientRect();

            const x=e.clientX-rect.left;

            const y=e.clientY-rect.top;

            card.style.setProperty("--mouse-x",`${x}px`);

            card.style.setProperty("--mouse-y",`${y}px`);

        });

    });

}

/* =====================================
        SCROLL REVEAL
===================================== */

function revealSections(){

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("visible");

            }

        });

    },{

        threshold:0.15

    });

    document.querySelectorAll(

        ".section,.hero,footer"

    ).forEach(section=>{

        observer.observe(section);

    });

}

/* =====================================
        BUTTON ANIMATION
===================================== */

function setupButtons(){

    const buttons=document.querySelectorAll("button");

    buttons.forEach(button=>{

        button.addEventListener("mouseenter",()=>{

            button.style.transform="translateY(-4px) scale(1.03)";

        });

        button.addEventListener("mouseleave",()=>{

            button.style.transform="translateY(0px)";

        });

    });

}

/* =====================================
        RANDOM STATUS GLOW
===================================== */

function randomGlow(){

    const cards=document.querySelectorAll(".service-card");

    if(!cards.length) return;

    setInterval(()=>{

        cards.forEach(c=>{

            c.style.boxShadow="";

        });

        const random=

        cards[Math.floor(Math.random()*cards.length)];

        random.style.boxShadow=

        "0 0 35px rgba(0,170,255,.55)";

    },2000);

}

/* =====================================
        HEALTH CHECK
===================================== */

async function checkHealth(){

    try{

        const res=await fetch("/health");

        const data=await res.json();

        toast(

            "✅ Application is Healthy",

            "#22c55e"

        );

        console.log(data);

    }

    catch{

        toast(

            "❌ Server Offline",

            "#ef4444"

        );

    }

}

/* =====================================
        API INFORMATION
===================================== */

async function apiInfo(){

    try{

        const res=await fetch("/api/info");

        const data=await res.json();

        toast(

            "📦 Version: "+data.version,

            "#008cff"

        );

        console.table(data);

    }

    catch{

        toast(

            "Unable to fetch API",

            "#ef4444"

        );

    }

}

/* =====================================
        TOAST NOTIFICATION
===================================== */

function toast(message,color){

    const div=document.createElement("div");

    div.className="toast";

    div.innerHTML=message;

    div.style.background=color;

    document.body.appendChild(div);

    setTimeout(()=>{

        div.classList.add("show");

    },50);

    setTimeout(()=>{

        div.classList.remove("show");

        setTimeout(()=>{

            div.remove();

        },500);

    },3000);

}

/* =====================================
        FLOATING PARTICLES
===================================== */

for(let i=0;i<20;i++){

    const particle=document.createElement("div");

    particle.className="particle";

    particle.style.left=Math.random()*100+"vw";

    particle.style.animationDuration=

    (10+Math.random()*10)+"s";

    particle.style.animationDelay=

    Math.random()*5+"s";

    document.body.appendChild(particle);

}

/* =====================================
        CONSOLE BANNER 😎
===================================== */

console.log(

`🚀 DevOps Production Platform

Linux
Docker
Terraform
AWS
GitHub Actions
Nginx
Flask
Kubernetes
Prometheus
Grafana

Built by Abdallah Hegazy`
);