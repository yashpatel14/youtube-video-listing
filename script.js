const apiUrl = "https://api.freeapi.app/api/v1/public/youtube/videos";
const videoList = document.getElementById("video-list");
const searchInput = document.getElementById("search");

let video = [];

async function getVideo() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log(data.data.data);

    const getVideoData = data.data.data;

    video = getVideoData.map((video) => video.items);
    // console.log(video);
    videoDisplay(video);
  } catch (error) {
    console.error("Error fetching videos:", error);
  }
}

function videoDisplay(videoData) {
  videoList.innerHTML = "";
  videoData.forEach((video) => {
    const videoCard = document.createElement("div");
    videoCard.classList.add("video-card");
    videoCard.innerHTML = `
                        <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.title}">
                        <div class="video-info">
                            <div class="video-title">${video.snippet.title}</div>
                            <div class="channel-name">${video.snippet.channelTitle}</div>
                        </div>
                    `;
    videoCard.addEventListener("click", () => {
      window.open(`https://www.youtube.com/watch?v=${video.id}`, "_blank");
    });
    videoList.appendChild(videoCard);
  });
}

searchInput.addEventListener("input", (e) => {
  // console.log(e.target.value);
  const searchTerm = e.target.value.toLowerCase();
  const filteredVideos = video.filter(
    (video) =>
      video.snippet.title.toLowerCase().includes(searchTerm) ||
      video.snippet.channelTitle.toLowerCase().includes(searchTerm)
  );
  videoDisplay(filteredVideos);
});

getVideo();
