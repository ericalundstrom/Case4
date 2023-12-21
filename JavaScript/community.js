"use strict";

async function RenderCommunity() {

    document.querySelector("body").style.backgroundImage = "url(images/backgroundCommunity.png)";

    swapStyleSheet("css/community.css");
    let wrapper = document.querySelector("#wrapper");

    BasicLayout();
    wrapper.innerHTML = `
        <div id="comunityBox"> 
            <h2> Community </h2>
            <div id="stroke"></div>
            <div id="commentBox"></div>
        </div>

        <div id="backgroundButton">    
            <button onclick="RenderNewCommentPage()"> Add a post + </button>
        </div>
        <div id="tipsbox"></div>
        <div id="calender"></div>
    `;

    let user = localStorage.getItem("user");
    let responseUser = await getUser(user);

    let userPic = responseUser[0].personal.picture;

    if (userPic === "") {

        document.querySelector("#profile").style.backgroundImage = "url(images/userpic.webp)";
    } else {
        document.querySelector("#profile").style.backgroundImage = `url(${userPic})`;
    };

    let calender = document.querySelector("#calender");
    let comments = document.querySelector("#commentBox");
    let tips = document.querySelector("#tipsbox");

    let response = await fetch("api/data/community.json");
    let resourse = await response.json();

    tipsBox(tips);

    RenderComment(comments, resourse, true);

    RenderCalendar(calender);

}


function tipsBox(parent) {
    let currentTipIndex = 0;
    let timer;

    const tipsArray = [
        {
            date: "2023-09-11",
            title: "Sale on light tables in pennstore",
            description: "Models ****** and **** are half price off right now. Sale will be on until December first.",
        },
        {
            date: "2023-09-15",
            title: "Special discounts at Art Haven",
            description: "Art Haven is offering a 20% discount on all painting supplies this weekend. Don't miss out!",
        },
        {
            date: "2023-09-20",
            title: "Tech Extravaganza at Gadget Galaxy",
            description: "Explore the latest gadgets and enjoy exclusive discounts at Gadget Galaxy. Limited stock available!",
        }
    ];

    function updateTip() {
        const tip = tipsArray[currentTipIndex];
        const tipsContainer = document.getElementById("tips");
        tipsContainer.innerHTML = `
            <p id="date">${tip.date}</p>
            <h3>${tip.title}</h3>
            <div id="SmallStroke"></div>
            <p>${tip.description}</p>
        `;

        // Update dots based on the currentTipIndex
        const dotsContainer = document.getElementById("dots");
        dotsContainer.innerHTML = tipsArray.map((_, index) => `<div class="dot ${index === currentTipIndex ? 'active' : ''}"></div>`).join('');
    }

    function nextTip() {
        currentTipIndex = (currentTipIndex + 1) % tipsArray.length;
        updateTip();
    }

    function prevTip() {
        currentTipIndex = (currentTipIndex - 1 + tipsArray.length) % tipsArray.length;
        updateTip();
    }

    function startTimer() {
        timer = setInterval(nextTip, 3000); // Change tip every 3 seconds
    }

    function stopTimer() {
        clearInterval(timer);
    }

    parent.innerHTML = `
        <div id="leftArrow"> < </div>
        <div id="bigBox">
            <div id="tips"></div>
            <div id="dots"></div>
        </div>
        <div id="rightArrow"> > </div>
    `;

    parent.addEventListener("mouseenter", () => {
        stopTimer()
    })
    parent.addEventListener("mouseleave", () => {
        startTimer();
    })
    parent.querySelector("#leftArrow").addEventListener("click", () => {
        prevTip()
    });
    parent.querySelector("#rightArrow").addEventListener("click", () => {
        nextTip()
    });

    updateTip();
    startTimer();
}


