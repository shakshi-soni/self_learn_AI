import type { Course } from "@/types";

export const courses: Course[] = [
  {
    id: "python-basics",
    title: "Python Basics",
    description: "Learn programming fundamentals with Python, from variables to debugging.",
    lessons: [
      {
        id: "py-1",
        title: "Variables and Data Types",
        content: `A variable is a name that refers to a value so you can use that value later. For example, age = 20 stores an integer in the name age. The equals sign means assignment in Python: it associates the name on the left with the value on the right. Choose descriptive names such as monthly_total instead of short names such as x when the meaning matters.

Python commonly uses int for whole numbers, float for decimals, str for text, and bool for True or False. Python infers a value's type when you assign it, and type(age) lets you inspect it. Text must be inside quotes, while True and False are capitalized. A common beginner mistake is combining values of incompatible types, such as adding the number 5 directly to the string "5".

You can convert between compatible types with int("5"), float("2.5"), and str(5). Conversion can fail if the text is not a valid number, so check what input your program may receive. Try creating variables for a learner's name, lessons completed, and completion percentage, then print a sentence that uses all three.`,
      },
      {
        id: "py-2",
        title: "Conditionals (if/else)",
        content: `A conditional lets a program choose which instructions to run. Python uses if for the first condition, elif for additional conditions, and else for the fallback when none of the earlier conditions are true. For example, a score can be compared with a passing mark before the program displays a result.

Comparisons include == for equality, != for not equal, and <, <=, >, and >= for ordering. Use == to compare values; a single = assigns a value. Conditions can be combined with and, or, and not. Python checks indentation to determine which statements belong to each branch, so the statements inside a branch must be indented consistently.

Only the first matching branch runs. Put more specific conditions before broader ones so a general check does not hide a special case. Try writing a grading rule with separate results for scores below 50, from 50 to 79, and 80 or above. Test values at the boundary, such as 49, 50, 79, and 80.`,
      },
      {
        id: "py-3",
        title: "Loops",
        content: `A loop repeats a block of instructions. A for loop is useful when you want to visit each item in a collection or repeat a known number of times. For example, for name in names visits each name in a list. range(5) produces the numbers 0 through 4; the ending value is not included.

A while loop repeats as long as its condition remains true. It is useful when the number of repetitions depends on something that changes while the program runs. Make sure the loop body updates that condition, or the loop may never stop. For example, a counter can increase on every pass until it reaches a chosen limit.

break exits the nearest loop, while continue skips the rest of the current pass and moves to the next one. Use them only when they make the loop easier to understand. Try looping over a list of lesson titles and printing a numbered list. Then use a while loop to count down from five, changing the counter each time.`,
      },
      {
        id: "py-4",
        title: "Functions",
        content: `A function is a named, reusable block of code. Define one with def, followed by its name, parentheses, and a colon. Parameters are names for information the function receives. For example, def greet(name): describes a function that can use the name supplied when it is called. Arguments are the actual values passed into a function call.

return sends a result back to the code that called the function. print displays something to a person, but it does not return that value. If a function finishes without a return statement, Python returns None. Keep functions focused on one task, such as calculating a percentage or formatting a greeting, so each piece is easier to understand and test.

Variables created inside a function are usually local to that function. Pass required values as parameters instead of relying on unrelated global variables. Try writing a function that accepts completed and total lesson counts and returns the completion percentage. Test it with ordinary values and with zero total lessons so you can decide how that edge case should be handled.`,
      },
      {
        id: "py-5",
        title: "Lists and Dictionaries",
        content: `A list stores an ordered sequence of values. Create one with square brackets, such as scores = [80, 95, 72]. Positions are called indexes and start at zero, so scores[0] is the first value. len(scores) gives the number of items, and append adds a new item. Lists can contain repeated values and can be changed after they are created.

A dictionary stores values under keys. For example, learner = {"name": "Asha", "level": 1} lets you retrieve the name using learner["name"]. Keys should be unique and are commonly strings. Use get when a key may be missing, such as learner.get("email"), to avoid a KeyError. Dictionaries are useful when each value has a meaningful label.

Choose a list when order or repeated items matter; choose a dictionary when you need to look up information by a key. You can loop through a list directly, or use items() to loop through a dictionary's key-value pairs. Try representing a course as a dictionary with a title and a list of lesson names.`,
      },
      {
        id: "py-6",
        title: "Strings and User Input",
        content: `A string is text surrounded by matching single or double quotes. Strings can be joined with +, but f-strings are usually clearer when inserting values: f"Hello, {name}" places name inside the text. Common string methods include lower(), upper(), strip(), and replace(). Methods such as lower() return a new string; they do not change the original string in place.

The input() function displays a prompt and returns what the user typed as a string. Even if someone types 42, input() returns "42". Convert it with int() or float() before doing arithmetic, and handle invalid text so the program can show a helpful message instead of crashing.

String indexes begin at zero, and slicing can select a portion, such as name[0:3]. Be careful with empty strings or indexes outside the valid range. Try asking for a learner's name and number of completed lessons, then display a friendly summary using an f-string.`,
      },
      {
        id: "py-7",
        title: "Errors and Debugging",
        content: `An error is information about something the program could not do. A SyntaxError means Python could not understand the code, often because of a missing colon or quote. A NameError usually means a name was misspelled or used before it was defined. A TypeError often means an operation received a value of an unexpected type.

When a program crashes, read the traceback from the bottom upward. The last line names the error; the lines above it show the path through your code and point to the location where the problem surfaced. That location may be where the issue became visible rather than where it first began. Reproduce the problem with a small input, inspect relevant values, and change one thing at a time.

Use try and except when you can reasonably recover from an expected failure, such as invalid numeric input. Catch a specific exception like ValueError rather than hiding every possible problem with a bare except. Try giving int() the text "hello", read the error, and then handle that input with a clear retry message.`,
      },
      {
        id: "py-8",
        title: "Modules and Imports",
        content: `A module is a Python file that groups reusable code. Python's standard library includes modules for common tasks, such as math for mathematical operations and random for random values. Import a module with import math, then use a function through its module name, for example math.sqrt(25). This makes it clear where the function comes from.

You can import one named item with from math import sqrt, but avoid importing everything with a wildcard because it can make names unclear. Your own project can also be organized into modules; keep related functions together and give files names that do not conflict with standard-library modules.

Third-party packages are installed separately, often into a virtual environment for the project. A virtual environment keeps one project's dependencies separate from another's. Try importing math, calculating a square root, and moving a helper function into a second file that you import from the first.`,
      },
    ],
  },
  {
    id: "ml-intro",
    title: "Machine Learning Intro",
    description: "Understand how models learn patterns, make predictions, and get evaluated.",
    lessons: [
      {
        id: "ml-1",
        title: "What is Machine Learning?",
        content: `Machine learning is a way to build programs that learn patterns from examples rather than relying only on rules written by a programmer. A model is the learned representation of those patterns. During training, an algorithm adjusts the model using data; after training, the model can make predictions about examples it has not seen before.

For example, a spam filter can learn from messages labeled spam or not spam. It may notice patterns in words, senders, and links, then estimate whether a new message is spam. The prediction is not guaranteed to be correct, so systems often use a score or confidence and may ask a person to review uncertain cases.

Machine learning is useful when patterns are difficult to express as fixed rules, but it still needs a clearly defined task and suitable data. It does not automatically understand the world. Think of one task where examples could teach a computer a useful pattern, and decide what information would be needed to make a prediction.`,
      },
      {
        id: "ml-2",
        title: "Supervised vs Unsupervised Learning",
        content: `In supervised learning, each training example includes an input and a known target, often called a label. A classification model predicts a category, such as whether an email is spam. A regression model predicts a numeric value, such as an estimated delivery time. The labels let us compare a prediction with the expected answer during training.

In unsupervised learning, examples do not come with target labels. The algorithm looks for structure, such as groups of similar customers or unusual patterns in measurements. Clustering is one common unsupervised technique. The groups it finds are not automatically meaningful; a person needs to examine them and decide whether they help answer a real question.

The method depends on the task and the available data. Predicting a house price from past sales is supervised because past prices provide labels. Grouping houses by size and location without a target price is unsupervised. Try describing one problem of each kind and identify what would count as a useful result.`,
      },
      {
        id: "ml-3",
        title: "Training and Testing Data",
        content: `A dataset is commonly divided into training, validation, and test portions. The model learns its parameters from the training data. Validation data helps compare model choices or tune settings during development. The test data is held back until the end to estimate how well the final choice may work on new examples.

If you repeatedly tune a model by checking the test set, you gradually adapt your choices to that set. It stops being a fair final check. The same issue can occur if duplicate or near-duplicate examples end up in both training and test groups. Splits should reflect how the model will be used in practice.

For time-based predictions, use earlier data for training and later data for testing rather than randomly mixing future and past events. For small datasets, cross-validation can make use of multiple train-and-validation splits. Try explaining why testing a model on the same examples used to train it can make its performance look better than it really is.`,
      },
      {
        id: "ml-4",
        title: "Overfitting and Underfitting",
        content: `A model underfits when it is too limited to capture important patterns in the data. It will usually perform poorly on both training examples and new examples. A model overfits when it learns details or noise specific to its training examples. It may score very well on training data but perform poorly on data it has not seen.

Compare performance on training and validation data to diagnose the problem. A large gap between the two can indicate overfitting. Possible responses include collecting more representative data, reducing model complexity, or using regularization, which discourages overly complicated solutions. If both scores are poor, a more suitable model or better input features may be needed.

There is no single setting that fixes every case. The goal is to learn patterns that generalize, not to memorize examples. Imagine a student who memorizes one practice test but cannot solve new questions: that is an analogy for overfitting. Consider what different practice questions might reveal about the student's actual understanding.`,
      },
      {
        id: "ml-5",
        title: "Gradient Descent",
        content: `Many machine-learning models learn by minimizing a loss function, a number that measures how wrong their predictions are on training examples. Gradient descent repeatedly adjusts model parameters in a direction that should reduce this loss. The gradient describes how the loss changes as each parameter changes.

The learning rate controls the size of each adjustment. If it is too large, updates can jump over a good solution or make the loss unstable. If it is too small, training may take a long time. Training often uses batches of examples to estimate the gradient without processing the entire dataset for every update.

The loss usually decreases over many updates, but a lower training loss does not guarantee better performance on unseen data. Monitor validation performance as well. A simple analogy is walking downhill in fog: small steps are controlled but slow, while huge steps may pass the valley. Think about how you would notice if your steps were too large.`,
      },
      {
        id: "ml-6",
        title: "Features and Data Preparation",
        content: `A feature is an input value the model can use to make a prediction. For a house-price example, features might include floor area, age, and location. The target is the value the model is trying to predict. Useful features describe relevant information that would actually be available when the model is used.

Data preparation can include fixing inconsistent units, handling missing values, encoding categories, and scaling numeric values. These steps should be learned from the training data only, then applied in the same way to validation and test data. If information from the test set influences preparation, the evaluation can become overly optimistic; this is a form of data leakage.

More features do not always make a model better. Irrelevant or sensitive features can add noise or create unfair outcomes. Document where each feature came from and check whether it would be appropriate to use. Try listing features for a model that predicts whether a learner might need help, and identify which ones could be sensitive or misleading.`,
      },
      {
        id: "ml-7",
        title: "Evaluating Classification Models",
        content: `Accuracy is the share of predictions that are correct, but it can hide important failures. If only one in a hundred transactions is fraudulent, a model that always predicts "not fraud" is 99% accurate while finding no fraud at all. Metrics should reflect the cost of different mistakes and the balance of classes.

Precision asks: of the examples the model flagged as positive, how many really were positive? Recall asks: of all the real positive examples, how many did the model find? A high-recall medical screening tool may catch more cases but also create more false alarms. A confusion matrix counts true positives, false positives, true negatives, and false negatives.

Choose evaluation data that represents the people and situations where the model will be used. Review results for important subgroups, not only the overall average. A metric is evidence for a decision, not a guarantee of fairness or safety. Decide which mistake is more costly in a made-up screening task, then explain which metric deserves more attention.`,
      },
    ],
  },
  {
    id: "mathematics",
    title: "Mathematics",
    description: "Build the number, algebra, and probability foundations used in computing.",
    lessons: [
      {
        id: "math-1",
        title: "Fractions and Percentages",
        content: `A fraction represents part of a whole. In 3/4, the numerator 3 counts the parts being considered and the denominator 4 tells how many equal parts make the whole. To convert a fraction to a decimal, divide the numerator by the denominator: 3 divided by 4 equals 0.75. Multiply a decimal by 100 to write it as a percentage, so 0.75 is 75%.

To find a percentage of a quantity, convert the percent to a decimal and multiply. For example, 20% of 50 is 0.20 times 50, which equals 10. To calculate what percent one amount is of another, divide the part by the whole and multiply by 100. Always check which value is the whole, since reversing the division changes the result.

Percentages are useful for completion rates, discounts, and comparing changes. A change from 20 to 30 is an increase of 10, or 50% of the original 20. Try calculating what percentage of 12 lessons is 3 lessons, then explain how you chose the whole.`,
      },
      {
        id: "math-2",
        title: "Basic Algebra",
        content: `Algebra uses symbols such as x to represent numbers we do not yet know. An equation says that two expressions have the same value. To keep it true while solving, perform the same operation on both sides. For 2x + 3 = 11, subtract 3 from each side to get 2x = 8, then divide both sides by 2 to get x = 4.

The goal is to isolate the unknown while preserving equality. Addition and subtraction undo each other; multiplication and division undo each other. Follow the order of operations carefully, and remember that a negative sign applies to its term. After solving, substitute your answer into the original equation to check both sides.

Equations help represent practical relationships, such as a fixed fee plus a cost per item. If a service costs 5 units plus 2 units for each item, its total for n items is 5 + 2n. Try solving 5 + 2n = 17 and verify the value of n in the original expression.`,
      },
      {
        id: "math-3",
        title: "Probability Basics",
        content: `Probability measures how likely an event is. A probability of 0 means impossible, while 1 means certain. For equally likely outcomes, divide the number of favorable outcomes by the total number of possible outcomes. On a fair six-sided die, there is one way to roll a 4 out of six outcomes, so the probability is 1/6.

The complement of an event is the event not happening. If the probability of rain is 0.3, the probability of no rain is 1 - 0.3 = 0.7, assuming those are the only two possibilities. For mutually exclusive outcomes, probabilities can be added to find the chance of either outcome. Independence is a separate idea: one event does not change the probability of the other.

Real events are not always equally likely, and a probability estimate depends on assumptions and data. A small sample can produce surprising results by chance. Try finding the probability of drawing a red card from a standard deck, and state the assumptions you are using about the deck.`,
      },
      {
        id: "math-4",
        title: "Mean, Median and Mode",
        content: `The mean is the sum of all values divided by the number of values. For 2, 3, 3, and 8, the sum is 16 and the mean is 4. The median is the middle value after sorting. With an even number of values, average the two middle values; here the median is (3 + 3) / 2 = 3. The mode is the value that appears most often, which is also 3.

Each measure describes a different aspect of a dataset. The mean uses every value but can be pulled strongly by an extreme value. The median is more resistant to extremes, making it useful for skewed data such as income. A dataset can have more than one mode or no repeated mode at all.

When reporting a summary, choose a measure that fits the question and inspect the distribution too. If one very expensive house is added to a list of ordinary house prices, the mean rises more than the median. Try calculating both before and after adding an extreme value to see the difference.`,
      },
      {
        id: "math-5",
        title: "Slope and Derivatives",
        content: `The slope of a straight line measures how much y changes when x changes. Between two points, calculate change in y divided by change in x: (y2 - y1) / (x2 - x1). If a line rises 6 units while moving 3 units to the right, its slope is 2. A negative slope means y decreases as x increases; a zero slope is horizontal.

A derivative extends the idea of slope to a curve. It describes the curve's instantaneous rate of change at a particular point. For a changing quantity, the derivative can explain how quickly it is increasing or decreasing at that moment. In machine learning, gradients collect derivatives that indicate how model parameters affect a loss value.

Derivatives are one tool for optimization, not a guarantee that every problem has a simple solution. The idea of a local slope is often enough to understand why gradient-based methods adjust parameters in a chosen direction. Sketch a curve and mark where its slope is positive, negative, or approximately zero.`,
      },
      {
        id: "math-6",
        title: "Ratios and Proportions",
        content: `A ratio compares quantities by division. A ratio of 2 to 3 can be written 2:3 or 2/3 and means that for every 2 units of one quantity there are 3 of another. Ratios can be scaled without changing the relationship: 2:3 is equivalent to 4:6 because both parts were multiplied by 2.

A proportion states that two ratios are equal. For example, if 2 notebooks cost 6 units, then at the same price 5 notebooks cost 15 units. You can solve proportions by multiplying across, but first make sure the quantities are in the same order and units. Mixing minutes with hours or centimeters with meters can produce a numerically neat but meaningless answer.

Proportions appear in maps, recipes, and converting rates. If a recipe for 4 people needs 300 grams of rice, scale both quantities by the same factor to cook for 6 people. Try finding that factor and the new amount, then check whether the result is larger than the original as expected.`,
      },
      {
        id: "math-7",
        title: "Linear Functions and Graphs",
        content: `A linear function has the form y = mx + b. The value m is the slope, which describes the change in y for each one-unit increase in x. The value b is the y-intercept, where the line crosses the vertical axis when x is zero. For y = 2x + 1, every increase of 1 in x raises y by 2, and the line begins at y = 1.

To graph a line, plot the y-intercept first, then use the slope as a rise-over-run instruction to find another point. A table of x and y values can also provide points to plot. Two distinct points determine a straight line. Units matter: if x is hours and y is distance, the slope describes distance per hour.

Linear models are useful when a quantity changes at a steady rate, such as a fixed fee plus a cost per month. Real data may not follow a perfect line, so a line is an approximation. Try identifying the slope and intercept in a cost equation and explain what each means in context.`,
      },
    ],
  },
  {
    id: "javascript",
    title: "JavaScript Fundamentals",
    description: "Learn the language of the web, from values and functions to browser events.",
    lessons: [
      {
        id: "js-1",
        title: "Values, Variables and Types",
        content: `JavaScript programs work with values such as numbers, strings, booleans, arrays, objects, null, and undefined. Use const for a binding you will not reassign and let when you need to assign a different value later. const does not make an object deeply immutable; it prevents replacing the binding, while the object's properties may still be changed.

JavaScript is dynamically typed, so a variable can hold different kinds of values at different times. This flexibility makes it important to understand conversions. The strict equality operator === compares without the automatic type conversion used by ==, so === is usually the clearer choice. A string "5" and number 5 are different values.

Names should describe their purpose, such as lessonCount or isComplete. Use console.log to inspect values while learning, and check the browser console for errors. Try creating a course title, lesson count, and completion flag, then print a sentence describing the course.`,
      },
      {
        id: "js-2",
        title: "Functions and Scope",
        content: `A function groups instructions so they can be called when needed. A function declaration such as function add(a, b) { return a + b; } accepts parameters and returns a result. An arrow function can express the same idea as const add = (a, b) => a + b. Choose a style that is clear and consistent with the project.

Parameters are local names for input values. return sends a value back to the caller and ends that function call; console.log only writes a value to the developer console. A function without a return statement returns undefined. Small functions with clear inputs and outputs are easier to test and reuse.

Scope determines where a variable name can be used. Variables declared inside a function are local to it, while module-level values may be shared within that module. Avoid relying on hidden global state. Try writing a function that accepts completed and total lessons and returns a percentage, then check its behavior when total is zero.`,
      },
      {
        id: "js-3",
        title: "Conditionals and Loops",
        content: `Use if, else if, and else to choose which code runs. A condition is converted to true or false, and values such as 0, an empty string, null, undefined, and NaN are falsy. Truthiness can be convenient, but compare values explicitly when zero or an empty string is valid data.

for loops are useful when you know how many repetitions you need, and for...of loops are a readable way to visit values in an array. A while loop continues while its condition is true, so update the condition inside the loop to avoid an accidental infinite loop. break exits a loop; continue skips to its next iteration.

When conditions grow complicated, give them meaningful names or split them into helper functions rather than building one long expression. Try checking whether each score in an array passes a threshold, and count how many passed. Test an empty array and values exactly at the threshold.`,
      },
      {
        id: "js-4",
        title: "Arrays and Objects",
        content: `An array is an ordered collection. Access an item by its zero-based index, use length to find the number of items, and use methods such as map to transform values and filter to keep values that match a condition. map and filter return new arrays, which can make data transformations easier to follow.

An object groups related properties under names. A lesson could be represented as { title: "Loops", completed: false }. Read a property with lesson.title or lesson["title"]. Use arrays of objects for collections such as a course's lessons. Keep the data shape consistent so the code that displays it can rely on predictable property names.

Some array methods mutate the original array and some return a new one; know which behavior a method has before using it. Try making an array of lesson objects, using filter to select incomplete lessons, and map to produce just their titles.`,
      },
      {
        id: "js-5",
        title: "The DOM and Browser Events",
        content: `The Document Object Model, or DOM, is the browser's object representation of a web page. JavaScript can find elements, read their content, and respond to user actions. For example, querySelector can find an element by a CSS selector. Check that the element exists before using it, especially when scripts may run on pages with different markup.

An event listener runs a function when something happens, such as a button click or a form submission. Use addEventListener rather than embedding JavaScript directly into HTML. For forms, prevent the default navigation only when your script is handling the submission, and provide visible feedback so users know what happened.

Changing text with textContent is safer for plain text than inserting untrusted strings as HTML. Browser frameworks often manage DOM updates for you, but the event and element concepts still apply. Try selecting a button and attaching a click handler that updates a status message on the page.`,
      },
      {
        id: "js-6",
        title: "Asynchronous JavaScript",
        content: `Some tasks take time, such as requesting data from a server. JavaScript uses promises to represent results that may become available later. async functions always return a promise, and await pauses that function until a promise settles without blocking the browser's main thread.

Use try and catch around awaited operations that may fail. With fetch, also check response.ok: an HTTP 404 or 500 is still a completed network request, so fetch does not reject the promise just because the server returned an error status. Parse JSON only when the response body contains valid JSON, and show a useful error state when a request fails.

An interface should indicate when it is loading, disable duplicate submissions when appropriate, and let the learner retry after a recoverable failure. Try making a small request to a known API in a practice project, then handle loading, success, and error states separately.`,
      },
      {
        id: "js-7",
        title: "Modules and Browser Storage",
        content: `JavaScript modules split a program into files with explicit imports and exports. Export a function or value from one file, then import it where it is needed. Modules make dependencies visible and help organize code by responsibility. Keep browser-specific code out of modules that also need to run on a server unless you guard access to browser APIs.

The browser's localStorage can keep small string values between visits on the same browser and device. It is not a secure place for secrets, is not synchronized to other devices, and may be unavailable in some privacy settings. Convert structured data to JSON before storing it and parse it carefully when reading, because saved data can be missing or malformed.

Store only what the app needs and provide a way to clear it. Try saving a simple preference such as a display name, loading it when the page starts, and handling the case where no value has been saved yet.`,
      },
    ],
  },
  {
    id: "web-development",
    title: "Web Development Basics",
    description: "Build accessible, responsive pages with HTML, CSS, and browser fundamentals.",
    lessons: [
      {
        id: "web-1",
        title: "HTML Structure and Semantics",
        content: `HTML describes the structure and meaning of page content. Elements are written with tags and may contain text or other elements. A page normally has a document type, an html root, a head for metadata, and a body for content. Headings should express the outline of the page, not just provide a particular visual size.

Semantic elements such as header, nav, main, article, section, and footer communicate the purpose of different areas. A button is for an action; an anchor is for navigation. Choosing the right element provides expected keyboard behavior and helps assistive technologies understand the page.

Keep heading levels in a logical order, give images meaningful alternative text when they convey information, and use empty alternative text for purely decorative images. Try outlining a course page with a navigation area, main lesson, list of sections, and footer before adding visual styles.`,
      },
      {
        id: "web-2",
        title: "CSS Selectors and the Box Model",
        content: `CSS controls how HTML elements look and are positioned. A rule contains a selector and declarations. Selectors can target an element, a class, or a more specific relationship. Prefer reusable classes for design patterns rather than styling every element through long, fragile selector chains.

Each element is laid out as a box with content, padding, border, and margin. Padding adds room inside the border; margin adds space outside it. The default content-box sizing adds padding and border outside the declared width. Setting box-sizing: border-box makes the declared width include them, which is why many projects apply it globally.

CSS properties can inherit, and later or more-specific rules may override earlier ones. When a style does not appear, inspect the element's computed styles in browser developer tools. Try drawing the box-model layers for a card and adjust padding, border, and margin independently to see what each changes.`,
      },
      {
        id: "web-3",
        title: "Flexbox and Grid Layout",
        content: `Flexbox arranges items along one main axis, either as a row or a column. It is useful for navigation bars, button groups, and aligning content within a card. Properties such as justify-content distribute items along the main axis, while align-items controls alignment across the other axis.

CSS Grid describes rows and columns together. It is well suited to dashboards, galleries, and layouts where items should line up in two dimensions. A grid can use flexible fractions so columns share available space, and gap adds consistent spacing between tracks.

Choose layout based on the relationship between the items, not just habit. A row of items that wraps can use flexbox; a group of cards aligned in rows and columns often benefits from grid. Try building the same three-card layout with each approach and resize the browser to compare how naturally it adapts.`,
      },
      {
        id: "web-4",
        title: "Responsive Design",
        content: `Responsive design helps a page work across narrow and wide viewports. Start with content that fits a small screen, then add layout changes at breakpoints where the content needs more room. Media queries can change the number of columns, spacing, or navigation behavior without maintaining separate desktop and mobile pages.

Prefer flexible widths, wrapping layouts, and images that scale within their containers. Fixed widths that look fine on a laptop can create horizontal scrolling on a phone. Text size and touch targets should remain comfortable at every size, and important actions should not be hidden only on small screens.

Test real viewport sizes and zoom, not just one screenshot. Browser developer tools can emulate devices and show overflow. Try checking a page at a narrow phone width, a tablet width, and a desktop width. Look for clipped text, tiny controls, and elements that overlap when a title is long.`,
      },
      {
        id: "web-5",
        title: "Accessible Forms and Controls",
        content: `Accessible interfaces can be used by people with different abilities and input methods. Use native buttons for actions and anchors for navigation so keyboard behavior is built in. Every form control should have a visible label or an accessible name, and errors should explain both what went wrong and how to fix it.

Keyboard users need a visible focus indicator and a logical tab order. Do not remove outlines unless you replace them with an equally visible style. Color should not be the only way to communicate status; add text or an icon with an accessible label. Provide enough contrast between text and its background.

Use headings and landmarks to help people navigate by structure, and test the page using only a keyboard. Try tabbing through a sign-in or search form, submitting it with Enter, and checking whether focus remains clear after an error message appears.`,
      },
      {
        id: "web-6",
        title: "How the Browser and Server Work",
        content: `A browser requests a URL from a server using HTTP. The server responds with a status code, headers, and possibly a page or data. A 2xx status usually indicates success, a 4xx status points to a request or permission problem, and a 5xx status indicates that the server failed while handling a request.

HTML provides structure, CSS provides presentation, and JavaScript can add interaction. Modern frameworks may render HTML on the server and then attach client-side behavior in the browser. Data APIs often send JSON rather than a full page. The browser's network panel shows requests, responses, timing, and status codes, which helps locate failures.

Keep server-only credentials on the server; do not place secrets in client-side JavaScript or public page source. Try loading a page and inspecting its network requests, then find the request that supplies its data and identify its response status and content type.`,
      },
      {
        id: "web-7",
        title: "HTTP APIs and JSON",
        content: `An API lets one program request data or actions from another. An HTTP request includes a method, a URL, and sometimes headers and a body. GET commonly reads data; POST commonly submits data to create or process something. The server's response includes a status and may contain JSON.

JSON represents objects, arrays, strings, numbers, booleans, and null. Its syntax is strict: property names and strings use double quotes, and it does not allow comments or trailing commas. When a client sends JSON, set the Content-Type header to application/json and validate data on the server instead of trusting the browser.

Treat network requests as fallible. Show loading while waiting, provide a useful message when a response is not successful, and avoid displaying raw server internals to users. Try describing the request and response for a form that asks a server to create a new course.`,
      },
    ],
  },
  {
    id: "git-github",
    title: "Git and GitHub",
    description: "Track code changes, work with branches, and collaborate through GitHub.",
    lessons: [
      {
        id: "git-1",
        title: "Repositories and Working Trees",
        content: `Git is a version-control system that records snapshots of a project's files. A repository contains the history and metadata Git needs. The working tree is the set of files currently checked out for you to edit. git status summarizes which files are unchanged, modified, staged, or untracked.

Initialize a repository with git init or copy an existing one with git clone. A .gitignore file lists generated files or local configuration that Git should not track. Never commit passwords, API keys, or private credentials; if a secret is committed, deleting it in a later commit does not erase it from history.

A repository is local until you connect it to a remote service such as GitHub. Start by inspecting git status before and after a small edit so you can see how Git notices changes. Try adding a .gitignore rule for a generated build folder and confirm that Git no longer lists it as a new file.`,
      },
      {
        id: "git-2",
        title: "Staging and Commits",
        content: `Git separates changed files into a working tree and a staging area. Use git add to stage the changes you want in the next snapshot. Review staged changes with git diff --staged before committing; this helps prevent unrelated or accidental edits from being included.

A commit records the staged snapshot with a message describing why the change was made. A useful commit is focused and understandable on its own. If a file contains both relevant and unrelated edits, stage only the intended parts rather than committing everything blindly.

Commits form a history that you can inspect or compare later. They are not the same as pushing: a commit is local until you send it to a remote repository. Try changing one line, inspect git diff, stage it, inspect the staged diff, and create a commit with a short message that explains the change.`,
      },
      {
        id: "git-3",
        title: "Branches and Switching Work",
        content: `A branch is a movable name for a line of commits. Branches let you work on a feature or fix without changing the main line of work. Create a branch with git switch -c feature-name, then make commits on that branch. The branch points to the newest commit you created there.

Switching branches changes the files in your working tree to match the selected branch. Git may prevent switching if uncommitted changes would be overwritten. Commit your work or safely set it aside before switching. Small, clearly named branches make reviews and collaboration easier.

When a feature is ready, merge it into the target branch or open a pull request so someone can review it first. Try creating a branch, making a small change, and switching back to the main branch to observe how the file contents follow the branch.`,
      },
      {
        id: "git-4",
        title: "Merging and Conflicts",
        content: `A merge combines the history of one branch into another. Git can merge automatically when changes do not conflict. A conflict occurs when Git cannot determine how to combine competing edits, often because two branches changed overlapping lines.

Conflict markers in a file show the competing versions. Read both sides, decide what the final code should contain, remove the markers, and run tests before staging the resolved file. Do not choose a side without understanding the change, since a quick resolution can silently discard someone else's work.

After resolving conflicts, stage the files and complete the merge commit if Git requests one. If the result is unclear, stop and ask for review rather than guessing. You can practice safely in a temporary repository by changing the same line on two branches and merging them.`,
      },
      {
        id: "git-5",
        title: "Remotes, Push and Pull",
        content: `A remote is a named location for another copy of a repository, commonly hosted on GitHub. git remote -v lists configured remotes. git fetch downloads new remote history without changing your current branch; git pull fetches and then integrates changes into the current branch.

git push sends local commits to a remote branch. A push can be rejected if the remote has commits your local branch does not contain. Fetch and review the remote changes, then integrate them before trying again. Avoid force-pushing shared branches because it can replace history other people rely on.

Remote operations require network access and appropriate repository permissions. Check the branch and remote before pushing, especially when working with multiple repositories. Try cloning a practice repository, fetching updates, and pushing a branch that you own.`,
      },
      {
        id: "git-6",
        title: "Pull Requests and Code Review",
        content: `A pull request proposes merging changes from one branch into another. It gives collaborators a place to inspect the diff, discuss design choices, run automated checks, and request changes before integration. A good description explains the goal, the important implementation decisions, and how the change was tested.

Review the diff rather than only reading the summary. Look for correctness, edge cases, unintended changes, and tests that demonstrate the behavior. Comments should explain the concern and, when possible, suggest a concrete improvement. A review is about improving the code, not judging the person who wrote it.

Address feedback with focused commits and keep the request updated with new test results. Try reviewing a small practice change and write one comment that explains a real risk and how you would verify its fix.`,
      },
    ],
  },
  {
    id: "sql-databases",
    title: "SQL and Databases",
    description: "Store, retrieve, and relate data using relational databases and SQL.",
    lessons: [
      {
        id: "sql-1",
        title: "Tables, Rows and Keys",
        content: `A relational database organizes information into tables. A table has columns that describe fields and rows that represent individual records. Each column has a data type, such as text, integer, or date. Choosing a suitable type helps the database validate values and store them consistently.

A primary key uniquely identifies each row. A foreign key stores a reference to a row in another table, expressing a relationship and helping preserve consistency. For example, a lessons table can include a course_id that points to the course containing each lesson.

Good table design avoids repeating the same fact in many places. If a course title is copied into every lesson row, changing the title requires updating many records. Try designing course and lesson tables with primary keys and a foreign-key relationship, then identify which table should own each piece of information.`,
      },
      {
        id: "sql-2",
        title: "Selecting and Filtering Data",
        content: `SELECT retrieves columns from a table. For example, SELECT title FROM courses asks for course titles. FROM names the table to read. WHERE filters which rows are returned, such as WHERE active = true. ORDER BY sorts the results, and LIMIT can restrict how many rows are returned.

Use explicit column names instead of SELECT * in code that depends on a particular result shape. It makes the query easier to understand and avoids retrieving data the caller does not need. Text values are written in quotes, while numbers are not. Conditions can combine comparisons with AND and OR; use parentheses when the intended grouping is not obvious.

SQL operators such as LIKE can search text patterns, and NULL represents a missing or unknown value. Check NULL with IS NULL, not = NULL. Try querying lesson titles for one course, sorting them, and limiting the output to the first three results.`,
      },
      {
        id: "sql-3",
        title: "Aggregates and Grouping",
        content: `Aggregate functions summarize multiple rows. COUNT counts rows or non-null values, SUM adds numeric values, AVG calculates an average, and MIN and MAX find extremes. An aggregate can summarize a whole result set or be applied to groups of rows.

GROUP BY creates groups based on one or more columns. For example, lessons can be grouped by course_id before counting how many belong to each course. HAVING filters the groups after aggregation, while WHERE filters individual rows before the groups are formed. Confusing WHERE and HAVING can produce a different result.

Think about what one output row represents before writing the query. If the result should contain one row per course, group by the course identifier. Try counting completed lessons per course, then explain why the completion filter belongs in WHERE and a minimum-count condition belongs in HAVING.`,
      },
      {
        id: "sql-4",
        title: "Joining Related Tables",
        content: `A join combines rows from related tables. An INNER JOIN returns rows that match on both sides. A LEFT JOIN keeps every row from the left table and includes matching values from the right; when there is no match, right-side columns are NULL. Joins commonly connect a foreign key to another table's primary key.

Always write the join condition clearly. If a table has multiple possible relationships, joining on the wrong columns can multiply rows or associate unrelated records. If both tables contain a column with the same name, qualify it with the table name or alias, such as courses.title.

Before adding more joins, check whether the current result has the expected number of rows. A one-to-many relationship can create several output rows for one parent record. Try joining courses to lessons and identify why one course may appear once for every lesson it contains.`,
      },
      {
        id: "sql-5",
        title: "Constraints and Data Integrity",
        content: `Constraints are rules the database enforces on stored data. NOT NULL requires a value, UNIQUE prevents duplicates, CHECK validates a condition, and a primary key uniquely identifies a row. A foreign key ensures that a reference points to an existing related row, depending on the database's configured rules.

Constraints protect data even when it is written by different parts of an application. They complement application validation rather than replace it: the interface should still explain invalid input to the user, while the database remains the final guard against inconsistent records.

Choose constraints based on real requirements. An email address may need to be unique for an account, while a lesson description may be allowed to be empty. Try listing the rules for a course table and decide which should be enforced by NOT NULL, UNIQUE, or a foreign key.`,
      },
      {
        id: "sql-6",
        title: "Creating and Updating Records",
        content: `INSERT adds rows, UPDATE changes matching rows, and DELETE removes matching rows. An UPDATE or DELETE without the intended WHERE condition can affect every row, so inspect the condition and, in important cases, preview the target rows with a SELECT first.

Applications should pass user-supplied values as parameters through the database library rather than joining them into SQL text. Parameterized queries keep values separate from the query structure and help prevent SQL injection. Validate inputs for product rules as well, such as required fields and allowed ranges.

A transaction groups changes so they can succeed or fail together. If a multi-step operation fails partway through, a transaction can roll it back instead of leaving partially updated data. Try planning a safe update for one lesson by ID and explain how you would confirm exactly one row changed.`,
      },
      {
        id: "sql-7",
        title: "Indexes and Query Performance",
        content: `An index is an additional data structure that helps a database find rows without scanning every row in a table. Indexes can speed up filters, joins, and sorting on frequently used columns. They take storage and need updating when data changes, so adding an index to every column is not automatically beneficial.

Start with a query that is measurably slow and inspect its execution plan using the database's tools. The plan can show whether the database scans a full table, uses an index, or performs an expensive join. The right index depends on the query pattern, data distribution, and database engine.

Measure before and after a change with representative data. A query that is fast on ten rows may behave differently on a million. Try identifying which columns a course progress query filters or joins on, and discuss which index might help and what write cost it adds.`,
      },
    ],
  },
  {
    id: "data-structures",
    title: "Data Structures and Algorithms",
    description: "Learn common ways to organize data and reason about algorithm efficiency.",
    lessons: [
      {
        id: "algo-1",
        title: "Algorithms and Big O",
        content: `An algorithm is a finite sequence of steps for solving a problem. To compare algorithms, we often ask how the amount of work grows as the input gets larger. Big O notation describes an upper-bound growth pattern while ignoring constant factors and smaller terms.

An algorithm that checks every item in a list has linear time, written O(n). Comparing every pair can take quadratic time, O(n squared). Repeatedly halving a sorted search range takes logarithmic time, O(log n). These descriptions help reason about scale, but actual runtime also depends on implementation, hardware, and input shape.

Space complexity describes how extra memory grows. A faster approach may need more memory, so trade-offs matter. Try counting how many times a loop runs as the input size doubles, then predict whether its work grows linearly or quadratically.`,
      },
      {
        id: "algo-2",
        title: "Arrays and Strings",
        content: `An array stores an ordered sequence of values, making it efficient to access an item when its index is known. Most languages use zero-based indexing, so the first element is at index 0. Inserting or removing an item near the beginning may require shifting later elements, which can take time proportional to the array length.

A string is a sequence of characters or text units, though some languages represent Unicode characters in more complex ways than one byte per character. Common tasks include scanning a string, checking a prefix, counting characters, or building a result from pieces. Repeatedly concatenating immutable strings can be inefficient; a builder or array of parts may be better.

Always check empty input and index boundaries. Try finding the largest number in an array with one pass, and explain why you need to examine each item at least once when there is no prior information about the values.`,
      },
      {
        id: "algo-3",
        title: "Hash Maps and Sets",
        content: `A hash map stores key-value pairs and is designed to find a value quickly from its key. A set stores unique values and is useful for checking whether something has already appeared. Average lookup, insert, and removal are often close to constant time, though details depend on the language and hash collisions.

A collision occurs when different keys map to the same internal location. Hash maps handle collisions using implementation-specific strategies, and a good hash function helps distribute keys. Keys should have stable equality and hashing behavior while they are stored.

Hash maps can make some algorithms faster by trading additional memory for fewer repeated searches. To find duplicates in a list, add each value to a set and check whether it was already present. Try tracing this approach on a short list and compare the work with checking every pair.`,
      },
      {
        id: "algo-4",
        title: "Stacks and Queues",
        content: `A stack follows last in, first out: the newest item is removed first. Imagine a pile of plates. Stacks are useful for undo history, parsing nested expressions, and keeping track of function calls. Common operations are push to add an item and pop to remove the top item.

A queue follows first in, first out: the earliest item is removed first. It is useful for processing tasks in arrival order, breadth-first search, and message handling. Common operations are enqueue to add an item and dequeue to remove the oldest item. Some languages provide a dedicated queue or deque type with efficient operations at both ends.

Choosing a structure based on the order you need makes code clearer and can avoid slow operations. Removing the first element of a basic array may shift all remaining items. Try deciding whether a browser's back-history behaves more like a stack or a queue and explain the order of its operations.`,
      },
      {
        id: "algo-5",
        title: "Recursion",
        content: `A recursive function solves a problem by calling itself on a smaller version of the problem. It needs a base case that returns without another recursive call; otherwise it may continue until the program runs out of call-stack space. Each step should move closer to that base case.

For example, a countdown function can print a number and call itself with one less until it reaches zero. Recursion can be natural for tree-shaped data, such as visiting folders or traversing a syntax tree. Some recursive solutions repeat work, so memoization or an iterative approach may be more efficient.

Trace recursive calls with a small input before trusting a larger one. Write down each argument and the value returned as the calls unwind. Try defining the base case and recursive step for summing the numbers from 1 to n, then test n = 1 and n = 3 by hand.`,
      },
      {
        id: "algo-6",
        title: "Searching and Sorting",
        content: `Linear search checks values one at a time and works whether or not a collection is sorted. Binary search is faster on sorted data: inspect the middle item, discard the half that cannot contain the answer, and repeat. Each step roughly halves the search range, which gives logarithmic growth.

Binary search depends on a correct sorted order and careful boundary updates. Off-by-one mistakes can skip values or make the loop never end. Sorting arranges values according to a comparison rule; built-in sort functions are usually the right choice unless you are learning the algorithm or have a special requirement.

Do not sort data just to use binary search unless the repeated searches justify the sorting cost. Try searching for a value in a sorted list by marking the low, middle, and high indexes after every step. Include a value at each boundary and a value that is not present.`,
      },
      {
        id: "algo-7",
        title: "Trees and Traversal",
        content: `A tree is a structure made of nodes connected by parent-child relationships. The top node is the root, nodes with no children are leaves, and a subtree is a node together with its descendants. Trees can represent file systems, nested page elements, and hierarchical categories.

Traversal means visiting nodes in a chosen order. Depth-first traversal explores down a branch before returning; it can be implemented with recursion or an explicit stack. Breadth-first traversal visits nodes level by level and commonly uses a queue. The chosen order matters depending on the question being answered.

Some trees have extra rules, such as a binary search tree ordering values so that smaller values are on one side and larger values on the other. That structure can support efficient lookup when balanced, but an unbalanced tree may behave like a chain. Try drawing a small tree and listing its nodes in depth-first and breadth-first order.`,
      },
    ],
  },
];

export function getCourse(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}
