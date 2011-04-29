/*******************************************************************************
#      ____               __          __  _      _____ _       _               #
#     / __ \              \ \        / / | |    / ____| |     | |              #
#    | |  | |_ __   ___ _ __ \  /\  / /__| |__ | |  __| | ___ | |__   ___      #
#    | |  | | '_ \ / _ \ '_ \ \/  \/ / _ \ '_ \| | |_ | |/ _ \| '_ \ / _ \     #
#    | |__| | |_) |  __/ | | \  /\  /  __/ |_) | |__| | | (_) | |_) |  __/     #
#     \____/| .__/ \___|_| |_|\/  \/ \___|_.__/ \_____|_|\___/|_.__/ \___|     #
#           | |                                                                #
#           |_|                 _____ _____  _  __                             #
#                              / ____|  __ \| |/ /                             #
#                             | (___ | |  | | ' /                              #
#                              \___ \| |  | |  <                               #
#                              ____) | |__| | . \                              #
#                             |_____/|_____/|_|\_\                             #
#                                                                              #
#                              (c) 2010-2011 by                                #
#           University of Applied Sciences Northwestern Switzerland            #
#                     Institute of Geomatics Engineering                       #
#                           martin.christen@fhnw.ch                            #
********************************************************************************
*     Licensed under MIT License. Read the file LICENSE for more information   *
*******************************************************************************/

/** 
 * @class poi
 * {@link http://www.openwebglobe.org} 
 * 
 * @author Benjamin Loesch benjamin.loesch@fhnw.ch
 */
function CanvasTexture(engine)
{
   this.engine = engine;
   this.gl = engine.gl;
   this.pole = false;
   this.mesh = null;
   this.poleMesh = null;

}


//returns a mesh with canvas2d as font
CanvasTexture.prototype.GenerateText =  function(text,style,pole)
{
   if(pole)
   {
      this.pole = true;
   }
   this.texCanvas = document.createElement('canvas'); 
   document.body.appendChild(this.texCanvas);
   this.ctx = this.texCanvas.getContext('2d');  
   this.ctx.canvas.height = 512; //maximal width and height.
   this.ctx.canvas.width = 512; 
  
   
   //set canvas as texture
   this.tex = new Texture(this.engine);
   this.tex.texture = this.gl.createTexture();
      
   //draw text
   this.text = text;
   this.DrawToCanvas2D(text,style); //just to get the text size
   
   if(!this.textHeight)
   {
      this.textHeight = 80;
   }
    
    //get next power of two    
    var textWidthP2 = MathUtils.GetNextPowerOfTwo(this.textWidth);
    var textHeightP2 = MathUtils.GetNextPowerOfTwo(this.textHeight);   
     
   this.tex.width = textWidthP2;
   this.tex.height = textHeightP2; 

   this.ctx.canvas.width = textWidthP2; //resize the canvas
   this.ctx.canvas.height = textHeightP2;
   this.DrawToCanvas2D(text,style);


   this.mesh = new Mesh(engine);
   this.mesh.SetTexture(this.tex);

   var vert = new Array();
     
   vert.push(-textWidthP2/2,textHeightP2/2,0,0,1);
   vert.push(-textWidthP2/2,-textHeightP2/2,0,0,0);
   vert.push(textWidthP2/2,-textHeightP2/2,0,1,0);
   vert.push(textWidthP2/2,textHeightP2/2,0,1,1);
                 
   this.mesh.SetBufferFont(vert);
   this.mesh.SetIndexBuffer([0, 1, 2, 0, 2, 3],"TRIANGLES");  
   
   return this.mesh;
}




/*
 * style: "RB" -> Red Font with black border. 
 */
