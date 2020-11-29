(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"christian_atlas_1", frames: [[1765,504,94,47],[1840,132,104,35],[1303,883,100,22],[1840,84,92,46],[1642,504,121,40],[1796,199,102,42],[1763,43,22,7],[1490,567,303,338],[1763,84,75,113],[1719,199,75,103],[1565,355,75,93],[1565,43,97,90],[1642,355,75,93],[1565,250,75,103],[1565,135,75,113],[1642,250,75,103],[1719,409,75,93],[1664,43,97,90],[1565,450,75,93],[1719,304,75,103],[1642,135,75,113],[0,0,1563,565],[0,840,800,161],[0,567,1488,271],[1565,0,214,41],[802,840,499,82],[1303,840,147,41],[1303,907,499,82],[802,924,499,82],[1795,0,185,82]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_30 = function() {
	this.initialize(ss["christian_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["christian_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_28 = function() {
	this.initialize(ss["christian_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_27 = function() {
	this.initialize(ss["christian_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["christian_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["christian_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["christian_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["christian_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["christian_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["christian_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["christian_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["christian_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["christian_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["christian_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["christian_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["christian_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["christian_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["christian_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["christian_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["christian_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["christian_atlas_1"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["christian_atlas_1"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["christian_atlas_1"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["christian_atlas_1"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["christian_atlas_1"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["christian_atlas_1"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["christian_atlas_1"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["christian_atlas_1"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["christian_atlas_1"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["christian_atlas_1"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.wheel1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(3,1,1).p("AASAAQAAAIgGAFQgFAGgHAAQgGAAgGgGQgFgFAAgIQAAgHAFgFQAGgGAGAAQAHAAAFAGQAGAFAAAHg");
	this.shape.setTransform(11,9.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(2,1,1).p("AAWgpIAWgsAAAgxIAAguAAlgYIAqgYAgwgDIg7AGAgjgVIg8gcAgWgnIgegqAgXAsIgZAyAAWAjIAlAiAACAxIAEAvAAkATIA1ATAgjATIg4AaAAsgEIBAgC");
	this.shape_1.setTransform(10.825,9.625);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgMAOQgEgGAAgIQAAgHAEgFQAGgGAGAAQAHAAAFAGQAGAFAAAHQAAAIgGAGQgFAFgHAAQgGAAgGgFg");
	this.shape_2.setTransform(11,9.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.wheel1, new cjs.Rectangle(-1,-1,23.7,21.3), null);


(lib.Rleg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#231F20").ss(3).p("Amxt8IANCkQAPDOAJDSQAbKfgwHNQgJBQD9gHQDegGDcg4QBkgaAqgZQAugcgmgUQhegxobAMQAIk/gDllQgGrJg3i+g");
	this.shape.setTransform(43.4419,89.3085);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2A5400").s().p("AmiM0QAwnNgbqfQgJjSgPjOIgNikICjAIQA3C+AGLJQADFlgIE/QIbgMBeAxQAmAUguAcQgqAZhkAaQjcA4jeAGIgkAAQjYAAAIhJg");
	this.shape_1.setTransform(43.5095,89.3494);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Rleg, new cjs.Rectangle(-1.6,-1.5,100.89999999999999,181.7), null);


(lib.Rarm = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(3,1,1).p("AAooAIgoBJQguBdghBmQhsFIA/EvIgcBkQgPBSBHhWIAIAQQAKASAKAIQAfAcAQhLIAzAfQArAPgthMQgcgugMhqQgNhqAGh8QAOktBpiXQBgiIhFgJQgVgCgjAKg");
	this.shape.setTransform(15.5819,53.2449);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#336600").s().p("AhEINQgKgIgKgSIgIgQQhHBWAPhSIAchkQg/kvBslIQAhhmAuhdIAohJIAfgLQAjgKAVACQBFAJhgCIQhpCXgOEtQgGB8ANBqQAMBqAcAuQAtBMgrgPIgzgfQgMA2gUAAQgHAAgIgHg");
	this.shape_1.setTransform(15.5819,53.2449);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Rarm, new cjs.Rectangle(-1.5,-1.5,34.2,109.5), null);


(lib.Mouth = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {"A E I":12,"Ou O":11,Oo:0,"C D J K N S T":8,"B M P":7,L:6,"Q W":5,"F V":4,R:3,"CH J SH":2,Smile:0};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// A__E__I
	this.instance = new lib.CachedBmp_25();
	this.instance.setTransform(6.45,2.2,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_24();
	this.instance_1.setTransform(24.7,14.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.instance}]},12).wait(1));

	// Ou__O
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(3,1,1).p("AAVBQQgKACgLAAQgWAAgTgIQgPgGgNgKQgGgFgEgFQgBAAAAgBQgSgUAAgbQAAghAdgYQAdgYAoAAQApAAAdAYQAeAYAAAhQAAAggbAXQgCABgBACQgDACgDACQgRALgWAGQgCAAgBABQgBAAAAAAQghAHgdgNQgUgIgSgSABJA3QgEAEgFADAhQAvIAOgJQAVgNAUgFQA+gSAkA1AhSAxIACgC");
	this.shape.setTransform(30.5,14.3886);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#993333").s().p("AglAaQgUgJgSgRIgBAAIAOgKQAVgMAUgGQA/gSAjA1IgDACIgGAFQgQALgXAGIgDAAIgBAAQgKACgLAAQgWAAgTgHg");
	this.shape_1.setTransform(30.075,19.2281);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#660000").s().p("AhGA+IgJgJQASARAUAIQgPgGgOgKgAgZAYQgUAFgVANIgOAJQgTgUAAgbQAAghAdgYQAegYAoAAQApAAAdAYQAdAYAAAhQAAAggaAYQgkg2g+ASg");
	this.shape_2.setTransform(30.5,13.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},11).to({state:[]},1).wait(1));

	// C__D__J__K__N__S__T__X__Z__Y
	this.instance_2 = new lib.CachedBmp_26();
	this.instance_2.setTransform(1.85,2.55,0.5,0.5);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(8).to({_off:false},0).to({_off:true},1).wait(4));

	// B__M__P
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(3,1,1).p("AjWAOICNgUQCkgRB8AW");
	this.shape_3.setTransform(32.15,14.1295);
	this.shape_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(7).to({_off:false},0).to({_off:true},1).wait(5));

	// L
	this.instance_3 = new lib.CachedBmp_27();
	this.instance_3.setTransform(8.95,1.35,0.5,0.5);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(6).to({_off:false},0).to({_off:true},1).wait(6));

	// Q__W
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(3,1,1).p("AAAgmQBYgfggAwIAbgCQAdgBAHAEQAVAMjLA4QggAJgTgPQgUgRArgYg");
	this.shape_4.setTransform(34.1579,12.9039,0.7426,1.4467);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#660000").s().p("AhyAqQgUgRArgYIBbgnQBYgfggAwIAbgCQAdgBAHAEQAVAMjLA4QgMADgKAAQgRAAgMgJg");
	this.shape_5.setTransform(34.1579,12.9039,0.7426,1.4467);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_5},{t:this.shape_4}]},5).to({state:[]},1).wait(7));

	// F__V
	this.instance_4 = new lib.CachedBmp_28();
	this.instance_4.setTransform(7.15,4.25,0.5,0.5);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(4).to({_off:false},0).to({_off:true},1).wait(8));

	// R
	this.instance_5 = new lib.CachedBmp_29();
	this.instance_5.setTransform(6.05,3.95,0.5,0.5);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(3).to({_off:false},0).to({_off:true},1).wait(9));

	// CH__J__SH
	this.instance_6 = new lib.CachedBmp_30();
	this.instance_6.setTransform(8.55,0.85,0.5,0.5);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(2).to({_off:false},0).to({_off:true},1).wait(10));

	// Smile_Line
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(3,1,1).p("AhBAtIARADQAUABATgFQA6gPARhM");
	this.shape_6.setTransform(6.625,4.7923);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#000000").ss(3,1,1).p("Ajfg8IAiAmQAsAqAxAVQCfBFChio");
	this.shape_7.setTransform(32.125,13.6252);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6}]}).to({state:[]},1).wait(12));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,63.9,25.9);


