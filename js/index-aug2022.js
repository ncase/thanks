let url = new URL(window.location.href);
if(url.searchParams.get('credits')){

    // Assumes credits is 700px x 400px

    // New style!
    let overrideStyle = document.createElement('style');
    overrideStyle.innerHTML = `
        #thanks{ width:660px; margin:0px auto; }
        #peeps{ column-count:3; padding-top:405px; padding-bottom:405px; margin:0; }
        #header,#month{ display:none; }
        .heart{ position:fixed; z-index:999; font-size:30px; margin:4px 7px; }
        .heart::before{ content:'💖'; }
        .heart[lean=left]{ transform:rotate(-10deg); }
        .heart[lean=right]{ transform:rotate(10deg); }
        @media (max-width: 660px) {
        	#thanks{
        		width: 440px;
        	}
        	#peeps{
        		column-count: 2;
        	}
        }
        `;
    document.head.appendChild(overrideStyle);

    // DOM manip after DOM's loaded
    setTimeout(()=>{

        // Dancing hearts
        let placeHeart = (style)=>{
            let heart = document.createElement("div");
            heart.className = "heart";
            heart.style = style;
            document.body.appendChild(heart);
            return heart;
        };
        let hearts = [
            placeHeart('top:0; left:0'),
            placeHeart('top:0; right:0'),
            placeHeart('bottom:0; left:0'),
            placeHeart('bottom:0; right:0')
        ];

        // Scroll down (& anim hearts)
        let pageHeight = document.body.getBoundingClientRect().height,
            screenHeight = window.innerHeight,
            maxScrollTop = pageHeight - screenHeight - 5; // 5px for margin of error
        window.scrollTo(0,0);
        let timer = 2,
            prevTimer = 1.9;
        let anim = ()=>{

            // Scroll
            window.scrollTo(0, window.scrollY+2);
            if(window.scrollY >= maxScrollTop){
                window.scrollTo(0,0);
            }

            // Heart dance
            timer += 1/60;
            if(prevTimer<1 && timer>=1){
                hearts[0].setAttribute('lean','left');
                hearts[1].setAttribute('lean','right');
                hearts[2].setAttribute('lean','right');
                hearts[3].setAttribute('lean','left');
            }
            if(prevTimer<2 && timer>=2){
                hearts[0].setAttribute('lean','right');
                hearts[1].setAttribute('lean','left');
                hearts[2].setAttribute('lean','left');
                hearts[3].setAttribute('lean','right');
            }
            if(timer>=2) timer=0; // loop
            prevTimer = timer; // next

            // Loop
            requestAnimationFrame(anim);
        };
        requestAnimationFrame(anim);

    },1);

}