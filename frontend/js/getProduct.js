  $(document).ready(function () {
    $("#reviews").click(function () {
      $(".reviews").css("display", "block");
      $(".questions").css("display", "none");
    });
    $("#questions").click(function () {
      $(".questions").css("display", "block");
      $(".reviews").css("display", "none");
    });
  
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
  
    var req = { id: id };
    //loading more items from the store
    
    $.ajax({
        type: "POST",
        url:setUrl("Reg/Reg/moreItemFromStore"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(req),
        success: function(data){
            loadingFinish();
            console.log("more item from the store", data);
            if(data.status == 1){
                $('#moreItemFromTheStore').css('display', 'none');
                $("#view-more").css('display', 'none');
            }else{
                if(Object.keys(data.moreItem).length === 0){
                    $("#view-more").css('display', 'none');
                    $('#moreItemFromTheStore').html(`<div>
                    <h3 style="text-align:center; color:red;">No more items available</h3>
                    <br>
                    <br>
                </div>`);
                }
                else {
                    data.moreItem.forEach((element => {
                        $('#moreItemFromTheStore').append(`
                        <div class="col-4">
                        <img src="/aquaspace/frontend/images/product/${element.img1}" alt="${element.product_name}" />
                        <h4>${element.product_name}</h4>
                        <p>Price: Rs${element.price}</p>
                        </div>
                        `);
                    }));
                }
            }
        },
        error: function(errMsg) {
            // window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });
    loading();
    $.ajax({
      type: "POST",
      url: setUrl("Common/getProduct"),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      async: false,
      data: JSON.stringify(req),
      success: function (data) {
          loadingFinish();
        // console.log(JSON.stringify(data));
        // console.log(data.delivery);
        $("#column_1").html(`
             <img src="../../images/product/${data.img1}" alt="" width="100%" height="500px" id="ProductImg">
  
                  <div class="small-img-row">
                      <div class="small-img-col">
                          <img id="img1" src="../../images/product/${data.img1}" alt="" width="100%" class="small-img">
                      </div>
                      <div class="small-img-col">
                          <img id="img2" src="../../images/product/${data.img2}" alt="" width="100%" class="small-img">
                      </div>
                      <div class="small-img-col">
                          <img id="img3" src="../../images/product/${data.img3}" alt="" width="100%" class="small-img">
                      </div>
                      <div class="small-img-col">
                          <img id="img4" src="../../images/product/${data.img4}" alt="" width="100%" class="small-img">
                      </div>
                  </div>
             `);
        var ProductImg = document.getElementById("ProductImg");
        var img1 = document.getElementById("img1");
        var img2 = document.getElementById("img2");
        var img3 = document.getElementById("img3");
        var img4 = document.getElementById("img4");
  
        img1.onclick = function () {
          ProductImg.src = img1.src;
        };
        img2.onclick = function () {
          ProductImg.src = img2.src;
        };
        img3.onclick = function () {
          ProductImg.src = img3.src;
        };
        img4.onclick = function () {
          ProductImg.src = img4.src;
        };
  
        // 3rd party delivery    in-store delivery     in-store pickup
        //           0                   0                     0                0
        //           0                   0                     1                1
        //           0                   1                     0                2
        //           0                   1                     1                3
        //           1                   0                     0                4
        //           1                   0                     1                5
        //           1                   1                     0                6
        //           1                   1                     1                7
  
        if (data.type == 1 || data.type == 2 || data.type == 3) {
          if (data.delivery == 0) {
            $("#column_2").html(`
          <h2 id="name">${data.product_name}</h2>
                  <p id="price">Rs. ${data.price}</p>
                  <input type="number" id="item-qty" min="1" max=${data.quantity} value="1"><span id="quantity">${data.quantity}</span><span>     </span><span>Available</span><br>
                  <h3>Product Details</h3>
                  <br>
                  <p id="description">${data.description}</p>
                  <br>
                  <h3>Address</h3>
                  <p id="address">${data.address}</p>
                  <br>
                  <h3>Telephone No</h3>
                  <p>0771234567</p>
                  <div id="report"><button class="report-btn">REPORT</button>
                    <div class="report-box">
                        <div class="dd">
                            <div>
                                <input type="radio" name="reportOptions" value="1" checked>
                                <label>False informations</label>
                            </div>
                            <div>
                                <input type="radio" name="reportOptions" value="2">
                                <label>Illegal Selling</label>
                            </div>
                            <div>
                                <input type="radio" name="reportOptions" value="3">
                                <label>Should not be in aquaspace</label>
                            </div>
                            <div>
                                <input type="radio" name="reportOptions" value="4">
                                <label>Other</label>
                            </div>
                            <div class="btn" id="submit-report">SUBMIT REPORT</div>


                        </div>



                    </div>

                </div>

                <div class="confirm-report">
                     Are you sure you want to report this item?
                     <div class="buttons">
                         <button id="confirmReport">confirm</button>
                         <button id="btn2">cancel</button>

                     </div>
                    
                </div>
  
  
          `);
          } else if (data.delivery == 1) {
            $("#column_2").html(`
          <h2 id="name">${data.product_name}</h2>
                  <p id="price">Rs. ${data.price}</p>
                  <select id="delivery_method">
                      <option orderselected hidden value="">Delivery Option</option>
                      <option value="0">In Store Pick-up</option>
                  </select>
              
                  <input type="number" id="item-qty" min="1" max=${data.quantity} value="1"><span id="quantity">${data.quantity}</span><span>     </span><span>Available</span><br>
                  <a href="#" class="btn" onclick="addToCart()">Add to Cart</a>
                  <h3>Product Details</h3>
                  <br>
                  <p id="description">${data.description}</p>
                  <br>
                  <h3>Address</h3>
                  <p id="address">${data.address}</p>
                  <br>
                  <h3>Telephone No</h3>
                  <p>0771234567</p>
                  <div id="report"><button class="report-btn">REPORT</button>
                    <div class="report-box">
                        <div class="dd">
                            <div>
                                <input type="radio" name="reportOptions" value="1" checked>
                                <label>False informations</label>
                            </div>
                            <div>
                                <input type="radio" name="reportOptions" value="2">
                                <label>Illegal Selling</label>
                            </div>
                            <div>
                                <input type="radio" name="reportOptions" value="3">
                                <label>Should not be in aquaspace</label>
                            </div>
                            <div>
                                <input type="radio" name="reportOptions" value="4">
                                <label>Other</label>
                            </div>
                            <div class="btn" id="submit-report">SUBMIT REPORT</div>


                        </div>



                    </div>

                </div>

                <div class="confirm-report">
                     Are you sure you want to report this item?
                     <div class="buttons">
                         <button id="confirmReport">confirm</button>
                         <button id="btn2">cancel</button>

                     </div>
                    
                </div>
  
  
          `);
          } else if (data.delivery == 2) {
            $("#column_2").html(`
          <h2 id="name">${data.product_name}</h2>
                  <p id="price">Rs. ${data.price}</p>
                  <select id="delivery_method">
                      <option orderselected hidden value="">Delivery Option</option>
                      <option value="1">In Store Delivery Service</option>
                  </select>
              
                  <input type="number" id="item-qty" min="1" max=${data.quantity} value="1"><span id="quantity">${data.quantity}</span><span>     </span><span>Available</span><br>
                  <a href="#" class="btn" onclick="addToCart()">Add to Cart</a>
                  <h3>Product Details</h3>
                  <br>
                  <p id="description">${data.description}</p>
                  <br>
                  <h3>Address</h3>
                  <p id="address">${data.address}</p>
                  <br>
                  <h3>Telephone No</h3>
                  <p>0771234567</p>
                  <div id="report"><button class="report-btn">REPORT</button>
                    <div class="report-box">
                        <div class="dd">
                            <div>
                                <input type="radio" name="reportOptions" value="1" checked>
                                <label>False informations</label>
                            </div>
                            <div>
                                <input type="radio" name="reportOptions" value="2">
                                <label>Illegal Selling</label>
                            </div>
                            <div>
                                <input type="radio" name="reportOptions" value="3">
                                <label>Should not be in aquaspace</label>
                            </div>
                            <div>
                                <input type="radio" name="reportOptions" value="4">
                                <label>Other</label>
                            </div>
                            <div class="btn" id="submit-report">SUBMIT REPORT</div>


                        </div>



                    </div>

                </div>

                <div class="confirm-report">
                     Are you sure you want to report this item?
                     <div class="buttons">
                         <button id="confirmReport">confirm</button>
                         <button id="btn2">cancel</button>

                     </div>
                    
                </div>
  
  
          `);
          } else if (data.delivery == 3) {
            $("#column_2").html(`
          <h2 id="name">${data.product_name}</h2>
                  <p id="price">Rs. ${data.price}</p>
                  <select id="delivery_method">
                      <option orderselected hidden value="">Delivery Option</option>
                      <option value="0">In Store Pick-up</option>
                      <option value="1">In Store Delivery Service</option>
                  </select>
              
                  <input type="number" id="item-qty" min="1" max=${data.quantity} value="1"><span id="quantity">${data.quantity}</span><span>     </span><span>Available</span><br>
                  <a href="#" class="btn" onclick="addToCart()">Add to Cart</a>
                  <h3>Product Details</h3>
                  <br>
                  <p id="description">${data.description}</p>
                  <br>
                  <h3>Address</h3>
                  <p id="address">${data.address}</p>
                  <br>
                  <h3>Telephone No</h3>
                  <p>0771234567</p>
                  <div id="report"><button class="report-btn">REPORT</button>
                    <div class="report-box">
                        <div class="dd">
                            <div>
                                <input type="radio" name="reportOptions" value="1" checked>
                                <label>False informations</label>
                            </div>
                            <div>
                                <input type="radio" name="reportOptions" value="2">
                                <label>Illegal Selling</label>
                            </div>
                            <div>
                                <input type="radio" name="reportOptions" value="3">
                                <label>Should not be in aquaspace</label>
                            </div>
                            <div>
                                <input type="radio" name="reportOptions" value="4">
                                <label>Other</label>
                            </div>
                            <div class="btn" id="submit-report">SUBMIT REPORT</div>


                        </div>



                    </div>

                </div>

                <div class="confirm-report">
                     Are you sure you want to report this item?
                     <div class="buttons">
                         <button id="confirmReport">confirm</button>
                         <button id="btn2">cancel</button>

                     </div>
                    
                </div>
  
  
          `);
          } else if (data.delivery == 4) {
            $("#column_2").html(`
          <h2 id="name">${data.product_name}</h2>
                  <p id="price">Rs. ${data.price}</p>
                  <select id="delivery_method">
                      <option orderselected hidden value="">Delivery Option</option>
                      <option value="2">Third Party Delivery Service</option>
                  </select>
              
                  <input type="number" id="item-qty" min="1" max=${data.quantity} value="1"><span id="quantity">${data.quantity}</span><span>     </span><span>Available</span><br>
                  <a href="#" class="btn" onclick="addToCart()">Add to Cart</a>
                  <h3>Product Details</h3>
                  <br>
                  <p id="description">${data.description}</p>
                  <br>
                  <h3>Address</h3>
                  <p id="address">${data.address}</p>
                  <br>
                  <h3>Telephone No</h3>
                  <p>0771234567</p>
                  <div id="report"><button class="report-btn">REPORT</button>
                    <div class="report-box">
                        <div class="dd">
                            <div>
                                <input type="radio" name="reportOptions" value="1" checked>
                                <label>False informations</label>
                            </div>
                            <div>
                                <input type="radio" name="reportOptions" value="2">
                                <label>Illegal Selling</label>
                            </div>
                            <div>
                                <input type="radio" name="reportOptions" value="3">
                                <label>Should not be in aquaspace</label>
                            </div>
                            <div>
                                <input type="radio" name="reportOptions" value="4">
                                <label>Other</label>
                            </div>
                            <div class="btn" id="submit-report">SUBMIT REPORT</div>


                        </div>



                    </div>

                </div>

                <div class="confirm-report">
                     Are you sure you want to report this item?
                     <div class="buttons">
                         <button id="confirmReport">confirm</button>
                         <button id="btn2">cancel</button>

                     </div>
                    
                </div>
  
  
          `);
          } else if (data.delivery == 5) {
            $("#column_2").html(`
          <h2 id="name">${data.product_name}</h2>
                  <p id="price">Rs. ${data.price}</p>
                  <select id="delivery_method">
                      <option orderselected hidden value="">Delivery Option</option>
                      <option value="0">In Store Pick-up</option>
                      <option value="2">Third Party Delivery Service</option>
                  </select>
              
                  <input type="number" id="item-qty" min="1" max=${data.quantity} value="1"><span id="quantity">${data.quantity}</span><span>     </span><span>Available</span><br>
                  <a href="#" class="btn" onclick="addToCart()">Add to Cart</a>
                  <h3>Product Details</h3>
                  <br>
                  <p id="description">${data.description}</p>
                  <br>
                  <h3>Address</h3>
                  <p id="address">${data.address}</p>
                  <br>
                  <h3>Telephone No</h3>
                  <p>0771234567</p>
                  <div id="report"><button class="report-btn">REPORT</button>
                    <div class="report-box">
                        <div class="dd">
                            <div>
                                <input type="radio" name="reportOptions" value="1" checked>
                                <label>False informations</label>
                            </div>
                            <div>
                                <input type="radio" name="reportOptions" value="2">
                                <label>Illegal Selling</label>
                            </div>
                            <div>
                                <input type="radio" name="reportOptions" value="3">
                                <label>Should not be in aquaspace</label>
                            </div>
                            <div>
                                <input type="radio" name="reportOptions" value="4">
                                <label>Other</label>
                            </div>
                            <div class="btn" id="submit-report">SUBMIT REPORT</div>


                        </div>



                    </div>

                </div>

                <div class="confirm-report">
                     Are you sure you want to report this item?
                     <div class="buttons">
                         <button id="confirmReport">confirm</button>
                         <button id="btn2">cancel</button>

                     </div>
                    
                </div>
  
  
          `);
          } else if (data.delivery == 6) {
            $("#column_2").html(`
          <h2 id="name">${data.product_name}</h2>
                  <p id="price">Rs. ${data.price}</p>
                  <select id="delivery_method">
                      <option orderselected hidden value="">Delivery Option</option>
                      <option value="1">In Store Delivery Service</option>
                      <option value="2">Third Party Delivery Service</option>
                  </select>
              
                  <input type="number" id="item-qty" min="1" max=${data.quantity} value="1"><span id="quantity">${data.quantity}</span><span>     </span><span>Available</span><br>
                  <a href="#" class="btn" onclick="addToCart()">Add to Cart</a>
                  <h3>Product Details</h3>
                  <br>
                  <p id="description">${data.description}</p>
                  <br>
                  <h3>Address</h3>
                  <p id="address">${data.address}</p>
                  <br>
                  <h3>Telephone No</h3>
                  <p>0771234567</p>
                  <div id="report"><button class="report-btn">REPORT</button>
                    <div class="report-box">
                        <div class="dd">
                            <div>
                                <input type="radio" name="reportOptions" value="1" checked>
                                <label>False informations</label>
                            </div>
                            <div>
                                <input type="radio" name="reportOptions" value="2">
                                <label>Illegal Selling</label>
                            </div>
                            <div>
                                <input type="radio" name="reportOptions" value="3">
                                <label>Should not be in aquaspace</label>
                            </div>
                            <div>
                                <input type="radio" name="reportOptions" value="4">
                                <label>Other</label>
                            </div>
                            <div class="btn" id="submit-report">SUBMIT REPORT</div>


                        </div>



                    </div>

                </div>

                <div class="confirm-report">
                     Are you sure you want to report this item?
                     <div class="buttons">
                         <button id="confirmReport">confirm</button>
                         <button id="btn2">cancel</button>

                     </div>
                    
                </div>
  
  
          `);
          } else if (data.delivery == 7) {
            $("#column_2").html(`
          <h2 id="name">${data.product_name}</h2>
                  <p id="price">Rs. ${data.price}</p>
                  <select id="delivery_method">
                      <option orderselected hidden value="">Delivery Option</option>
                      <option value="0">In Store Pick-up</option>
                      <option value="1">In Store Delivery Service</option>
                      <option value="2">Third Party Delivery Service</option>
                  </select>
              
                  <input type="number" id="item-qty" min="1" max=${data.quantity} value="1"><span id="quantity">${data.quantity}</span><span>     </span><span>Available</span><br>
                  <a href="#" class="btn" onclick="addToCart()">Add to Cart</a>
                  <h3>Product Details</h3>
                  <br>
                  <p id="description">${data.description}</p>
                  <br>
                  <h3>Address</h3>
                  <p id="address">${data.address}</p>
                  <br>
                  <h3>Telephone No</h3>
                  <p>0771234567</p>
                  <div id="report"><button class="report-btn">REPORT</button>
                    <div class="report-box">
                        <div class="dd">
                            <div>
                                <input type="radio" name="reportOptions" value="1" checked>
                                <label>False informations</label>
                            </div>
                            <div>
                                <input type="radio" name="reportOptions" value="2">
                                <label>Illegal Selling</label>
                            </div>
                            <div>
                                <input type="radio" name="reportOptions" value="3">
                                <label>Should not be in aquaspace</label>
                            </div>
                            <div>
                                <input type="radio" name="reportOptions" value="4">
                                <label>Other</label>
                            </div>
                            <div class="btn" id="submit-report">SUBMIT REPORT</div>


                        </div>



                    </div>

                </div>

                <div class="confirm-report">
                     Are you sure you want to report this item?
                     <div class="buttons">
                         <button id="confirmReport">confirm</button>
                         <button id="btn2">cancel</button>

                     </div>
                    
                </div>
  
  
          `);
          }
        }
        // if(data.type == 3){
        //     $("#column_2").html(`
        //     <h2 id="name">${data.product_name}</h2>
        //             <p id="price">Rs. ${data.price}</p>
        //             <!-- <select id="delivery_method">
        //                 <option orderselected hidden value="">Delivery Option</option>
        //                 <option value="0">In Store Pick-up</option>
        //                 <option value="1">In Store Delivery Service</option>
        //                 <option value="2">Third Party Delivery Service</option>
        //             </select> -->
  
        //             <input  id="item-qty"  type="number" min="1" max=${data.quantity} value="1"><span id="quantity">${data.quantity}</span><span>     </span><span>Available</span><br>
        //             <a href="#" class="btn" onclick="()>Add to Cart</a>
        //             <a href="#" class="btn">Wishlist</a>
        //             <h3>Product Details</h3>
        //             <br>
        //             <p id="description">${data.description}</p>
        //             <br>
        //             <h3>Address</h3>
        //             <p id="address">${data.address}</p>
  
        //     `)
        // }
  
        if (data.type == 4) {
          $("#column_2").html(
            `<h2>${data.product_name}</h2>
          <p>${data.address}</p>
          <a href="inquiry.html" class="btn">Inquire</a>
          <h3>Product Details</h3>
          <p>${data.description}</p>
  
          <div class="tags">
              <div class="tag">tag 1</div>
              <div class="tag">tag 2</div>
              <div class="tag">tag 3</div>
          </div> 
          `
          );
        }
      },
      error: function (errMsg) {
        window.location.replace("../src/Error" + errMsg.status + ".html");
      },
    });

    //print question asked by the store
    loading();
    let req1 = {
        "id" : id
    }
    $.ajax({
        type: "POST",
        url:setUrl("reg/reg/getProductAnswers"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(req1),
        success: function(data){
            loadingFinish();
            console.log("result of answer",data);
            if( Object.keys(data).length === 0){
                $('#questionList').html(`<p>No question asked yet</p>`);
            }else{
                data.forEach((element) => {
                    let answer = 'Not yet answered';
                    if(element.reply != null){
                        answer = element.reply;
                    }
                $('#questionList').append(`
                <div style="margin-top: 40px;" class="question">
                <h4>${element.fName} ${element.lName}</h4>
                <p>Q : ${element.question}</p>
                <p>A : ${answer}</p>
            </div>
                `);
                });
            }
            
            
        },
        error: function(errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
                }
        });

    //show review of the seller for the item
    $.ajax({
        type: "POST",
        url:setUrl("reg/reg/getReview"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(req1),
        success: function(data){
            loadingFinish();
            console.log("review",data);
            if( Object.keys(data).length === 0){
                $('#review-1').html(`<p>No question asked yet</p>`);
            }else{
                data.forEach((element) => {
                    let review = 'Not yet reviewed';
                    if(element.review != null){
                        review = element.review;
                    }
                $('#review-1').append(`
                <div class="review">
                <h4>${element.fName} ${element.lName}</h4>
                <div class="rating" id='rev${element.id}'>
                </div>
                <p>${element.review}
                </p>
            </div>
                `);
                let rating = parseInt(element.rating);
                for (var i = 0; i <rating;i++){
                    $('#rev'+element.id).append(`
                    <i class="fa fa-star"></i>
                    `);
                }
                for (var i = 0; i < 5-rating;i++){
                    $('#rev'+element.id).append(`
                    <i class="fa fa-star-0"></i>
                    `);
                }

                });
            }
        },
        error: function(errMsg) {
            // window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
                }
        });


  
    /*when the report button is clicked, the user selects the reason and confirm the report */
    $(".report-btn").click(function () {
      $(".report-box").toggleClass("active");
    //   console.log("akdjsdk");
    });
  
    $("#submit-report").click(function () {
      $(".confirm-report").css("display", "block");
      $(".report-box").css("display", "none");

    });
    $("#btn1,#btn2").click(function () {
      $(".confirm-report").css("display", "none");
    });
    
    $("#confirmReport").click(function () {
        $(".confirm-report").css("display", "none");
        let report = $('input:radio[name=reportOptions]:checked').val();
        let url_string = window.location.href;
        let url = new URL(url_string);
        let productId = url.searchParams.get("id");
        let req = {"report" : report,
                    "productId" : productId
                }
        loading();
        $.ajax({
            type: "POST",
            url:setUrl("reg/reg/reportProduct"),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(req),
            success: function(data){
                loadingFinish();
                console.log(data);
                if(data.flag ==1){
                    errorShow([data.msg],"returning to home page");
                }else if(data.flag ==2){
                    successMsg([data.msg,"returning to home page"]);
                }
                delay(function(){
                    window.location.replace("/aquaspace/frontend/src/");
                },5000);
                
            },
            error: function(errMsg) {
                window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
                    }
            });      
        
    });

    $("#askQuestion").click(function() {
        let question = $('#description1').val();
        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");
        loading();
        let req = {
          "question" : question,
          "id" : id
        }
        if(question == ''){
            loadingFinish();
            errorShow(['question is empty']);
        }else{
            $.ajax({
                type: "POST",
                url: setUrl("Reg/Reg/askProductQuestion"),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(req),
                success: function (data) {
                  loadingFinish();
                  successMsg(["successfully asked the question"]);
                  delay(function(){
                    window.location.reload();
                  },3000);
                },
                error: function (errMsg) {
                  window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
                }
              });  
        }
       
        
        
      });

      $('#view-more').click(function(){
        let url = new URL(window.location.href);
        let id = url.searchParams.get("id");
        let req = {
            "id" : id
        }
        loading();
        $.ajax({
            type: "POST",
            url: setUrl("Reg/Reg/moveToStoreFront"),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(req),
            success: function (data) {
              loadingFinish();
            console.log("store ",data);
            window.location.replace("/aquaspace/frontend/src/Reg/store.html?store_id="+data);
            },
            error: function (errMsg) {
            //   window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
            }
          }); 
      });
    


  });
  