function RenderCalendar(parent) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    let currentMonthIndex = 0; // Default to January
    let currentYear = new Date().getFullYear();

    const events = {
        January: {
            1: "MUSIK, Deadline 8/1",
            7: "Special feature: Artist Spotlight",
            8: "Deadline för tema MUSIK",
            15: "New series premiere",
        },
        February: {
            1: "JÄGARE OCH SAMLARE, Deadline 1/5",
            14: "Valentine's Day special",
            28: "Community showcase",
        },
        March: {
            3: "RESA, Deadline 22/5",
            20: "Spring Series Festival",
            29: "Fan Art Friday",
        },
        April: {
            4: "April Fools' Day surprise",
            12: "Genre exploration: Mystery",
            23: "NATUR, Deadline 1/8",
        },
        May: {
            1: "Deadline för tema JÄGARE OCH SAMLARE",
            2: "Monthly Challenge: Superheroes",
            10: "Mother's Day tribute",
            18: "Spotlight on Fantasy series",
            22: "Deadline för tema RESA",
        },
        June: {
            6: "Summer Kickoff: Beach-themed series",
            16: "Interactive Q&A with Artists",
            25: "Mid-Year Review",
        },
        July: {
            1: "Independence Day special",
            11: "Series recommendations from the community",
            21: "Summer Series Contest",
        },
        August: {
            1: "Deadline för tema NATUR",
            9: "Focus on Sci-Fi series",
            19: "Interactive Polls: Your favorite genres",
            30: "Artist Collaboration Week",
        },
        September: {
            5: "Back-to-School series promotion",
            14: "Series Revival: Bring back old favorites",
            26: "Fall Series Launch",
        },
        October: {
            8: "Halloween Horror Series",
            18: "Series Fan Art Contest",
            31: "Spooky Specials for Halloween",
        },
        November: {
            3: "National Novel Writing Month (NaNoWriMo) series adaptation",
            13: "Thanksgiving Series Showcase",
            23: "Black Friday Series Sale",
        },
        December: {
            7: "Holiday Series Marathon",
            17: "Winter Wonderland Series",
            24: "Christmas Eve Special",
        },
    };


    function changeMonth(delta) {
        currentMonthIndex += delta;

        // Handle overflow
        if (currentMonthIndex < 0) {
            currentMonthIndex = 11; // December
            currentYear--;
        } else if (currentMonthIndex > 11) {
            currentMonthIndex = 0; // January
            currentYear++;
        }

        updateCalendar();
    }

    function showEventPopup(date) {
        let popUp = document.querySelector("#popUp");
        popUp.classList.add("popUpCalender");
        popUp.classList.remove("hidden");

        popUp.innerHTML = `
        <div id="close"> x </div>
            ${months[currentMonthIndex]} ${date}, ${currentYear}
        `;

        const event = events[months[currentMonthIndex]][date];
        if (event) {
            popUp.innerHTML = ` 
            <div id="close"> x </div>
            <div id="tema">
                <h3> Tema </h3>
                ${months[currentMonthIndex]} ${date}, ${currentYear} <br>
                ${events[months[currentMonthIndex]][date]}
            </div>
            <div id="about">
                <h3> About submission </h3> 
                <p>maila serier som lågupplösta pdf:er direkt i mailet till mig </p>
            </div>
            <div id="contact">
                <h3> Contact </h3> 
                <p> Rojin@ordforlag.se</p>
            </div>
            `;
        }

        popUp.querySelector("#close").addEventListener("click", (e) => {
            e.stopPropagation();
            popUp.classList.add("hidden");
        })
    }


    function updateCalendar() {
        const monthElement = document.getElementById("month");
        const datesContainer = document.getElementById("dates");

        // Clear existing dates
        datesContainer.innerHTML = "";

        const totalDaysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentYear, currentMonthIndex, 1).getDay();

        monthElement.children[1].textContent = months[currentMonthIndex];

        for (let i = 0; i < firstDayOfMonth; i++) {
            let emptyDiv = document.createElement("div");
            datesContainer.appendChild(emptyDiv);
        }

        for (let i = 1; i <= totalDaysInMonth; i++) {
            let dateDiv = document.createElement("div");
            dateDiv.classList.add("date");
            dateDiv.textContent = i;

            const event = events[months[currentMonthIndex]][i];
            if (event) {
                dateDiv.style.fontWeight = "bold";
                dateDiv.addEventListener("click", () => {
                    showEventPopup(i)
                });
            }

            // Attach click event to each date

            datesContainer.appendChild(dateDiv);
        }
    }

    parent.innerHTML = `
        <h2> Galagos deadline </h2>
        <div id="month">
            <div class="arrow" id="prevMonth"> < </div>
            <div>${months[currentMonthIndex]}</div>
            <div class="arrow" id="nextMonth"> > </div>
        </div>
        <div id="SmallStroke"></div>

        <div id="days">
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
            <div>S</div>
        </div>

        <div id="dates"></div>
    `;

    // Add event listeners to the arrow buttons
    document.getElementById("prevMonth").addEventListener("click", () => changeMonth(-1));
    document.getElementById("nextMonth").addEventListener("click", () => changeMonth(1));

    updateCalendar();
}


