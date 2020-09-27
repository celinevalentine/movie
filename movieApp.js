//set global variables

let currentId = 0;
let movieList = [];

//when DOMcontent loaded
$(function() {


    //submit title and rating inputs to the form
    $("#movie-form").on("submit", function(e) {
        e.preventDefault();

        //set movieData obj's key and value
        let title = $("#title").val();
        let rating = $("#rating").val();

        let movieData = { title, rating, currentId };

        //update id and movieList
        movieList.push(movieData);
        currentId++;

        //make movieTable then append to tbody
        const movieTable = createMovieTable(movieData);
        $("#movie-table").append(movieTable);
        //reset the form for new inputs
        $("#movie-form").trigger("reset");
    });
    //define createMovieTable function
    function createMovieTable(data) {
        return `
        <tr>
            <td>${data.title}</td>
            <td>${data.rating}</td>
            <td>
                <button class="btn btn-danger" data-delete-id="${data.currentId}">Delete</button>
             </td>
         </tr>
            `;
    };

    // click delete btn to remove from movieList
    $("tbody").on("click", ".btn.btn-danger", function(e) {
        //     //find index of movie
        let idxToRemove = movieList.findIndex(val => val.currentId === +$(this).data("deletedId"));
        //remove it from array
        movieList.splice(idxToRemove, 1);
        //remove it from DOM
        $(this).closest("tr").remove();
    });

    //sort click events
    $(".fas").on("click", function(e) {
        //define sorting direction, key and method
        let direction = $(this).hasClass("fa-sort-down") ? "down" : "up";
        //id could be "title", "rating" or "deteletedId"
        let keyToSortBy = $(this).attr("id");

        let sortedMovies = sortBy(movieList, keyToSortBy, direction);
        //empty table
        $("#movie-table").empty();

        //loop over sortedMovies then append to movieTable
        for (let movie of sortedMovies) {
            const sortedItem = createMovieTable(movie)
            $("#movie-table").append(sortedItem);
        };
        //toggle the arrow
        $(this).toggleClass("fa-sort-down");
        $(this).toggleClass("fa-sort-up");

    });
    //define sortBy function, return array of objects by 1 of 3 keys ("rating")
    function sortBy(array, keyToSortBy, direction) {
        return array.sort(function(a, b) {
            if (keyToSortBy === "rating") {
                a[keyToSortBy] === +a[keyToSortBy];
                b[keyToSortBy] === +b[keyToSortBy];
            }
            if (a[keyToSortBy] > b[keyToSortBy]) {
                //ascending if a>b
                return direction === "up" ? 1 : -1;
            } else if (a[keyToSortBy] < b[keyToSortBy]) {
                return direction === "up" ? -1 : 1;
            }
            return 0;
        });
    }
});