---
templateKey: 'content-page'
path: /foodPacks
preferred_language: default
title: Food Packs
langTitles:
    en: Food Packs
    pt: "Pacotes de Alimentos"
hero: ../../../static/img/pexels-eric-christian-capilador-6008367.jpg
html:
    en: "<style>
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
                                                        content: '';
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
.svg-fill1 path {
    d: path('M0 0 C 0 0 100 0 100 0 L 100 0 0 0 Z');
    transition: all 0.5s
}

.svg-fill2 path{
    d: path('M0 20 C 30 80 70 0 100 75 L 100 100 0 100 Z');
    transition: all 0.5s
}

.boozy-box{
    display: flex; 
    flex-wrap: wrap; 
    justify-content: center;
    margin: 50px auto;
}

.boozy-box:hover .svg-fill1 path {
    d: path('M0 0 C 20 100 50 100 100 0 L 100 0 0 0 Z');
}

.boozy-box:hover .svg-fill2 path {
    d: path('M0 80 C 30 20 70 10 100 100 L 100 100 0 100 Z');
}

.boozy-box img {
    box-shadow: 20px -3px 20px 20px #eaeaea;
    transition: 0.5s;
    transform-style: preserve-3d;
    transform-origin: 50% 50%;
    transform: translateX(40px);
    border-radius: 50%;
    max-width: 500px; 
    margin: auto;
    aspect-ratio: 1/1;
    object-fit: cover;
    max-height: 400px
}

.boozy-box:hover img {
    transform: translateX(0px);
    border-radius: 5%;
}

@media only screen and (max-width: 900px){
    .boozy-box img {
        max-width: 250px;
        max-height: 250px;
        transform:translateX(0px);
    }
} 


.floating {
    box-shadow: 20px -3px 20px 20px #eaeaea;
    transition: 0.5s;
    transform-style: preserve-3d;
    transform-origin: 50% 50%;
    transform: rotateX(
358deg
) rotateY(
340deg
);
}

.boozy-box:hover .floating {
    box-shadow: 0px -3px 20px 20px #eaeaea;
    transform: rotateX(
360deg
) rotateY(
360deg
);
}

.text {
    margin: auto; 
    padding: 20px 10px;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    text-shadow: 9px 8.7px 6px rgba(0, 0, 0, 0.5);
    transform: translateZ(30px);
    transition: 0.5s;
}

.boozy-box:hover .text {
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
    text-shadow: 0px 8.7px 6px rgba(0, 0, 0, 0.8);
}

</style>
<h2 style='text-align: center;'><span style='color:#FF8C00;'><b id='docs-internal-guid-91ae58e5-7fff-b6c6-1ba7-b6606b5fba5c'>Food Pack Selection &amp; Freshly Prepared Meals </b></span></h2>

<p>By the time you reach your destination, you have had a long journey. For your convenience, we offer you a special service. You can order a food pack or freshly prepared meal to be ready and waiting for your arrival!&nbsp;</p>

<p>&nbsp;</p>
<div class='boozy-box'>
    <div class='img-float' style='flex: 1 1 50%; display: flex;'>
        <img src='https://res.cloudinary.com/ddipteh80/image/upload/v1609149925/Smartavillas/Welcome%20Packs/R18_-_000200_snack.jpg'>
    </div>
    <div class='floating' style=' flex: 1 1 50%; display: flex; flex-wrap: wrap; border: 1px solid #E5E5E5; position: relative;'>
        <div style='flex: 1 1 100%; text-align: center; background-color: #FF8C00; display: flex; position: relative'>
            <h2 class='text' style='color: #fff; margin: auto;'>Snack Pack</h2>
            <div style=' 
          width: 100%;
          position: absolute;
          top: auto;
          bottom: -9px;
          right: 0;
          height: 10px;
          z-index: 1;
          transform: translateZ(0)' data-front='' data-style='curve_asym' data-position='bottom'>
            <svg fill='#FF8C00' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none' style='width: 100%; left: 0; bottom: -1px; height: 100%; position: absolute;' class='svg-fill1'> 
            <path></path> 
            </svg>
            </div>
        </div>
        <br>
        <div style='flex: 1 1 100%; text-align: center; display: flex; position: relative;'>
            <p class='text' style='margin: auto;'>
            <b>Great Starter Pack for Day Time Arrivals</b>
            <br>
            Tea Bags, Coffee Sachets, 1 Litre Semi-Skimmed Milk, 3 Litres Bottled Water, 1 Litre Orange Juice, Assorted Traditional Bread Rolls*, Tub of Butter, Sliced Ham*, Fresh Tomatoes(V), Fresh Cheese*.
            <br>
            * quantities increased
            <br>
            (V) Vegetarian option instead of Ham
            </p>
            <div style=' 
          width: 100%;
          position: absolute;
          top: auto;
          bottom: 0;
          right: 0;
          height: 20px;
          z-index: 1;
          transform: translateZ(0)' data-front='' data-style='curve_asym' data-position='bottom'>
            <svg fill='#333333' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none' style='width: 100%; left: 0; bottom: -1px; height: 100%; position: absolute;' class='svg-fill2'> 
            <path></path> 
            </svg>
            </div>
        </div>
        <div style='flex: 1 1 100%; text-align: center; background-color: #333333; display: flex'>
            <h3 class='text' style='color: #FF8C00; margin: auto;'>Up to 6 persons 20€
            <br /> *7-10 persons 25€</h3>
        </div>
    </div>