(lib.Lleg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#231F20").ss(3).p("AkdsHIAwH6QAwJRAAGxQAAAfCFgQQB8gPBxgnQB8gqgVghQgYgpj2gJIhz1Mg");
	this.shape.setTransform(28.5655,77.6364);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#224522").s().p("Ai9L0QAAmxgwpQIgwn7IC4ANIBzVLQD1AKAZAoQAUAhh8ArQhwAnh9APQgtAFgdAAQg6AAAAgVg");
	this.shape_1.setTransform(28.6454,77.6945);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Lleg, new cjs.Rectangle(-1.6,-1.6,60.4,159.5), null);


(lib.Larm = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(3,1,1).p("AgpnPIgQBTQgTBpgMBrQgnFXAsD0IAHBAQANAxAZhOIAhAuQAdAggLhHIA0AdQAqAPgzhKQgegqgMiCQgKh2AGiZQAHiYAUh5QAWiBAdgpQA0hIhWAZg");
	this.shape.setTransform(10.7392,50.9773);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2B5700").s().p("AgFH0IghguQgZBOgNgxIgHhAQgsj0AnlXQAMhrAThpIAQhTIBfgnQBWgZg0BIQgdApgWCBQgUB5gHCYQgGCZAKB2QAMCCAeAqQAzBKgqgPIg0gdQAIAxgMAAQgGAAgIgKg");
	this.shape_1.setTransform(10.7392,50.9773);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Larm, new cjs.Rectangle(-1.5,-1.5,24.5,105), null);


