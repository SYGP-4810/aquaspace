// <!DOCTYPE html>
// <html lang="en">

// <head>
//   <meta charset="UTF-8">
//   <meta http-equiv="X-UA-Compatible" content="IE=edge">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <link rel="stylesheet" href="../assets/fontawesome-free-5.15.4-web/css/all.css">
//   <link rel="stylesheet" href="../css/landing-styles.css">
//   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
//   <title>Homepage</title>
// </head>
// <!-- hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh -->

// <body>
//   <div class="container">
//     <div class="nav">
//       <div class="logo">
//         <img src="../images/logo.png" alt="">
//         <h2>AquaSpace</h2>
//       </div>
//       <div class="search_box">
//         <div class="dropdown">
//           <div class="default_option">All</div>
//           <ul>
//             <li>All</li>
//             <li>Fish</li>
//             <li>Articles</li>
//           </ul>
//         </div>
//         <div class="search_field">
//           <input type="text" class="input">
//           <i class="fas fa-search"></i>
//         </div>
//       </div>
//       <div class="nav-links">
//         <ul>
//           <li class="active"><a href="#">Home</a></li>
//           <li><a href="Reg/fish-data.html">Blog</a></li>
//           <li id="tank"><a href="Reg/build-tank.html">Build Tank</a></li>
//           <li id="post"><a href="#">Add Post</a>
//             <div class="sub-menu sub-menu-1">
//               <ul>
//                 <li><a href="Reg/add-fish-post.html">Fish</a></li>
//                 <li><a href="Reg/add-plant-post.html">Plant</a></li>
//                 <li><a href="Reg/add-other-post.html">Equipment</a></li>
//                 <li><a href="Reg/add-adopt-post.html">Adopt</a></li>
//               </ul>
//             </div>
//           </li>

//           <li id="cart"><a href="Reg/cart.html"><i class="fas fa-shopping-cart fa-lg"></i></a></li>
//           <div class="notifications">
//             <li id="bell">
//               <a href="#">
//                 <i class="fas fa-bell fa-lg"></i></a>
//             </li>
//             <div class="notification_dd">
//               <ul class="notification_ul">
//                 <li>
//                   <div class="notify_icon">
//                     <img src="../images/storepic.jpg" alt="">
//                   </div>
//                   <div class="notify_data">
//                     <div class="titlee">
//                       New fish Added
//                     </div>
//                     <div class="sub_title">
//                       Female Elephant Ear Betta
//                     </div>
//                   </div>
//                 </li>

//                 <li>
//                   <div class="notify_icon">
//                     <img src="../images/f_profile.jpg" alt="">
//                   </div>
//                   <div class="notify_data">
//                     <div class="titlee">
//                       New fish Added
//                     </div>
//                     <div class="sub_title">
//                       Imagitarium Female Elephant Ear Betta
//                     </div>
//                   </div>
//                 </li>
//                 <li>
//                   <div class="notify_icon">
//                     <img src="../images/storepic.jpg" alt="">
//                   </div>
//                   <div class="notify_data">
//                     <div class="titlee">
//                       New fish Added
//                     </div>
//                     <div class="sub_title">
//                       Female Elephant Ear Betta
//                     </div>
//                   </div>
//                 </li>

//                 <li>
//                   <div class="notify_icon">
//                     <img src="../images/f_profile.jpg" alt="">
//                   </div>
//                   <div class="notify_data">
//                     <div class="titlee">
//                       New fish Added
//                     </div>
//                     <div class="sub_title">
//                       Imagitarium Female Elephant Ear Betta
//                     </div>
//                   </div>
//                 </li>

//                 <li class="show_all">
//                   <p class="link">Show All Activities</p>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <li id="account"><a href="#"><i class="fas fa-user-circle fa-lg"></i></a>
//             <div class="sub-menu sub-menu-2">
//               <ul class="options">
//                 <li id="profile" style="cursor:pointer;">Profile</li>
//                 <li id="logOut" style="cursor:pointer;">Logout</li>
//               </ul>
//             </div>
//           </li>
//           <li id="login"><a href="login.html">Login</a></li>
//           <li id="signup"><a href="signup.html">Sign up</a></li>
//         </ul>
//       </div>
//     </div>
//     <section class="showcase">
//       <video src="../images/landing.mp4" muted loop autoplay></video>
//       <div class="overlay"></div>