async function RenderComment(parent, resourse, value) {


    if (value) {

        resourse.forEach(async comment => {

            let background = document.createElement("div");
            background.classList.add("backgroundComment");
            let commentBox = document.createElement("div");
            let numberOfComments = comment.comments.length;


            commentBox.innerHTML = `
                <div id="box">
                        <div id="userAndProfile">
                            <img id="profilePic" src="${comment.picture}">
                            <p id="username">${comment.author}</p>
                        </div>
                        <div id="date">${comment.date}</div>
            
                        <h2>${comment.title}</h2>
                        <p>${comment.description}</p>
            
                        <div id="comments">
                            <div id="icon">icon</div>
                            <div id="count">${numberOfComments}</div>
                        </div>
                </div>
                <div id="stroke"></div>
                `;

            commentBox.addEventListener("click", (event) => {
                RenderPostLayout(comment);
            })

            background.append(commentBox);
            parent.append(background);
        });
    } else {
        document.querySelector("#commentBox").innerHTML += `
        <div id="goBack"> Go Back </div>
    `;

        document.querySelector("#goBack").addEventListener("click", RenderCommunity);


        let commentBox = document.createElement("div");
        let numberOfComments = resourse.comments.length;
        // console.log(resourse.picture);

        commentBox.innerHTML = `
                <div id="box">
                        <div id="userAndProfile">
                            <img id="profilePic" src="${resourse.picture}">
                            <p id="username">${resourse.author}</p>
                        </div>
                        <div id="date">${resourse.date}</div>

                        <h2>${resourse.title}</h2>
                        <p>${resourse.description}</p>

                        <div id="comments">
                            <div id="icon">icon</div>
                            <div id="count">${numberOfComments}</div>
                        </div>
                </div>
                <div id="stroke"></div>
                `;

        commentBox.querySelector("#profilePic").style.backgroundImage = `url(${resourse.picture})`;
        parent.append(commentBox);

        document.querySelector("#commentBox").innerHTML += `
            <div id="divForComments"></div>
            <form id="addComment" action="api/community.php" method="POST">
                <input type="text" id="comment" name="comment"placeholder="Skriv en kommentar här..."/>
                <div id="submitIcon"></div>
            </form>
        `;
        document.querySelector("#goBack").addEventListener("click", RenderCommunity);

        if (resourse.comments.length !== 0) {

            for (let i = 0; i < resourse.comments.length; i++) {

                let divDom = document.createElement("div");
                divDom.innerHTML = `
                <div id="userAndProfile">
                <img id="profilePic" src="${resourse.comments[i].picture}">
                    <p id="username">${resourse.comments[i].author}</p>
                </div>
                <div id="date">${resourse.comments[i].date}</div>
                <div id="stroke"></div>
                <p>${resourse.comments[i].comment}</p>
                `;
                document.querySelector("#divForComments").append(divDom);

            }
        } else {
            console.log("finns inga kommentarer");
        }
        document.querySelector("#submitIcon").addEventListener("click", (event) => {
            event.stopPropagation();


            addComment(resourse);
        })
    }
}