(lib.head = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_23();
	this.instance.setTransform(-1.5,-1.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.head, new cjs.Rectangle(-1.5,-1.5,151.5,169), null);


(lib.face = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_10();
	this.instance.setTransform(-18.85,-27.05,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_11();
	this.instance_1.setTransform(-18.85,-21.75,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_12();
	this.instance_2.setTransform(-18.85,-17,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_13();
	this.instance_3.setTransform(-24.05,-15.2,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_14();
	this.instance_4.setTransform(-18.85,-17,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_15();
	this.instance_5.setTransform(-18.85,-21.75,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_16();
	this.instance_6.setTransform(-18.85,-27.05,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_17();
	this.instance_7.setTransform(-18.85,-21.75,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_18();
	this.instance_8.setTransform(-18.85,-17,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_19();
	this.instance_9.setTransform(-24.05,-15.2,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_20();
	this.instance_10.setTransform(-18.85,-17,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_21();
	this.instance_11.setTransform(-18.85,-21.75,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_22();
	this.instance_12.setTransform(-18.85,-27.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},13).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},40).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_12}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-24,-27,48.5,56.8);


(lib.wheelgraphic = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.wheel1();
	this.instance.setTransform(10.8,9.6,1,1,0,0,0,10.8,9.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({rotation:4.0449,x:10.75,y:9.65},0).wait(1).to({rotation:8.0899,x:10.8,y:9.6},0).wait(1).to({rotation:12.1348},0).wait(1).to({rotation:16.1798},0).wait(1).to({rotation:20.2247,y:9.65},0).wait(1).to({rotation:24.2697},0).wait(1).to({rotation:28.3146,x:10.75,y:9.6},0).wait(1).to({rotation:32.3596,y:9.65},0).wait(1).to({rotation:36.4045,x:10.8},0).wait(1).to({rotation:40.4494,x:10.75,y:9.6},0).wait(1).to({rotation:44.4944},0).wait(1).to({rotation:48.5393,y:9.65},0).wait(1).to({rotation:52.5843,x:10.8},0).wait(1).to({rotation:56.6292},0).wait(1).to({rotation:60.6742,y:9.6},0).wait(1).to({rotation:64.7191,x:10.75},0).wait(1).to({rotation:68.764,y:9.65},0).wait(1).to({rotation:72.809,x:10.8,y:9.6},0).wait(1).to({rotation:76.8539,x:10.75},0).wait(1).to({rotation:80.8989},0).wait(1).to({rotation:84.9438,x:10.8},0).wait(1).to({rotation:88.9888},0).wait(1).to({rotation:93.0337,y:9.65},0).wait(1).to({rotation:97.0787,x:10.75,y:9.55},0).wait(1).to({rotation:101.1236,x:10.8,y:9.6},0).wait(1).to({rotation:105.1685,x:10.75,y:9.55},0).wait(1).to({rotation:109.2135,x:10.8,y:9.6},0).wait(1).to({rotation:113.2584,y:9.55},0).wait(1).to({rotation:117.3034,x:10.75,y:9.6},0).wait(1).to({rotation:121.3483,x:10.8,y:9.55},0).wait(1).to({rotation:125.3933,x:10.75,y:9.6},0).wait(1).to({rotation:129.4382,x:10.8},0).wait(1).to({rotation:133.4831,x:10.75},0).wait(1).to({rotation:137.5281,y:9.55},0).wait(1).to({rotation:141.573,x:10.8,y:9.6},0).wait(1).to({rotation:145.618},0).wait(1).to({rotation:149.6629,y:9.55},0).wait(1).to({rotation:153.7079,x:10.75,y:9.6},0).wait(1).to({rotation:157.7528,y:9.55},0).wait(1).to({rotation:161.7978,x:10.8},0).wait(1).to({rotation:165.8427,y:9.6},0).wait(1).to({rotation:169.8876,x:10.75},0).wait(1).to({rotation:173.9326,x:10.8},0).wait(1).to({rotation:177.9775,x:10.75},0).wait(1).to({rotation:182.0225,x:10.8,y:9.55},0).wait(1).to({rotation:186.0674,x:10.75},0).wait(1).to({rotation:190.1124},0).wait(1).to({rotation:194.1573,x:10.8},0).wait(1).to({rotation:198.2022,y:9.6},0).wait(1).to({rotation:202.2472,y:9.55},0).wait(1).to({rotation:206.2921,x:10.75},0).wait(1).to({rotation:210.3371,x:10.8},0).wait(1).to({rotation:214.382,x:10.75,y:9.6},0).wait(1).to({rotation:218.427},0).wait(1).to({rotation:222.4719,x:10.8,y:9.55},0).wait(1).to({rotation:226.5169,x:10.75},0).wait(1).to({rotation:230.5618},0).wait(1).to({rotation:234.6067,x:10.8,y:9.6},0).wait(1).to({rotation:238.6517},0).wait(1).to({rotation:242.6966},0).wait(1).to({rotation:246.7416,x:10.75},0).wait(1).to({rotation:250.7865},0).wait(1).to({rotation:254.8315},0).wait(1).to({rotation:258.8764,y:9.55},0).wait(1).to({rotation:262.9213,x:10.8,y:9.6},0).wait(1).to({rotation:266.9663,y:9.55},0).wait(1).to({rotation:271.0112},0).wait(1).to({rotation:275.0562,x:10.75,y:9.6},0).wait(1).to({rotation:279.1011,x:10.85,y:9.55},0).wait(1).to({rotation:283.1461,x:10.8,y:9.6},0).wait(1).to({rotation:287.191},0).wait(1).to({rotation:291.236},0).wait(1).to({rotation:295.2809,x:10.85},0).wait(1).to({rotation:299.3258,x:10.8},0).wait(1).to({rotation:303.3708},0).wait(1).to({rotation:307.4157,y:9.55},0).wait(1).to({rotation:311.4607,x:10.85},0).wait(1).to({rotation:315.5056,y:9.6},0).wait(1).to({rotation:319.5506},0).wait(1).to({rotation:323.5955},0).wait(1).to({rotation:327.6404,x:10.8,y:9.55},0).wait(1).to({rotation:331.6854,y:9.6},0).wait(1).to({rotation:335.7303,x:10.85,y:9.55},0).wait(1).to({rotation:339.7753,x:10.8},0).wait(1).to({rotation:343.8202},0).wait(1).to({rotation:347.8652,y:9.6},0).wait(1).to({rotation:351.9101,x:10.85},0).wait(1).to({rotation:355.9551,x:10.8},0).wait(1).to({rotation:360},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.1,-2.3,23.8,23.8);


// stage content:
(lib.christian = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0];
	this.streamSoundSymbolsList[0] = [{id:"test",startFrame:0,endFrame:109,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("test",0);
		this.InsertIntoSoundStreamData(soundInstance,0,109,1);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(109));

	// text
	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(161,18.8,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2();
	this.instance_1.setTransform(161,18.8,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_4();
	this.instance_2.setTransform(320.4,64.2,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_3();
	this.instance_3.setTransform(161,18.8,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_6();
	this.instance_4.setTransform(320.4,64.2,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_5();
	this.instance_5.setTransform(161,18.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},11).to({state:[{t:this.instance_1}]},9).to({state:[{t:this.instance_3},{t:this.instance_2}]},27).to({state:[{t:this.instance_5},{t:this.instance_4}]},17).wait(45));

	// Mouth
	this.instance_6 = new lib.Mouth("single",0);
	this.instance_6.setTransform(214.7,203.4,0.4558,0.4558,0,0,0,30.9,12);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(12).to({regY:12.1,x:214.5,y:204.05,startPosition:12},0).wait(2).to({startPosition:6},0).wait(1).to({startPosition:11},0).wait(2).to({startPosition:5},0).wait(3).to({startPosition:12},0).wait(3).to({startPosition:8},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:12},0).wait(10).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:11},0).wait(1).to({startPosition:7},0).wait(4).to({startPosition:12},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:12},0).wait(1).to({startPosition:2},0).wait(3).to({startPosition:11},0).wait(1).to({startPosition:8},0).wait(5).to({startPosition:6},0).wait(2).to({startPosition:12},0).wait(4).to({startPosition:8},0).wait(10).to({startPosition:0},0).wait(27));

	// Flower
	this.instance_7 = new lib.face("synched",0);
	this.instance_7.setTransform(215.7,182.9,0.5203,0.5203,0,0,0,0.1,1.3);

	this.ikNode_1 = new lib.head();
	this.ikNode_1.name = "ikNode_1";
	this.ikNode_1.setTransform(214.3,181,0.4559,0.4559,-0.2819,0,0,74.3,83);

	this.ikNode_4 = new lib.Rarm();
	this.ikNode_4.name = "ikNode_4";
	this.ikNode_4.setTransform(193.5,188.6,0.4559,0.4559,-0.2819,0,0,15.7,0.1);

	this.ikNode_2 = new lib.Rleg();
	this.ikNode_2.name = "ikNode_2";
	this.ikNode_2.setTransform(207.55,212.9,0.4559,0.4559,-0.2819,0,0,11.6,63.3);

	this.ikNode_3 = new lib.Lleg();
	this.ikNode_3.name = "ikNode_3";
	this.ikNode_3.setTransform(221.65,210.9,0.4554,0.4554,-0.2822,0,0,16.6,66.8);

	this.ikNode_5 = new lib.Larm();
	this.ikNode_5.name = "ikNode_5";
	this.ikNode_5.setTransform(236.75,187.25,0.4559,0.4559,-0.2819,0,0,7.8,5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ikNode_5},{t:this.ikNode_3},{t:this.ikNode_2},{t:this.ikNode_4},{t:this.ikNode_1},{t:this.instance_7}]}).wait(109));

	// windmill_wheel
	this.instance_8 = new lib.wheelgraphic("synched",0);
	this.instance_8.setTransform(284.25,193.25,0.4899,0.4899,0,0,0,11.2,9.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(109));

	// windmill_base
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(3,1,1).p("Ag9CNIAjkYIAvgBIAIAzIAOBZIATCEAABg5IAcggAAlgKIgkgvAgnAEIBSgEAgmgGIAngzIgcgm");
	this.shape.setTransform(284.375,207.275);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(109));

	// barn
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#4A2500").ss(3,1,1).p("ADCg+IADgVAClhKIgBgIACmhDIgBgHIAdAMIAcAMIAAgRADeguIAAgEIAYAKIAAgQAD2gjIAAgFIASAHAEFACIABgPIAAgFIAAgKAEKgQIgEADADRAAIAbgJIACgRADRAAIACgPADPAOIACgOAC1AcIABgTIAAgSADqAGIACgPIAagJAC2AJIAbgJABShsIAPAGIAhAOIAjAOABShsIAAgGABShbIAAgIIAAgJACBhOIABgKIAAgFAkHgyIAWAQIADACIABgDIAAgHAhSBNIAAgaAhzA1IAAgVAhzA1IAhAYIAbASAhzBJIAAgUAjQgLIABgIAjQgLIAgAVIABgKAjSAUIACgfAiSA7IABgaIACgXAiwAKIAfAXIAeAUAizAtIADgjAg0BzIAAgTIAAgQAhRBeIgBgRACbAUIAAgWABGAzIAhgMIAWgIIAAgaABnBAIAAgZIAAgUABFBKIABgXIABgXAB9A1IAAgWIAegLIAbgLACbAnIAAgTAgbBXIABgXAADBLIAfgLIAkgNAAgBTIACgTIACgZAgbBXIAegMAACBbIABgQIABgVAgbBmIAAgPAjuggIAeAVAjxgFIADgbAg0BgIAZgJAkHgyIACgVAkJgbIAAgDIACgU");
	this.shape_1.setTransform(429.625,225.975);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FFFFFF").ss(3,1,1).p("AgaiqIAKAAAAziqIBPAAIgoCpgAAoiqIALAAAiBiqIBnAAACCCrIgoisIgpCsACCCrIhRAAIgMAAAiBCrIAyinIAwCnIhiAAIAAlVIAyCuIA1iuAgRinIABFQIgPACACCiqIAAFVAAninIgCFO");
	this.shape_2.setTransform(384.675,203.225);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(3,1,1).p("AkChzICWAAIIZheAkRjTIClBgIAAGVIAWgEIAXgFIAFgBIE/hAIAPgDICdgfIgEmHAmwhzICfhgIKEhOIA6BQAmwhzICuAAIAAGNAhsEiIlEAAIAAmV");
	this.shape_3.setTransform(411.75,194.325);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#CF4238").s().p("AhtEiIAAmVIikhgIKEhOIA6BQIoaBeIIaheIAEGHIidAfIgPgGIAAgFIAAAFIAAAJIk/BAIAAgGIAAAGIgFABIgVgPIACgVIgCAVIgCAUIgXAEgAmwEiIAAmVICuAAICVAAIAAGVgAkCEaIAAmNgAiMEEIAAlVIAAFVIgoitIgoCtIAoitIAoCtIhQAAIgMAAIAMAAIBQAAgAkuEEIAQgCIgClQIACFQIgQACIhiAAIBiAAgAkuEEIgvinIA0iuIALAAIgLAAIhnAAIAAFVIAzingAjpEAIADlOgAi0BXIAoioIgoCoIgnioIBPAAIhPAAIAnCogAjbhRIgLAAgAhUEKIAVAPIgXAFgAmQEEgAmQhRIAzCuIgzCngAEFDPIAPAGIgPADgAEUDVgAmQhRIBnAAIg0CugAmQhRgAhthzgAhthzgAkChzIiuAAICfhgICkBgg");
	this.shape_4.setTransform(411.75,194.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(109));

	// hill
	this.instance_9 = new lib.CachedBmp_7();
	this.instance_9.setTransform(-123.15,232.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(109));

	// bghill
	this.instance_10 = new lib.CachedBmp_8();
	this.instance_10.setTransform(200.9,198.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(109));

	// sun
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.rf(["#F9DB84","rgba(255,255,255,0)"],[0.518,1],0,0,0,0,0,60.1).s().p("AmiGiQititABj1QgBj0CtiuQCuisD0gBQD1ABCtCsQCtCuAAD0QAAD1itCtQitCuj1AAQj0AAiuiug");
	this.shape_5.setTransform(99.7552,38.3427,0.4899,0.4899);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(109));

	// sky
	this.instance_11 = new lib.CachedBmp_9();
	this.instance_11.setTransform(-178.95,-23.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(109));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(46.1,140.7,574.8,227.5);
// library properties:
lib.properties = {
	id: 'ED520F228E70D443B1C17B2D8E768220',
	width: 450,
	height: 329,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/christian_atlas_1.png?1606674909882", id:"christian_atlas_1"},
		{src:"sounds/test.mp3?1606674909936", id:"test"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['ED520F228E70D443B1C17B2D8E768220'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;