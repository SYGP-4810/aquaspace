$(document).ready(function() {
    let url_string = window.location.href;
    let url = new URL(url_string);
    let firstName = url.searchParams.get("firstName");
    let lastName = url.searchParams.get("lastName");
    let persentage = url.searchParams.get("persentage");
    let numOfPost = url.searchParams.get("post");
    let numOfArticle = url.searchParams.get("article");
    let numOfQuestion = url.searchParams.get("question");
    let bCount = url.searchParams.get("bCount");
    $("#contributionD").html(`
    <li>
                        <span class="l-name">Name</span>
                        <span class="l-value">${firstName} ${lastName}</span>
                    </li>
                    <li>
                        <span class="l-name">No of post verification</span>
                        <span class="l-value"> ${numOfPost}</span>
                    </li>
                    <li>
                        <span class="l-name">No of fish articles wrote</span>
                        <span class="l-value">${numOfArticle}</span>
                    </li>
                    <li>
                        <span class="l-name">No of blog articles wrote</span>
                        <span class="l-value">${bCount}</span>
                    </li>
                    <li>
                        <span class="l-name">No of questions answered</span>
                        <span class="l-value">${numOfQuestion}</span>
                    </li>
                    <li>
                        <span class="l-name">Percentage</span>
                        <span class="l-value">${persentage}%</span>
                    </li>
    `);
});