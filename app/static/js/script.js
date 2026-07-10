const result = document.getElementById("result");

async function updateStatus() {

    try {

        const response = await fetch("/health");

        if (response.ok) {

            document.getElementById("statusBox").innerHTML =
                "🟢 System Online";

        }

    } catch {

        document.getElementById("statusBox").innerHTML =
            "🔴 Offline";

    }

}

setInterval(updateStatus, 5000);

updateStatus();



document.getElementById("healthBtn").onclick = async () => {

    const response = await fetch("/health");

    const data = await response.json();

    result.innerHTML = `

    <div class="card">

        <h2>Health Check</h2>

        <p>Status : ${data.status} ✅</p>

        <p>Egypt Time : ${data.time}</p>

    </div>

    `;

};



document.getElementById("infoBtn").onclick = async () => {

    const response = await fetch("/info");

    const data = await response.json();

    result.innerHTML = `

    <div class="card">

        <h2>System Information</h2>

        <p><b>Hostname:</b> ${data.hostname}</p>

        <p><b>Environment:</b> ${data.environment}</p>

        <p><b>Version:</b> ${data.version}</p>

        <p><b>Python:</b> ${data.python}</p>

        <p><b>OS:</b> ${data.os}</p>

        <p><b>Egypt Time:</b> ${data.time}</p>

    </div>

    `;

};



function updateClock() {

    const now = new Date();

    document.getElementById("clock").innerHTML =
        now.toLocaleString("en-GB", {
            timeZone: "Africa/Cairo"
        });

}

setInterval(updateClock, 1000);

updateClock();