</div>
</div>
<div class='boozy-box'>
    <div class='img-float' style='flex: 1 1 50%; display: flex;'>
        <img src='https://res.cloudinary.com/ddipteh80/image/upload/v1609149925/Smartavillas/Welcome%20Packs/R18_-_000197_luxury.jpg'>
    </div>
    <div class='floating' style=' flex: 1 1 50%; display: flex; flex-wrap: wrap; border: 1px solid #E5E5E5; position: relative;'>
        <div style='flex: 1 1 100%; text-align: center; background-color: #FF8C00; display: flex; position: relative'>
            <h2 class='text' style='color: #fff; margin: auto;'>Big Basket</h2>
            <div style=' 
          width: 100%;
          position: absolute;
          top: auto;
          bottom: -9px;
          right: 0;
          height: 10px;
          z-index: 1;
          transform: translateZ(0)' data-front='' data-style='curve_asym' data-position='bottom'>
            <svg fill='#FF8C00' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none' style='width: 100%; left: 0; bottom: -1px; height: 100%; position: absolute;' class='svg-fill1'> 
            <path></path> 
            </svg>
            </div>
        </div>
        <br>
        <div style='flex: 1 1 100%; text-align: center; display: flex; position: relative;'>
            <p class='text' style='margin: auto;'>
            <b>Later Arrival: Booze and Breakfast Items!</b>
            <br>Tea Bags, Coffee Sachets, 2 Litres Semi-Skimmed Milk, 5 Litres Bottled Water, 1 Litre Orange Juice, Assorted Traditional Bread Rolls, Tub of Butter, Sliced Ham*, Fresh Cheese*, Fresh Tomatoes, Eggs, Large Bag of Chips, Box of Cereals, Selection of Fresh Fruit, 1.5 Litre Lemonade, 12 Bottles Local Beer, Bottle White Wine, Bottle Red Wine.
        <br>
        * quantities increased
            </p>
            <div style=' 
          width: 100%;
          position: absolute;
          top: auto;
          bottom: 0;
          right: 0;
          height: 20px;
          z-index: 1;
          transform: translateZ(0)' data-front='' data-style='curve_asym' data-position='bottom'>
            <svg fill='#333333' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none' style='width: 100%; left: 0; bottom: -1px; height: 100%; position: absolute;' class='svg-fill2'> 
            <path></path> 
            </svg>
            </div>
        </div>
        <div style='flex: 1 1 100%; text-align: center; background-color: #333333; display: flex'>
            <h3 class='text' style='color: #FF8C00; margin: auto;'> Up to 6 persons 50€
        <br>
        *7-10 persons 60€</h3>
        </div>
    </div>
