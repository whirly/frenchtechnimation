/**
 * Created by Stephane on 21/05/2014.
 */

$( document ).ready(function() {

    var animation = new frenchtechAnimation();

    animation.initialize();

    $(window).on("resize", function(){
        animation.resize();
    });
});

function frenchtechAnimation() {

    this.myCanvas = $("#frenchtech-animation");
    this.myContainer = $(".canvas-container");

    this.baseRatio = 2.35223048;

    this.objects = [];

    // Bon c'est un peu l'algorithme du peintre à la main,
    // on aurait sans du optimiser en partant de la baseline Y des buildings
    // but done is better than perfect.
    this.startCoordinates = [
        { x:0, y:0 },           // 1 B
        { x:1438, y:169 },      // 9 M
        { x:1308, y:528 },      // 8 M
        { x:296, y:21 },        // 4 S
        { x:182, y:499 },       // 3 S
        { x:527, y:503 },       // 5 S
        { x:3, y:508 },         // 2 S
        { x:582, y:527 },       // 6 S
        { x:1197, y:487 },      // 7 M
        { x:1599, y:518 },      // 10 M
        { x:1664, y:479 }       // 11 M
    ];

    this.strasbourg = [
        3,4,5,6,7
    ];

    this.mulhouse = [
        1,2,8,9,10
    ];

    this.size = {
        x: this.myContainer.width(),
        y: this.myContainer.width() / this.baseRatio
    };

    this.scale = {
        x: 0.5,
        y: 0.5

    }

    this.buildings = [];

    var self = this;

    this.initialize = function() {

        this.myCanvas[ 0 ].width = this.size.x;
        this.myCanvas[ 0 ].height = this.size.y;

        this.canvas = new fabric.StaticCanvas( "frenchtech-animation" );

        this.scale.x = this.size.x / 1824.0;
        this.scale.y= this.size.y / 693.0;

        async.parallel([
                function (callback) {
                    fabric.Image.fromURL( 'images/01.jpg', function( image ) { callback( null, image );} );
                    //fabric.loadSVGFromURL("images/french_tech_arriere_plan.svg", function( value ) { callback( null, value ) });
                },
                function (callback) {
                    fabric.Image.fromURL( 'images/09.png', function( image ) { callback( null, image );} );
                    //fabric.loadSVGFromURL("images/french_tech_maison6.svg", function( value ) { callback( null, value ) });
                },
                function (callback) {
                    fabric.Image.fromURL( 'images/08.png', function( image ) { callback( null, image );} );
                    //fabric.loadSVGFromURL("images/french_tech_maison5.svg", function( value ) { callback( null, value ) });
                },
                function (callback) {
                    fabric.Image.fromURL( 'images/04.png', function( image ) { callback( null, image );} );
                    //fabric.loadSVGFromURL("images/french_tech_maison1.svg", function( value ) { callback( null, value ) });
                },
                function (callback) {
                    fabric.Image.fromURL( 'images/03.png', function( image ) { callback( null, image );} );
                    //fabric.loadSVGFromURL("images/french_tech_tour_europe.svg", function( value ) { callback( null, value ) });
                },
                function (callback) {
                    fabric.Image.fromURL( 'images/05.png', function( image ) { callback( null, image );} );
                    //fabric.loadSVGFromURL("images/french_tech_maison2.svg", function( value ) { callback( null, value ) });
                },
                function (callback) {
                    fabric.Image.fromURL( 'images/02.png', function( image ) { callback( null, image );} );
                    //fabric.loadSVGFromURL("images/french_tech_cathedrale.svg", function( value ) { callback( null, value ) });
                },
                function (callback) {
                    fabric.Image.fromURL( 'images/06.png', function( image ) { callback( null, image );} );
                    //fabric.loadSVGFromURL("images/french_tech_maison3.svg", function( value ) { callback( null, value ) });
                },
                function (callback) {
                    fabric.Image.fromURL( 'images/07.png', function( image ) { callback( null, image );} );
                    //fabric.loadSVGFromURL("images/french_tech_maison4.svg", function( value ) { callback( null, value ) });
                },
                function (callback) {
                    fabric.Image.fromURL( 'images/10.png', function( image ) { callback( null, image );} );
                    //fabric.loadSVGFromURL("images/french_tech_maison7.svg", function( value ) { callback( null, value ) });
                },

                function (callback) {
                    fabric.Image.fromURL( 'images/11.png', function( image ) { callback( null, image );} );
                    //fabric.loadSVGFromURL("images/french_tech_maison7.svg", function( value ) { callback( null, value ) });
                },
            ], function (err, results) {

                // Store all objects
                self.objects = results;

                // Place all objects
                self.createAndPlaceObjects( self.myCanvas, self.objects, self.startCoordinates );

                // Animate them
                self.animateCity( self.strasbourg, 400 * self.scale.x );
                self.animateCity( self.mulhouse, -400 * self.scale.y );

                // Make the title appear
                setTimeout( function() {
                    $("#animation-text").fadeIn( 800 );
                }, 3400 );
            }
        );
    }

    this.createAndPlaceObjects = function( canvas, objectsToPlace, coordsObjects ) {

        for( var i = 0; i < objectsToPlace.length; i++ ) {

            var image = objectsToPlace[ i ];

            image.set( {
                left: coordsObjects[ i ].x * this.scale.x,
                top: coordsObjects[ i ].y * this.scale.y,
                scaleX: this.scale.x,
                scaleY: this.scale.y
            });

            this.canvas.add( image );
            this.buildings.push( image );
        }

        this.canvas.renderAll();

    };

    this.replaceObjects = function( canvas, buildings, coordsObjects ) {

        for( var i = 0; i < buildings.length; i++ ) {

            var building = buildings[ i ];

            building.set( {
                left: coordsObjects[ i ].x * this.scale.x,
                top: coordsObjects[ i ].y * this.scale.y,
                scaleX: this.scale.x,
                scaleY: this.scale.y
            });
        }

        this.canvas.renderAll();
    };


    this.animateCity = function( cityIndexes, amount ) {

        for( var i = 0; i < cityIndexes.length; i++ ) {

            var building = this.buildings[ cityIndexes[ i ]];

            building.animate( 'left', building.getLeft() + amount, {
                duration: 3000,
                onChange: this.canvas.renderAll.bind( this.canvas ),
                easing: fabric.util.easeOutCubic
                }
            );
        }
    }

    this.resize = function() {
        this.size.x = this.myContainer.width();
        this.size.y = this.myContainer.width() / this.baseRatio;

        this.myCanvas.css( {
            width: this.size.x,
            height: this.size.y
        });

        this.myCanvas[ 0 ].width = this.size.x;
        this.myCanvas[ 0 ].height = this.size.y;

        this.scale.x = this.size.x / 1824.0;
        this.scale.y= this.size.y / 693.0;

        this.replaceObjects( this.canvas, this.buildings, this.startCoordinates );

        this.animateCity( self.strasbourg, 400 * self.scale.x );
        this.animateCity( self.mulhouse, -400 * self.scale.y );

        // Make the title appear
        $("#animation-text").hide();

        setTimeout( function() {
            $("#animation-text").fadeIn( 800 );
        }, 3400 );

    }
}