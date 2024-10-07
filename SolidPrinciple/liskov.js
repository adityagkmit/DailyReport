// 3. Liskov’s Substitution Principle

// UseCase:-   If a function expects a Shape object to calculate its area, any valid subtype like Circle or
//             Square should seamlessly replace it, maintaining the expected behavior.
 // Before (LSP Violates):
interface Shape {
  calculateArea(): number;
}
class Rectangle implements Shape {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  calculateArea(): number {
    return this.width * this.height;
  }
}
class Square extends Rectangle {
  constructor(size: number) {
    // The Square class incorrectly uses the Rectangle constructor
    super(size, size);
  }
  // Violates LSP by changing the behavior of `setWidth` and `setHeight` methods
  setWidth(width: number) {
    this.width = width;
    this.height = width; // Forces the height to be the same as width
  }
  setHeight(height: number) {
    this.width = height; // Forces the width to be the same as height
    this.height = height;
  }
}

// Breaking LSP

function drawShape(shape: Shape) {
  const area = shape.calculateArea();
  // Draw the shape based on its area
}
const mySquare = new Square(5);
mySquare.setWidth(4); // Unexpectedly alters both width and height
drawShape(mySquare); // Now this function is confused, as the behavior of the square changes unpredictably

 // (LSP Applied):

 interface Shape {
  calculateArea(): number;
}
class
Rectangle
implements
Shape
{
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  calculateArea(): number {
    return
this.width * this.height;
  }
}
// Correctly substitutable (LSP adhered to)
function drawShape(shape: Shape) {
  const area = shape.calculateArea();
  // Draw the shape based on its area
}
drawShape(new Rectangle(5, 4)); // Valid