</div>
</div>
<div class='boozy-box'>
    <div class='img-float' style='flex: 1 1 50%; display: flex;'>
        <img src='https://res.cloudinary.com/ddipteh80/image/upload/v1614955315/Smartavillas/Welcome%20Packs/pexels-anna-guerrero-4079522.jpg'>
    </div>
    <div class='floating' style=' flex: 1 1 50%; display: flex; flex-wrap: wrap; border: 1px solid #E5E5E5; position: relative;'>
        <div style='flex: 1 1 100%; text-align: center; background-color: #FF8C00; display: flex; position: relative'>
            <h2 class='text' style='color: #fff; margin: auto;'>Freshly Prepared Meals</h2>
            <div style=' 
          width: 100%;
          position: absolute;
          top: auto;
          bottom: -9px;
          right: 0;
          height: 10px;
          z-index: 1;
          transform: translateZ(0)' data-front='' data-style='curve_asym' data-position='bottom'>
            <svg fill='#FF8C00' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none' style='width: 100%; left: 0; bottom: -1px; height: 100%; position: absolute;' class='svg-fill1'> 
            <path></path> 
            </svg>
            </div>
        </div>
        <br>
        <div style='flex: 1 1 100%; text-align: center; display: flex; position: relative;'>
            <p class='text' style='flex: 1 1 100%; margin: auto;'>
            <b>Our Local Chef Mark Wilson, Delicious Fresh Food Prepared to Order
            <br>
            Just warm in the oven when you arrive!</b>
            <br>
            MAIN COURSE - 
            <br />
            Meat or Vegetable Lasagne, Chicken Chasseur, Beef Bourguignon or Chicken Korma
            <br />
            Side orders/extras: Mixed Salad, Garlic Bread, Rice, Fruit Salad</p>
            <div style=' 
          width: 100%;
          position: absolute;
          top: auto;
          bottom: 0;
          right: 0;
          height: 20px;
          z-index: 1;
          transform: translateZ(0)' data-front='' data-style='curve_asym' data-position='bottom'>
            <svg fill='#333333' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none' style='width: 100%; left: 0; bottom: -1px; height: 100%; position: absolute;' class='svg-fill2'> 
            <path></path> 
            </svg>
            </div>
        </div>
        <div style='flex: 1 1 100%; text-align: center; background-color: #333333; display: flex'>
            <h4 class='text' style='color: #FF8C00; flex: 1 1 100%; margin: auto;'>
            8,95€ pp</h4>
        </div>
    </div>
</div>
</div>
<div class='boozy-box'>
    <div class='img-float' style='flex: 1 1 50%; display: flex;'>
        <img src='https://res.cloudinary.com/ddipteh80/image/upload/v1614955357/Smartavillas/Welcome%20Packs/pexels-ponyo-sakana-5108601.jpg'>
    </div>
    <div class='floating' style=' flex: 1 1 50%; display: flex; flex-wrap: wrap; border: 1px solid #E5E5E5; position: relative;'>
        <div style='flex: 1 1 100%; text-align: center; background-color: #FF8C00; display: flex; position: relative'>
            <h2 class='text' style='color: #fff; margin: auto;'>Oven Ready Pizzas for the Kids</h2>
            <div style=' 
          width: 100%;
          position: absolute;
          top: auto;
          bottom: -9px;
          right: 0;
          height: 10px;
          z-index: 1;
          transform: translateZ(0)' data-front='' data-style='curve_asym' data-position='bottom'>
            <svg fill='#FF8C00' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none' style='width: 100%; left: 0; bottom: -1px; height: 100%; position: absolute;' class='svg-fill1'> 
            <path></path> 
            </svg>
            </div>
        </div>
        <br>
        <div style='flex: 1 1 100%; text-align: center; display: flex; position: relative;'>
            <p class='text' style='margin: auto;'>
            <b>Please specify if vegetarian is required</b>
            </p>
            <div style=' 
          width: 100%;
          position: absolute;
          top: auto;
          bottom: 0;
          right: 0;
          height: 20px;
          z-index: 1;
          transform: translateZ(0)' data-front='' data-style='curve_asym' data-position='bottom'>
            <svg fill='#333333' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none' style='width: 100%; left: 0; bottom: -1px; height: 100%; position: absolute;' class='svg-fill2'> 
            <path></path> 
            </svg>
            </div>
        </div>
        <div style='flex: 1 1 100%; text-align: center; background-color: #333333; display: flex'>
            <h4 class='text' style='color: #FF8C00; margin: auto;'>4,95€ (12in/30cm)</h4>
        </div>
    </div>
