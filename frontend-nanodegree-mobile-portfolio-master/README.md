## Website Performance Optimization portfolio project

### How to run

1. Launch the URL: http://annguyen1291.github.io/frontend-nanodegree-mobile-portfolio/ (a copy can also be found on this projects build directory)
2. Move the slider to change the pizza size (open web inspector console log to check the time it takes to redraw the page)
3. Scrolling the page - Console.log should show 60 frames under 1ms (which means each redraw is higher than 60 fps)

### Changes

####Part 1: Optimize PageSpeed Insights score for index.html

1. Minimized and inlined the whole style.css stylesheet.
2. Media query print.css
3. Make perfmatters.js async
5. Rezise and compress pizzeria.jpg 
6. Compressed profilepic.jpg

Scores 96 Mobile and 93 Desktop

####Part 2: Optimize Frames per Second in pizza.html

#####Computational Efficiency

Modify changePizzaSizes to be more efficient.
1. Moved the variable "dx" and "newWitdh" and placed it outside the loop.
2. Created a new variable "randomPizzas" and placed it outside the loop.
3. Change querySelectorAll into getElementsByClassName for better performance

Creates and appends all of the pizzas more efficiently.
1. Move definition of pizzasDiv out of for loop, makes one DOM call and use it in the loop.

#####Frame Rate

Modify updatePositions to be more efficient
1. Phases scrollTop out of the loop
2. Define 5 different phases before the loop then use them inside the loop depending on i value.

Promote mover class to a seperate layer
1. Enable here hardware accelerated CSS
2. Set backface-visibility to hidden for less power equipment.


