import Sprite = Phaser.GameObjects.Sprite;

export default class DCoin extends Phaser.Scene {
    private group1: any;
    private group2: any;
    private group3: any;
    private group4: any;

    private circle1: any;
    private circle2: any;
    private circle3: any;
    private circle4: any;

    private location1:any;
    private location2:any;
    private location3:any;
    private location4:any;

    preload() {
        this.load.image("background", "../sprites/backgroundReal.jpg")
        this.load.image('ball', '../sprites/dcoin.png');
        this.load.image("field", "../sprites/Field.png");

        this.location1 = new Phaser.Math.Vector2(250, 750);
        this.location2 = new Phaser.Math.Vector2(100, 600);
        this.location3 = new Phaser.Math.Vector2(100, 40);
        this.location4 = new Phaser.Math.Vector2(300, 300);
    }

    create() {
        this.cameras.main.setBounds(-1000, -1000, 3024, 3024);
        this.cameras.main.setZoom(1, 1);
        this.cameras.main.centerOn(0, 0);
        let background = this.add.image(200,370, "background");
        let field1 = this.add.image(250, 750, "field");
        let field2 = this.add.image(100, 600, "field");
        let field3 = this.add.image(100, 40, "field");
        field1.setScale(0.1, 0.1);
        field2.setScale(0.1,0.1);
        field3.setScale(0.1,0.1);
        background.setScale(0.32, 0.32);
        //child.setScale(0.5)

        /*
        let child: any = {key: 'ball', frameQuantity: 36, setScale: { x: 0.005, y: 0.005}};
        let child1: any = {key: 'ball', frameQuantity: 32, setScale: { x: 0.005, y: 0.005}};
        let child2: any = {key: 'ball', frameQuantity: 26, setScale: { x: 0.005, y: 0.005}};
        let child3: any = {key: 'ball', frameQuantity: 16, setScale: { x: 0.005, y: 0.005}};
        this.group1 = this.add.group(child);
        this.group2 = this.add.group(child1);
        this.group3 = this.add.group(child2);
        this.group4 = this.add.group(child3);

        this.circle1 = new Phaser.Geom.Circle(400, 300, 200);
        this.circle2 = new Phaser.Geom.Circle(400, 300, 160);
        this.circle3 = new Phaser.Geom.Circle(400, 300, 120);
        this.circle4 = new Phaser.Geom.Circle(400, 300, 80);

        Phaser.Actions.PlaceOnCircle(this.group1.getChildren(), this.circle1);
        Phaser.Actions.PlaceOnCircle(this.group2.getChildren(), this.circle2);
        Phaser.Actions.PlaceOnCircle(this.group3.getChildren(), this.circle3);
        Phaser.Actions.PlaceOnCircle(this.group4.getChildren(), this.circle4);

         */


        let cam = this.cameras.main;
        let pos = 1;


        this.input.on("pointerdown", () =>{
            // @ts-ignore
            let location = this['location' + pos];
            cam.pan(location.x, location.y, 1000, "Sine.easeInOut");
            let randomZoom = 0.7;
            if(pos!=4){
                randomZoom = Phaser.Math.FloatBetween(3, 5);
            }
            cam.zoomTo(randomZoom, 1000);
            pos++;

            if(pos == 5){
                pos = 1;
            }
        })


    }

    update() {
        /*
        Phaser.Actions.RotateAroundDistance(this.group1.getChildren(), this.circle1, -0.040, this.circle1.radius);
        Phaser.Actions.RotateAroundDistance(this.group2.getChildren(), this.circle2, 0.025, this.circle2.radius);
        Phaser.Actions.RotateAroundDistance(this.group3.getChildren(), this.circle3, -0.020, this.circle3.radius);
        Phaser.Actions.RotateAroundDistance(this.group4.getChildren(), this.circle4, 0.015, this.circle4.radius);

         */
    }
}