</div>
</div>
<div style='max-width: 100%'>
<center>
<h4>Order bottles of wine of choice for direct delivery: 5€ each</h4>
<h4>OR<h4>
</center>
<div style='display: flex; flex-wrap: wrap; justify-content: center;' class='boozy-box'>
    <div class='img-float' style='flex: 1 1 50%; display: flex;'>
        <img src='https://res.cloudinary.com/ddipteh80/image/upload/v1609149925/Smartavillas/Welcome%20Packs/R18_-_000205_boozy_box.jpg'>
    </div>
    <div class='floating' style=' flex: 1 1 50%; display: flex; flex-wrap: wrap; border: 1px solid #E5E5E5; position: relative;'>
        <div style='flex: 1 1 100%; text-align: center; background-color: #FF8C00; display: flex; position: relative'>
            <h3 class='text' style='color: #fff; margin: auto;'>ORDER OUR BOOZY BOX!</h3>
            <div style=' 
          width: 100%;
          position: absolute;
          top: auto;
          bottom: -9px;
          right: 0;
          height: 10px;
          z-index: 1;
          transform: translateZ(0)' data-front='' data-style='curve_asym' data-position='bottom'>
            <svg fill='#FF8C00' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none' style='width: 100%; left: 0; bottom: -1px; height: 100%; position: absolute;' class='svg-fill1'> 
            <path></path> 
            </svg>
            </div>
        </div>
        <br>
        <div style='flex: 1 1 100%; text-align: center; display: flex; position: relative;'>
            <p class='text' style='margin: auto;'>
            <b>Boozy Box</b> includes:
            <br>
            1 bottle red wine, 1 bottle white wine, 6 bottles local beer, large bag of crisps, large packet of nuts, 1 jar olives
            </p>
            <div style=' 
          width: 100%;
          position: absolute;
          top: auto;
          bottom: 0;
          right: 0;
          height: 20px;
          z-index: 1;
          transform: translateZ(0)' data-front='' data-style='curve_asym' data-position='bottom'>
            <svg fill='#333333' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none' style='width: 100%; left: 0; bottom: -1px; height: 100%; position: absolute;' class='svg-fill2'> 
            <path></path> 
            </svg>
            </div>
        </div>
        <div style='flex: 1 1 100%; text-align: center; background-color: #333333; display: flex'>
            <h3 class='text' style='color: #FF8C00;'>Only 20€ each!</h3>
        </div>
    </div>
</div>
</div>


<h3 style='text-align: center;'><a href='/contact'><span style='color:#FF8C00;'>Get in touch if you would like to know more!</span></a></h3>

<p>&nbsp;</p>"
    pt: "<style>
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
                                                        content: '';
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
.svg-fill1 path {
    d: path('M0 0 C 0 0 100 0 100 0 L 100 0 0 0 Z');
    transition: all 0.5s
}

.svg-fill2 path{
    d: path('M0 20 C 30 80 70 0 100 75 L 100 100 0 100 Z');
    transition: all 0.5s
}

.boozy-box{
    display: flex; 
    flex-wrap: wrap; 
    justify-content: center;
    margin: 50px auto;
}

.boozy-box:hover .svg-fill1 path {
    d: path('M0 0 C 20 100 50 100 100 0 L 100 0 0 0 Z');
}

.boozy-box:hover .svg-fill2 path {
    d: path('M0 80 C 30 20 70 10 100 100 L 100 100 0 100 Z');
}

.boozy-box img {
    box-shadow: 20px -3px 20px 20px #eaeaea;
    transition: 0.5s;
    transform-style: preserve-3d;
    transform-origin: 50% 50%;
    transform: translateX(40px);
    border-radius: 50%;
    max-width: 500px; 
    margin: auto;
    aspect-ratio: 1/1;
    object-fit: cover;
    max-height: 400px
}

.boozy-box:hover img {
    transform: translateX(0px);
    border-radius: 5%;
}

@media only screen and (max-width: 900px){
    .boozy-box img {
        max-width: 250px;
        max-height: 250px;
        transform:translateX(0px);
    }
} 


.floating {
    box-shadow: 20px -3px 20px 20px #eaeaea;
    transition: 0.5s;
    transform-style: preserve-3d;
    transform-origin: 50% 50%;
    transform: rotateX(
358deg
) rotateY(
340deg
);
}

.boozy-box:hover .floating {
    box-shadow: 0px -3px 20px 20px #eaeaea;
    transform: rotateX(
360deg
) rotateY(
360deg
);
}

.text {
    margin: auto; 
    padding: 20px 10px;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    text-shadow: 9px 8.7px 6px rgba(0, 0, 0, 0.5);
    transform: translateZ(30px);
    transition: 0.5s;
}

.boozy-box:hover .text {
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
    text-shadow: 0px 8.7px 6px rgba(0, 0, 0, 0.8);
}