//       <div class="msg-container">
//         <div id="slider">
//           <div class="text">
//             <h2>Welcome to AquaSpace!</h2>
//             <p style="font-size:20px;">An online marketplace specifically dedicated to
//               all fish owners, store owners and fish enthusiasts spread across the country. If you
//               are a fish lover, this is where you can get your
//               hands on anything and everything fish.
//             </p>
//             <a href="Reg/category.html">SHOP</a>
//           </div>
//           <div class="text">
//             <h2>Location based marketplace</h2>
//             <!-- <h3>Lorem Ipsum</h3> -->
//             <p>Lets you find buyers and sellers near you based on your Location.
//               Find aquarium stores all around the country to buy all your fish
//               and equipments needed to build your tank.
//             </p>
//             <a href="Reg/category.html">SHOP</a>
//           </div>
//           <div class="text">
//             <h2>Read Our Aquapedia</h2>
//             <!-- <h4>Read articles and expand your knowledge <br>about your favorite fish</h4> -->
//             <p>CentralizedYou have access to the exclusive fish database
//               that is maintained by the experts in the field. Read articles
//               and expand your knowledge about your favorite fish.
//             </p>
//             <a href="Reg/articles.html">VIEW</a>
//           </div>
//           <div class="text">
//             <h2>Put up your fish up for adoption</h2>
//             <!-- <h3>Lorem Ipsum</h3> -->
//             <p>You can put up your fish for adoption and give a fellow fish lover
//               an opportunity to have a beautiful experience giving a home to your fish.
//               Add a fish post under adoption.
//             </p>
//             <a href="Reg/add-adopt-post.html">Add Adopt Post</a>
//           </div>
//         </div>
//       </div>
//       <div class="controller">
//         <div id="line1"></div>
//         <div id="line2"></div>
//         <div id="line3"></div>
//         <div id="line4"></div>
//         <div id="active"></div>
//       </div>
//     </section>
//   </div>

//   <div id="sections" class="small-container" style="margin-top: 70px; position: relative;">
//     <svg style="display: inline-block;
//     position: absolute;
//     top: -170px;
//     z-index: -1;
//     left: 0;" viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
//       <path d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z" style="stroke: none; fill:rgb(229, 243, 255);"></path>
//     </svg>
//     <div style="display: flex;"><img src="../images/new.png"
//         style="height: 75px; position: relative; bottom: 17px; margin-right: 13px;" alt="">
//       <h2 class="title"><a href="Reg/category.html">Newly Added</a></h2>
//     </div>
//     <div class="row" id="newlyAddedFishContent">
//     </div>
//   </div>
//   <div class="small-container" style="background-color: transparent; position: relative;">
//     <svg style=" position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     z-index: -1;
//     overflow: hidden;
//     line-height: 0;" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
//       <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" style="fill: aqua;"></path>
//   </svg>
//     <div style="display: flex; "><img src="../images/fish-bowl.png"
//         style="width: 70px; position: relative; bottom: 13px; margin-right: 20px;" alt="">
//       <h2 class="title"><a href="Reg/category.html">Fish</a></h2>
//     </div>

//     <div class="row" id="fishContent">
//     </div>
//   </div>
//   <div class="small-container" style="background-color: rgb(211, 255, 226);">
//     <div style="display: flex;"><img src="../images/plant-index.png"
//         style="height: 90px; position: relative; bottom: 31px; left: -10px;" alt="">
//       <h2 class="title"><a href="Reg/category.html">Plants</a></h2>
//     </div>
//     <div class="row" id="plantContent">
//     </div>
//   </div>
//   </div>
//   <div class="small-container">
//     <div style="display: flex;"><img src="../images/tank-index.png"
//         style="height: 76px; position: relative; bottom: 25px; left: -5px; margin-right: 13px" alt="">
//       <h2 class="title"><a href="#">Equipment</a></h2>
//     </div>
//     <div class="row" id="equipmentContent">
//     </div>
//   </div>
//   <div class="small-container">
//     <div style="display: flex;"><img src="../images/adopt-index.png"
//         style="height: 75px; position: relative; bottom: 25px; left: -5px; margin-right: 13px" alt="">
//       <h2 class="title"><a href="#">Adopts</a></h2>
//     </div>

//     <div class="row" id="adopt">
//     </div>
//   </div>


//   <footer class="footer-distributed">

//     <div class="footer-left">

//       <div class="logo">
//         <img src="../images/logo.png" alt="">
//         <h2>AquaSpace</h2>
//       </div>

//       <p class="footer-links">
//         <a href="#" class="link-1">Home</a>

//         <a href="Reg/articles.html">Blog</a>

//         <a href="#">Add Post</a>

//         <a href="Reg/build-tank.html">Build Tank</a>
//       </p>
//       <p class="footer-company-name">AquaSpace © 2021</p>
//     </div>

//     <div class="footer-center">
//       <div>
//         <i class="fa fa-phone"></i>
//         <p>077-1234567</p>
//       </div>

//       <div>
//         <i class="fa fa-envelope"></i>
//         <p><a href="mailto:support@company.com">aquaspace@gmail.com</a></p>
//       </div>

//     </div>

