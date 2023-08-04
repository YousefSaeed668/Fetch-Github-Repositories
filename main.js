let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
  getRepos();
  addDataToLocalStorageFrom(theInput.value)
  // console.log(window.localStorage.getItem("inputvalue"))

};
theInput.onkeyup =function(e){
  if (e.key == "Enter"){
    getRepos();
    addDataToLocalStorageFrom(theInput.value)
  }
}

getDataFromLocalStorage();


function getRepos() {
  if (theInput.value ==""){
    reposData.innerHTML = "<span>Please Write Github Username .</span>"
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
    .then((response)=> response.json())
    .then((repositories)=>{
      reposData.innerHTML= "" ;

        repositories.forEach((repo)=>{
        let mainDiv = document.createElement("div")

        let repoName = document.createTextNode(repo.name)

        mainDiv.appendChild(repoName)

        let theUrl =document.createElement("a") ;

        let theUrlText =document.createTextNode("Visit")

        theUrl.appendChild(theUrlText)

        theUrl.href = `https://github.com/${theInput.value}/${repo.name}`

        theUrl.setAttribute("target","_blank")

        mainDiv.appendChild(theUrl )


        let starsSpan = document.createElement("span")

        let startsText = document.createTextNode(`Starts ${repo.stargazers_count}`)

        starsSpan.appendChild(startsText)
        mainDiv.appendChild(starsSpan)
        mainDiv.className = "repo-box"
        reposData.appendChild(mainDiv)
      })
    }).catch((err) => reposData.innerHTML = "<span>Please type the Username correctly</span>")

  }
}


function addDataToLocalStorageFrom(value) {
  window.sessionStorage.setItem("inputvalue", JSON.stringify(value));
}


function getDataFromLocalStorage() {
  let data = window.sessionStorage.getItem("inputvalue");
  if (data) {
    theInput.value = JSON.parse(data)
  }
}