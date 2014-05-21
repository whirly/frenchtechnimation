/**
 * Created by Stephane on 21/05/2014.
 */

$( document ).ready(function() {

    var animation = new frenchtechAnimation();

    animation.initialize();

});

function frenchtechAnimation() {

    this.myCanvas = $("#frenchtech-animation");
    this.myContainer = $(".canvas-container");

    this.baseRatio = 2.35223048;


    this.objects = [];

    this.startCoordinates = [
        { x:0.1, y:0.1 },
        { x:0.2, y:0.1 },
        { x:0.3, y:0.1 },
        { x:0.4, y:0.1 },
        { x:0.5, y:0.1 },
        { x:0.6, y:0.1 },
        { x:0.7, y:0.1 },
        { x:0.8, y:0.1 },
        { x:0.9, y:0.1 },
        { x:0.1, y:0.2 }
    ];

    this.pathGroups = [];

    this.initialize = function() {

        this.myCanvas[ 0 ].width = this.myContainer.width();
        this.myCanvas[ 0 ].height = this.myCanvas.width() / this.baseRatio;

        async.parallel([
                function (callback) {
                    fabric.loadSVGFromURL("images/french_tech_arriere_plan.svg", function( value ) { callback( null, value ) });
                },
                function (callback) {
                    fabric.loadSVGFromURL("images/french_tech_cathedrale.svg", function( value ) { callback( null, value ) });
                },
                function (callback) {
                    fabric.loadSVGFromURL("images/french_tech_tour_europe.svg", function( value ) { callback( null, value ) });
                },
                function (callback) {
                    fabric.loadSVGFromURL("images/french_tech_maison1.svg", function( value ) { callback( null, value ) });
                },
                function (callback) {
                    fabric.loadSVGFromURL("images/french_tech_maison2.svg", function( value ) { callback( null, value ) });
                },
                function (callback) {
                    fabric.loadSVGFromURL("images/french_tech_maison3.svg", function( value ) { callback( null, value ) });
                },
                function (callback) {
                    fabric.loadSVGFromURL("images/french_tech_maison4.svg", function( value ) { callback( null, value ) });
                },
                function (callback) {
                    fabric.loadSVGFromURL("images/french_tech_maison5.svg", function( value ) { callback( null, value ) });
                },
                function (callback) {
                    fabric.loadSVGFromURL("images/french_tech_maison6.svg", function( value ) { callback( null, value ) });
                },
                function (callback) {
                    fabric.loadSVGFromURL("images/french_tech_maison7.svg", function( value ) { callback( null, value ) });
                },

            ], function (err, results) {
                // Store all objects
                self.objects = results;

                // Place all objects
                this.pathGroups = self.createAndPlaceObjects( self.myCanvas, self.objects, self.startCoordinates );

            }
        );
    }

    this.createAndPlaceObjects = function( canvas, objectsToPlace, coordsObjects ) {

        var groups = [];

        for( var i = 0; i < objectsToPlace.length(); i++ ) {

            var objectCurrent = objectsToPlace[ i ];
            var group = new fabric.PathGroup( objectCurrent, {
                   
            })
        }


    };

}