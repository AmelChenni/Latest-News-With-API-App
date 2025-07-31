    let articleList = document.querySelector('.news-list');
    let key  = "0f4ca77e50f247ab9c5fd339b9b2f32d";
    let pageSize = 10;
    let btnSearch = document.querySelector('.search')
    let btnHome = document.querySelector('.home')
    let allData = [];
    let tableOfAllTitle = []


fetchData().then(displayData);


     async function fetchData() {
      articleList.textContent=""
        try {
            const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${key}&pageSize=${pageSize}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            data.articles.forEach(artical => {
             allData.push(artical);

            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }






 
  

     function displayData() {
      articleList.textContent="";
      console.log(allData);
      
           allData.forEach(artical => {
              // create elemet to Html
              let li = document.createElement('li')
               li.innerHTML = `
                    <div class="info">
                      <div class="author">
                        <span>Author</span> 
                        ${artical.author || "Unknown"}
                      </div>
                      <div class="published-at">${new Date(artical.publishedAt).toDateString()}</div>
                    </div>
                    <img src="${artical.urlToImage || ""}" alt="${artical.title}">
                    <a class="title" href="${artical.url}" title="${cutTitle(artical.title , 2)}" target="_blank">${cutTitle(artical.title , 7)}"</a>
                    <p class="description">${artical.content}</p>
                    <div class="source">
                      <span>[Source]</span>
                       ${artical.source.name}
                    </div>
            `
            articleList.appendChild(li)
    });
  }

       // function to slice to title if long
           function cutTitle(title , long){
          let titleTable = title.split(" ")
          if(titleTable.length >= long){
            title = titleTable.slice(0, long +1).join(" ")+"...";
             return title  ;
           } else{
             return title  ;
             }      
        }


// btn
    btnSearch.addEventListener('click',searchFunction)
        
  function searchFunction(){
    tableOfAllTitle = []; 

      let keySearch = document.querySelector('.container input').value;
      // console.log(keySearch);
      
          if(keySearch){
                  allData.forEach((element) => {
                    // console.log(element.title);
                    
                    // const tableResult = tableOfAllTitle.filter(article => article.includes(keySearch));

                    if(element.title. toLowerCase().includes(keySearch.toLowerCase())){
                        tableOfAllTitle.push(element);
                    }

                    
                  });
                   console.log(tableOfAllTitle);
                 if(tableOfAllTitle.length>0){
                                      articleList.textContent= ""

                    tableOfAllTitle.forEach(artical => {
                     let li = document.createElement('li')
               li.innerHTML = `
                    <div class="info">
                      <div class="author">
                        <span>Author</span> 
                        ${artical.author || "Unknown"}
                      </div>
                      <div class="published-at">${new Date(artical.publishedAt).toDateString()}</div>
                    </div>
                    <img src="${artical.urlToImage || ""}" alt="${artical.title}">
                    <a class="title" href="${artical.url}" title="${cutTitle(artical.title , 2)}" target="_blank">${cutTitle(artical.title , 7)}"</a>
                    <p class="description">${artical.content}</p>
                    <div class="source">
                      <span>[Source]</span>
                       ${artical.source.name}
                    </div>
            `
            articleList.appendChild(li)
                   });
                 }else{
                  alert("Not Exist..")
                 }


          }else{
            alert("fill the search input please")
          }
  }
          
        
 btnHome.addEventListener('click',displayData)