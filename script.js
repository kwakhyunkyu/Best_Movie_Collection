const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZWJiNWY4MjNmOTY0YjI4ZDIwZmNkY2ZmMWEwOWViOSIsInN1YiI6IjY0NzU1YTlkZGQyNTg5MDEyMDA1OTM3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ctVItL7ddFn0ENJC8e58y8g53NrPKMoVorpLOfx_4Sk",
  },
};

// 영화 목록을 가져와서 화면에 표시
function showMovieList() {
  // API로부터 영화 목록 가져오기
  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    // response.json() 응답을 JSON 형식으로 변환
    .then((response) => response.json())
    .then((data) => {
      const movieCardBox = document.getElementById("cards-box");

      // 각 영화 정보를 카드 형식으로 생성하여 표시
      data.results.forEach((item) => {
        const movieTitle = item.original_title;
        const movieDesc = item.overview;
        const movieRate = item.vote_average;
        const movieImg = item.poster_path;
        const movieId = item.id;

        const movieCard = `
          <div class="col">
            <div class="card h-100">
              <img src="https://image.tmdb.org/t/p/w500${movieImg}" class="card-img-top" />
              <div class="card-body">
                <h5 class="card-title">${movieTitle}</h5>
                <p class="card-overview">${movieDesc}</p>
                <p class="mycomment">${movieRate}</p>
              </div>
            </div>
          </div>`;

        movieCardBox.insertAdjacentHTML("beforeend", movieCard);

        // 영화 카드를 클릭했을 때 clickCard() 함수를 실행
        const clickCardBox = movieCardBox.lastElementChild;
        clickCardBox.addEventListener("click", () => clickCard(movieId));
      });
    });
}

// 이 함수는 영화 카드를 클릭했을 때 영화의 ID를 알림으로 표시
// 알림 내용은 movieId 변수와 함께 표시
function clickCard(movieId) {
  alert(`id = ${movieId}`);
}

// 영화 검색
function searchMovies() {
  // serarchInput 변수는 HTML 문서의 searchInput id를 가진 요소의 값을 저장
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  // movieCards 변수는 HTML 문서의 클래스가 col인 요소들을 배열로 저장
  const movieCards = Array.from(document.getElementsByClassName("col"));

  // filteredMovieCards 변수는 movieCards 배열을 filter() 메소드를 사용하여
  // 검색어와 일치하는 영화 카드만 필터링하여 저장
  const filteredMovieCards = movieCards.filter((movieCard) => {
    const movieTitle = movieCard
      .querySelector(".card-title")
      .textContent.toLowerCase();
    return movieTitle.includes(searchInput);
  });

  // movieCards 배열을 순회하면서 각 영화 카드를 검색 결과에 따라 표시할지 숨길지 결정
  movieCards.forEach((movieCard) => {
    if (filteredMovieCards.includes(movieCard)) {
      // 영화 카드가 포함되어 있다면, 해당 영화 카드를 화면에 표시하기 위해
      // style.display 속성을 빈 문자열로 설정 해당 영화 카드가 보이도록 설정
      movieCard.style.display = "";
    } else {
      // style.display 속성을 "none"으로 설정 해당 영화 카드가 화면에서 숨김
      movieCard.style.display = "none";
    }
  });
}

// searchButton 변수는 HTML 문서의 "searchButton" id를 가진 요소를 저장
// addEventListener() 메소드를 사용하여 "click" 이벤트가 발생했을 때 searchMovies() 함수를 실행하도록 등록
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", searchMovies);

// 영화 목록 표시 및 초기화
showMovieList();