//     <div class="footer-right">

//       <p class="footer-company-about">
//         <span>About AquaSpace</span>
//         AquaSpace is an online quarium marketplace which allows you to connect with community of
//         fish owners, fish enthusiasts and aquarium stores.
//       </p>

//       <!-- <div class="footer-icons">

//         <a href="#"><i class="far fa-facebook"></i></a>
//         <a href="#"><i class="far fa-twitter"></i></a>

//       </div> -->

//     </div>

//   </footer>

//   <script src="../js/landing-app.js"></script>
//   <script src="../js/landing-ani.js"></script>
//   <script src="../js/notif.js"></script>
// </body>

// </html>

// ----------------------------------------------------


/* 
  *********************************
  *******  Bussiness Logic  *******
  *********************************
*/
const products = [
    {
        title: 'iPhone XS Max',
        brand: 'apple',
        price: 1098,
        color: 'white',
    },
    {
        title: 'iPhone X',
        brand: 'apple',
        price: 899,
        color: 'gold',
    },
    {
        title: 'iPhone 8 Plus',
        brand: 'apple',
        price: 639,
        color: 'black',
    },
    {
        title: 'PS 4',
        brand: 'playstation',
        price: 2399,
        color: 'black',
    }, {
        title: 'XXX-Large',
        brand: 'docker',
        price: 500,
        color: 'gold',
    },
    {
        title: 'm4.16xlarge',
        brand: 'amazon',
        price: 2304,
        color: 'gray',
    }, {
        title: 'Medium',
        brand: 'docker',
        price: 150,
        color: 'black',
    },
    {
        title: 'PS 3',
        brand: 'playstation',
        price: 978,
        color: 'gray',
    }, {
        title: 'XX-Large',
        brand: 'docker',
        price: 250,
        color: 'white',
    },
    {
        title: 'c5n.18xlarge',
        brand: 'amazon',
        price: 3888,
        color: 'white',
    }, {
        title: 'KEY2 LE',
        brand: 'blackberry',
        price: 723,
        color: 'gold',
    },
    {
        title: 'h1.16xlarge',
        brand: 'amazon',
        price: 3744,
        color: 'gold',
    }
];

let brand = 'all';
let color = 'all';

const log = data => $(".messages").append(data);

const filterProduct = (array, columnName, filterValue) => {
    if (filterValue === null || filterValue === '' || filterValue === 'all') {
        return array;
    } else {
        return array.filter(productItem => productItem[columnName] === filterValue);
    }
};

const toString = (array) => {
    let result = array.map((item, index) => {
        return `\t<tr>\n\t\t<td>${index + 1}</td>\n\t\t<td>${item.title}</td>\n\t\t<td>${item.brand}</td>\n\t\t<td>${item.price}</td>\n\t\t<td>${item.color}</td>\n\t\t</tr>\n`;
    });

    result.unshift('<table>\n<thead>\n\t<tr>\n\t\t<th>#</th>\n\t\t<th>Title</th>\n\t\t<th>Brand</th>\n\t\t<th>Price ($)</th>\n\t\t<th>Color</th>\n\t</tr>\n</thead>\n<tbody>\n');
    result.push('\n</tbody>\n</table>')

    return result.join('');
};

const updateTable = data => $('.data-table').html(data);

const getAverage = (array) => {
    let sum = 0;

    if (array.length === 0) {
        return ['-','-'];
    }

    array.forEach(item => {
        sum += item.price;
    });

    return [sum, (sum / array.length).toFixed(2)];
};

function doFilter() {

    let filterResult = [];
    filterResult = filterProduct(products, 'brand', brand);
    filterResult = filterProduct(filterResult, 'color', color);

    $(".messages").html('');
    log('Selcted filters:<br/>');
    log(`> Brand: ${brand ? brand : '-'}<br/>`);
    log(`> Color: ${color ? color : '-'}<br/>`);
    log('<br/>');
    log('Result:<br/>');
    log(`> Selected Rows: ${filterResult.length}<br/>`);
    let result = getAverage(filterResult);
    log(`> Total price ($): ${result[0]}<br/>`);
    log(`> Average price ($): ${result[1]}<br/>`);

    updateTable(toString(filterResult));
}


/* 
  *********************************
  ******  html event handler ******
  *********************************
*/
$(document).ready(() => {
    $('label.selected').removeClass('selected');
    $('input:radio:checked').parent().addClass('selected');

    // show all data
    doFilter();

    // filter data by selecting brand or color
    document.mainForm.onclick = function () {

        $('label.selected').removeClass('selected');
        $('input:radio:checked').parent().addClass('selected');
        brand = document.querySelector('input[name = brand]:checked').value;
        color = document.querySelector('input[name = color]:checked').value;
        doFilter();
    }
});