function RenderNewCommentPage() {
    // console.log("add");

    // BasicLayout();
    document.querySelector("body").innerHTML += `
    <div id="BackgroundColor" class="hidden">
        <div id="bigBoxCommunity">
            <h3> Add a new post</h3>

            <form action="api/community.php" method="POST">
                <div id="titleBox"> 
                    <label for="title">Title:</label>
                    <input type="text" id="title" name="title" />
                </div>

                <div id="descriptionBox">
                    <label for="description">Description:</label>
                    <input type="text" id="description" name="description"/>
                </div>

                <button type="submit"> Upload to community</button>
            </form>

            <div id="message"></div>
            
            <div id="x"> Close </div>
        </div>
    </div>
    `;

    document.querySelector("#BackgroundColor").classList.remove("hidden");
    document.querySelector("#x").addEventListener("click", () => {
        // document.querySelector("#BackgroundColor").classList.add("hidden");
        document.querySelector("#BackgroundColor").remove();

    });

    // document.querySelector("");
    let form = document.querySelector("form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        let title = document.querySelector("#title").value;;
        let description = document.querySelector("#description").value;
        let profilePic = localStorage.getItem("profilePic");

        let user = localStorage.getItem("user");
        let userParse = JSON.parse(user);
        // console.log(user);
        let body = {
            "title": title,
            "description": description,
            "author": userParse,
            "picture": profilePic
        };

        try {

            let respons = await fetching("api/community.php", "POST", body);
            let resourse = await respons.json();

            if (!resourse.message) {
                console.log(resourse);
                document.querySelector("#message").textContent = "Successfully added post!";
            } else {
                console.log(resourse.message);
                document.querySelector("#message").textContent = resourse.message;
            }
        } catch (e) {
            // console.log(e);
            document.querySelector("#message").textContent = e;
        }
    });

}


async function RenderPostLayout(data) {
    // console.log(data);

    BasicLayout();
    let wrapper = document.querySelector("#wrapper");
    wrapper.innerHTML = `
        <div id="comunityBox"> 
            <h2> Community </h2>
            <div id="stroke"></div>
            <div id="commentBox"></div>
        </div>

            <button onclick="RenderNewCommentPage()"> Add a post + </button>
            <div id="tipsbox">
                <div id="tips">
                    <h3> Sale on light tables in pennstore </h3>
                    <div id="SmallStroke"></div>
                    <p> Models ****** and **** are half price off right now. Sale will be on untill december first </p>
                    <p id="date">2023-09-11</p>
                </div>
                <div id="dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
            <div id="calender"></div>
    `;


    let user = localStorage.getItem("user");
    let responseUser = await getUser(user);

    // console.log(responseUser);


    // console.log(responseUser[0].personal.picture);
    let userPic = responseUser[0].personal.picture;

    if (userPic === "") {

        document.querySelector("#profile").style.backgroundImage = "url(images/userpic.webp)";
    } else {
        document.querySelector("#profile").style.backgroundImage = `url(${userPic})`;
    };


    let calender = document.querySelector("#calender");
    let comments = document.querySelector("#commentBox");

    RenderCalendar(calender);
    RenderComment(comments, data, false);
}


async function addComment(resourse) {
    let form = document.querySelector("form");
    let comment = form.querySelector("#comment").value;
    let user = localStorage.getItem("user");
    let userParse = JSON.parse(user);
    let id = resourse.id;

    let profilePic = localStorage.getItem("profilePic");
    // // console.log(comment, userParse, id, profilePic);


    let body = {
        "author": userParse,
        "picture": profilePic,
        "comment": comment,
        "id": id
    };

    let respons = await fetching("api/community.php", "POST", body);
    let resourseComment = await respons.json();

    if (resourseComment) {

        // // console.log(resourseComment);
        RenderCommunity();

    }
}


async function getUserPic(user) {
    let userpro = await fetch(`api/data/users.json?userPic=${user}`);
    let userPic = await userpro.json();
    // // console.log(userPic);

    return userPic;
}