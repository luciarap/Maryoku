class GraphicObject {
	constructor(x, y, width, height, img) { //vezme parametre, ktore su specificke pre danu instanciu class a ulozi si ich
											// vytvori objekt s nejakymi zakladnymi vlastnostami 
		this.x = x							
		this.y = y
		this.width = width
		this.height = height
		this.img = img
	}

	draw(ctx) { 
		//metoda vykresli obrazok
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
	} 

} 


