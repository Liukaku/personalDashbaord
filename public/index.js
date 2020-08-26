
//let url = "http://127.0.0.1:3000/";
let urlPart1 = "";
const proxyURL = "https://cors-anywhere.herokuapp.com/";

let url = proxyURL + urlPart1;

var IDcount = 0;

function twitterLoad() {
  console.log("here's a tweet");
  
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'mode': 'cors',
      'method' : 'GET',
      'Access-Control-Allow-Origin': '*'
    }
  })
  .then(response => response.json()) 
  .then(content => {
      console.log(content);

      let getSavedTweets = sessionStorage.getItem("tweets");

      console.log(typeof(getSavedTweets));
      
        if (getSavedTweets === null ) {
          
          for (let i = 0; i < content.length; i++) {
            //this creates the variables for creating the elements to neaten things up
            let createTweetWrapper = document.createElement('div');
            let createTweetStacker = document.createElement('div');
            let createTweetIcon = document.createElement('img');
            let createTweetAuthor = document.createElement('h4');
            let createTweetContent = document.createElement('p');
            let createTweetImge = document.createElement('img');
            let createTweetLink = document.createElement('a');
    
            //locates the overall container div
            let parentDiv = document.getElementById('testTweet').parentNode;
            //selects the test tweet
            let testTweet = document.getElementById('testTweet');
    
            //gives the stacker div its class and a unique ID
            createTweetStacker.class = "stacker"; 
            createTweetStacker.id = "stacker" + IDcount; 
    
            //creats the div before the test tweet so when it loops, it puts things
            //in a chronological timeline
            parentDiv.insertBefore(createTweetWrapper, testTweet);
            createTweetWrapper.className = "tweet";
            createTweetWrapper.id = "tweet" + [IDcount];
  
            createTweetIcon.className = "tweetIcon"
  
            createTweetImge.className = "tweetImg";
            createTweetImge.id = "tweet-img" + [IDcount];
    
            //inserts the newly created elements into the 
            createTweetWrapper.appendChild(createTweetIcon);
            createTweetWrapper.appendChild(createTweetStacker);
            createTweetStacker.appendChild(createTweetAuthor);
            createTweetStacker.appendChild(createTweetContent);
            createTweetStacker.appendChild(createTweetImge)
    
            //sets the con
            createTweetAuthor.innerText = content[i].user.name;
            createTweetContent.textContent = content[i].text;
            createTweetIcon.src = content[i].user.profile_image_url_https;
            
            
            try {
              

              document.getElementById('tweet-img' + IDcount ).src = content[i].extended_entities.media[0].media_url_https;
              createTweetImge.style.height = "400px";
              document.getElementById('tweet' + IDcount).style.backgroundColor = "#1d3a3b";
              console.log(content[i].extended_entities.media[0].media_url_https);
              createTweetContent.onclick = function() { window.open(content[i].extended_entities.media[0].expanded_url, '_blank') };

          
            } catch (error) {
              console.log("no image for this tweet");
              
            }
            
            createTweetContent.id = IDcount
            createTweetContent.onmouseover = function(){ document.getElementById('tweet-img' + [this.id]).style.display = "block"; };
            createTweetContent.onmouseleave = function(){ document.getElementById('tweet-img' + [this.id]).style.display = "none"; };
            
            //increases the counter each loop
            IDcount++
                    //saves the tweets just loaded to session storage
        sessionStorage.removeItem("tweets");
        let storageTime = JSON.stringify(content);
        sessionStorage.setItem("tweets", storageTime);
          }
        } 

      let savedTweets = JSON.parse(getSavedTweets);

      if (content[0].text != savedTweets[0].text) {
        console.log("loading more tweets");

        var tweetChecker = 0;
        for (let p = 0; p < content.length; p++) {
          var upTo = p;
          if (savedTweets[0].text == content[p].text) {
            
            
             upTo = p;

             console.log("its a match" + p );
          }else{
            console.log("boop");
            
          }
        }

        console.log(upTo);
        
        
        for (let i = 0; i < content.length - upTo; i++) {
          //this creates the variables for creating the elements to neaten things up
          let createTweetWrapper = document.createElement('div');
          let createTweetStacker = document.createElement('div');
          let createTweetIcon = document.createElement('img');
          let createTweetAuthor = document.createElement('h4');
          let createTweetContent = document.createElement('p');
          let createTweetImge = document.createElement('img');
          let createTweetLink = document.createElement('a');
  
          //locates the overall container div
          let parentDiv = document.getElementById('testTweet').parentNode;
          //selects the first tweet in the list
          let testTweet = document.getElementById('testTweet0');
          
  
          //gives the stacker div its class and a unique ID
          createTweetStacker.class = "stacker"; 
          createTweetStacker.id = "stacker" + IDcount; 
  
          //creats the div before the test tweet so when it loops, it puts things
          //in a chronological timeline
          //parentDiv.insertBefore(createTweetWrapper, testTweet);
          testTweet.after(createTweetWrapper);
          createTweetWrapper.className = "tweet";
          createTweetWrapper.id = "tweet" + [IDcount];

          createTweetIcon.className = "tweetIcon"

          createTweetImge.className = "tweetImg";
          createTweetImge.id = "tweet-img" + [IDcount];
  
          //inserts the newly created elements into the div
          createTweetWrapper.appendChild(createTweetIcon);
          createTweetWrapper.appendChild(createTweetStacker);
          createTweetStacker.appendChild(createTweetAuthor);
          createTweetStacker.appendChild(createTweetContent);
          createTweetStacker.appendChild(createTweetImge)
  
          //sets the con
          createTweetAuthor.innerText = content[i].user.name;
          createTweetContent.textContent = content[i].text;
          createTweetIcon.src = content[i].user.profile_image_url_https;

          /*
          if (content[i].retweeted_status.extended_entities.media[i].media_url_https != undefined) {
            createTweetImge.style.height = "400px";
            document.getElementById()
          }
          */
          

          try {

            console.log(content[i].extended_entities.media[0].media_url_https);

            document.getElementById('tweet-img' + IDcount ).src = content[i].extended_entities.media[0].media_url_https;
            createTweetImge.style.height = "400px";
            document.getElementById('tweet' + IDcount).style.backgroundColor = "#1d3a3b";
            console.log(content[i].extended_entities.media[0].media_url_https);
            createTweetContent.onclick = function() { window.open(content[i].extended_entities.media[0].expanded_url, '_blank')};
        
          } catch (error) {
            console.log("no image for this tweet");
            
          }
          
          createTweetContent.id = IDcount
          createTweetContent.onmouseover = function(){ document.getElementById('tweet-img' + [this.id]).style.display = "block"; };
          createTweetContent.onmouseleave = function(){ document.getElementById('tweet-img' + [this.id]).style.display = "none"; };

          IDcount++
        }

                //saves the tweets just loaded to session storage
                sessionStorage.removeItem("tweets");
                let storageTime = JSON.stringify(content);
                sessionStorage.setItem("tweets", storageTime);
        
      } else {
        console.log("tweets were the same");
        
      }



        


        //saves the tweets just loaded to session storage
        sessionStorage.removeItem("tweets");
        let storageTime = JSON.stringify(content);
        sessionStorage.setItem("tweets", storageTime);
  })
}

document.onload = twitterLoad();

setInterval( twitterLoad, 60000);



