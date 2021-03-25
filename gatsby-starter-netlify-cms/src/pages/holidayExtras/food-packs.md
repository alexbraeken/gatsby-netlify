---
templateKey: 'content-page'
path: /foodPacks
title: Food Packs
hero: ../../../static/img/pexels-eric-christian-capilador-6008367.jpg
---
<style>
    /*food packs*/
    div.foodPacksTables {
        display:-webkit-box;
        display:-ms-flexbox;
        display:flex;
        -ms-flex-wrap:wrap;
        flex-wrap:wrap;
        -webkit-box-pack:center;
        -ms-flex-pack:center;
        justify-content:center;
        width:100%;
        text-align:center;
        margin:100px 0 50px 0;
        }
        div.foodPacksTable {
            display:inline-block;
            -webkit-box-flex:1;
            -ms-flex:1 1 23%;
            flex:1 1 23%;
            border:1px solid #E5E5E5;
            margin:5px 5px 70px 5px;
            max-width:96%;
            min-width:200px;
            vertical-align:top;
            position:relative;
            padding-top:80px;
            -webkit-box-shadow: 0 0 5px #e2e2e2;
            -ms-box-shadow: 0 0 5px #e2e2e2;
            -o-box-shadow: 0 0 5px #e2e2e2;
            box-shadow: 0 0 5px #e2e2e2;
            line-height:30px;
            background: #ffffff;
            background: -webkit-gradient(left top, right bottom, color-stop(0%, #ffffff), color-stop(50.5%, #ffffff), color-stop(50.8%, #e6e6e6), color-stop(51%, #fafafa), color-stop(100%, #fafafa));background: -o-linear-gradient(-45deg, #ffffff 0%, #ffffff 50.5%, #e6e6e6 50.8%, #fafafa 51%, #fafafa 100%);background: -o-linear-gradient(329deg, #ffffff 0%, #ffffff 50.5%, #e6e6e6 50.8%, #fafafa 51%, #fafafa 100%);
            background: linear-gradient(121deg, #ffffff 0%, #ffffff 50.5%, #e6e6e6 50.8%, #fafafa 51%, #fafafa 100%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#fafafa', GradientType=1 );
            z-index:0;
            }
            div.foodPackInnerWrapper {
                float:left;
                width:100%;
                overflow:hidden;
                }
                div.foodPacksTable ul {
                    float:left;
                    width:100%;
                    padding:0;
                    margin:0;
                    margin-left:0;
                    }
                    div.foodPacksTable ul li {
                        list-style-type:none;
                        float:left;
                        width:90%;
                        padding:5px 5%;
                        text-align:left;
                        }
                        div.foodPackTitle {
                            float:left;
                            width:100%;
                            text-align:center;
                            margin:10px 0 0 0;
                            }
                            div.foodPackTitle h3 {
                                display:inline-block;
                                width:96%;
                                padding:10px 2%;
                                margin:0;
                                background-color:#FF8C00;
                                color:#ffffff;
                                -webkit-box-shadow: 0 0 5px #c3c3c3;
                                -ms-box-shadow: 0 0 5px #c3c3c3;
                                -o-box-shadow: 0 0 5px #c3c3c3;
                                box-shadow: 0 0 5px #c3c3c3;
                                }div.foodPackSubtitle {
                                    float:left;
                                    width:96%;
                                    text-align:center;
                                    background-color:#ffffff;
                                    -webkit-box-shadow: 0 0 5px #c3c3c3;
                                    -ms-box-shadow: 0 0 5px #c3c3c3;
                                    -o-box-shadow: 0 0 5px #c3c3c3;
                                    box-shadow: 0 0 5px #c3c3c3;
                                    padding:10px 2%;margin:0;
                                    }
                                    div.foodPackTitle span {
                                        line-height:30px;
                                        display:inline-block;
                                        vertical-align:middle;
                                        }
                                        div.foodPacksTable p {
                                            float:left;
                                            width:100%;
                                            padding:10px 0;
                                            background: #d6d6d6;
                                            }
                                            div.foodPackImg {
                                                position:absolute;
                                                top:-100px;
                                                left:50%;
                                                width:200px;
                                                height:200px;
                                                text-align:center;
                                                margin:0 0 0 -100px;
                                                background-color:#ffffff;
                                                background-size: cover;
                                                background-position: center;
                                                border-radius:100%;
                                                -webkit-box-shadow: 0 0 5px #c3c3c3;
                                                -ms-box-shadow: 0 0 5px #c3c3c3;
                                                -o-box-shadow: 0 0 5px #c3c3c3;
                                                box-shadow: 0 0 5px #c3c3c3;
                                                overflow:hidden;
                                                }
                                                div.foodPackImg img {
                                                    display:inline-block;
                                                    vertical-align:middle;
                                                    width:100px;
                                                    }
                                                    div.foodPackImg:after {
                                                        content: "";
                                                        position: absolute;
                                                        top: -110%;
                                                        left: -210%;
                                                        width: 200%;
                                                        height: 200%;
                                                        opacity: 0;
                                                        -webkit-transform: rotate(30deg);
                                                        -ms-transform: rotate(30deg);
                                                        transform: rotate(30deg);
                                                        background: rgba(255, 140, 0, 0.13);
                                                        background: -o-linear-gradient(left, rgba(255, 140, 0, 0.13) 0%,rgba(255, 140, 0, 0.13) 77%,rgba(255, 140, 0, 0.5) 92%,rgba(255, 140, 0, 0.0) 100%);background: -webkit-gradient(linear, left top, right top, from(rgba(255, 140, 0, 0.13)),color-stop(77%, rgba(255, 140, 0, 0.13)),color-stop(92%, rgba(255, 140, 0, 0.5)),to(rgba(255, 140, 0, 0.0)));
                                                        background: linear-gradient(to right, rgba(255, 140, 0, 0.13) 0%,rgba(255, 140, 0, 0.13) 77%,rgba(255, 140, 0, 0.5) 92%,rgba(255, 140, 0, 0.0) 100%);
                                                        }
                                                        div.foodPackImg:hover:after {
                                                            -webkit-animation: shine 6s ease-in-out  infinite;
                                                            -webkit-animation-fill-mode: forwards;
                                                            -moz-animation: shine 6s ease-in-out  infinite;
                                                            -moz-animation-fill-mode: forwards;
                                                            -o-animation: shine 6s ease-in-out  infinite;
                                                            -o-animation-fill-mode: forwards;
                                                            animation: shine 6s ease-in-out  infinite;
                                                            animation-fill-mode: forwards;
                                                            }
                                                            @-webkit-keyframes shine{  
                                                                10% {    opacity: 1;    top: 100%;    left: 100%;    
                                                                -webkit-transition-property: left, top, opacity;    
                                                                -webkit-transition-duration: 0.7s, 0.7s, 0.15s;    
                                                                -webkit-transition-timing-function: ease;  
                                                                }  
                                                                100% {    opacity: 0;    top: 100%;    left: 100%;    
                                                                -webkit-transition-property: left, top, opacity;  
                                                                }
                                                                }
                                                                @keyframes shine{  
                                                                    10% {    opacity: 1;    top: 100%;    left: 100%;    
                                                                    -webkit-transition-property: left, top, opacity;    
                                                                    -o-transition-property: left, top, opacity;    
                                                                    transition-property: left, top, opacity;    
                                                                    -webkit-transition-duration: 0.7s, 0.7s, 0.15s;         
                                                                    -o-transition-duration: 0.7s, 0.7s, 0.15s;            
                                                                    transition-duration: 0.7s, 0.7s, 0.15s;    
                                                                    -webkit-transition-timing-function: ease;         
                                                                    -o-transition-timing-function: ease;            
                                                                    transition-timing-function: ease;  
                                                                    }  
                                                                    100% {    opacity: 0;    top: 100%;    left: 100%;    
                                                                    -webkit-transition-property: left, top, opacity;    
                                                                    -o-transition-property: left, top, opacity;    
                                                                    transition-property: left, top, opacity;  
                                                                    }
                                                                    }
</style>
<h2 style="text-align: center;"><span style="color:#FF8C00;"><b id="docs-internal-guid-91ae58e5-7fff-b6c6-1ba7-b6606b5fba5c">Food Pack Selection &amp; Freshly Prepared Meals </b></span></h2>

<p>By the time you reach your destination, you have had a long journey. For your convenience, we offer you a special service. You can order a food pack or freshly prepared meal to be ready and waiting for your arrival!&nbsp;</p>

<p>&nbsp;</p>

<div class="foodPacksTables">
    <div class="foodPacksTable" id="snack-pack">
        <div class="foodPackImg" style="background-image: url(https://res.cloudinary.com/ddipteh80/image/upload/v1609149925/Smartavillas/Welcome%20Packs/R18_-_000200_snack.jpg);">
        </div>
    <div class="foodPackInnerWrapper">
        <div class="foodPackTitle">
            <h3><span>Snack Pack</span></h3>
        </div>
    <div class="foodPackSubtitle"><strong>Great Starter Pack for Day Time Arrivals</strong></div>
        <ul>
            <li>Tea Bags - Box of 10</li>
            <li>Coffee Sachets - Box of 10</li>
            <li>1 Litre Semi-Skimmed Milk</li>
            <li>3 Litres Bottled Water</li>
            <li>1 Litre Orange Juice</li>
            <li>Assorted Tradicional Bread Rolls*</li>
            <li>Tub of Butter</li>
            <li>Sliced Ham*</li>
            <li>Fresh Tomatoes(V)</li>
            <li>Fresh Cheese*</li>
        </ul>
    </div>
    <p>
    Up to 6 persons 20€
    <br>
    7-10 persons 25€
    <br>
    * quantities increased
    <br>
    (V) Vegetarian option instead of Ham
    </p>
</div>
<div class="foodPacksTable"id="big-basket">
    <div class="foodPackImg" style="background-image: url(https://res.cloudinary.com/ddipteh80/image/upload/v1609149925/Smartavillas/Welcome%20Packs/R18_-_000197_luxury.jpg);">
    </div>
    <div class="foodPackInnerWrapper">
        <div class="foodPackTitle">
            <h3><span>Big Basket</span></h3>
        </div>
        <div class="foodPackSubtitle"><strong>Later Arrival: Booze and Breakfast Items!</strong></div>
        <ul>
            <li>Tea Bags - Box of 20</li>
            <li>Coffee Sachets - Box of 20</li>
            <li>2 Litres Semi-Skimmed Milk</li>
            <li>5 Litres Bottled Water</li>
            <li>1 Litre Orange Juice</li>
            <li>Assorted Tradicional Bread Rolls</li>
            <li>Tub of Butter</li>
            <li>Sliced Ham*</li>
            <li>Fresh Cheese*</li>
            <li>Fresh Tomatoes</li>
            <li>12 Eggs</li>
            <li>1 Large Bag of Chips</li>
            <li>1 Box of Cereals</li>
            <li>Selection of Fresh Fruit</li>
            <li>1.5 Liter Lemonade</li>
            <li>12 Bottles Local Beer</li>
            <li>1 Bottle White Wine</li>
            <li>1 Bottle Red Wine</li>
        </ul>
        <p>
        Up to 6 persons 50€
        <br>
        7-10 persons 60€
        <br>
        * quantities increased
        </p>
    </div>
</div>
<div class="foodPacksTable" id="fresh-meals">
    <div class="foodPackImg" style="background-image: url(https://res.cloudinary.com/ddipteh80/image/upload/v1614955315/Smartavillas/Welcome%20Packs/pexels-anna-guerrero-4079522.jpg);">
    </div>
    <div class="foodPackInnerWrapper">
        <div class="foodPackTitle">
            <h3><span>Freshly Prepared Meals</span></h3>
        </div>
        <div class="foodPackSubtitle">
            <strong>Our Local Chef Mark Wilson, Delicious Fresh Food Prepared to Order
            <br>
            Just warm in the oven when you arrive!</strong>
        </div>
        <p>MAIN COURSE - 8,95€ pp</p>
        <ul>
            <li>Meat or Vegetable Lasagne</li>
            <li>Chicken Chasseur</li>
            <li>Beef Bourguignon</li>
            <li>Chicken Korma</li>
        </ul>
        <p>SIDE ORDERS/EXTRAS</p>
        <ul>
            <li>Mixed Salad - 2,00€</li>
            <li>Garlic Bread - 2,00€</li>
            <li>Rice - 2,00€</li>
            <li>Fruit Salad - 2,50€</li>
        </ul>
    </div>
</div>
<div class="foodPacksTable" id="oven-pizza">
    <div class="foodPackImg" style="background-image: url(https://res.cloudinary.com/ddipteh80/image/upload/v1614955357/Smartavillas/Welcome%20Packs/pexels-ponyo-sakana-5108601.jpg);" style="width: 80%; max-width: 600px; min-width: 400px">
    </div>
    <div class="foodPackInnerWrapper">
        <div class="foodPackTitle">
            <h3><span>Oven Ready Pizzas for the Kids</span></h3>
        </div>
        <div class="foodPackSubtitle">
            <strong>Please specify if vegetarian is required</strong>
        </div>
        <p>4,95€ (12in/30cm)</p>
    </div>
</div>
<div style="text-align:center;">
    <p>Order bottles of wine of choice for direct delivery</p>
    <h3>5€ each</h3>
    <br>
    <h3>or order our BOOZY BOX!</h3>
    <img src="https://res.cloudinary.com/ddipteh80/image/upload/v1609149925/Smartavillas/Welcome%20Packs/R18_-_000205_boozy_box.jpg">
    <br>
    <b>Boozy Box</b> includes:<br>
    1 bottle red wine, 1 bottle white wine, 6 bottles local beer, large bag of crisps, large packet of nuts, 1 jar olives
    <h3>20€ each</h3>
    <p>&nbsp;</p>
</div>

<h3 style="text-align: center;"><span style="color:#FF8C00;">Get in touch if you would like to know more!</span></h3>

<p>&nbsp;</p>