</style>
<h2 style='text-align: center;'><span style='color:#FF8C00;'><b id='docs-internal-guid-91ae58e5-7fff-b6c6-1ba7-b6606b5fba5c'>Seleção de embalagens de alimentos &amp; Refeições preparadas na hora</b></span></h2>

<p>Ao chegar ao seu destino, você fez uma longa jornada. Para sua comodidade, oferecemos um serviço especial. Você pode pedir um pacote de comida ou uma refeição preparada na hora para ficar pronta e aguardar sua chegada! &nbsp;</p>

<p>&nbsp;</p>
<div class='boozy-box'>
    <div class='img-float' style='flex: 1 1 50%; display: flex;'>
        <img src='https://res.cloudinary.com/ddipteh80/image/upload/v1609149925/Smartavillas/Welcome%20Packs/R18_-_000200_snack.jpg'>
    </div>
    <div class='floating' style=' flex: 1 1 50%; display: flex; flex-wrap: wrap; border: 1px solid #E5E5E5; position: relative;'>
        <div style='flex: 1 1 100%; text-align: center; background-color: #FF8C00; display: flex; position: relative'>
            <h2 class='text' style='color: #fff; margin: auto;'>Snack Pack</h2>
            <div style=' 
          width: 100%;
          position: absolute;
          top: auto;
          bottom: -9px;
          right: 0;
          height: 10px;
          z-index: 1;
          transform: translateZ(0)' data-front='' data-style='curve_asym' data-position='bottom'>
            <svg fill='#FF8C00' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none' style='width: 100%; left: 0; bottom: -1px; height: 100%; position: absolute;' class='svg-fill1'> 
            <path></path> 
            </svg>
            </div>
        </div>
        <br>
        <div style='flex: 1 1 100%; text-align: center; display: flex; position: relative;'>
            <p class='text' style='margin: auto;'>
            <b>Ótimo pacote inicial para chegadas durante o dia</b>
            <br>
            313 / 5000
            Translation results
            Sacos de chá, sachês de café, 1 litro de leite semidesnatado, 3 litros de água engarrafada, 1 litro de suco de laranja, pãezinhos tradicionais variados *, pote de manteiga, presunto fatiado *, tomate fresco (V), queijo fresco *.
             <br>
             * quantidades aumentadas
             <br>
             (V) opção vegetariana em vez de presunto 
            </p>
            <div style=' 
          width: 100%;
          position: absolute;
          top: auto;
          bottom: 0;
          right: 0;
          height: 20px;
          z-index: 1;
          transform: translateZ(0)' data-front='' data-style='curve_asym' data-position='bottom'>
            <svg fill='#333333' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none' style='width: 100%; left: 0; bottom: -1px; height: 100%; position: absolute;' class='svg-fill2'> 
            <path></path> 
            </svg>
            </div>
        </div>
        <div style='flex: 1 1 100%; text-align: center; background-color: #333333; display: flex'>
            <h3 class='text' style='color: #FF8C00; margin: auto;'>Até 6 pessoas 20 €
             <br /> * 7 a 10 pessoas 25 €</h3>
        </div>
    </div>
