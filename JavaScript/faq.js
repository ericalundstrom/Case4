"use strict";

function RenderFaq() {
    console.log("Faq");

    swapStyleSheet("css/faq.css");
    BasicLayout();

    document.querySelector("#wrapper").innerHTML = ``;
    let wrapper = document.querySelector("#wrapper")

    wrapper.innerHTML = `

        <div id="faqBox">
            <h2> FAQ </h2>
            <div id="stroke"></div>
            <div id="questions">
                <div class="faq">
                <img id="arrow" src="/images/arrowFAQ.png">
                    <h3> Is there a mobile app available for reading comics on the go?</h3>
                    <div id="backgroundFAQ" class="hidden">
                        <div id="answere">
                            <p> Yes, we have a user-friendly mobile app for both iOS and Android devices. Download the app from the respective app stores, log in with your account, and enjoy reading your favorite comics anytime, anywhere.</p>
                        </div>
                    </div>
                </div>
                <div class="faq">
                <img id="arrow" src="/images/arrowFAQ.png">
                    <h3> Can I share my favorite comics with friends or on social media?</h3>
                    <div id="backgroundFAQ" class="hidden">
                        <div id="answere">
                            <p> Absolutely! Our platform encourages sharing the joy of comics. You can easily share your favorite comics with friends through the app, and we provide seamless integration with popular social media platforms, allowing you to showcase and discuss your top picks with your online community. </p>
                        </div>
                    </div>
                </div>
                <div class="faq">
                <img id="arrow" src="/images/arrowFAQ.png">
                    <h3>How often are new comics added to the platform?</h3>
                    <div id="backgroundFAQ" class="hidden">
                        <div id="answere">
                            <p> We are committed to providing fresh and engaging content regularly. New comics are added to the platform on a [weekly/monthly] basis, ensuring that our users always have something exciting to discover and enjoy. Stay tuned for a continuous stream of captivating hand-drawn stories. </p>
                        </div>
                    </div>
                </div>
                <div class="faq">
                <img id="arrow" src="/images/arrowFAQ.png">
                    <h3> Can I read comics offline?</h3>
                    <div id="backgroundFAQ" class="hidden">
                        <div id="answere">
                            <p> Yes, you can! Our platform offers an offline reading feature, allowing you to download your favorite comics and access them without an internet connection. This is perfect for users who want to enjoy their comics during travel or in areas with limited connectivity.</p>
                        </div>
                    </div>
                </div>
                <div class="faq">
                <img id="arrow" src="/images/arrowFAQ.png">
                    <h3>What genres of comics are available on this site?</h3>
                    <div id="backgroundFAQ" class="hidden">
                        <div id="answere">
                            <p> Our platform hosts a diverse range of comic genres to cater to various tastes. Whether you're a fan of action, romance, fantasy, or comedy, you'll find a rich selection of hand-drawn comics that span different genres. Explore our library to discover hidden gems and popular titles in your preferred genre. </p>
                        </div>
                    </div>
                </div>
                <div class="faq">
                    <img id="arrow" src="/images/arrowFAQ.png">
                    <h3> How can I start reading comics on this platform?</h3>
                    <div id="backgroundFAQ" class="hidden">
                        <div id="answere">
                            <p> Getting started is easy! Simply sign up for an account on our platform, either on our website or through the mobile app. Once registered, you can browse through our extensive library, explore different genres, and start reading your favorite hand-drawn comics. Dive into the world of captivating stories and imaginative illustrations with just a few clicks!</p>
                        </div>
                    </div>
                </div> 
            </div>
            </div>
            <div id="BigStroke"></div>
            <div id="backgroundButton">
                <button> Ask a question </button>
            </div>
    `;
    let questions = wrapper.querySelectorAll("h3");
    console.log(questions);
    questions.forEach(question => {
        question.addEventListener("click", (event) => {
            let parent = event.target.parentNode;
            let answer = parent.querySelector("#backgroundFAQ");
            let arrow = parent.querySelector("img");
            answer.classList.toggle("hidden");
            if (answer.classList.contains("hidden")) {
                arrow.style.transform = "rotate(0deg)";
            } else {
                arrow.style.transform = "rotate(180deg)";
            }

            console.log(answer);
            console.log(event.target.parentNode);
        })
    });
}

