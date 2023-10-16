$(function() {
    

      const imgs = document.getElementById("imgs");
      const leftBtn = document.getElementById("left");
      const rightBtn = document.getElementById("right");
      
      const img = document.querySelectorAll("#imgs img");
      
      let idx = 0;
      
      let interval = setInterval(run, 3000);
      
      function run() {
        idx++;
        changeImage();
      }
      
      function changeImage() {
        if (idx > img.length - 1) {
          idx = 0;
        } else if (idx < 0) {
          idx = img.length - 1;
        }
      
        imgs.style.transform = `translateX(${-idx * 248}px)`;
      }
      
      function resetInterval() {
        clearInterval(interval);
        interval = setInterval(run, 2000);
      }
      
      rightBtn.addEventListener("click", () => {
        idx++;
        changeImage();
        resetInterval();
      });
      
      leftBtn.addEventListener("click", () => {
        idx--;
        changeImage();
        resetInterval();
      });

      (function (d) {
        "use strict";
      
        const buttons = d.querySelectorAll(".button");
        const content = d.querySelectorAll(".content");
      
        content.forEach((item) => {
          item.classList.add("hide");
        });
      
        buttons.forEach((item) => {
          item.classList.remove("hide");
          item.addEventListener("click", (event) => {
            hideAll();
            showDiv(item.dataset.destination);
          });
        });
      
        function hideAll() {
          content.forEach((item) => {
            item.classList.add("hide");
            item.classList.remove("show");
          });
        }
      
        function showDiv(targetDiv) {
          d.querySelector("#" + targetDiv).classList.add("show");
        }
      })(document);

      jQuery("body").buoyant({
        numberOfItems: 20,
        backgroundColor: "#C0392B",
        minRadius: 5,
        maxRadius: 30,
        elementClass: 'circles'
    });

jQuery("body").buoyant({
        numberOfItems: 20,
        backgroundColor: "#C0392B",
        minRadius: 5,
        maxRadius: 30,
        elementClass: 'circles2'
    });

    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-36251023-1']);
    _gaq.push(['_setDomainName', 'jqueryscript.net']);
    _gaq.push(['_trackPageview']);
  
    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
    try {
        fetch(new Request("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", { method: 'HEAD', mode: 'no-cors' })).then(function(response) {
          return true;
        }).catch(function(e) {
          var carbonScript = document.createElement("script");
          carbonScript.src = "//cdn.carbonads.com/carbon.js?serve=CK7DKKQU&placement=wwwjqueryscriptnet";
          carbonScript.id = "_carbonads_js";
          document.getElementById("carbon-block").appendChild(carbonScript);
        });
      } catch (error) {
        console.log(error);
      }

})
