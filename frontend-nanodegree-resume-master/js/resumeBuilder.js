var bio = {
    "name": "Johannes Nguyen",
    "role": "Front-End Web Developer",
    "contacts": 
    	{
        	"mobile": "+84 904 542 457",
        	"email": "annguyen1291@gmail.com" ,
        	"github": "annguyen1291",
        	"location": "Saigon, Vietnam"
    	},
    "welcomeMessage": "I am nothing but nothing is perfect" ,
    "skills": ["HTML", "CSS", "JavaScript"],
    "biopic": "images/biopic.png"
};
bio.display = function () {
	$("#header").prepend(HTMLheaderRole.replace("%data%", bio.role));
	$("#header").prepend(HTMLheaderName.replace("%data%", bio.name));
	$("#topContacts, #footerContacts").append(HTMLmobile.replace("%data%", bio.contacts.mobile));
	$("#topContacts, #footerContacts").append(HTMLemail.replace("%data%", bio.contacts.email));
	$("#topContacts, #footerContacts").append(HTMLgithub.replace("%data%", bio.contacts.github));
	$("#topContacts, #footerContacts").append(HTMLlocation.replace("%data%", bio.contacts.location));
	$("#header").append(HTMLbioPic.replace("%data%", bio.biopic));
	$("#header").append(HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage));
	$("#header").append(HTMLskillsStart);
	bio.skills.forEach(function (skill) {
		$("#skills:last").append(HTMLskills.replace("%data%", skill));
	});
};
var education = {
    "schools": [
    	{
    		"name": "Foreign Trade University",
	        "location": "Hanoi, Vietnam",
	        "degree": "Bachelor",
	        "majors": ["International Business Economics"],
	        "dates": "2009 - 2014",
	        "url": "http://english.ftu.edu.vn/index.php/en/"
     	}
    ],         
    "onlineCourses": [
        {
        	"title": "Front-End Web Developer Nanodegree",
	        "school": "Udacity",
	        "date": "2016",
	        "url": "https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001"
        }
    ]     
};
education.display = function () {
	for (var school in education.schools) {
		$("#education").append(HTMLschoolStart);
		$(".education-entry:last").append(HTMLschoolName.replace("%data%", education.schools[school].name) + HTMLschoolDegree.replace("%data%", education.schools[school].degree));
		$(".education-entry:last").append(HTMLschoolDates.replace("%data%", education.schools[school].dates));
		$(".education-entry:last").append(HTMLschoolLocation.replace("%data%", education.schools[school].location));
		for (var major in education.schools[school].majors) {
			$(".education-entry:last").append(HTMLschoolMajor.replace("%data%", education.schools[school].majors[major]));
		}
	};
	for (var course in education.onlineCourses) {
		$("#education").append(HTMLonlineClasses);
		$("#education").append(HTMLschoolStart);
		$(".education-entry:last").append(HTMLonlineTitle.replace("%data%", education.onlineCourses[course].title) + HTMLonlineSchool.replace("%data%", education.onlineCourses[course].school));
		$(".education-entry:last").append(HTMLonlineDates.replace("%data%", education.onlineCourses[course].date));
		$(".education-entry:last").append(HTMLonlineURL.replace("%data%", education.onlineCourses[course].url));
	}
};
var work  = {
    "jobs": [
    	{
    		"employer": "Nguyen Tat Thanh University" ,
	        "title": "Front-End Web Developer" ,
	        "location": "Saigon, Vietnam",
	        "dates": "in progress",
	        "description": "Produce HTML, CSS and JavaScript for a website or web application so that a user can see and interact with them directly." 
    	}
    ]
};
work.display = function () {
	for (var job in work.jobs) {
		$("#workExperience").append(HTMLworkStart);
		$(".work-entry:last").append(HTMLworkEmployer.replace("%data%", work.jobs[job].employer + HTMLworkTitle.replace("%data%", work.jobs[job].title)));
		$(".work-entry:last").append(HTMLworkDates.replace("%data%", work.jobs[job].dates));
		$(".work-entry:last").append(HTMLworkLocation.replace("%data%", work.jobs[job].location));
		$(".work-entry:last").append(HTMLworkDescription.replace("%data%", work.jobs[job].description));
	}
};
var projects = {
    "projects": [
    	{
    		"title": "Build a Portfolio Site",
          	"dates": "2016",
          	"description": "Develop a responsive website that will display images, descriptions and links to each of the portfolio projects.",
          	"images": ["images/project-image.png"]
    	}
    ]
};
projects.display = function () {
	for (var project in projects.projects) {
		$("#projects").append(HTMLprojectStart);
		$(".project-entry:last").append(HTMLprojectTitle.replace("%data%", projects.projects[project].title));
		$(".project-entry:last").append(HTMLprojectDates.replace("%data%", projects.projects[project].dates));
		$(".project-entry:last").append(HTMLprojectDescription.replace("%data%", projects.projects[project].description));
		for (var image in projects.projects[project].images) {
			$(".project-entry:last").append(HTMLprojectImage.replace("%data%", projects.projects[project].images[image]));
		}
	}
};

bio.display();
work.display();
projects.display();
education.display();

$("#mapDiv").append(googleMap);

function locationizer(work_obj) {
	var locationArray = [];

	for (var job in work_obj.jobs) {
		var newLocation = work_obj.jobs[job].location;
		locationArray.push(newLocation);
	}
	return locationArray;
}

function inName(name) {
	name = name.trim().split(" ");
	name[name.length - 1] = name[name.length - 1].toUpperCase();
	name[0] = name[0].slice(0, 1).toUpperCase() + name[0].slice(1).toLocaleLowerCase();
	return name[0] + " " + name[name.length - 1];
}
