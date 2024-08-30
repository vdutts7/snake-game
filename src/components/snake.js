class Snake {
    constructor() {
        this.body = [{ x: 200, y: 200 }];
    }

    draw() {
        ctx.fillStyle = 'green';
        this.body.forEach(segment => {
            ctx.fillRect(segment.x, segment.y, GRID_SIZE, GRID_SIZE);
        });
    }

    move(direction) {
        const head = { ...this.body[0] };
        switch (direction) {
            case 'up': head.y -= GRID_SIZE; break;
            case 'down': head.y += GRID_SIZE; break;
            case 'left': head.x -= GRID_SIZE; break;
            case 'right': head.x += GRID_SIZE; break;
        }
        this.body.unshift(head);
        this.body.pop();
    }

    grow() {
        const tail = { ...this.body[this.body.length - 1] };
        this.body.push(tail);
    }

    checkCollision() {
        const head = this.body[0];
        return (
            head.x < 0 || head.x >= canvas.width ||
            head.y < 0 || head.y >= canvas.height ||
            this.body.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
        );
    }

    eat(food) {
        const head = this.body[0];
        if (head.x === food.position.x && head.y === food.position.y) {
            this.grow();
            return true;
        }
        return false;
    }
}