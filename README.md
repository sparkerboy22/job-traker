1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
   getElementById()- Element by id
   getElementsByClassName() -Elements by class
   querySelector()-First matching CSS selector
   querySelectorAll-All matching CSS selector

   2. How do you create and insert a new element into the DOM?
      const p = document.createElement("p");
      p.innerText = "New paragraph";
      document.body.appendChild(p);
      
3. What is Event Bubbling? And how does it work?
Event Bubbling means event goes from child - parent - document.
4. What is Event Delegation in JavaScript? Why is it useful?
Event Delegation means adding event listener to parent instead of child.
Why useful:
Better performance
Less code
Works for dynamically added elements
5. What is the difference between preventDefault() and stopPropagation() methods?
preventDefault()-	Stops default browser behavior
stopPropagation()-	Stops event bubbling