</div>
</div>
<div class='boozy-box'>
    <div class='img-float' style='flex: 1 1 50%; display: flex;'>
        <img src='https://res.cloudinary.com/ddipteh80/image/upload/v1609149925/Smartavillas/Welcome%20Packs/R18_-_000197_luxury.jpg'>
    </div>
    <div class='floating' style=' flex: 1 1 50%; display: flex; flex-wrap: wrap; border: 1px solid #E5E5E5; position: relative;'>
        <div style='flex: 1 1 100%; text-align: center; background-color: #FF8C00; display: flex; position: relative'>
            <h2 class='text' style='color: #fff; margin: auto;'>Big Basket</h2>
            <div style=' 
          width: 100%;
          position: absolute;
          top: auto;
          bottom: -9px;
          right: 0;
          height: 10px;
          z-index: 1;
          transform: translateZ(0)' data-front='' data-style='curve_asym' data-position='bottom'>
            <svg fill='#FF8C00' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none' style='width: 100%; left: 0; bottom: -1px; height: 100%; position: absolute;' class='svg-fill1'> 
            <path></path> 
            </svg>
            </div>
        </div>
        <br>
        <div style='flex: 1 1 100%; text-align: center; display: flex; position: relative;'>
            <p class='text' style='margin: auto;'>
            <b>Chegada mais tarde: bebidas e itens para o café da manhã! </b>
             <br> Sacos de chá, sachês de café, 2 litros de leite semidesnatado, 5 litros de água engarrafada, 1 litro de suco de laranja, pãezinhos tradicionais variados, pote de manteiga, presunto fatiado *, queijo fresco *, tomates frescos, ovos, saquinho grande de Batatas Fritas, Caixa de Cereais, Seleção de Frutas Frescas, Limonada de 1,5 Litro, 12 Garrafas de Cerveja Local, Garrafa de Vinho Branco, Garrafa de Vinho Tinto.
         <br>
         * quantidades aumentadas
            </p>
            <div style=' 
          width: 100%;
          position: absolute;
          top: auto;
          bottom: 0;
          right: 0;
          height: 20px;
          z-index: 1;
          transform: translateZ(0)' data-front='' data-style='curve_asym' data-position='bottom'>
            <svg fill='#333333' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none' style='width: 100%; left: 0; bottom: -1px; height: 100%; position: absolute;' class='svg-fill2'> 
            <path></path> 
            </svg>
            </div>
        </div>
        <div style='flex: 1 1 100%; text-align: center; background-color: #333333; display: flex'>
            <h3 class='text' style='color: #FF8C00; margin: auto;'> Até 6 pessoas 50 €
         <br>
         * 7 a 10 pessoas 60 €</h3>
        </div>
    </div>
</div>
</div>
<div class='boozy-box'>
    <div class='img-float' style='flex: 1 1 50%; display: flex;'>
        <img src='https://res.cloudinary.com/ddipteh80/image/upload/v1614955315/Smartavillas/Welcome%20Packs/pexels-anna-guerrero-4079522.jpg'>
    </div>
    <div class='floating' style=' flex: 1 1 50%; display: flex; flex-wrap: wrap; border: 1px solid #E5E5E5; position: relative;'>
        <div style='flex: 1 1 100%; text-align: center; background-color: #FF8C00; display: flex; position: relative'>
            <h2 class='text' style='color: #fff; margin: auto;'>Refeições preparadas na Hora</h2>
            <div style=' 
          width: 100%;
          position: absolute;
          top: auto;
          bottom: -9px;
          right: 0;
          height: 10px;
          z-index: 1;
          transform: translateZ(0)' data-front='' data-style='curve_asym' data-position='bottom'>
            <svg fill='#FF8C00' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none' style='width: 100%; left: 0; bottom: -1px; height: 100%; position: absolute;' class='svg-fill1'> 
            <path></path> 
            </svg>
            </div>
        </div>
        <br>
        <div style='flex: 1 1 100%; text-align: center; display: flex; position: relative;'>
            <p class='text' style='flex: 1 1 100%; margin: auto;'>
            <b>Nosso chef local Mark Wilson, deliciosa comida fresca preparada na hora
             <br>
             Apenas aqueça no forno quando você chegar! </b>
             <br>
             PRATO PRINCIPAL -
             <br />
             Lasanha de Carne ou Vegetais, Caçadora de Frango, Bife Bourguignon ou Korma de Frango
             <br />
             Acompanhamento / extras: Salada Mista, Pão de Alho, Arroz, Salada de Frutas</p>
            <div style=' 
          width: 100%;
          position: absolute;
          top: auto;
          bottom: 0;
          right: 0;
          height: 20px;
          z-index: 1;
          transform: translateZ(0)' data-front='' data-style='curve_asym' data-position='bottom'>
            <svg fill='#333333' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none' style='width: 100%; left: 0; bottom: -1px; height: 100%; position: absolute;' class='svg-fill2'> 
            <path></path> 
            </svg>
            </div>
        </div>
        <div style='flex: 1 1 100%; text-align: center; background-color: #333333; display: flex'>
            <h4 class='text' style='color: #FF8C00; flex: 1 1 100%; margin: auto;'>
            8,95€ pp</h4>
        </div>
    </div>
