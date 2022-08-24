
// Dùng hàm setInterval để upload giờ và ngày
	setInterval(function () {
		var curDate = new Date();
		var curHour = curDate.getHours();
		var curMinute = curDate.getMinutes();
		var curSecond = curDate.getSeconds();
		var curDay = curDate.getDate();
		var curMonth = curDate.getMonth() + 1;
		var curYear = curDate.getFullYear();
		document.getElementById('current-time').innerHTML = "Today\'s Time is " + curHour + ":" + curMinute  + ":" + curSecond +" Date is " + curDay + "/" + curMonth + "/" + curYear;
	}, 1000);
// Lấy tọa độ vị trí
    var x = document.getElementById('current-position');
    navigator.geolocation.getCurrentPosition(showPosition);
    function showPosition(position){
      x.innerHTML = "Latitude: " + position.coords.latitude +
      " .Longitude: " + position.coords.longitude;
    }
// Dropdown-menu
    document.addEventListener("DOMContentLoaded", function(){
    	/////// Prevent closing from click inside dropdown
		document.querySelectorAll('.dropdown-menu').forEach(function(element){
			element.addEventListener('click', function (e) {
			  e.stopPropagation();
			});
		})
		// make it as accordion for smaller screens
		if (window.innerWidth < 992) {
			// close all inner dropdowns when parent is closed
			document.querySelectorAll('.navbar .dropdown').forEach(function(everydropdown){
				everydropdown.addEventListener('hidden.bs.dropdown', function () {
					// after dropdown is hidden, then find all submenus
					  this.querySelectorAll('.submenu').forEach(function(everysubmenu){
					  	// hide every submenu as well
					  	everysubmenu.style.display = 'none';
					  });
				})
			});
			
			document.querySelectorAll('.dropdown-menu a').forEach(function(element){
				element.addEventListener('click', function (e) {
				  	let nextEl = this.nextElementSibling;
				  	if(nextEl && nextEl.classList.contains('submenu')) {	
				  		// prevent opening link if link needs to open dropdown
				  		e.preventDefault();
				  		console.log(nextEl);
				  		if(nextEl.style.display == 'block'){
				  			nextEl.style.display = 'none';
				  		} else {
				  			nextEl.style.display = 'block';
				  		}
				  	}
				});
			})
		}
		// end if innerWidth
	});
	
	
	
	

