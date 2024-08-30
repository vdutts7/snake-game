class Food {
    constructor() {
        this.position = { x: 0, y: 0 };
        this.generate();
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, GRID_SIZE, GRID_SIZE);
    }

    generate() {
        this.position = {
            x: Math.floor(Math.random() * (canvas.width / GRID_SIZE)) * GRID_SIZE,
            y: Math.floor(Math.random() * (canvas.height / GRID_SIZE)) * GRID_SIZE
        };
    }
}