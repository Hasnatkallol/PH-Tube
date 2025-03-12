// Function for remove active class
function removeActiveClass(){
   let removeBtn = document.getElementsByClassName('active');
    for(let btn of removeBtn){
        btn.classList.remove('active')
    }
}

function loadCategories() {
fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
.then((res)=>res.json())
.then(data => displayCategories(data.categories))
}
function displayCategories(categories){
 for(const categorie of categories){
    let categoryContainer = document.getElementById('category-container');
    let div = document.createElement('div');
    div.innerHTML = 
     `  <button id="${categorie.category_id}" onclick="loadCategoriesVideo(${categorie.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${categorie.category}</button>`
     categoryContainer.appendChild(div)
 }
}

// For Load Videos 
const loadVideo = (searchText ='') =>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then(response => response.json())
    .then(data => {
        removeActiveClass()
        document.getElementById('btnAll').classList.add('active')
        displayVideo(data.videos)
    }
    )
}
function displayVideo(videos){
    let videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = "";

    if(videos.length == 0){
        videoContainer.innerHTML = 
        `
           <div class="col-span-full justify-center flex flex-col items-center text-center py-20">
          <img src="./assets/Icon.png" alt="">
         <h2 class="text-4xl font-bold"> Opps ! There is no content here ...</h2>
          </div>
        `
        return;

    }

    videos.forEach(video => {         
        let div = document.createElement('div')
        div.innerHTML = 
        `
         <div class="card bg-base-100 ">
         <figure class="relative">
             <img class="w-full h-[150px] object-cover" src="${video.thumbnail}" alt="Shoes" />
             <span class="bottom-2 right-2 p-2 absolute text-white text-sm bg-black rounded-md">3 hrs 56 minutes ago</span>
         </figure>
         <div class=" flex gap-5 px-0 py-5">
           <div class="profile">
            <div class="avatar">
               <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                  <img class="" src="${video.authors[0].profile_picture}" alt="Shoes" />
               </div>
             </div>
           </div>
           <div class="intro">
               <p class="text-sm font-semibold text-gray-400 flex gap-1">
               ${video.authors[0].profile_name}
                 ${video.authors[0].verified == true ? `   <p class="text-sm text-gray-400 flex gap-1">Awlad Hoessen 
                  <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=FNbnqlDTjR45&format=gif" alt="">
               </p>` : ``}
               </p>

               

               
             
               <p class="text-sm text-gray-400">${video.others.views}Views</p> 
               <p class="text-sm text-gray-400">${video.title}Views</p> 
           </div>
         </div>
         <button onclick=loadVideoDetails('${video.video_id}') class="btn btn-block">Show Details</button>
      </div>
       `;
        videoContainer.appendChild(div)
    });
}

// For Dinamic Load Video 
function loadCategoriesVideo(id){
let url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
fetch(url)
.then(res => res.json())
.then(data => {

    removeActiveClass()
    const clickedButton = document.getElementById(`${id}`);
    clickedButton.classList.add('active')
    displayVideo(data.category)
})
}


// Function for details Video 
function loadVideoDetails(id){
   let url = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`
  fetch(url)
  .then(res => res.json())
  .then(data => displayVideoDetails(data.video)
  )
}

function displayVideoDetails(video){
document.getElementById('show_videoDetails').showModal();
let detailsContainer =  document.getElementById('videoContainer') ;
detailsContainer.innerHTML = 
`
<div class="card bg-base-100 image-full  shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
 
    </div>
  </div>
</div>
`
}



// For search Box
document.getElementById('searchInput').addEventListener('keyup',function(e){
  input = e.target.value;
  loadVideo(input);
  
})

loadCategories()
// loadVideo()