</div>
</div>
<div class='boozy-box'>
    <div class='img-float' style='flex: 1 1 50%; display: flex;'>
        <img src='https://res.cloudinary.com/ddipteh80/image/upload/v1614955357/Smartavillas/Welcome%20Packs/pexels-ponyo-sakana-5108601.jpg'>
    </div>
    <div class='floating' style=' flex: 1 1 50%; display: flex; flex-wrap: wrap; border: 1px solid #E5E5E5; position: relative;'>
        <div style='flex: 1 1 100%; text-align: center; background-color: #FF8C00; display: flex; position: relative'>
            <h2 class='text' style='color: #fff; margin: auto;'>Pizzas preparadas no forno para as crianças</h2>
            <div style=' 
          width: 100%;
          position: absolute;
          top: auto;
          bottom: -9px;
          right: 0;
          height: 10px;
          z-index: 1;
          transform: translateZ(0)' data-front='' data-style='curve_asym' data-position='bottom'>
            <svg fill='#FF8C00' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none' style='width: 100%; left: 0; bottom: -1px; height: 100%; position: absolute;' class='svg-fill1'> 
            <path></path> 
            </svg>
            </div>
        </div>
        <br>
        <div style='flex: 1 1 100%; text-align: center; display: flex; position: relative;'>
            <p class='text' style='margin: auto;'>
            <b>Por favor, especifique se vegetariano é necessário</b>
            </p>
            <div style=' 
          width: 100%;
          position: absolute;
          top: auto;
          bottom: 0;
          right: 0;
          height: 20px;
          z-index: 1;
          transform: translateZ(0)' data-front='' data-style='curve_asym' data-position='bottom'>
            <svg fill='#333333' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none' style='width: 100%; left: 0; bottom: -1px; height: 100%; position: absolute;' class='svg-fill2'> 
            <path></path> 
            </svg>
            </div>
        </div>
        <div style='flex: 1 1 100%; text-align: center; background-color: #333333; display: flex'>
            <h4 class='text' style='color: #FF8C00; margin: auto;'>4,95€ (12in/30cm)</h4>
        </div>
    </div>
</div>
</div>
<div style='max-width: 100%'>
<center>
<h4>Encomende garrafas de vinho à sua escolha para entrega direta: 5 € cada </h4>
<h4> OU <h4>
</center>
<div style='display: flex; flex-wrap: wrap; justify-content: center;' class='boozy-box'>
    <div class='img-float' style='flex: 1 1 50%; display: flex;'>
        <img src='https://res.cloudinary.com/ddipteh80/image/upload/v1609149925/Smartavillas/Welcome%20Packs/R18_-_000205_boozy_box.jpg'>
    </div>
    <div class='floating' style=' flex: 1 1 50%; display: flex; flex-wrap: wrap; border: 1px solid #E5E5E5; position: relative;'>
        <div style='flex: 1 1 100%; text-align: center; background-color: #FF8C00; display: flex; position: relative'>
            <h3 class='text' style='color: #fff; margin: auto;'>ENCOMENDE NOSSA CAIXA BOOZY!</h3>
            <div style=' 
          width: 100%;
          position: absolute;
          top: auto;
          bottom: -9px;
          right: 0;
          height: 10px;
          z-index: 1;
          transform: translateZ(0)' data-front='' data-style='curve_asym' data-position='bottom'>
            <svg fill='#FF8C00' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none' style='width: 100%; left: 0; bottom: -1px; height: 100%; position: absolute;' class='svg-fill1'> 
            <path></path> 
            </svg>
            </div>
        </div>
        <br>
        <div style='flex: 1 1 100%; text-align: center; display: flex; position: relative;'>
            <p class='text' style='margin: auto;'>
            <b>Boozy Box </b> inclui:
             <br>
             1 garrafa de vinho tinto, 1 garrafa de vinho branco, 6 garrafas de cerveja local, saco grande de batatas fritas, pacote grande de nozes, 1 frasco de azeitonas
            </p>
            <div style=' 
          width: 100%;
          position: absolute;
          top: auto;
          bottom: 0;
          right: 0;
          height: 20px;
          z-index: 1;
          transform: translateZ(0)' data-front='' data-style='curve_asym' data-position='bottom'>
            <svg fill='#333333' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none' style='width: 100%; left: 0; bottom: -1px; height: 100%; position: absolute;' class='svg-fill2'> 
            <path></path> 
            </svg>
            </div>
        </div>
        <div style='flex: 1 1 100%; text-align: center; background-color: #333333; display: flex'>
            <h3 class='text' style='color: #FF8C00;'>Apenas 20 € cada!</h3>
        </div>
    </div>
</div>
</div>


<h3 style='text-align: center;'><a href='/contact'><span style='color:#FF8C00;'>Entre em contato se quiser saber mais!</span></a></h3>

<p>&nbsp;</p>"
---