CanvasTexture.prototype.DrawToCanvas2D = function(text,style)
{
   
    switch(style)
    {
       case "RB":    this.ctx.fillStyle = 'rgba(255,255,0,0.0)';
                     this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
                     this.ctx.fillStyle = 'rgba(255,0,0,1.0)';
                     this.ctx.lineWidth = 2.5;
                     this.ctx.strokeStyle = 'black'; 
                     this.ctx.save();
                     this.ctx.font = 'bold 80px ArialMS';
                     this.ctx.textAlign = 'center';
                     this.ctx.textBaseline = 'top';
                     var leftOffset = this.ctx.canvas.width / 2;
                     var topOffset = this.ctx.canvas.height / 2;
                     this.ctx.strokeText(this.text,leftOffset,0);
                     this.ctx.fillText(this.text,leftOffset,0);
                     var dim = this.ctx.measureText(this.text);
                     this.textWidth = Math.round(dim.width);
                     this.textHeight = Math.round(dim.height);          
                     this.ctx.restore();
                     break;
       
       case "WB":    this.ctx.fillStyle = 'rgba(255,255,0,0.0)';
                     this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
                     this.ctx.fillStyle = 'rgba(255,255,255,1.0)';
                     this.ctx.lineWidth = 2.5;
                     this.ctx.strokeStyle = 'black'; 
                     this.ctx.save();
                     this.ctx.font = 'bold 80px ArialMS';
                     this.ctx.textAlign = 'center';
                     this.ctx.textBaseline = 'top';
                     var leftOffset = this.ctx.canvas.width / 2;
                     var topOffset = this.ctx.canvas.height / 2;
                     this.ctx.strokeText(this.text,leftOffset,0);
                     this.ctx.fillText(this.text,leftOffset,0);
                     var dim = this.ctx.measureText(this.text);
                     this.textWidth = Math.round(dim.width);
                     this.textHeight = Math.round(dim.height);          
                     this.ctx.restore();
                     break;
                     
       case "BB":    this.ctx.fillStyle = 'rgba(255,255,0,0.3)';
                     this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
                     this.ctx.fillStyle = 'rgba(0,0,255,1.0)';
                     this.ctx.lineWidth = 2.5;
                     this.ctx.strokeStyle = 'black'; 
                     this.ctx.save();
                     this.ctx.font = 'bold 80px ArialMS';
                     this.ctx.textAlign = 'center';
                     this.ctx.textBaseline = 'top';
                     var leftOffset = this.ctx.canvas.width / 2;
                     var topOffset = this.ctx.canvas.height / 2;
                     this.ctx.strokeText(this.text,leftOffset,0);
                     this.ctx.fillText(this.text,leftOffset,0);
                     var dim = this.ctx.measureText(this.text);
                     this.textWidth = Math.round(dim.width);
                     this.textHeight = Math.round(dim.height);          
                     this.ctx.restore();
                     break;
       
       default:    
                     this.ctx.fillStyle = 'rgba(255,255,0,0.0)';
                     this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
                     this.ctx.fillStyle = 'rgba(255,255,255,1.0)';
                     this.ctx.lineWidth = 2.5;
                     this.ctx.strokeStyle = 'black'; 
                     this.ctx.save();
                     this.ctx.font = 'bold 80px ArialMS';
                     this.ctx.textAlign = 'center';
                     this.ctx.textBaseline = 'top';
                     var leftOffset = this.ctx.canvas.width / 2;
                     var topOffset = this.ctx.canvas.height / 2;
                     this.ctx.strokeText(this.text,leftOffset,0);
                     this.ctx.fillText(this.text,leftOffset,0);
                     var dim = this.ctx.measureText(this.text);
                     this.textWidth = Math.round(dim.width);
                     this.textHeight = Math.round(dim.height);          
                     this.ctx.restore();
                     break;     
    }

     //handle loaded canvas     
     this.gl.enable(this.gl.TEXTURE_2D);
     this.gl.bindTexture(this.gl.TEXTURE_2D, this.tex.texture); 
     this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
     this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA,engine.gl.RGBA,this.gl.UNSIGNED_BYTE, this.texCanvas);
     this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
     this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
     this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
     this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
     this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, false);         
     this.gl.bindTexture(this.gl.TEXTURE_2D, null);
     this.tex.ready = true;
 }  
 
 
 
CanvasTexture.prototype.GetPoleMesh = function(x,y,z,x2,y2,z2)
{
   this.poleMesh = new Mesh(engine);

   var vert = new Array();

     
   vert.push(x,y,z,1,1,0,1);
   vert.push(x2,y2,z2,1,1,0,1);
                 
   this.poleMesh.SetBufferPC(vert);
   this.poleMesh.SetIndexBuffer([0,1],"LINES");  
   
   return this.poleMesh;

}






 