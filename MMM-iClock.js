var iClock;
Module.register("MMM-iClock",{
	defaults: {
		seconds: true,
		size: "350px",
		color: "#FFFFFF",
		digital: 2,				//	0 (no display), 1 (permanent display) or 2 (show for 5 seconds on every miniute)
		analogue: true,		//	false (no display), true (permanent display)
		glow: true,			//	false (no display), true (permanent display)

	},
	getStyles: function() {
		return ["MMM-iClock.css"];
	},
	days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	months: ["January", "February", "March", "April", "May", "June", "July",
														 "August", "September", "October", "November", "December"],
	start: function() {
		iClock = this;
		Log.info("Starting module: " + iClock.name);
		var style = document.querySelector('html');
		style.style.setProperty('--fore', iClock.config.color);
		style.style.setProperty('--size', iClock.config.size);
		if(!iClock.config.glow)
			style.style.setProperty('--glow', "none");
		setTimeout(iClock.updateClock, 1000)
	},
	getDom: function(){
		var wrapper = document.createElement("div");
		wrapper.className = "iClock";
		if(iClock.config.analogue === true){
			var x = document.createElement("div");
			x.className = "x";
			var y = document.createElement("div");
			y.className = "y";
			var z = document.createElement("div");
			z.className = "z";
			overlay = document.createElement("div");
			overlay.className = "overlay";
			var hour = document.createElement("div");
			hour.className = "hour";
			hour.id = "sHour";
			overlay.appendChild(hour);
			var minute = document.createElement("div");
			minute.className = "minute";
			minute.id = "sMinute";
			overlay.appendChild(minute);
			if(iClock.config.seconds === true){
				var second = document.createElement("div");
				second.className = "second";
				second.id = "sSecond";
				overlay.appendChild(second);
			}
			z.appendChild(overlay);
			y.appendChild(z);
			x.appendChild(y);
			wrapper.append(x);
		}
		if(iClock.config.digital !== 0){
			var time = document.createElement("div");
			time.className = "time";
			time.id = "sTime";
			if(iClock.config.digital === 2)
				time.style.opacity = 0;
			if(iClock.config.analogue === true)
				overlay.appendChild(time);
			else wrapper.appendChild(time);
		}
		return wrapper;
	},
	updateClock: function(){
		var wait = 60;
		now = new Date();
		wait -= now.getSeconds();
		var sec = now.getSeconds() + (60 * now.getMinutes()) + (60 * 60 * now.getHours());
		if(iClock.config.seconds === true){
			wait = 1;
			sec += 1
		}
		s = (360/60) * sec;
		m = s/60;
		h = m/12
		sHour = hour = now.getHours();
		sMinute = minute = now.getMinutes();
		if(sHour < 10) sHour = "0" + sHour;
		if(sMinute < 10) sMinute = "0" + sMinute;
		var sDate = document.createElement("div");
		sDate.className = "date";
		sDate.innerHTML = iClock.days[now.getDay()] + " " + now.getDate() + " " + iClock.months[now.getMonth()];
		document.getElementById('sTime').innerHTML = sHour + ":" + sMinute;
		document.getElementById('sTime').appendChild(sDate);
		if(iClock.config.digital == 2){
			if((iClock.config.seconds === true && (sec + 2) % 60 == 0) || iClock.config.seconds === false)
			document.getElementById('sTime').style.opacity = 1;
			setTimeout(function(){
				document.getElementById('sTime').style.opacity = 0;
			}, 5000);
		}
		if(iClock.config.analogue === true){
			if(iClock.config.seconds === true)
				document.getElementById('sSecond').style.transform = "translate(-50%, -50%) rotate(" +s+ "deg)";
			document.getElementById('sMinute').style.transform = "translate(-50%, -50%) rotate(" +m+ "deg)";
			document.getElementById('sHour').style.transform = "translate(-50%, -50%) rotate(" +h+ "deg)";
		}
		setTimeout(iClock.updateClock, wait * 1000);
	}
});
